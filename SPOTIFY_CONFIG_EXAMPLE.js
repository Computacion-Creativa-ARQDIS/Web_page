// SPOTIFY CONFIGURATION - BACKEND EXAMPLE
// Este archivo es un ejemplo de cómo configurar Spotify en el backend
// Para producción, implementa esto en tu servidor

/*
PASOS PARA OBTENER TU CLIENT_ID:

1. Ve a: https://developer.spotify.com/dashboard
2. Inicia sesión / Crea una cuenta
3. Crea una nueva aplicación
4. Acepta los términos
5. Recibirás tu CLIENT_ID y CLIENT_SECRET
6. En "Edit Settings", añade tu Redirect URI

REDIRECT URI SUGERIDOS:
- Desarrollo: http://localhost:5500
- Producción: https://tudominio.com

CLIENT_ID EJEMPLOS (no válidos):
- 891e36653c3c461daca144365b84b283
- 5f573c9620494e4694d41c12d9d8d287
*/

// ==========================================
// CONFIGURACIÓN EN FRONTEND (index.html)
// ==========================================

const SPOTIFY_CONFIG = {
    CLIENT_ID: 'TU_CLIENT_ID_AQUI',
    REDIRECT_URI: window.location.origin + window.location.pathname,
    SCOPES: 'streaming user-read-private user-read-email'
};

// ==========================================
// CONFIGURACIÓN EN BACKEND (Node.js)
// ==========================================

// .env
// SPOTIFY_CLIENT_ID=tu_client_id
// SPOTIFY_CLIENT_SECRET=tu_client_secret
// SPOTIFY_REDIRECT_URI=https://tudominio.com

// app.js (Express)
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/api/token';

// Endpoint para intercambiar código por token
app.get('/auth/spotify', async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'No authorization code' });
        }

        // Intercambiar código por token
        const response = await axios.post(SPOTIFY_AUTH_URL, null, {
            params: {
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;

        // Guardar token de forma segura (en sesión, JWT, etc)
        // NUNCA envíes el token en plain text
        
        res.json({
            success: true,
            expiresIn: expires_in
        });

    } catch (error) {
        console.error('Spotify auth error:', error.response?.data);
        res.status(401).json({ error: 'Authentication failed' });
    }
});

// Endpoint para buscar tracks
app.get('/api/search', async (req, res) => {
    try {
        const { query } = req.query;
        const token = req.session.spotifyToken; // Obtener del almacenamiento seguro

        const response = await axios.get('https://api.spotify.com/v1/search', {
            params: {
                q: query,
                type: 'track',
                limit: 5
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(400).json({ error: 'Search failed' });
    }
});

// ==========================================
// VERSIÓN AVANZADA CON REFRESH TOKEN
// ==========================================

let tokenCache = {
    access_token: null,
    refresh_token: null,
    expires_at: 0
};

async function refreshAccessToken() {
    try {
        const response = await axios.post(SPOTIFY_AUTH_URL, null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: tokenCache.refresh_token,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET
            }
        });

        tokenCache.access_token = response.data.access_token;
        tokenCache.expires_at = Date.now() + response.data.expires_in * 1000;

        return tokenCache.access_token;
    } catch (error) {
        console.error('Token refresh failed:', error);
        throw error;
    }
}

// Middleware para verificar token válido
async function ensureValidToken() {
    if (Date.now() > tokenCache.expires_at) {
        await refreshAccessToken();
    }
    return tokenCache.access_token;
}

module.exports = {
    refreshAccessToken,
    ensureValidToken,
    tokenCache
};
