/**
 * =========================================================================
 * LANDING PAGE C - SCRIPT PRINCIPAL
 * Carpetas de archivo distribuidas sobre la mesa de trabajo
 * - Al cliquear una carpeta, salen los papeles y se levanta la sección
 * - Botón X para cerrar la sección abierta y volver a las carpetas en la mesa
 * - Índice de secciones translúcido inferior (Dock bar)
 * - Precarga de contratos en formulario de contacto
 * - Envío asíncrono con Web3Forms y alertas de estado
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const TOTAL_SECTIONS = 5;
  let activeSectionIndex = null;
  let currentMobileStackIndex = 0;
  let isAnimatingStack = false;

  // Elementos de la escena
  const folders = document.querySelectorAll(".file-folder");
  const openDossierStage = document.getElementById("open-dossier-stage");
  const closeDossierBtn = document.getElementById("close-dossier-btn");
  const openDossierLabel = document.getElementById("open-dossier-label");
  const sectionPanes = document.querySelectorAll(".dossier-section-pane");
  const dockTabs = document.querySelectorAll("[data-open-tab]");
  const dockDeskBtn = document.getElementById("dock-desk-btn");

  // Elementos del mazo móvil
  const mobileStack = document.getElementById("mobile-folder-stack");
  const mobileStackCards = document.querySelectorAll(".mobile-stack-card");
  const mobilePrevBtn = document.getElementById("mobile-prev-btn");
  const mobileNextBtn = document.getElementById("mobile-next-btn");
  const mobileOpenActiveBtn = document.getElementById("mobile-open-active-btn");
  const mobileOpenBtnText = document.getElementById("mobile-open-btn-text");
  const mobileDots = document.querySelectorAll(".mobile-stack-dot");

  const FOLDER_TITLES = [
    "01 — INICIO & RENTABILIDAD",
    "02 — SERVICIOS & CONTRATOS",
    "03 — RESEÑAS DE GOOGLE (4.9★)",
    "04 — CÓMO TRABAJAMOS (PASO A PASO)",
    "05 — CONTACTO & VISITA"
  ];

  /**
   * Actualizar estado visual de los puntos y botón en el mazo móvil
   */
  function updateMobileStackUI() {
    mobileDots.forEach((dot, idx) => {
      if (idx === currentMobileStackIndex) {
        dot.className = "mobile-stack-dot w-6 h-2 rounded-full bg-amber-400 transition-all shadow-sm";
      } else {
        dot.className = "mobile-stack-dot w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-all cursor-pointer";
      }
    });

    if (mobileOpenBtnText && FOLDER_TITLES[currentMobileStackIndex]) {
      mobileOpenBtnText.textContent = `Abrir: ${FOLDER_TITLES[currentMobileStackIndex]}`;
    }
  }

  /**
   * Posicionar el mazo móvil directamente en un índice
   */
  function setStackToIndex(targetIndex) {
    if (targetIndex < 0 || targetIndex >= TOTAL_SECTIONS) return;
    currentMobileStackIndex = targetIndex;
    mobileStackCards.forEach((card, idx) => {
      const rel = (idx - currentMobileStackIndex + TOTAL_SECTIONS) % TOTAL_SECTIONS;
      card.classList.remove(
        "stack-pos-0", "stack-pos-1", "stack-pos-2", "stack-pos-3", "stack-pos-4",
        "stack-unstacked-left", "stack-unstacked-right"
      );
      card.classList.add(`stack-pos-${rel}`);
    });
    updateMobileStackUI();
  }

  /**
   * Desapilar y pasar a la siguiente carpeta (gesto hacia la izquierda / Next)
   */
  function passNextFolder() {
    if (isAnimatingStack) return;
    isAnimatingStack = true;

    const topCard = mobileStackCards[currentMobileStackIndex];

    // La carpeta superior vuela hacia el costado izquierdo desapilándose
    if (topCard) {
      topCard.classList.remove("stack-pos-0", "stack-pos-1", "stack-pos-2", "stack-pos-3", "stack-pos-4");
      topCard.classList.add("stack-unstacked-left");
    }

    const prevActiveIndex = currentMobileStackIndex;
    currentMobileStackIndex = (currentMobileStackIndex + 1) % TOTAL_SECTIONS;

    // Reposicionar el resto de las carpetas que suben en la pila
    mobileStackCards.forEach((card, idx) => {
      if (idx !== prevActiveIndex) {
        const rel = (idx - currentMobileStackIndex + TOTAL_SECTIONS) % TOTAL_SECTIONS;
        card.classList.remove(
          "stack-pos-0", "stack-pos-1", "stack-pos-2", "stack-pos-3", "stack-pos-4",
          "stack-unstacked-left", "stack-unstacked-right"
        );
        card.classList.add(`stack-pos-${rel}`);
      }
    });

    updateMobileStackUI();

    // Luego de la animación de salida, colocar la carpeta al fondo de la pila
    setTimeout(() => {
      if (topCard) {
        topCard.classList.remove("stack-unstacked-left");
        const rel = (prevActiveIndex - currentMobileStackIndex + TOTAL_SECTIONS) % TOTAL_SECTIONS;
        topCard.classList.add(`stack-pos-${rel}`);
      }
      isAnimatingStack = false;
    }, 420);
  }

  /**
   * Pasar a la carpeta anterior (gesto hacia la derecha / Prev)
   */
  function passPrevFolder() {
    if (isAnimatingStack) return;
    isAnimatingStack = true;

    const prevIndex = (currentMobileStackIndex - 1 + TOTAL_SECTIONS) % TOTAL_SECTIONS;
    const incomingCard = mobileStackCards[prevIndex];

    // La carpeta que viene entra desde el costado
    if (incomingCard) {
      incomingCard.classList.remove(
        "stack-pos-0", "stack-pos-1", "stack-pos-2", "stack-pos-3", "stack-pos-4",
        "stack-unstacked-right"
      );
      incomingCard.classList.add("stack-unstacked-left");
    }

    currentMobileStackIndex = prevIndex;

    setTimeout(() => {
      mobileStackCards.forEach((card, idx) => {
        const rel = (idx - currentMobileStackIndex + TOTAL_SECTIONS) % TOTAL_SECTIONS;
        card.classList.remove(
          "stack-pos-0", "stack-pos-1", "stack-pos-2", "stack-pos-3", "stack-pos-4",
          "stack-unstacked-left", "stack-unstacked-right"
        );
        card.classList.add(`stack-pos-${rel}`);
      });
      updateMobileStackUI();
      isAnimatingStack = false;
    }, 60);
  }

  /**
   * Abrir una carpeta y levantar sus papeles
   */
  function openSection(index) {
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    activeSectionIndex = index;

    // Alinear la pila móvil con la sección elegida
    setStackToIndex(index);

    // 1. Mostrar la ventana / escenario de papeles levantados
    if (openDossierStage) {
      openDossierStage.classList.add("is-open");
      openDossierStage.scrollTop = 0;
    }

    // 2. Mostrar únicamente el panel de la sección seleccionada
    sectionPanes.forEach((pane, idx) => {
      if (idx === index) {
        pane.classList.remove("hidden");
      } else {
        pane.classList.add("hidden");
      }
    });

    // 3. Actualizar etiqueta del encabezado
    if (openDossierLabel && FOLDER_TITLES[index]) {
      openDossierLabel.textContent = FOLDER_TITLES[index];
    }

    // 4. Actualizar estado en el dock inferior
    if (dockDeskBtn) dockDeskBtn.classList.remove("active");
    dockTabs.forEach((tab, idx) => {
      if (idx === index) {
        tab.classList.add("active");
        tab.classList.remove("text-slate-200");
      } else {
        tab.classList.remove("active");
        tab.classList.add("text-slate-200");
      }
    });
  }

  /**
   * Cerrar la sección abierta y volver a las carpetas en la mesa
   */
  function closeSection() {
    activeSectionIndex = null;

    if (openDossierStage) {
      openDossierStage.classList.remove("is-open");
    }

    sectionPanes.forEach(pane => pane.classList.add("hidden"));

    // Activar pestaña "Mesa" en el dock inferior
    if (dockDeskBtn) dockDeskBtn.classList.add("active");
    dockTabs.forEach(tab => {
      tab.classList.remove("active");
      tab.classList.add("text-slate-200");
    });
  }

  // 1. Clic en las carpetas de archivo de PC y móvil
  folders.forEach(folder => {
    folder.addEventListener("click", () => {
      const index = parseInt(folder.getAttribute("data-folder-index"), 10);
      if (!isNaN(index)) {
        openSection(index);
      }
    });

    // Accesibilidad por teclado (Enter / Space)
    folder.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const index = parseInt(folder.getAttribute("data-folder-index"), 10);
        if (!isNaN(index)) {
          openSection(index);
        }
      }
    });
  });

  // 2. Controles de navegación del mazo en Móvil
  if (mobilePrevBtn) {
    mobilePrevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      passPrevFolder();
    });
  }

  if (mobileNextBtn) {
    mobileNextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      passNextFolder();
    });
  }

  if (mobileOpenActiveBtn) {
    mobileOpenActiveBtn.addEventListener("click", () => {
      openSection(currentMobileStackIndex);
    });
  }

  mobileDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      setStackToIndex(idx);
    });
  });

  // 3. Gestos táctiles de deslizamiento (Swipe) en móvil para pasar de página desapilando
  if (mobileStack) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    mobileStack.addEventListener("touchstart", (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
      }
    }, { passive: true });

    mobileStack.addEventListener("touchend", (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > 40 && absDeltaX > absDeltaY) {
          if (deltaX < 0) {
            passNextFolder();
          } else {
            passPrevFolder();
          }
        }
      }
    }, { passive: true });

    // Soporte para arrastre con mouse (útil para pruebas en desktop)
    let isMouseDown = false;
    let mouseStartX = 0;

    mobileStack.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      mouseStartX = e.clientX;
    });

    window.addEventListener("mouseup", (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const deltaX = e.clientX - mouseStartX;
      if (deltaX < -45) {
        passNextFolder();
      } else if (deltaX > 45) {
        passPrevFolder();
      }
    });
  }

  // 4. Botón X para cerrar la sección abierta
  if (closeDossierBtn) {
    closeDossierBtn.addEventListener("click", closeSection);
  }

  // Cerrar al hacer clic en el fondo oscuro fuera del papel
  if (openDossierStage) {
    openDossierStage.addEventListener("click", (e) => {
      if (e.target === openDossierStage) {
        closeSection();
      }
    });
  }

  // 5. Clic en el botón "Mesa" del dock inferior
  if (dockDeskBtn) {
    dockDeskBtn.addEventListener("click", closeSection);
  }

  // 6. Clic en las pestañas numéricas del dock inferior
  dockTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const index = parseInt(tab.getAttribute("data-open-tab"), 10);
      if (!isNaN(index)) {
        openSection(index);
      }
    });
  });

  // 7. Botones internos de navegación entre secciones (ej: "Ver Tipos de Contrato")
  document.querySelectorAll("[data-open-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-open-tab"), 10);
      if (!isNaN(index)) {
        openSection(index);
      }
    });
  });

  // 8. Atajos de teclado (Escape para cerrar, flechas para cambiar)
  window.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

    if (e.key === "Escape") {
      closeSection();
    } else if (e.key === "ArrowRight") {
      if (activeSectionIndex !== null && activeSectionIndex < TOTAL_SECTIONS - 1) {
        openSection(activeSectionIndex + 1);
      } else if (activeSectionIndex === null) {
        passNextFolder();
      }
    } else if (e.key === "ArrowLeft") {
      if (activeSectionIndex !== null && activeSectionIndex > 0) {
        openSection(activeSectionIndex - 1);
      } else if (activeSectionIndex === null) {
        passPrevFolder();
      }
    }
  });

  // Inicializar UI del mazo móvil
  updateMobileStackUI();

  /**
   * =========================================================================
   * DESPLAZAMIENTO AUTOMÁTICO EN BORDES (EDGE PANNING) EN PC
   * Para resoluciones bajas, pantallas extrañas o zoom:
   * Al acercar el mouse a los bordes de la pantalla, la mesa se desplaza
   * suave y automáticamente sin necesidad de barras de desplazamiento.
   * =========================================================================
   */
  function initDesktopEdgePanning() {
    const viewport = document.getElementById("desktop-desk-viewport");
    if (!viewport) return;

    const EDGE_ZONE = 75; // Distancia en px al borde para activar el desplazamiento
    const MAX_SPEED = 14; // Velocidad de desplazamiento en px por frame
    let panX = 0;
    let panY = 0;
    let animFrame = null;

    function step() {
      if (panX !== 0 || panY !== 0) {
        viewport.scrollLeft += panX;
        viewport.scrollTop += panY;
        animFrame = requestAnimationFrame(step);
      } else {
        animFrame = null;
      }
    }

    window.addEventListener("mousemove", (e) => {
      // Activo únicamente en pantallas grandes (PC) y cuando la sección de documentos no está abierta
      if (window.innerWidth < 1024 || (openDossierStage && openDossierStage.classList.contains("is-open"))) {
        panX = 0;
        panY = 0;
        return;
      }

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const winW = window.innerWidth;
      const winH = window.innerHeight;

      const canScrollY = viewport.scrollHeight > viewport.clientHeight + 4;
      const canScrollX = viewport.scrollWidth > viewport.clientWidth + 4;

      let targetX = 0;
      let targetY = 0;

      if (canScrollY) {
        if (mouseY < EDGE_ZONE) {
          const ratio = (EDGE_ZONE - mouseY) / EDGE_ZONE;
          targetY = -Math.round(MAX_SPEED * ratio);
        } else if (mouseY > winH - EDGE_ZONE) {
          const ratio = (mouseY - (winH - EDGE_ZONE)) / EDGE_ZONE;
          targetY = Math.round(MAX_SPEED * ratio);
        }
      }

      if (canScrollX) {
        if (mouseX < EDGE_ZONE) {
          const ratio = (EDGE_ZONE - mouseX) / EDGE_ZONE;
          targetX = -Math.round(MAX_SPEED * ratio);
        } else if (mouseX > winW - EDGE_ZONE) {
          const ratio = (mouseX - (winW - EDGE_ZONE)) / EDGE_ZONE;
          targetX = Math.round(MAX_SPEED * ratio);
        }
      }

      panX = targetX;
      panY = targetY;

      if ((panX !== 0 || panY !== 0) && !animFrame) {
        animFrame = requestAnimationFrame(step);
      }
    });

    window.addEventListener("mouseleave", () => {
      panX = 0;
      panY = 0;
    });
  }

  initDesktopEdgePanning();

  /**
   * =========================================================================
   * PRECARGA DEL CONTRATO SELECCIONADO EN EL FORMULARIO
   * =========================================================================
   */
  const planButtons = document.querySelectorAll(".select-plan-btn");
  const formDescription = document.getElementById("desk-form-description");

  planButtons.forEach(button => {
    button.addEventListener("click", () => {
      const planName = button.getAttribute("data-plan-name") || "Asesoramiento Comercial";
      const message = `Hola, me interesa solicitar el servicio de: ${planName}.\n\nDetalles de mi consulta:\n`;

      if (formDescription) {
        formDescription.value = message;
      }

      // Abrir la carpeta de Contacto (índice 4)
      openSection(4);

      setTimeout(() => {
        if (formDescription) {
          formDescription.focus();
        }
      }, 500);
    });
  });

  /**
   * =========================================================================
   * ENVÍO ASÍNCRONO DEL FORMULARIO CON WEB3FORMS
   * =========================================================================
   */
  const contactForm = document.getElementById("desk-contact-form");
  const formStatus = document.getElementById("desk-form-status");
  const submitBtn = document.getElementById("desk-form-submit-btn");

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Registrando solicitud en mesa de entrada...
      `;

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
        });

        const result = await response.json();

        if (response.status === 200) {
          formStatus.className = "p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 shadow-sm";
          formStatus.innerHTML = `
            <i class="fa-solid fa-circle-check text-emerald-600 text-base mt-0.5 flex-shrink-0"></i>
            <div>
              <p class="font-bold text-sm">¡Documento recibido con éxito!</p>
              <p class="mt-0.5 text-emerald-800">Nos comunicaremos a la brevedad para coordinar la visita a tu negocio.</p>
            </div>
          `;
          contactForm.reset();
        } else {
          throw new Error(result.message || "Error al procesar el envío.");
        }
      } catch (error) {
        formStatus.className = "p-4 mb-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-sm";
        formStatus.innerHTML = `
          <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base mt-0.5 flex-shrink-0"></i>
          <div>
            <p class="font-bold text-sm">Nota de envío</p>
            <p class="mt-0.5 text-amber-800">${error.message || "Verifica tu Access Key de Web3Forms o comunícate directamente por WhatsApp."}</p>
          </div>
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        formStatus.classList.remove("hidden");
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
});
