# 📦 INSTALACIÓN Y SETUP

## 🎯 Objetivo

Integrar la API de Spotify para que el círculo reactivo responda a canciones seleccionadas en tiempo real.

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet
- Cuenta de Spotify (gratis o premium)
- Editor de código (VS Code, Sublime, etc.)

**Opcional:**
- Python 3.x o Node.js 14+ (para servidor local)

---

## 🔧 Instalación Paso a Paso

### Paso 1: Registrarse en Spotify Developer

1. Ve a: https://developer.spotify.com/dashboard
2. Haz clic en "Sign up" o "Log in"
3. Completa el registro (o inicia sesión)

**Importante:**
- Acepta los términos de Spotify for Developers
- Verifica tu email si es necesario

### Paso 2: Crear una Aplicación

1. En el Dashboard, haz clic en "+ Create an App"
2. Dale un nombre: `Alfabetismo Web Visualizer`
3. Marca las casillas de términos
4. Haz clic en "Create"
5. **Acepta los términos nuevamente**

### Paso 3: Obtener Credenciales

Después de crear la app:

1. Se abrirá una página con tu **Client ID** y **Client Secret**
2. **Copia el Client ID** (lo necesitarás)
3. NO compartas el Client Secret

```
Client ID ejemplo: 891e36653c3c461daca144365b84b283
```

### Paso 4: Configurar Redirect URI

1. En tu app del Dashboard, haz clic en "Edit Settings"
2. Ve a la sección "Redirect URIs"
3. Agrega: `http://localhost:5500`
4. Haz clic en "Add"
5. Haz clic en "Save"

```
URIs válidos:
- http://localhost:5500
- http://localhost:3000
- https://tudominio.com
```

### Paso 5: Actualizar el Código

1. Abre el archivo `index.html` con un editor
2. Encuentra esta línea (aprox. línea 380):

```javascript
const SPOTIFY_CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
```

3. Reemplázala con tu Client ID:

```javascript
const SPOTIFY_CLIENT_ID = '891e36653c3c461daca144365b84b283';
```

4. **Guarda el archivo** (Ctrl+S)

### Paso 6: Ejecutar Servidor Local

**OPCIÓN A: Python (Recomendado - Más fácil)**

```bash
# Abre terminal en la carpeta del proyecto
# Windows PowerShell:
cd "C:\Users\maria\OneDrive\Desktop\alfabetismo web\Web_page"
python -m http.server 5500

# En Mac/Linux:
python3 -m http.server 5500
```

Deberías ver:
```
Serving HTTP on 0.0.0.0 port 5500 ...
```

**OPCIÓN B: Node.js**

```bash
# Instalar dependencias
npm install

# Ejecutar servidor
npm run dev

# O ejecutar http-server
npx http-server -p 5500
```

**OPCIÓN C: Live Server (VS Code)**

```
1. Instala extensión "Live Server" en VS Code
2. Haz clic derecho en index.html
3. Selecciona "Open with Live Server"
4. Se abrirá automáticamente en navegador
```

### Paso 7: Verificar que Funciona

1. Abre tu navegador
2. Ve a: `http://localhost:5500`

Deberías ver:
- ✅ Título "Semillero: Computación Creativa"
- ✅ Un círculo en el centro (canvas)
- ✅ Botón "Conectar Spotify" en esquina superior derecha
- ✅ Carrusel de tarjetas alrededor

---

## ⚙️ Configuración Avanzada (Backend)

Si quieres usar el backend Node.js completo:

### Instalación Backend

```bash
# 1. Instalar Node.js desde nodejs.org

# 2. En la carpeta del proyecto:
npm install

# 3. Crear archivo .env
cp .env.example .env

# 4. Editar .env con tus credenciales:
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback

# 5. Ejecutar servidor
npm start
```

### Estructura Backend

```
/Web_page
├── index.html              (Frontend)
├── server.js               (Backend Node.js)
├── package.json            (Dependencias)
├── .env                    (Credenciales - NO commit)
└── .env.example            (Plantilla)
```

### Ventajas Backend

✅ Token refresh automático
✅ Mayor seguridad
✅ Sin exponer Secret
✅ Manejo de errores centralizado
✅ Escalable a producción

---

## 📁 Archivos Incluidos

| Archivo | Descripción |
|---------|-------------|
| `index.html` | Página principal con todo el código |
| `QUICK_START.md` | Guía de inicio en 5 minutos |
| `SPOTIFY_SETUP.md` | Configuración detallada |
| `TROUBLESHOOTING.md` | Solución de problemas |
| `README_SPOTIFY.md` | Características y uso |
| `server.js` | Backend seguro (opcional) |
| `package.json` | Dependencias Node.js |
| `SPOTIFY_CONFIG_EXAMPLE.js` | Ejemplos avanzados |
| `.env.example` | Plantilla de variables |

---

## 🧪 Testear la Instalación

### Paso 1: Conectar Spotify

1. Abre http://localhost:5500
2. Haz clic en botón "Conectar Spotify"
3. Se abrirá página de login de Spotify
4. Inicia sesión / Crea cuenta
5. Autoriza permisos
6. Deberías volver a la página

### Paso 2: Buscar Canción

1. En el campo de búsqueda, escribe: "Bohemian Rhapsody"
2. Espera los resultados
3. Haz clic en una canción

### Paso 3: Reproducir

1. Aparecerá un botón "Play/Pause"
2. Haz clic en Play
3. Deberías escuchar música
4. El círculo debe cambiar

### Paso 4: Visualización

1. Observa el círculo en el centro
2. Debe cambiar de tamaño con la música
3. Los colores deben variar
4. Los anillos deben responder a las frecuencias

---

## 🎨 Personalización Inicial

### Cambiar Colores

Archivo: `index.html`, función `drawAudioVisualizer()`

```javascript
// Línea ~520 aprox
ctx.strokeStyle = 'rgb(100, 0, 200)';  // Morado
// Cambia a:
ctx.strokeStyle = 'rgb(0, 255, 100)';  // Verde

// Y también:
ctx.strokeStyle = 'rgb(200, 0, 100)';  // Rosa
// Cambia a:
ctx.strokeStyle = 'rgb(255, 200, 0)';  // Dorado
```

### Cambiar Tamaño

```html
<!-- Línea ~370 en index.html -->
<canvas id="audioVisualizer" width="300" height="300"></canvas>

<!-- Aumenta a: -->
<canvas id="audioVisualizer" width="500" height="500"></canvas>
```

### Cambiar Sensibilidad

```javascript
// Línea ~430 aprox
analyser.fftSize = 360;  // Aumenta para más detalle: 512, 1024

// Velocidad de suavizado:
valSuave1[i] = valSuave1[i] + (dataArray[i] - valSuave1[i]) / 1;  // Aumenta el 1
// Menos suave: / 0.5
// Más suave: / 2
```

---

## 🚀 Próximos Pasos

### Después de funcionar básico:

1. **Personalizar**
   - Cambiar colores del visualizador
   - Ajustar tamaño del canvas
   - Modificar sensibilidad

2. **Expandir**
   - Guardar canciones favoritas (localStorage)
   - Crear playlists
   - Agregar más filtros de búsqueda

3. **Mejorar**
   - Implementar backend completo
   - Reproducir canciones completas
   - Agregar estadísticas
   - Hacer responsive para mobile

---

## 📚 Recursos Importantes

- **Spotify Developer Docs**: https://developer.spotify.com/documentation
- **Web Audio API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
- **Canvas API**: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

## ⚠️ Limitaciones y Consideraciones

### Spotify Limitations

| Feature | Gratis | Premium | Limitación |
|---------|--------|---------|-----------|
| Search | ✓ | ✓ | Unlimited |
| Previews | ✓ | ✓ | 30 segundos |
| Full playback | ✗ | ✓ | Requiere Premium |
| Streaming API | ✗ | ✓ | Solo Premium |

### Navegadores Soportados

```
✓ Chrome 90+
✓ Firefox 88+
✓ Safari 14+
✓ Edge 90+
✗ Internet Explorer (no soportado)
```

### Limitaciones de Audio

```
CORS: Algunos navegadores restringen audio cross-origin
Solución: Usa servidor backend

Localhost: Funciona sin HTTPS
Producción: Necesita HTTPS para algunos navegadores
```

---

## 🔒 Seguridad en Desarrollo

✅ **OK para desarrollo:**
```javascript
const SPOTIFY_CLIENT_ID = 'abc123...'; // En index.html
```

❌ **NO para producción:**
```javascript
// NUNCA hagas esto en producción:
const SPOTIFY_CLIENT_SECRET = 'secret123'; // ¡MAL!
```

✅ **Correcto para producción:**
```bash
# Usar variables de entorno:
SPOTIFY_CLIENT_SECRET=xxx  # En servidor backend
```

---

## ✅ Checklist Final

- [ ] Registré cuenta en Spotify
- [ ] Creé aplicación en Dashboard
- [ ] Copié Client ID
- [ ] Configuré Redirect URI
- [ ] Actualicé index.html con Client ID
- [ ] Ejecuto servidor local
- [ ] Puedo acceder a http://localhost:5500
- [ ] Botón "Conectar Spotify" funciona
- [ ] Puedo buscar canciones
- [ ] El visualizador reacciona a audio

**¡Si todo está marcado, ¡ÉXITO! 🎉**

---

## 🆘 Problemas de Instalación

### Error: "Port already in use"
```bash
# Puerto 5500 ya en uso, prueba otro:
python -m http.server 5501  # O cualquier otro
# Luego abre http://localhost:5501
```

### Error: "Python not found"
```bash
# Instala Python desde python.org
# O usa Node.js:
npm install -g http-server
http-server -p 5500
```

### Error: "Client ID not valid"
```
Verifica que:
✓ Copiaste completo (sin espacios)
✓ Lo pusiste en las comillas
✓ Guardaste el archivo
✓ Recargaste la página
```

---

¡Ya está todo listo! Continúa con **QUICK_START.md** para las primeras pruebas.

