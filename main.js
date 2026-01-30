const projectsData = [
  {
    title: "AutoParts Version 1.0 (E-commerce)",
    desc: "Catálogo, login, carrito y pedidos con Firebase. Roles B2C/B2B.",
    tags: ["Firebase", "JavaScript", "HTML/CSS"],
    repo: "https://github.com/dimesias/Autoparts-version1.0.git",
    image: "assets/pagina.autoparts.png"
  },
  {
    title: "Ventas de camisetas (E-commerce)",
    desc: "Inicio, Index para realizar pago, Catálogo y más.",
    tags: ["HTML/CSS", "Firebase", "JavaScript"],
    repo: "https://github.com/dimesias/dimesiaspagfutbol.github.io.git",
    image: "assets/pagina.futbol.png"
  },
  {
    title: "Creación de página web para empresa de salud",
    desc: "Formulario de contacto, secciones informativas, galería de imágenes y más | armonik.cl.",
    tags: ["WordPress"],
    repo: "Sin repositorio en GitHub",
    image: "assets/pagina.armonik.png"
  },
  {
    title: "Dashboard de análisis de datos (empresa)",
    desc: "Analizar, visualizar e interpretar datos para mejorar el problema que presenta la empresa hacia un cliente. Power BI, Python y Excel.",
    tags: ["Power BI", "Python", "Excel"],
    repo: "Sin repositorio en GitHub",
    noImage: true
  },
  {
    title: "Dashboard de análisis de datos Duoc UC",
    desc: "Crear un DataWarehouse, proceso ETL y dashboard en Power BI.",
    tags: ["Power BI", "SQL", "Excel"],
    repo: "Sin repositorio en GitHub",
    images: ["assets/DASHOARD1.png", "assets/DASHOARD2.png"]
  }
];

const yearEl = document.getElementById("year");
const themeBtn = document.getElementById("themeBtn");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menú móvil
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

// ========== CARRUSEL DE PROYECTOS ==========
function buildSlides(projects) {
  const slides = [];
  projects.forEach((p) => {
    const imgs = p.images && p.images.length ? p.images : (p.image ? [p.image] : []);
    if (p.noImage || imgs.length === 0) {
      slides.push({
        noImage: true,
        title: p.title,
        desc: p.desc,
        repo: p.repo,
        alt: p.title
      });
      return;
    }
    imgs.forEach((src, i) => {
      slides.push({
        src,
        title: p.title,
        desc: p.desc,
        repo: p.repo,
        alt: p.images && p.images.length > 1 ? `${p.title} (${i + 1})` : p.title
      });
    });
  });
  return slides;
}

const carouselSlides = buildSlides(projectsData);
const carouselTrack = document.getElementById("carouselTrack");
const carouselCaption = document.getElementById("carouselCaption");
const carouselTitle = document.getElementById("carouselTitle");
const carouselDesc = document.getElementById("carouselDesc");
const carouselLink = document.getElementById("carouselLink");
const carouselDots = document.getElementById("carouselDots");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");

let currentIndex = 0;

function renderCarousel() {
  if (!carouselTrack || carouselSlides.length === 0) return;

  carouselTrack.innerHTML = carouselSlides
    .map((s) => {
      if (s.noImage) {
        return `<div class="carousel__slide"><div class="carousel__placeholder" aria-hidden="true">
          <span class="carousel__placeholder-icon">🔒</span>
          <p class="carousel__placeholder-text">Por seguridad y cumplimiento de protocolos de la empresa, no se muestra el dashboard de este proyecto.</p>
        </div></div>`;
      }
      return `<div class="carousel__slide"><img src="${s.src}" alt="${s.alt}" class="carousel__img" /></div>`;
    })
    .join("");

  carouselDots.innerHTML = carouselSlides
    .map((_, i) => `<button type="button" class="carousel__dot ${i === 0 ? "is-active" : ""}" data-index="${i}" aria-label="Ir a imagen ${i + 1}"></button>`)
    .join("");

  updateCaption(0);
}

function updateCaption(index) {
  currentIndex = index;
  const slide = carouselSlides[index];
  if (!slide) return;

  if (carouselTitle) carouselTitle.textContent = slide.title;
  if (carouselDesc) carouselDesc.textContent = slide.desc;

  if (carouselLink) {
    if (slide.repo && slide.repo !== "Sin repositorio en GitHub") {
      carouselLink.href = slide.repo;
      carouselLink.target = "_blank";
      carouselLink.rel = "noreferrer";
      carouselLink.textContent = "Ver repositorio";
      carouselLink.style.display = "";
    } else {
      carouselLink.style.display = "none";
    }
  }

  if (carouselTrack) {
    const offset = -index * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
  }

  carouselDots.querySelectorAll(".carousel__dot").forEach((dot, i) => {
    dot.classList.toggle("is-active", i === index);
  });
}

function goToSlide(index) {
  const next = Math.max(0, Math.min(index, carouselSlides.length - 1));
  updateCaption(next);
}

if (carouselTrack && carouselSlides.length > 0) {
  renderCarousel();

  carouselPrev?.addEventListener("click", () => goToSlide(currentIndex - 1));
  carouselNext?.addEventListener("click", () => goToSlide(currentIndex + 1));

  carouselDots?.addEventListener("click", (e) => {
    const dot = e.target.closest(".carousel__dot");
    if (dot) goToSlide(parseInt(dot.dataset.index, 10));
  });
}

// ========== Animaciones al hacer scroll ==========
const animateSections = document.querySelectorAll(".animate-on-scroll");
if (animateSections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { rootMargin: "0px 0px -60px 0px", threshold: 0 }
  );
  animateSections.forEach((el) => observer.observe(el));
}

// ========== Scroll hint + Back to top ==========
const scrollHint = document.querySelector(".scroll-hint");
const backToTop = document.getElementById("backToTop");
const scrollThreshold = 400;

function onScroll() {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (scrollHint) {
    scrollHint.classList.toggle("is-hidden", y > scrollThreshold);
  }
  if (backToTop) {
    backToTop.classList.toggle("is-visible", y > scrollThreshold);
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
