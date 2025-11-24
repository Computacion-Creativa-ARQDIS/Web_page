# 🚀 GUÍA RÁPIDA DE INICIO

## ⚡ En 5 Minutos

### 1️⃣ Obtener Credenciales Spotify

```
1. Abre: https://developer.spotify.com/dashboard
2. Inicia sesión / Crea cuenta (gratis)
3. "Create an App" → Acepta términos → Espera
4. ¡Recibirás tu CLIENT_ID!
```

### 2️⃣ Configurar Cliente

Abre `index.html` y encuentra esta línea (aprox. línea 380):

```javascript
const SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
```

Cámbiala a:

```javascript
const SPOTIFY_CLIENT_ID = 'abc123def456...'; // Tu CLIENT_ID real
```

### 3️⃣ Ejecutar Localmente

**OPCIÓN A: Python (recomendado)**
```bash
# En la carpeta del proyecto
python -m http.server 5500
```

**OPCIÓN B: Node.js**
```bash
npm install
npm run serve
```

**OPCIÓN C: VS Code**
```
Haz clic derecho en index.html
→ "Open with Live Server"
```

### 4️⃣ ¡Usar!

```
1. Abre http://localhost:5500
2. Haz clic en "Conectar Spotify"
3. Autoriza (te llevará a Spotify)
4. Busca una canción
5. Haz clic para reproducir
6. ¡Observa el círculo reaccionar! 🎉
```

---

## 📋 Checklist de Configuración

- [ ] Tengo una cuenta de Spotify (gratis va bien)
- [ ] Registré una app en https://developer.spotify.com/dashboard
- [ ] Tengo mi CLIENT_ID
- [ ] Lo puse en `index.html`
- [ ] Ejecuto un servidor local (Python/Node.js)
- [ ] Abro http://localhost:5500 (o 3000)

---

## 🎵 Probando

### ✅ Debe funcionar:
- [ ] Botón "Conectar Spotify" existe
- [ ] Me lleva a autorización de Spotify
- [ ] Puedo buscar canciones
- [ ] Puedo reproducir previews
- [ ] El círculo cambia cuando la música suena

### ❌ Si algo no funciona:

```
1. Abre DevTools (F12)
2. Ve a la pestaña "Console"
3. Busca mensajes de error rojo
4. Compara con TROUBLESHOOTING.md
```

---

## 🎨 Primeras Personalizaciones

### Cambiar colores del círculo

En `index.html`, busca `drawAudioVisualizer()`:

**Morado → Tu color favorito:**
```javascript
ctx.strokeStyle = 'rgb(100, 0, 200)';  // Morado
// Cámbialo a:
ctx.strokeStyle = 'rgb(0, 100, 255)';  // Azul
```

**Rosa → Tu color favorito:**
```javascript
ctx.strokeStyle = 'rgb(200, 0, 100)';  // Rosa
// Cámbialo a:
ctx.strokeStyle = 'rgb(255, 100, 0)';  // Naranja
```

### Cambiar tamaño del canvas

En HTML (línea ~370):
```html
<canvas id="audioVisualizer" width="300" height="300"></canvas>
```

Aumenta los números para un círculo más grande:
```html
<canvas id="audioVisualizer" width="400" height="400"></canvas>
```

---

## 📚 Documentación Completa

Después de que funcione lo básico:

1. **SPOTIFY_SETUP.md** - Configuración detallada
2. **README_SPOTIFY.md** - Características y ejemplos
3. **server.js** - Backend seguro para producción
4. **SPOTIFY_CONFIG_EXAMPLE.js** - Ejemplos avanzados

---

## 🆘 Problemas Comunes

### "El botón no funciona"
```
→ ¿Pusiste el CLIENT_ID?
→ ¿Es correcto el URL localhost?
→ Revisa la consola (F12)
```

### "Dice 'Sin resultados' en búsqueda"
```
→ ¿Conectaste Spotify?
→ ¿Escribiste bien la búsqueda?
→ Algunos previews pueden no estar disponibles
```

### "El círculo no se mueve"
```
→ ¿Está reproduciendo la canción?
→ ¿Abriste DevTools? (F12) → Console
→ Busca errores de Audio Context
```

---

## 🎓 Próximos Pasos

### Nivel 1 (Básico)
- ✅ Funciona con Spotify
- ✅ Busca y reproduce canciones
- ✅ Visualizador reactivo

### Nivel 2 (Intermedio)
- 🔜 Guardar canciones favoritas (localStorage)
- 🔜 Ajustar sensibilidad del visualizador
- 🔜 Cambiar temas de colores

### Nivel 3 (Avanzado)
- 🔜 Implementar backend (server.js)
- 🔜 Reproducir canciones completas
- 🔜 Historial de búsquedas
- 🔜 Integrar con otras APIs

---

## 💡 Tips

```
🎵 Usa canciones con buenos bajos para mejor visualización
🎨 Experimenta con diferentes RGB combinations
🔊 Baja el volumen si es muy fuerte
⌨️  Usa Arrow Keys para girar el carrusel
␣️  Presiona Space para auto-rotate
```

---

## ✉️ Soporte

Si algo no funciona:

1. Revisa **TROUBLESHOOTING.md**
2. Consulta **SPOTIFY_SETUP.md**
3. Abre DevTools (F12) → Console para errores
4. Verifica el archivo **SPOTIFY_CONFIG_EXAMPLE.js**

---

**¡Listo! Ya puedes comenzar. Disfruta el visualizador 🎉**

