/**
 * =========================================================================
 * CONFIGURACIÓN RÁPIDA - EDITABLE PARA DISTINTOS CLIENTES
 * Puedes modificar estos valores para adaptar la landing a cualquier cliente
 * =========================================================================
 */
const CONFIG = {
  studioName: "Vanguardia Comercial",
  phoneDisplay: "341 111 1111",
  phoneRaw: "5493411111111", // Formato internacional para WhatsApp (código país + código área + número)
  email: "agusmango195@gmail.com",
  address: "Rosario, Santa Fe, Argentina",
  whatsappDefaultMsg: "Hola! Me interesa coordinar una visita y asesoramiento para mi negocio.",
  
  // Clave de Web3Forms: Obtén tu clave gratis en https://web3forms.com y pégala aquí:
  web3FormsKey: "ff77b35a-406a-41c1-8bf9-9185c0de2d9b"
};

document.addEventListener("DOMContentLoaded", () => {
  // Inicializar librerías de animación (AOS si está presente)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }

  // Menú Móvil
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Sombra y estilo del Navbar al hacer scroll
  const navbar = document.getElementById("main-navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("shadow-md", "bg-white/95");
      navbar.classList.remove("bg-white/80");
    } else {
      navbar.classList.remove("shadow-md", "bg-white/95");
      navbar.classList.add("bg-white/80");
    }
    highlightActiveNav();
  });

  // Resaltado de sección activa en la barra de navegación
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove("text-primary-600", "font-bold");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("text-primary-600", "font-bold");
          }
        });
      }
    });
  }

  // Pre-cargar selección de plan en el formulario de contacto
  const planButtons = document.querySelectorAll(".select-plan-btn");
  const descriptionInput = document.getElementById("form-description");

  planButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const planName = button.getAttribute("data-plan-name") || "Asesoramiento General";
      if (descriptionInput) {
        descriptionInput.value = `Hola, me interesa solicitar el servicio de: ${planName}.\n\nDetalles de mi consulta:\n`;
        // Scroll suave al formulario
        const contactSection = document.getElementById("contacto");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => descriptionInput.focus(), 600);
        }
      }
    });
  });

  // Manejo de envío con Web3Forms por AJAX
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitButton = document.getElementById("form-submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();

      // Indicador de carga
      const originalBtnText = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Enviando mensaje...
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
          formStatus.className = "p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3";
          formStatus.innerHTML = `
            <svg class="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <p class="font-semibold text-emerald-900">¡Mensaje enviado con éxito!</p>
              <p class="mt-0.5">Nos comunicaremos a la brevedad para coordinar la visita a tu negocio.</p>
            </div>
          `;
          contactForm.reset();
        } else {
          throw new Error(result.message || "Error al procesar el envío.");
        }
      } catch (error) {
        formStatus.className = "p-4 mb-6 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3";
        formStatus.innerHTML = `
          <svg class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
          </svg>
          <div>
            <p class="font-semibold text-amber-900">Nota de envío</p>
            <p class="mt-0.5">${error.message || "Verifica tu clave de Web3Forms en el archivo index.html o contáctanos directamente por WhatsApp."}</p>
          </div>
        `;
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnText;
        formStatus.classList.remove("hidden");
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // Inicializar slider móvil de reseñas
  initMobileReviewsSliderA();
});

/**
 * =========================================================================
 * CARRUSEL DE RESEÑAS EN MÓVILES (LANDING A)
 * Muestra 1 reseña de alto a la vez, rotando automáticamente cada unos segundos
 * hacia la izquierda (la actual sale hacia la izquierda, la nueva entra por la derecha)
 * =========================================================================
 */
function initMobileReviewsSliderA() {
  const track = document.getElementById("mobile-reviews-track-a");
  const slides = document.querySelectorAll("#mobile-reviews-track-a .mobile-review-slide");
  const dots = document.querySelectorAll(".mobile-review-dot-a");
  const prevBtn = document.getElementById("prev-review-btn-a");
  const nextBtn = document.getElementById("next-review-btn-a");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;
  let autoTimer = null;
  const INTERVAL_MS = 4500;
  let isTransitioning = false;

  function updateDots(idx) {
    dots.forEach((dot, i) => {
      if (i === idx) {
        dot.className = "mobile-review-dot-a w-6 h-2 rounded-full bg-brand-600 transition-all";
      } else {
        dot.className = "mobile-review-dot-a w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all";
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

  // Pausar al pasar el mouse
  track.addEventListener("mouseenter", stopAutoPlay);
  track.addEventListener("mouseleave", startAutoPlay);

  // Gestos táctiles Swipe
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
