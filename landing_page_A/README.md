# 🚀 Landing Page Profesional para Asesoría Comercial & Negocios

Landing page moderna, responsiva y altamente personalizable diseñada para asesores comerciales, consultores y profesionales de negocios.

## 📁 Estructura del Proyecto

```text
landing_page/
├── index.html                 # Estructura principal de la web y contenido editable
├── assets/
│   ├── css/
│   │   └── custom.css         # Estilos personalizados, animaciones y efecto de recorte de muro
│   ├── js/
│   │   └── main.js            # Lógica interactiva, envío Web3Forms y config rápida
│   └── img/
│       ├── pexels-silverkblack-36714214.jpg   # Imagen de fondo para el Hero inicial
│       └── images.jpeg                        # Imagen visible a través del "hueco del muro blanco"
└── README.md                  # Guía de edición y personalización
```

---

## 🎨 Secciones Incluidas

1. **Barra Superior (Navbar Sticky):** Navegación fluida entre secciones con efecto de desenfoque de cristal (glassmorphism) y botón directo para agendar visita.
2. **Hero (Portada Principal):** Imagen de fondo en alta resolución (`pexels-silverkblack-36714214.jpg`), degradado oscuro para legibilidad óptima, titular *"Haciendo rentable tu idea o negocio"*, botones de llamada a la acción e indicadores de métricas.
3. **Servicios & Contratos:** Fondo blanco puro con 3 tarjetas detalladas:
   - *Análisis desde 0* (“Tenés una idea y querés llevarla a cabo de forma rentable”)
   - *Análisis de negocio* (“Seguimiento de mercado y asesoramiento para mejorar la rentabilidad de tu emprendimiento”)
   - *Análisis de producto* (“Asesoramiento para lanzar un nuevo producto al mercado”)
   Al hacer clic en "Elegir este contrato", el formulario inferior se auto-completa con el servicio seleccionado y se desplaza suavemente hasta allí.
4. **"Hueco en el muro blanco" (Architectural Parallax Window):** Brecha arquitectónica entre las secciones blancas que deja al descubierto la segunda imagen de fondo (`images.jpeg`) con efecto parallax fijo y una cita de impacto.
5. **Reseñas de Google (Con Carrusel Móvil Inteligente):**
   - **En Computadora / Desktop:** Grilla completa idéntica a Google Reviews con insignia de calificación 4.9/5, insignias de Local Guide, estrellas doradas y 6 testimonios visibles simultáneamente.
   - **En Móviles:** Muestra estrictamente 1 reseña de alto a la vez, rotando automáticamente hacia la izquierda cada 4.5 segundos para evitar el desplazamiento vertical excesivo. Incluye soporte para gestos táctiles (swipe), puntos de paginación y flechas prev/next.
6. **¿Cómo trabajamos?:** Sección con el paso a paso claro (4 etapas) y la frase: *"Contactanos por WhatsApp o rellená el formulario de contacto y coordinamos una visita"*.
7. **Contacto & Formulario Web3Forms:**
   - Teléfono: `341 111 1111`
   - Email: `agusmango195@gmail.com`
   - Formulario completo con: *Nombre y Apellido*, *Rubro del negocio*, *Tamaño del negocio* y *Descripción*.
   - Integración asíncrona con Web3Forms (con spinner de carga, alerta de éxito y honeypot anti-spam).
8. **Botón Flotante de WhatsApp:** Con animación de pulso permanente para contacto rápido.

---

## ⚙️ ¿Cómo personalizar la información para otro cliente?

### 1. Configurar Web3Forms (Para recibir los correos)
1. Entra a [https://web3forms.com](https://web3forms.com) (es gratuito).
2. Ingresa el email donde tu cliente quiere recibir los mensajes y copia la `Access Key` que te entregan.
3. Abre [index.html](file:///home/agusmango/Documentos/landing_page/index.html) y busca la línea:
   ```html
   <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
   ```
   Reemplaza `YOUR_ACCESS_KEY_HERE` por tu clave. ¡Listo! Los envíos llegarán directamente al email configurado.

### 2. Cambiar Teléfono, Email y WhatsApp
Abre [index.html](file:///home/agusmango/Documentos/landing_page/index.html) y busca los textos `341 111 1111` y `ejemplo@mail.com` para reemplazarlos por los datos de tu cliente.

También puedes ajustar el número de WhatsApp en los enlaces `https://wa.me/5493411111111` cambiando `5493411111111` por el número de tu cliente (código de país + código de área sin el 15 + número).

### 3. Cambiar el Nombre o Rubro del Profesional
En [index.html](file:///home/agusmango/Documentos/landing_page/index.html), en la sección del Navbar (línea ~40) y en el Hero (línea ~120), puedes cambiar **"Vanguardia Asesoría Comercial"** por cualquier otro profesional o estudio (ej: *"Estudio Jurídico Martínez"*, *"Contadores & Asociados"*, etc.).

### 4. Cambiar las imágenes de fondo
- Para la portada inicial: reemplaza el archivo en `assets/img/pexels-silverkblack-36714214.jpg` o cambia la ruta en la línea ~110 de [index.html](file:///home/agusmango/Documentos/landing_page/index.html).
- Para el "hueco" del muro blanco: reemplaza el archivo en `assets/img/images.jpeg` o cambia el estilo en línea ~250 de [index.html](file:///home/agusmango/Documentos/landing_page/index.html).
