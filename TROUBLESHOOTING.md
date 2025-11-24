# 🔧 TROUBLESHOOTING - Solución de Problemas

## ❓ Preguntas Frecuentes

### 1. "Conectar Spotify no hace nada"

**Síntomas:**
- Botón no responde
- No abre ventana de Spotify
- Consola muestra errores

**Soluciones:**

```javascript
// ✅ CORRECTO - Verificar en index.html

// 1. Abre DevTools (F12)
// 2. Console tab
// 3. Copia esto:
console.log('CLIENT_ID:', SPOTIFY_CLIENT_ID);
```

Si ves `CLIENT_ID: YOUR_CLIENT_ID_HERE`:
```
❌ PROBLEMA: No cambiaste el CLIENT_ID
✅ SOLUCIÓN: Reemplaza con tu ID real
```

**Checklist:**
- [ ] ¿Tienes CLIENT_ID de Spotify Dashboard?
- [ ] ¿Lo pusiste en las comillas?
- [ ] ¿Sin espacios extras?
- [ ] ¿Guardaste el archivo?
- [ ] ¿Recargaste la página (Ctrl+F5)?

---

### 2. "Me lleva a Spotify pero vuelve en blanco"

**Síntomas:**
- Autorizo en Spotify
- Me redirige a página en blanco
- No hay búsqueda disponible

**Problema:** Mismatch entre Redirect URI

**Solución:**

1. **En tu código** (`index.html`):
   ```javascript
   const SPOTIFY_REDIRECT_URI = window.location.origin + window.location.pathname;
   ```
   
2. **Tu URL real será:**
   ```
   http://localhost:5500/
   ```

3. **En Spotify Dashboard:**
   - Vai a tu app
   - "Edit Settings"
   - Redirect URIs debe tener EXACTAMENTE:
   ```
   http://localhost:5500
   ```

✅ **Importante:** Sin trailing slash en Dashboard

**¿Usas puerto diferente?**
```bash
# Puerto 3000
python -m http.server 3000
# Entonces en Spotify Dashboard: http://localhost:3000
```

---

### 3. "Búsqueda no retorna resultados"

**Síntomas:**
- Escribo canción
- "Sin resultados"
- O no aparece el campo de búsqueda

**Problema #1: No estoy autenticado**
```javascript
// DevTools → Console:
console.log('Token:', spotifyAccessToken);
console.log('Auth:', isSpotifyAuthenticated);
```

Si ves `undefined` o `false`:
```
❌ No conectaste Spotify
✅ Haz clic en "Conectar Spotify"
```

**Problema #2: Token expirado**
```
Spotify tokens expiran en 1 hora
❌ Intenta desconectar y conectar de nuevo
```

**Problema #3: Resultado vacío realmente**
```
Algunos términos no retornan resultados
✅ Intenta:
   - Nombres completos de artistas
   - Búsquedas más específicas
   - Otros idiomas
```

---

### 4. "El audio no se reproduce / No escucho nada"

**Síntomas:**
- Selecciono canción
- No suena nada
- El botón play/pause no funciona

**Problema #1: Volumen del navegador**
```
✅ Comprueba:
   - Volumen de Windows
   - Volumen del navegador
   - Volumen del tab específico (click derecho en tab)
```

**Problema #2: Sin preview disponible**
```
No todas las canciones tienen preview en Spotify
❌ La canción no tiene preview
✅ Intenta con otra canción
```

**Problema #3: Error de CORS**
```
DevTools → Console verás:
"Access to XMLHttpRequest blocked by CORS policy"

❌ El servidor no está configurado para CORS
✅ Soluciones:
   1. Usa el servidor.js incluido
   2. O ejecuta con Live Server (VS Code)
```

**Problema #4: Problema de AudioContext**
```javascript
// DevTools → Console:
console.log('AudioContext:', audioContext);
console.log('Analyser:', analyser);
```

Si ves `null` o `undefined`:
```
❌ AudioContext no inicializado
✅ Abre DevTools primero
✅ Luego reproduce una canción
```

---

### 5. "El círculo no se mueve / no reacciona"

**Síntomas:**
- El canvas está estático
- No reacciona a la música
- O no aparece en absoluto

**Problema #1: Canvas no aparece**
```javascript
// DevTools → Console:
document.getElementById('audioVisualizer')
```

Si ves `null`:
```
❌ El canvas no está en el HTML
✅ Verifica que esté en index.html línea ~370
```

**Problema #2: Audio no está en reproducción**
```
El visualizador solo reacciona a audio
❌ Haz clic en la canción primero
❌ Luego haz clic en Play/Pause
```

**Problema #3: AudioContext sin permiso**
```
Algunos navegadores requieren interacción
❌ Haz clic en algo primero
✅ Luego intenta reproducir
```

**Problema #4: Analyser sin datos**
```javascript
// DevTools → Console:
analyser.getByteFrequencyData(dataArray)
```

Debugging:
```javascript
// Agrega esto en console:
setInterval(() => {
    analyser.getByteFrequencyData(new Uint8Array(360));
    console.log('Data recibido');
}, 1000);
```

---

### 6. "Error: 'OAuth redirect_uri_mismatch'"

**Síntomas:**
```
OAuth Error: redirect_uri_mismatch
```

**Causa:** Tu URL no coincide con Dashboard

**Solución:**

**Paso 1: Encuentra tu URL exacta**
```
Abre en navegador: http://localhost:5500
Copia la URL completa del navegador
Ejemplo: http://localhost:5500/
```

**Paso 2: Actualiza Spotify Dashboard**
```
1. https://developer.spotify.com/dashboard
2. Tu app → Edit Settings
3. Redirect URIs:
   http://localhost:5500
   (sin trailing slash)
4. Save
```

**Paso 3: En tu código**
```javascript
const SPOTIFY_REDIRECT_URI = 'http://localhost:5500';
// NO: 'http://localhost:5500/'
// NO: 'http://localhost:5500/index.html'
```

---

### 7. "Consola llena de errores"

**Problema #1: HTTPS en localhost**
```
Error: Mixed Content
❌ Mezcla HTTP y HTTPS
✅ Usa solo HTTP en localhost
```

**Problema #2: Content-Security-Policy**
```
Error: Refused to load image from...
❌ Restricción de seguridad
✅ Necesitas servidor backend completo
```

**Problema #3: Undefined variable**
```
Error: Cannot read property of undefined
❌ Variable no inicializada
✅ Recarga la página
✅ Espera a que cargue completamente
```

---

## 🔍 Debugging Avanzado

### Ver todo el estado

```javascript
// Copia en DevTools Console:
console.log({
    authenticated: isSpotifyAuthenticated,
    token: spotifyAccessToken ? '✓' : '✗',
    audioContext: audioContext ? '✓' : '✗',
    analyser: analyser ? '✓' : '✗',
    currentTrack: currentTrackURI,
    audioElement: audioElement ? '✓' : '✗',
    playing: audioElement && !audioElement.paused ? '▶' : '⏸'
});
```

### Monitorear audio en tiempo real

```javascript
// Ejecuta esto en console cada segundo:
setInterval(() => {
    if (analyser) {
        const data = new Uint8Array(360);
        analyser.getByteFrequencyData(data);
        const avg = data.reduce((a,b)=>a+b)/data.length;
        console.log('Audio level:', avg.toFixed(0) + '%');
    }
}, 1000);
```

### Verificar tokens

```javascript
// Ver estado de autenticación:
console.log('Session tokens:', req.session.spotifyTokens);

// Verificar expiración:
if (req.session.spotifyTokens) {
    const expiresIn = req.session.spotifyTokens.expires_at - Date.now();
    console.log('Token expira en:', (expiresIn/1000/60).toFixed(1), 'minutos');
}
```

---

## 🚨 Errores Comunes en Consola

| Error | Causa | Solución |
|-------|-------|----------|
| `CLIENT_ID is undefined` | No lo pusiste | Agrega CLIENT_ID real |
| `CORS error` | Mismo origen | Usa backend o Live Server |
| `fetch error 401` | Token inválido | Desconecta y reconecta |
| `fetch error 404` | URL incorrecta | Verifica endpoint API |
| `Cannot read 'play' of null` | No hay audio | Selecciona canción primero |
| `AudioContext restricted` | Necesita interacción | Haz clic primero |

---

## ✅ Checklist Final

Antes de reportar error:

- [ ] Recargué la página (Ctrl+F5)
- [ ] Abrí DevTools (F12)
- [ ] Puse el CLIENT_ID real
- [ ] Conecté Spotify primero
- [ ] La URL localhost coincide con Dashboard
- [ ] Intenté en otra canción
- [ ] Intenté en otro navegador
- [ ] Reviví QUICK_START.md

---

## 🆘 Último Recurso

Si nada funciona:

**1. Limpia todo:**
```bash
# Cierra el servidor
# Presiona Ctrl+C

# Limpia caché del navegador
F12 → Application → Clear site data

# Borra archivos temporales
# Reinicia el navegador
```

**2. Empieza de cero:**
```bash
# Descarga index.html fresco
# Copia tu CLIENT_ID únicamente
# Ejecuta servidor nuevo
# Abre en navegador privado/incógnito
```

**3. Verifica permisos:**
```
¿Puedes acceder a https://api.spotify.com?
¿Tu firewall bloquea Spotify?
¿VPN activa interfiriendo?
```

---

## 📞 Contacto y Soporte

- Documentación: `SPOTIFY_SETUP.md`
- Guía rápida: `QUICK_START.md`
- Backend: `server.js`
- Ejemplos: `SPOTIFY_CONFIG_EXAMPLE.js`

**¡Logramos que funcione! 🎉**

