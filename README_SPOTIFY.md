# 🎵 Visualizador Reactivo de Audio - Spotify Integration

Una integración completa de Spotify API que convierte tu página en una experiencia interactiva donde el círculo central reacciona en tiempo real a la música seleccionada.

## ✨ Características

- 🎵 **Integración Spotify**: Busca y selecciona canciones directamente
- 🎨 **Visualizador Reactivo**: Círculo dinámico que reacciona al audio
- 🔄 **Web Audio API**: Análisis de audio en tiempo real
- 📱 **Responsive**: Funciona en desktop y mobile
- 🎭 **Transiciones 3D**: Carrusel de tarjetas con efecto 3D

## 🚀 Inicio Rápido

### 1. Obtener Credenciales de Spotify

```bash
1. Ve a https://developer.spotify.com/dashboard
2. Crea una nueva aplicación
3. Copia tu CLIENT_ID
4. En "Edit Settings", añade tu Redirect URI
```

### 2. Configurar el Código

Abre `index.html` y busca:

```javascript
const SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
```

Reemplázalo con tu Client ID:

```javascript
const SPOTIFY_CLIENT_ID = 'tu_client_id_aqui';
```

### 3. Ejecutar Localmente

```bash
# Opción 1: Usar Python
python -m http.server 5500

# Opción 2: Usar Node.js (si tienes http-server)
npx http-server -p 5500

# Opción 3: Abrir con Live Server en VS Code
# Haz clic derecho en index.html > "Open with Live Server"
```

### 4. ¡Usar!

1. Abre `http://localhost:5500`
2. Haz clic en "Conectar Spotify"
3. Autoriza la aplicación
4. Busca una canción
5. Haz clic para reproducir
6. ¡Observa cómo el círculo reacciona a la música!

## 📊 Cómo Funciona el Visualizador

El código Processing original ha sido convertido a **Canvas JavaScript** usando **Web Audio API**:

### Fase 1 (0-100ms)
```
- Dibuja anillos de ondas suavizadas
- Dos capas con diferentes velocidades de suavizado
- Colores: Morado (100, 0, 200) y Rosa (200, 0, 100)
```

### Fase 2 (>100ms)
```
- Dibuja círculos concéntricos
- Reaccionan a la amplitud del audio
- Efecto pulsante según la música
```

## 🎨 Personalización

### Cambiar Colores

En el código de `drawAudioVisualizer()`:

```javascript
// Morado
ctx.strokeStyle = 'rgb(100, 0, 200)';

// Rosa
ctx.strokeStyle = 'rgb(200, 0, 100)';
```

### Ajustar Sensibilidad

```javascript
// En la inicialización:
analyser.fftSize = 360; // Aumentar = más detalle
amplitudeSmoothingFactor = 24; // Aumentar = más suave
```

### Cambiar Velocidades de Suavizado

```javascript
valSuave1[i] = valSuave1[i] + (dataArray[i] - valSuave1[i]) / 1;  // Rápido
valSuave2[i] = valSuave2[i] + (dataArray[i] - valSuave2[i]) / 8;  // Más lento
```

## 🔐 Notas de Seguridad

⚠️ **IMPORTANTE**: Este código está configurado para desarrollo local.

Para **producción**, necesitas:

1. **Servidor Backend**: 
   - Nunca expongas el Client Secret
   - Implementa OAuth flow en el servidor
   - Maneja tokens de forma segura

2. **Variables de Entorno**:
   ```
   SPOTIFY_CLIENT_ID=xxx
   SPOTIFY_CLIENT_SECRET=xxx
   SPOTIFY_REDIRECT_URI=xxx
   ```

3. **Token Refresh**:
   - Los tokens expiran en 1 hora
   - Implementa refresh token en el backend
   - Ver `SPOTIFY_CONFIG_EXAMPLE.js`

## 📁 Archivos Incluidos

- `index.html` - Página principal con toda la lógica
- `SPOTIFY_SETUP.md` - Guía detallada de configuración
- `SPOTIFY_CONFIG_EXAMPLE.js` - Ejemplo de implementación backend
- `README.md` - Este archivo

## 🐛 Solución de Problemas

### "No funciona la búsqueda"
```
✓ Verifica que hayas conectado Spotify
✓ Revisa la consola (F12) para errores
✓ Asegúrate de que el CLIENT_ID sea correcto
```

### "El audio no se reproduce"
```
✓ No todos los previews están disponibles
✓ Intenta con otra canción
✓ Verifica que el navegador tenga permisos de audio
```

### "El visualizador no reacciona"
```
✓ Abre DevTools (F12) > Console
✓ Verifica que audioContext esté inicializado
✓ Asegúrate de que el audio está en reproducción
```

### "Error de CORS"
```
✓ Verifica el Redirect URI en Spotify Dashboard
✓ Debe coincidir exactamente con tu URL local
✓ Incluye el protocolo (http:// o https://)
```

## 📚 Recursos

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Processing.js Reference](https://processingjs.org/)

## 💡 Ejemplos de Extensiones

### 1. Guardar Playlist Favoritas
```javascript
// Guardar en localStorage
localStorage.setItem('favoriteTracks', JSON.stringify(favorites));
```

### 2. Mostrar Visualización Fullscreen
```javascript
canvas.requestFullscreen();
```

### 3. Exportar Visualización como Video
```javascript
// Usar MediaRecorder API
const stream = canvas.captureStream(30);
const recorder = new MediaRecorder(stream);
```

### 4. Múltiples Canales de Audio
```javascript
// Usar split stereo
const stereo = audioContext.createChannelSplitter(2);
// Analizar izquierda y derecha por separado
```

## 📝 Licencia

Este proyecto es código abierto y puede ser modificado libremente.

---

**Hecho con ❤️ para Computación Creativa**

¿Necesitas ayuda? Revisa los archivos de documentación incluidos o contacta al equipo de desarrollo.
