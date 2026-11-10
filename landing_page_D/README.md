# 📐 Landing Page D — Diseño Geométrico Suave & Moderno
### Vanguardia Asesores | Asesoría Comercial & Rentabilidad

Esta cuarta versión (**Landing Page D**) adopta una estética **geométrica moderna, suave y tecnológica**, manteniendo el concepto de navegación continua de la versión A pero con un lenguaje visual distintivo:

---

## 🎨 Características de Diseño & Innovaciones UX

### 1. Bordes que se Descomponen en Pequeños Triángulos (Low-Poly Tessellation Dividers)
- Las transiciones entre secciones no son líneas rectas convencionales: se implementaron divisores vectoriales donde el borde sólido se fragmenta gradualmente en una constelación de pequeños triángulos y polígonos con degradados y opacidades variables (`.triangle-divider`, `.tri-cluster`).
- Incluye micro-triángulos flotantes con animaciones sutiles (`.floating-geo-shape`, `anim-float-1`, `anim-float-2`) que generan dinamismo y profundidad visual sin sobrecargar el rendimiento.

### 2. Animación "Circle Burst" en el Paso a Paso (Metodología)
- En la sección **¿Cómo trabajamos?**:
  - En el lateral izquierdo (o superior en móviles) se ubica el **Portal Núcleo** (`#portal-circle-core`): un nodo circular concéntrico con anillos giratorios, resplandor de neón cian/índigo y pulsación rítmica.
  - **Efecto de lanzamiento la primera vez:** Mediante `IntersectionObserver`, en el momento exacto en que la sección entra en pantalla, las 4 tarjetas de fases (*01 Contacto Inicial*, *02 Coordinación de Visita*, *03 Diagnóstico y Propuesta*, *04 Ejecución y Resultados*) nacen y vuelan elásticamente desde el centro del círculo hacia sus posiciones en la cuadrícula (`flyOutFromCircle`).
  - **Rayos conectores SVG dinámicos:** Rayos luminosos interconectan el núcleo circular con cada tarjeta.
  - **Interacción al posar el cursor:** Al pasar el mouse por cualquier tarjeta, su rayo conector se ilumina intensamente con resplandor cian.

### 3. Tarjetas de Contratos Geométricas con Alto Contraste
- Tarjetas con cortes angulares facetados (`clip-path`).
- El plan más solicitado, **Análisis de negocio**, se presenta con un fondo nocturno profundo (`#0a0f1d`), borde de neón cian (`#38bdf8`), tipografía en blanco puro y badge facetado superior, garantizando una jerarquía visual destacada y contraste accesible.

### 4. Reseñas con Carrusel Auto-Rotativo en Móviles (1 de alto a la vez)
- **En Computadora / Desktop:** Grilla geométrica balanceada de tarjetas con badges hexagonales y calificación 4.9★ en Google.
- **En Teléfonos Móviles:** Ocupa estrictamente el alto de 1 sola reseña para evitar scroll vertical excesivo; rota automáticamente hacia la izquierda cada 4.5 segundos (trayendo la siguiente por la derecha), con soporte para swipe táctil, puntos indicadores y flechas de navegación.

### 5. Formulario Web3Forms & Canales Directos
- Al hacer clic en *"Elegir este contrato"* en cualquiera de los planes, la página se desplaza suavemente hasta el formulario y pre-carga el servicio seleccionado en el campo correspondiente.
- Envío asíncrono vía AJAX a Web3Forms con spinner animado y alertas geométricas de éxito o aviso.
- Botón flotante de WhatsApp con anillos concéntricos hexagonales (`.wa-pulse-hex`).

---

## 📁 Estructura de Archivos

```text
landing_page_D/
├── index.html                 # Estructura continua con divisores triangulares y portal geométrico
├── assets/
│   ├── css/
│   │   └── custom.css         # Animación Circle Burst, facetas, anillos giratorios y divisores
│   ├── js/
│   │   └── main.js            # Cálculo vectorial del burst, rayos SVG, IntersectionObserver y Web3Forms
│   └── img/
│       ├── pexels-silverkblack-36714214.jpg
│       ├── reunion.jpg
│       ├── analisis_mercado.webp
│       ├── cliente_feliz.jpg
│       └── images.jpeg
└── README.md
```

---

## ⚙️ Personalización Rápida

- **Web3Forms:** Reemplazar `YOUR_ACCESS_KEY_HERE` en [index.html](file:///home/agusmango/Documentos/landing_pages/landing_page_D/index.html).
- **Teléfono y WhatsApp:** `341 111 1111` / `5493411111111`.
- **Email:** `ejemplo@mail.com`.
