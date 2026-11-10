/**
 * =========================================================================
 * LANDING PAGE D - JAVASCRIPT PRINCIPAL
 * Vanguardia Asesores | Asesoría Comercial & Rentabilidad
 * - Animación "Circle Burst": tarjetas de metodología emergen de un portal circular
 * - Rayos SVG dinámicos conectando el núcleo a cada paso
 * - Navegación suave, navbar interactivo y menú móvil
 * - Precarga de contratos seleccionados en el formulario
 * - Envío asíncrono con Web3Forms
 * =========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar: scroll elevation y menú móvil
  initNavbar();

  // 2. Animación "Circle Burst" para el paso a paso
  initCircleBurstWorkflow();

  // 3. Carrusel móvil de reseñas (1 a la vez rotando a la izquierda)
  initMobileReviewsSliderD();

  // 4. Precarga de planes en formulario
  initPlanSelection();

  // 5. Envío asíncrono de formulario Web3Forms
  initContactForm();

  // 6. Interactividad en rayos conectores del portal
  initPortalRayHover();
});

/**
 * =========================================================================
 * 1. NAVBAR & MENÚ MÓVIL
 * =========================================================================
 */
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Elevación al hacer scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("bg-white/95", "shadow-md", "shadow-slate-900/5", "border-slate-200");
      navbar.classList.remove("bg-white/80", "border-slate-100");
    } else {
      navbar.classList.remove("bg-white/95", "shadow-md", "shadow-slate-900/5", "border-slate-200");
      navbar.classList.add("bg-white/80", "border-slate-100");
    }
  });

  // Toggle menú móvil
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

/**
 * =========================================================================
 * 2. ANIMACIÓN "CIRCLE BURST" (PASO A PASO)
 * Las 4 tarjetas de fases emergen del portal circular con cálculo vectorial
 * =========================================================================
 */
function initCircleBurstWorkflow() {
  const section = document.getElementById("como-trabajamos");
  const portalCircle = document.getElementById("portal-circle-core");
  const cardsCluster = document.getElementById("step-cards-cluster");
  const cards = document.querySelectorAll(".step-burst-card");
  const replayBtn = document.getElementById("replay-burst-btn");
  const svgConnector = document.getElementById("portal-connector-svg");

  if (!section || !portalCircle || !cardsCluster || cards.length === 0) return;

  let hasExecutedOnce = false;

  /**
   * Calcula las coordenadas de origen para que cada tarjeta vuele
   * exactamente desde el centro del portal circular
   */
  function calculateBurstOrigins() {
    const circleRect = portalCircle.getBoundingClientRect();
    const circleCenter = {
      x: circleRect.left + circleRect.width / 2,
      y: circleRect.top + circleRect.height / 2
    };

    cards.forEach(card => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = {
        x: cardRect.left + cardRect.width / 2,
        y: cardRect.top + cardRect.height / 2
      };

      // Vector desde la tarjeta hacia el centro del círculo
      const deltaX = circleCenter.x - cardCenter.x;
      const deltaY = circleCenter.y - cardCenter.y;

      card.style.setProperty("--burst-origin-x", `${Math.round(deltaX)}px`);
      card.style.setProperty("--burst-origin-y", `${Math.round(deltaY)}px`);
    });

    drawConnectingRays();
  }

  /**
   * Dibuja los rayos de luz conectores SVG entre el círculo y cada tarjeta
   */
  function drawConnectingRays() {
    if (!svgConnector) return;

    const clusterRect = cardsCluster.getBoundingClientRect();
    const circleRect = portalCircle.getBoundingClientRect();

    // Centro del círculo relativo al contenedor del SVG
    const circleX = circleRect.left + circleRect.width / 2 - clusterRect.left;
    const circleY = circleRect.top + circleRect.height / 2 - clusterRect.top;

    let svgPaths = "";

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      // Punto de anclaje de la tarjeta
      const cardX = (cardRect.left < circleRect.left ? cardRect.right : cardRect.left) - clusterRect.left;
      const cardY = cardRect.top + cardRect.height / 2 - clusterRect.top;

      // Línea con curva suave
      const midX = (circleX + cardX) / 2;
      const pathD = `M ${circleX} ${circleY} Q ${midX} ${circleY} ${cardX} ${cardY}`;

      svgPaths += `
        <path id="ray-line-${index}" class="step-ray-path transition-all duration-300" 
              d="${pathD}" 
              stroke="url(#rayGradient)" 
              stroke-width="1.8" 
              fill="none" 
              opacity="0.45" />
      `;
    });

    // Mantener los defs del gradiente e inyectar paths
    const defs = `
      <defs>
        <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8" />
          <stop offset="50%" stop-color="#6366f1" stop-opacity="0.6" />
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0.2" />
        </linearGradient>
      </defs>
    `;

    svgConnector.innerHTML = defs + svgPaths;
  }

  /**
   * Ejecuta la animación de salida
   */
  function triggerBurst() {
    calculateBurstOrigins();

    // Reinicia clases si es necesario
    cardsCluster.classList.remove("burst-executed");
    void cardsCluster.offsetWidth; // Forzar reflow

    // Activa la animación
    cardsCluster.classList.add("burst-executed");

    // Efecto de pulso en el círculo
    portalCircle.classList.add("scale-110", "shadow-[0_0_80px_rgba(34,211,238,0.7)]");
    setTimeout(() => {
      portalCircle.classList.remove("scale-110", "shadow-[0_0_80px_rgba(34,211,238,0.7)]");
    }, 600);
  }

  // IntersectionObserver: dispara la animación la primera vez que se visualiza
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasExecutedOnce) {
        hasExecutedOnce = true;
        setTimeout(triggerBurst, 250);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(section);

  // Recalcular en cambio de tamaño de ventana
  window.addEventListener("resize", () => {
    if (cardsCluster.classList.contains("burst-executed")) {
      calculateBurstOrigins();
    }
  });
}

/**
 * =========================================================================
 * 3. CARRUSEL MÓVIL DE RESEÑAS
 * Muestra 1 reseña de alto a la vez, rotando automáticamente cada unos segundos
 * hacia la izquierda (la actual sale a la izquierda, la nueva entra por la derecha)
 * =========================================================================
 */
function initMobileReviewsSliderD() {
  const track = document.getElementById("mobile-reviews-track-d");
  const slides = document.querySelectorAll("#mobile-reviews-track-d .mobile-review-slide");
  const dots = document.querySelectorAll(".mobile-review-dot-d");
  const prevBtn = document.getElementById("prev-review-btn-d");
  const nextBtn = document.getElementById("next-review-btn-d");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoTimer = null;
  const INTERVAL_MS = 4500;
  let isTransitioning = false;

  function updateDots(idx) {
    dots.forEach((dot, i) => {
      if (i === idx) {
        dot.className = "mobile-review-dot-d w-6 h-2 rounded-full bg-indigo-600 transition-all";
      } else {
        dot.className = "mobile-review-dot-d w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all";
      }
    });
  }

  function goToSlide(nextIndex, direction = "next") {
    if (isTransitioning || nextIndex === currentIndex) return;
    isTransitioning = true;

    const currentSlide = slides[currentIndex];
    const targetSlide = slides[nextIndex];

    // Preparar tarjeta que sale
    currentSlide.classList.remove("is-active", "is-entering-right", "is-entering-left");
    if (direction === "next") {
      currentSlide.classList.add("is-exiting-left");
    } else {
      currentSlide.classList.add("is-exiting-right");
    }

    // Preparar tarjeta que entra
    targetSlide.classList.remove("is-exiting-left", "is-exiting-right", "is-entering-right", "is-entering-left");
    if (direction === "next") {
      targetSlide.classList.add("is-entering-right");
    } else {
      targetSlide.classList.add("is-entering-left");
    }

    // Forzar reflow para aplicar posición inicial
    void targetSlide.offsetWidth;

    // Transicionar al estado activo
    targetSlide.classList.remove("is-entering-right", "is-entering-left");
    targetSlide.classList.add("is-active");

    currentIndex = nextIndex;
    updateDots(currentIndex);

    setTimeout(() => {
      currentSlide.classList.remove("is-exiting-left", "is-exiting-right");
      isTransitioning = false;
    }, 650);
  }

  function nextSlide() {
    const nextIdx = (currentIndex + 1) % total;
    goToSlide(nextIdx, "next");
  }

  function prevSlide() {
    const prevIdx = (currentIndex - 1 + total) % total;
    goToSlide(prevIdx, "prev");
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoTimer = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoPlay() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  // Controles botones
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoPlay();
    });
  }

  // Controles dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      const dir = i > currentIndex ? "next" : "prev";
      goToSlide(i, dir);
      startAutoPlay();
    });
  });

  // Pausar en interacción táctil o mouse
  track.addEventListener("mouseenter", stopAutoPlay);
  track.addEventListener("mouseleave", startAutoPlay);

  // Soporte para gestos táctiles (Swipe)
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    stopAutoPlay();
    if (e.touches && e.touches[0]) {
      touchStartX = e.touches[0].clientX;
    }
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (deltaX < -40) {
        nextSlide();
      } else if (deltaX > 40) {
        prevSlide();
      }
    }
    startAutoPlay();
  }, { passive: true });

  startAutoPlay();
}

/**
 * =========================================================================
 * 4. INTERACCIÓN DE RAYOS AL PASAR EL MOUSE POR LAS TARJETAS
 * =========================================================================
 */
function initPortalRayHover() {
  const cards = document.querySelectorAll(".step-burst-card");

  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      const ray = document.getElementById(`ray-line-${index}`);
      if (ray) {
        ray.setAttribute("stroke-width", "3.5");
        ray.setAttribute("opacity", "1");
        ray.style.filter = "drop-shadow(0 0 8px #22d3ee)";
      }
    });

    card.addEventListener("mouseleave", () => {
      const ray = document.getElementById(`ray-line-${index}`);
      if (ray) {
        ray.setAttribute("stroke-width", "1.8");
        ray.setAttribute("opacity", "0.45");
        ray.style.filter = "none";
      }
    });
  });
}

/**
 * =========================================================================
 * 4. PRECARGA DEL CONTRATO SELECCIONADO EN EL FORMULARIO
 * =========================================================================
 */
function initPlanSelection() {
  const planButtons = document.querySelectorAll(".select-plan-btn");
  const formDescription = document.getElementById("form-descripcion");
  const formPlanSelect = document.getElementById("form-plan-select");

  planButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const planName = btn.getAttribute("data-plan-name") || "Asesoramiento General";

      if (formPlanSelect) {
        formPlanSelect.value = planName;
      }

      if (formDescription) {
        formDescription.value = `Hola, me interesa contratar el servicio de: ${planName}.\n\nDetalles de mi negocio y consulta:\n`;
      }

      // Desplazamiento fluido hacia el formulario
      const contactSection = document.getElementById("contacto");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          if (formDescription) formDescription.focus();
        }, 600);
      }
    });
  });
}

/**
 * =========================================================================
 * 5. ENVÍO ASÍNCRONO DEL FORMULARIO CON WEB3FORMS
 * =========================================================================
 */
function initContactForm() {
  const form = document.getElementById("contact-form-geo");
  const statusDiv = document.getElementById("form-status-msg");
  const submitBtn = document.getElementById("form-submit-btn");

  if (!form || !statusDiv || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      Enviando solicitud geométrica...
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
        statusDiv.className = "p-4 mb-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 shadow-sm";
        statusDiv.innerHTML = `
          <i class="fa-solid fa-circle-check text-emerald-600 text-base mt-0.5 flex-shrink-0"></i>
          <div>
            <p class="font-bold text-sm">¡Mensaje enviado con éxito!</p>
            <p class="mt-0.5 text-emerald-800">Nos comunicaremos a la brevedad para coordinar la visita presencial a tu negocio.</p>
          </div>
        `;
        form.reset();
      } else {
        throw new Error(result.message || "Error al procesar el envío.");
      }
    } catch (error) {
      statusDiv.className = "p-4 mb-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-3 shadow-sm";
      statusDiv.innerHTML = `
        <i class="fa-solid fa-triangle-exclamation text-amber-600 text-base mt-0.5 flex-shrink-0"></i>
        <div>
          <p class="font-bold text-sm">Aviso de envío</p>
          <p class="mt-0.5 text-amber-800">${error.message || "Verifica tu Access Key de Web3Forms o comunícate directamente por WhatsApp."}</p>
        </div>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      statusDiv.classList.remove("hidden");
      statusDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}
