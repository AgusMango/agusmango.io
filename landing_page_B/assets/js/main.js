/**
 * =========================================================================
 * LANDING PAGE B - SCRIPT PRINCIPAL
 * - Split-screen interactivo (izq: portada/titulares con imagen, der: desglose blanco)
 * - Transición con ruedita (wheel) entre secciones
 * - En móvil: portada fija arriba con swipe horizontal e indicadores de puntos
 * - Integración Web3Forms y sincronización de formularios
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const TOTAL_SECTIONS = 5;
  let currentIndex = 0;
  let isTransitioning = false;

  // Elementos DOM Desktop
  const leftSlides = document.querySelectorAll(".left-slide");
  const rightPanels = document.querySelectorAll(".right-panel");
  const verticalDots = document.querySelectorAll(".vertical-dot");
  const desktopCounterBadge = document.getElementById("desktop-counter-badge");
  const prevSlideBtn = document.getElementById("prev-slide-btn");
  const nextSlideBtn = document.getElementById("next-slide-btn");

  // Elementos DOM Móvil
  const mobileCoverSlides = document.querySelectorAll(".mobile-cover-slide");
  const mobileDots = document.querySelectorAll(".mobile-dot");
  const mobileContentBlocks = document.querySelectorAll(".mobile-content-block");
  const mobilePortadaWrapper = document.getElementById("mobile-portada-wrapper");

  // Navegación
  const navItems = document.querySelectorAll(".nav-item");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const allNavTriggers = document.querySelectorAll("[data-nav-target]");

  // Menú móvil
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  /**
   * Cambiar de sección de forma fluida
   */
  function goToSection(index, fromSwipe = false) {
    if (index < 0 || index >= TOTAL_SECTIONS) return;
    if (index === currentIndex && !fromSwipe) return;

    const previousIndex = currentIndex;
    currentIndex = index;
    isTransitioning = true;

    // 1. Actualizar Desktop Izquierda (Slides de imagen)
    leftSlides.forEach((slide, idx) => {
      slide.classList.remove("active");
      if (idx === currentIndex) {
        slide.classList.add("active");
      }
    });

    // 2. Actualizar Desktop Derecha (Paneles blancos)
    rightPanels.forEach((panel, idx) => {
      panel.classList.remove("active");
      if (idx === currentIndex) {
        panel.classList.add("active");
        panel.scrollTop = 0; // Iniciar lectura desde arriba
      }
    });

    // 3. Actualizar Indicadores Desktop
    if (desktopCounterBadge) {
      desktopCounterBadge.textContent = `0${currentIndex + 1} / 0${TOTAL_SECTIONS}`;
    }
    verticalDots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("bg-sky-400", "scale-125");
        dot.classList.remove("bg-white/40");
      } else {
        dot.classList.remove("bg-sky-400", "scale-125");
        dot.classList.add("bg-white/40");
      }
    });

    // 4. Actualizar Móvil Portada (Cover Slider)
    mobileCoverSlides.forEach((cover, idx) => {
      cover.classList.remove("active", "prev-slide");
      if (idx === currentIndex) {
        cover.classList.add("active");
      } else if (idx < currentIndex) {
        cover.classList.add("prev-slide");
      }
    });

    // 5. Actualizar Puntos de la Portada Móvil
    mobileDots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    // 6. Actualizar Contenido Móvil (Desglose Blanco)
    mobileContentBlocks.forEach((block, idx) => {
      if (idx === currentIndex) {
        block.classList.add("active");
      } else {
        block.classList.remove("active");
      }
    });

    // 7. Actualizar Navbar activo (Desktop y Móvil)
    navItems.forEach((btn, idx) => {
      if (idx === currentIndex) {
        btn.classList.add("bg-white/20", "text-white", "shadow-sm", "border", "border-white/20");
        btn.classList.remove("text-slate-200");
      } else {
        btn.classList.remove("bg-white/20", "text-white", "shadow-sm", "border", "border-white/20");
        btn.classList.add("text-slate-200");
      }
    });

    mobileNavItems.forEach((btn, idx) => {
      if (idx === currentIndex) {
        btn.classList.add("text-sky-400", "font-bold");
        btn.classList.remove("text-slate-200");
      } else {
        btn.classList.remove("text-sky-400", "font-bold");
        btn.classList.add("text-slate-200");
      }
    });

    // Liberar lock de transición
    setTimeout(() => {
      isTransitioning = false;
    }, 650);
  }

  // Inicializar estado activo de Navbar
  goToSection(0);

  // Manejo de clics en todos los elementos con data-nav-target
  allNavTriggers.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const targetIndex = parseInt(el.getAttribute("data-nav-target"), 10);
      if (!isNaN(targetIndex)) {
        goToSection(targetIndex);
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Botones flecha Desktop Prev / Next
  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      if (currentIndex > 0) goToSection(currentIndex - 1);
    });
  }
  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      if (currentIndex < TOTAL_SECTIONS - 1) goToSection(currentIndex + 1);
    });
  }

  /**
   * =========================================================================
   * DESPLIEGUE DEL NAVBAR EN PC AL PASAR EL MOUSE POR LA ZONA SUPERIOR
   * Comprime hacia la derecha dejando solo el logo y nombre cuando no está arriba
   * =========================================================================
   */
  const mainNavbar = document.getElementById("main-navbar");
  let navbarHoverTimeout = null;

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 1024 && mainNavbar) {
      // Si el mouse está en los 90px superiores de la pantalla
      if (e.clientY <= 90) {
        clearTimeout(navbarHoverTimeout);
        mainNavbar.classList.add("navbar-expanded");
      } else {
        // Al descender el mouse se comprime hacia la derecha
        navbarHoverTimeout = setTimeout(() => {
          mainNavbar.classList.remove("navbar-expanded");
        }, 120);
      }
    }
  });

  if (mainNavbar) {
    mainNavbar.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1024) {
        clearTimeout(navbarHoverTimeout);
        mainNavbar.classList.add("navbar-expanded");
      }
    });

    mainNavbar.addEventListener("mouseleave", (e) => {
      if (window.innerWidth >= 1024 && e.clientY > 90) {
        mainNavbar.classList.remove("navbar-expanded");
      }
    });
  }

  /**
   * =========================================================================
   * CONTROL CON LA RUEDITA DEL MOUSE (WHEEL TRANSITION) EN DESKTOP
   * =========================================================================
   */
  const splitScreen = document.getElementById("split-screen");

  function handleDesktopWheel(e) {
    if (window.innerWidth < 1024) return; // Solo en desktop
    if (isTransitioning) {
      e.preventDefault();
      return;
    }

    const activePanel = rightPanels[currentIndex];
    if (!activePanel) return;

    const delta = e.deltaY;
    const isAtBottom = (activePanel.scrollTop + activePanel.clientHeight >= activePanel.scrollHeight - 15);
    const isAtTop = (activePanel.scrollTop <= 15);
    const isScrollable = (activePanel.scrollHeight > activePanel.clientHeight + 10);

    // Bajar (Ruedita hacia abajo)
    if (delta > 20) {
      if (!isScrollable || isAtBottom) {
        if (currentIndex < TOTAL_SECTIONS - 1) {
          e.preventDefault();
          goToSection(currentIndex + 1);
        }
      }
    }
    // Subir (Ruedita hacia arriba)
    else if (delta < -20) {
      if (!isScrollable || isAtTop) {
        if (currentIndex > 0) {
          e.preventDefault();
          goToSection(currentIndex - 1);
        }
      }
    }
  }

  window.addEventListener("wheel", handleDesktopWheel, { passive: false });

  /**
   * Navegación con teclado (Flechas y PageUp/PageDown)
   */
  window.addEventListener("keydown", (e) => {
    // Si el usuario está escribiendo en un input o textarea, no interceptar
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;

    if (e.key === "ArrowDown" || e.key === "PageDown") {
      if (currentIndex < TOTAL_SECTIONS - 1) {
        e.preventDefault();
        goToSection(currentIndex + 1);
      }
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      if (currentIndex > 0) {
        e.preventDefault();
        goToSection(currentIndex - 1);
      }
    }
  });

  /**
   * =========================================================================
   * GESTOS TÁCTILES EN MÓVIL (HORIZONTAL SWIPE EN LA PORTADA)
   * =========================================================================
   */
  if (mobilePortadaWrapper) {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    mobilePortadaWrapper.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    mobilePortadaWrapper.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleMobileSwipe();
    }, { passive: true });

    function handleMobileSwipe() {
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const threshold = 40; // Mínimo recorrido para registrar swipe

      // Verificar que el movimiento haya sido predominantemente horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          // Desplazamiento a la izquierda -> siguiente sección
          if (currentIndex < TOTAL_SECTIONS - 1) {
            goToSection(currentIndex + 1, true);
          }
        } else {
          // Desplazamiento a la derecha -> sección anterior
          if (currentIndex > 0) {
            goToSection(currentIndex - 1, true);
          }
        }
      }
    }
  }

  // Clic en los puntos inferiores de la portada móvil
  mobileDots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSection(idx);
    });
  });

  // Toggle Menú Móvil
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  /**
   * =========================================================================
   * PRECARGA DEL PLAN SELECCIONADO EN FORMULARIOS DE CONTACTO
   * =========================================================================
   */
  const planButtons = document.querySelectorAll(".select-plan-btn");
  const desktopDesc = document.getElementById("desktop-form-description");
  const mobileDesc = document.getElementById("mobile-form-description");

  planButtons.forEach(button => {
    button.addEventListener("click", () => {
      const planName = button.getAttribute("data-plan-name") || "Asesoramiento General";
      const message = `Hola, me interesa solicitar el servicio de: ${planName}.\n\nDetalles de mi consulta:\n`;

      if (desktopDesc) desktopDesc.value = message;
      if (mobileDesc) mobileDesc.value = message;

      // Ir a la sección de Contacto (índice 4)
      goToSection(4);

      // Foco en el campo si es desktop
      setTimeout(() => {
        if (window.innerWidth >= 1024 && desktopDesc) {
          desktopDesc.focus();
        } else if (mobileDesc) {
          mobileDesc.scrollIntoView({ behavior: "smooth", block: "center" });
          mobileDesc.focus();
        }
      }, 700);
    });
  });

  /**
   * =========================================================================
   * ENVÍO ASÍNCRONO DE FORMULARIOS CON WEB3FORMS (DESKTOP & MÓVIL)
   * =========================================================================
   */
  function setupWeb3Form(formId, statusId, submitBtnId) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    const btn = document.getElementById(submitBtnId);

    if (!form || !status || !btn) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const originalBtnHTML = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Enviando solicitud...
      `;

      const formData = new FormData(form);
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
          status.className = "p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5";
          status.innerHTML = `
            <i class="fa-solid fa-circle-check text-emerald-600 mt-0.5 text-base flex-shrink-0"></i>
            <div>
              <p class="font-bold text-emerald-900">¡Mensaje enviado con éxito!</p>
              <p class="mt-0.5 text-emerald-700">Nos comunicaremos a la brevedad para coordinar la visita a tu negocio.</p>
            </div>
          `;
          form.reset();
        } else {
          throw new Error(result.message || "Error al procesar el envío.");
        }
      } catch (error) {
        status.className = "p-3.5 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2.5";
        status.innerHTML = `
          <i class="fa-solid fa-circle-exclamation text-amber-600 mt-0.5 text-base flex-shrink-0"></i>
          <div>
            <p class="font-bold text-amber-900">Nota de envío</p>
            <p class="mt-0.5 text-amber-700">${error.message || "Verifica tu clave de Web3Forms en index.html o contáctanos por WhatsApp."}</p>
          </div>
        `;
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalBtnHTML;
        status.classList.remove("hidden");
      }
    });
  }

  setupWeb3Form("desktop-contact-form", "desktop-form-status", "desktop-form-submit-btn");
  setupWeb3Form("mobile-contact-form", "mobile-form-status", "mobile-form-submit-btn");
});
