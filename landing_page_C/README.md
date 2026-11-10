# 📁 Landing Page C — Carpetas de Archivo sobre la Mesa de Trabajo

Esta versión **Landing Page C** representa la plataforma como un conjunto de **carpetas de archivo distribuidas sobre una mesa de madera de oficina**:

---

## 🎨 Características de Diseño & Experiencia de Usuario (UX)

### 1. Respeto al Fondo y Distribución en Zonas Limpias de la Madera
- **En PC (`mesa_PC_opt.jpg`):** Se respeta la esquina superior izquierda donde están fotografiados la taza de té y los papeles, ubicando las carpetas en el área despejada central y derecha de la mesa (`lg:pl-[24%]`).
- **En Móvil (`mesa_MOVIL_opt.jpg`):** Se respeta la esquina superior derecha donde está la notebook, ubicando el mazo de carpetas en el área central despejada.

### 2. PC: Distribución en 6 Cuadrantes (2 de Alto × 3 de Ancho) Anclados a la Mesa
- **Mesa anclada a 100vh sin scroll innecesario:** En resoluciones estándar de escritorio, todos los elementos se aprecian simultáneamente sobre la madera sin necesidad de desplazarse verticalmente.
- **Carpetas más grandes y formato cuadrado:** Cada carpeta adopta una proporción cuadrada (`aspect-ratio: 1.15 / 1`, `min-height: 285px` a `310px`, ancho hasta `460px`–`490px`) con distribución interna espaciosa (`p-6 xl:p-7`), otorgando la presencia física y peso visual de un archivador real apoyado en el escritorio.
- **Distribución por cuadrantes:**
  - **Cuadrante 1 (Arriba Izquierda):** Papel membretado blanco amplio con el logotipo y nombre de la empresa + Post-it adhesivo con enlace directo a WhatsApp.
  - **Cuadrante 2 (Arriba Medio):** Carpeta 01 (`01. INICIO`), con desplazamiento vertical hacia abajo (`pt-16 xl:pt-24`) para dejar completamente despejada la taza de té fotografiada en la parte superior.
  - **Cuadrante 3 (Arriba Derecha):** Carpeta 02 (`02. CONTRATOS`).
  - **Cuadrante 4 (Abajo Izquierda):** Carpeta 03 (`03. RESEÑAS`).
  - **Cuadrante 5 (Abajo Medio):** Carpeta 04 (`04. METODOLOGÍA`).
  - **Cuadrante 6 (Abajo Derecha):** Carpeta 05 (`05. CONTACTO`).
- **Desplazamiento automático en bordes (Edge Panning):** En caso de pantallas con resoluciones bajas o extrañas, o niveles altos de zoom donde el contenido desborde, la mesa se desplaza suavemente de forma automática al acercar el cursor a los bordes de la pantalla, sin barras de scroll invasivas.
- **Inclinaciones orgánicas:** Cada carpeta cuenta con rotación sutil (`.folder-scatter-0` a `.folder-scatter-4`) y animación de elevación al posar el mouse.

### 3. Móvil: Mazo de Carpetas Apiladas con Pase de Página por Deslizamiento (Swipe)
- En dispositivos móviles, las carpetas están apiladas una sobre otra en un mazo tridimensional.
- **Pase de página:** Deslizando el dedo hacia la izquierda o derecha (o usando las flechas `‹ ›` y los puntos indicadores), la carpeta superior se desapila volando hacia el costado (`stack-unstacked-left`) y trae al frente la siguiente carpeta (`stack-pos-0`).
- Tocar la carpeta frontal o el botón directo abre la sección.

### 4. Apertura de Carpetas con Animación y Botón de Cierre (X)
- Al hacer clic en cualquier carpeta, **salen los papeles y se levanta la sección** en el centro de la pantalla con una animación fluida (`dossierRise`).
- **Botón de Cierre (X):** Dispone de un botón visible `[ Volver a la mesa ✕ ]` en la parte superior derecha de los papeles. Al cliquearlo (o presionar la tecla `Escape`), la sección se cierra y los papeles regresan a su carpeta sobre la mesa.

### 5. Corrección de Contraste y Legibilidad en Opciones de Contratos
- Se corrigió específicamente el problema en el contrato **Análisis de negocio (Más Solicitado)**:
  - Cuenta con un fondo oscuro sólido (`#0f172a !important`) con títulos en blanco puro (`#ffffff`), citas en celeste claro (`#7dd3fc`) y viñetas nítidas (`#f1f5f9`), garantizando un contraste AAA sin solapamientos de color.
  - Los contratos *Análisis desde 0* y *Análisis de producto* mantienen tipografía oscura sobre fondo marfil/pergamino para una lectura descansada.

### 6. Índice de Secciones Translúcido en la Parte Inferior (Dock Bar)
- Fijado en la parte inferior de la pantalla:
  - Barra de cristal escarchado (`backdrop-blur-xl bg-slate-950/72 border border-white/20`).
  - Incluye acceso a **Mesa** (para ver todas las carpetas cerradas) y a cada una de las 5 carpetas (`01 Inicio`, `02 Contratos`, `03 Reseñas`, `04 Cómo Trabajamos`, `05 Contacto`).
  - Permite saltar de una carpeta a otra sin necesidad de cerrar y reabrir.

---

## 📁 Estructura de Archivos

```text
landing_page_C/
├── index.html                 # Estructura de carpetas sobre la mesa y secciones abiertas
├── assets/
├── assets/
│   ├── css/
│   │   └── custom.css         # Estilos Manila, mazo apilado móvil, dispersión PC y contraste
│   ├── js/
│   │   └── main.js            # Swipe móvil, desapilado, apertura/cierre de carpetas (X) y dock
│   └── img/
│       ├── mesa_PC_opt.jpg    # Fondo PC (taza y papeles arriba a la izquierda)
│       └── mesa_MOVIL_opt.jpg # Fondo Móvil (notebook arriba a la derecha)
└── README.md
```

---

## ⚙️ Personalización Rápida

- **Web3Forms:** Reemplazar `YOUR_ACCESS_KEY_HERE` en [index.html](file:///home/agusmango/Documentos/landing_pages/landing_page_C/index.html).
- **Teléfono y WhatsApp:** `341 111 1111` / `5493411111111`.
- **Email:** `ejemplo@mail.com`.
