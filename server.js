// ============================================
// SERVIDOR BACKEND PARA SPOTIFY - Node.js
// ============================================
// 
// Este es un ejemplo de cómo implementar de forma segura
// la autenticación con Spotify en producción
//
// Instalación:
// npm install express axios cors dotenv
//
// Uso:
// node server.js
// Luego abre: http://localhost:3000

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============ CONFIGURACIÓN ============
const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/callback';
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ ERROR: Define SPOTIFY_CLIENT_ID y SPOTIFY_CLIENT_SECRET en .env');
    process.exit(1);
}

// ============ MIDDLEWARE ============
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// ============ STORAGE DE TOKENS ============
// En producción, usa una base de datos (Redis, MongoDB, PostgreSQL)
const userTokens = new Map();

// ============ RUTAS ============

// 1. INICIAR AUTENTICACIÓN
app.get('/auth/login', (req, res) => {
    const scope = 'streaming user-read-private user-read-email';
    const authUrl = `${SPOTIFY_AUTH_URL}?` + new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        scope: scope,
        show_dialog: true // Forzar mostrar login cada vez
    }).toString();

    res.redirect(authUrl);
});

// 2. CALLBACK DE SPOTIFY
app.get('/callback', async (req, res) => {
    const { code, error } = req.query;

    if (error) {
        return res.send(`❌ Error: ${error}`);
    }

    if (!code) {
        return res.send('❌ No authorization code received');
    }

    try {
        // Intercambiar código por token
        const response = await axios.post(
            SPOTIFY_TOKEN_URL,
            new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { access_token, refresh_token, expires_in } = response.data;
        const userId = req.session.id;

        // Guardar tokens en sesión (en producción, usar BD encriptada)
        req.session.spotifyTokens = {
            access_token,
            refresh_token,
            expires_at: Date.now() + expires_in * 1000
        };

        userTokens.set(userId, req.session.spotifyTokens);

        // Redirigir a la aplicación con éxito
        res.send(`
            ✅ Autenticación exitosa!
            <br><a href="/">Volver a la página</a>
        `);

    } catch (error) {
        console.error('❌ Token exchange error:', error.response?.data || error.message);
        res.status(401).send('Authentication failed');
    }
});

// 3. OBTENER TOKEN VÁLIDO (con refresco automático)
async function getValidAccessToken(req) {
    const tokens = req.session.spotifyTokens;

    if (!tokens) {
        throw new Error('No authenticated user');
    }

    // Si el token expira en menos de 5 minutos, refrescar
    if (Date.now() + 5 * 60 * 1000 > tokens.expires_at) {
        await refreshAccessToken(req);
    }

    return tokens.access_token;
}

// 4. REFRESCAR TOKEN
async function refreshAccessToken(req) {
    const { refresh_token } = req.session.spotifyTokens;

    try {
        const response = await axios.post(
            SPOTIFY_TOKEN_URL,
            new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refresh_token,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const { access_token, expires_in } = response.data;

        req.session.spotifyTokens.access_token = access_token;
        req.session.spotifyTokens.expires_at = Date.now() + expires_in * 1000;

        return access_token;
    } catch (error) {
        console.error('❌ Token refresh failed:', error.response?.data);
        throw error;
    }
}

// 5. BUSCAR CANCIONES
app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim().length < 2) {
            return res.status(400).json({ error: 'Query too short' });
        }

        const accessToken = await getValidAccessToken(req);

        const response = await axios.get(`${SPOTIFY_API_BASE}/search`, {
            params: {
                q: query,
                type: 'track',
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        res.json(response.data.tracks.items);

    } catch (error) {
        console.error('❌ Search error:', error.message);
        res.status(error.response?.status || 500).json({ 
            error: error.message 
        });
    }
});

// 6. OBTENER INFO DE CANCIÓN
app.get('/api/track/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const accessToken = await getValidAccessToken(req);

        const response = await axios.get(
            `${SPOTIFY_API_BASE}/tracks/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error('❌ Track fetch error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 7. OBTENER USUARIO ACTUAL
app.get('/api/me', async (req, res) => {
    try {
        const accessToken = await getValidAccessToken(req);

        const response = await axios.get(
            `${SPOTIFY_API_BASE}/me`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error('❌ User fetch error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// 8. LOGOUT
app.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.send('✅ Logged out successfully. <a href="/">Home</a>');
    });
});

// 9. SERVIR ARCHIVO HTML PRINCIPAL
app.use(express.static('.'));

// ============ RUTAS DE VERIFICACIÓN ============

app.get('/status', (req, res) => {
    const isAuthenticated = !!req.session.spotifyTokens;
    res.json({
        authenticated: isAuthenticated,
        timestamp: new Date().toISOString()
    });
});

app.get('/tokens/info', (req, res) => {
    if (!req.session.spotifyTokens) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { expires_at } = req.session.spotifyTokens;
    const expiresIn = Math.round((expires_at - Date.now()) / 1000);

    res.json({
        expiresIn,
        expiresAt: new Date(expires_at).toISOString(),
        needsRefresh: expiresIn < 300
    });
});

// ============ MANEJO DE ERRORES ============
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============ INICIAR SERVIDOR ============
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════╗
    ║   🎵 Spotify Backend Server                   ║
    ║                                               ║
    ║   http://localhost:${PORT}                       ║
    ║                                               ║
    ║   Rutas disponibles:                          ║
    ║   - GET /auth/login          (Conectar)      ║
    ║   - GET /auth/logout         (Desconectar)   ║
    ║   - GET /api/search          (Buscar tracks) ║
    ║   - GET /api/track/:id       (Info track)    ║
    ║   - GET /api/me              (Usuario)       ║
    ║   - GET /status              (Estado)        ║
    ║                                               ║
    ╚═══════════════════════════════════════════════╝
    `);
});

// ============ GRACEFUL SHUTDOWN ============
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM received, shutting down gracefully');
    process.exit(0);
});

module.exports = app;
