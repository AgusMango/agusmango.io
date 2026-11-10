# 🚀 Landing Page B — Asesoría Comercial (Diseño Split-Screen & Navegación Gestual)

Esta versión **Landing Page B** presenta la misma información estratégica y funcionalidades de `landing_page_A`, pero con un diseño arquitectónico premium dividido en dos mitades (Split-Screen) en desktop y una experiencia con portada táctil e indicadores de sección en dispositivos móviles.

---

## 🎨 Características de Diseño & Experiencia de Usuario (UX)

### 1. Pantalla Dividida en Dos (Desktop >= 1024px)
- **Mitad Izquierda (50%):** 
  - Imagen representativa de fondo en alta resolución con superposición degradada oscura de alto contraste.
  - Títulos principales, subtítulos, etiquetas y citas estratégicas centrados y anclados en la zona inferior izquierda (**abajo a la izquierda**), otorgando una estética cinematográfica y despejada.
  - Indicador de número de sección (ej. `01 / 05 • INICIO`).
  - Transición cinemática con crossfade y sutil zoom al cambiar de sección.
- **Mitad Derecha (50%):**
  - Fondo blanco puro (`bg-white`) impecable.
  - Desglose exhaustivo de la información (métricas, tarjetas de contratos, reseñas de Google con estrellas, paso a paso y formulario).
  - Scroll vertical interno suave si el contenido excede la altura de pantalla.

### 2. Transición con la Ruedita del Mouse (Wheel Transition)
- En lugar de un desplazamiento continuo tradicional, al girar la ruedita hacia abajo (`wheel down`), la sección actual transiciona suavemente a la siguiente (`01 -> 02 -> 03...`).
- Si el panel derecho contiene texto más largo, permite leerlo con scroll y, al llegar al final del bloque, el siguiente giro transiciona a la sección siguiente.
- Al girar la ruedita hacia arriba (`wheel up`), regresa a la sección anterior.
- También soporta teclas de navegación (`Flecha Abajo`, `Flecha Arriba`, `PageDown`, `PageUp`) y flechas de navegación flotantes.

### 3. Barra de Navegación Inteligente en PC (Auto-Colapso & Expansión por Hover)
- **Estado en reposo (mouse abajo):** Todo el menú y botones de acción se comprimen y ocultan suavemente hacia la derecha (`transform: translateX(45px)` y `opacity: 0`), quedando **únicamente visible el logotipo y nombre de la empresa** en la esquina superior izquierda dentro de una elegante cápsula de vidrio escarchado.
- **Estado desplegado (mouse en zona superior):** Al pasar el cursor por la parte superior de la pantalla o sobre el encabezado (área de `clientY <= 90px`), la barra se despliega suavemente mostrando todos los enlaces de navegación, el teléfono de WhatsApp y el botón *"Agendar Visita"*.
- **Espaciado y visibilidad total de insignias:** Se aumentó el margen superior de los paneles de contenido y titulares (`pt-36 xl:pt-40`), garantizando que la insignia superior de cada sección nunca quede tapada, ni siquiera cuando la barra superior se encuentra desplegada.

### 4. Experiencia Móvil Adaptada (< 1024px)
- **Barra de navegación:** Superior y translúcida, con menú desplegable responsive.
- **Portada de la sección:** Justo debajo de la barra de navegación, con la imagen de fondo y títulos de la sección activa posicionados elegantemente abajo a la izquierda.
- **Puntos Indicadores:** En la parte inferior de la portada figuran 5 puntos interactivos que señalan la sección activa.
- **Cambio de sección por deslizamiento horizontal (Swipe):** Deslizar la portada con el dedo hacia la izquierda o derecha transiciona de sección de manera instantánea.
- **Desglose de información:** Deslizando verticalmente hacia abajo se accede a todo el detalle y tarjetas de la sección actual sobre fondo blanco.

---

## 📁 Estructura de Archivos

```text
landing_page_B/
├── index.html                 # Estructura HTML responsive (Desktop Split + Mobile Slider)
├── assets/
│   ├── css/
│   │   └── custom.css         # Clases Split-Screen, animaciones y glassmorphism
│   ├── js/
│   │   └── main.js            # Lógica de rueda del mouse, gestos swipe, Web3Forms y sincronización
│   └── img/
│       ├── pexels-silverkblack-36714214.jpg   # Sección 01: Inicio
│       ├── analisis_mercado.webp              # Sección 02: Servicios & Contratos
│       ├── cliente_feliz.jpg                  # Sección 03: Reseñas de Google
│       ├── reunion.jpg                        # Sección 04: Cómo Trabajamos
│       └── images.jpeg                        # Sección 05: Contacto
└── README.md
```

---

## ⚙️ Guía de Personalización Rápida

1. **Web3Forms (Recepción de Correos):**
   - Regístrate gratis en [https://web3forms.com](https://web3forms.com) y copia tu `Access Key`.
   - En `landing_page_B/index.html`, busca:
     ```html
     <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
     ```
     (aparece en el formulario de desktop y en el de móvil). Reemplaza `YOUR_ACCESS_KEY_HERE` por tu clave.

2. **Teléfono, Email y WhatsApp:**
   - Teléfono / WhatsApp: Reemplaza `341 111 1111` y los links `https://wa.me/5493411111111` con el número del cliente.
   - Email: `agusmango195@gmail.com`.

3. **Nombre de la Empresa o Estudio:**
   - En `index.html` puedes cambiar **"Vanguardia Asesoría Comercial"** por la marca o estudio correspondiente.
