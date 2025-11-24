# Integración de Spotify API - Guía de Configuración

## 📋 Requisitos Previos

1. Tener una cuenta de Spotify (gratis o premium)
2. Acceso a la [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## 🔧 Pasos de Configuración

### Paso 1: Registrar una Aplicación en Spotify

1. Ve a https://developer.spotify.com/dashboard
2. Inicia sesión con tu cuenta de Spotify (o crea una)
3. Haz clic en "Create an App"
4. Acepta los términos y crea la aplicación
5. Se te proporcionará un **Client ID** y **Client Secret**

### Paso 2: Configurar el Redirect URI

1. En la página de tu app en el Dashboard, ve a "Edit Settings"
2. En "Redirect URIs", añade: `http://localhost:5500` (o tu dominio local)
3. Guarda los cambios

### Paso 3: Actualizar el Código

En el archivo `index.html`, busca esta línea:

```javascript
const SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
```

Reemplázala con tu **Client ID** real de Spotify:

```javascript
const SPOTIFY_CLIENT_ID = 'tu_client_id_aqui';
```

### Paso 4: Verificar el Redirect URI

También asegúrate de que tu `SPOTIFY_REDIRECT_URI` coincida con la configurada en el Dashboard.

## 🎵 Características Implementadas

- ✅ Autenticación con Spotify
- ✅ Búsqueda de canciones
- ✅ Reproducción de previews de 30 segundos
- ✅ Visualización reactiva de audio (círculos que responden a la música)
- ✅ Integración con Web Audio API para análisis en tiempo real

## ⚠️ Limitaciones Importantes

1. **Preview URLs**: Spotify solo proporciona previews de 30 segundos. Para reproducir canciones completas, se necesita:
   - Usar el Spotify Web Player mediante el SDK Web Playback
   - Acceso de usuario premium
   - Una implementación más compleja del backend

2. **CORS**: La reproducción directa de audio desde URLs de preview está limitada por restricciones CORS

3. **Token Expiration**: El token de acceso expira. Para producción, necesitas:
   - Un servidor backend para manejar la renovación segura de tokens
   - Almacenamiento seguro de credenciales

## 🚀 Uso

1. Haz clic en **"Conectar Spotify"**
2. Autoriza la aplicación (se abrirá el login de Spotify)
3. Busca una canción en el campo de búsqueda
4. Selecciona una canción para reproducir su preview
5. El círculo reactivo en el centro responderá al audio

## 📝 Estructura del Visualizador

El visualizador tiene dos fases:

- **Fase Inicial (primeros 100ms)**: Muestra anillos de ondas suavizadas
- **Fase Principal**: Muestra círculos concéntricos que reaccionan a la amplitud del audio

### Colores

- **Morado** (100, 0, 200): Frecuencias altas suavizadas
- **Rosa** (200, 0, 100): Amplitud del audio en tiempo real

## 🔐 Seguridad - IMPORTANTE

Para un deployment en producción:

1. **NUNCA** guardes el Client Secret en el código frontend
2. Implementa un servidor backend que:
   - Maneje el OAuth flow de forma segura
   - Almacene tokens de forma segura
   - Renueve tokens cuando expiren
3. Usa variables de entorno para las credenciales

### Ejemplo Backend (Node.js):

```javascript
// /auth/spotify
app.get('/auth/spotify', (req, res) => {
    const { code } = req.query;
    
    // Usar el code para obtener token
    const params = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET
    });
    
    // Llamar a Spotify API
    // Devolver token de forma segura
});
```

## 📚 Recursos Útiles

- [Spotify Web API Docs](https://developer.spotify.com/documentation/web-api)
- [Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk)
- [Web Audio API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 🐛 Troubleshooting

### "Sin resultados en búsqueda"
- Verifica que estés conectado a Spotify
- Verifica que tu token no haya expirado
- Intenta con un término de búsqueda diferente

### "El audio no se reproduce"
- Algunos previews podrían no estar disponibles
- Verifica la consola del navegador para errores de CORS
- Intenta con otra canción

### "El visualizador no reacciona"
- Abre las DevTools (F12)
- Verifica que el AudioContext se haya inicializado
- Asegúrate de que el audio está en reproducción

