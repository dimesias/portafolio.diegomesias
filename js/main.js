const projectsData = [
  {
   title: "AutoParts Version 1.0 (E-commerce)",
    desc: "Catálogo, login, carrito y pedidos con Firebase. Roles B2C/B2B.",
    tags: ["Firebase", "JavaScript", "HTML/CSS"],
    repo: "https://github.com/dimesias/Autoparts-version1.0.git"
    
  },
  {
    title: "Ventas de camisetas (E-commerce)",
    desc: "Inicio, Index para realizar pago, Catálogo y MAS.",
    tags: ["HTML/CSS", "Firebase", "JavaScript"],
    repo: "https://github.com/dimesias/dimesiaspagfutbol.github.io.git"
  },
  {
    title: "Creacion de pagina web para empresa de salud",
    desc: "Formulario de contacto, secciones informativas, galería de imágenes y más | armonik.cl |.",
    tags: ["WordPress"],
    repo: "Sin repositorio en GitHub"
  },
  {
    title: "Dashboard de análisis de datos en Power BI",
    desc: "Analizar, visualizar e interpretar datos para mejorar el problema que presenta la empresa (Volvek Chile) hacia un cliente.",
    tags: ["Power BI", "Python","Excel"],
    repo: "Sin repositorio en GitHub"
  }
];

const projectsEl = document.getElementById("projects");
const searchEl = document.getElementById("search");
const yearEl = document.getElementById("year");
const themeBtn = document.getElementById("themeBtn");

yearEl.textContent = new Date().getFullYear();

function renderProjects(list){
  projectsEl.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="project__top">
        <div>
          <h3>${p.title}</h3>
          <p class="muted">${p.desc}</p>
        </div>
        <div class="badges">
          ${p.tags.map(t => `<span class="badge">${t}</span>`).join("")}
        </div>
      </div>
      ${p.image ? `<img src="${p.image}" alt="Imagen del proyecto" class="project-image" />` : ""}
      <div class="cta">
        <a 
            class="btn ghost"
            href="${p.repo !== 'Sin repositorio en GitHub' ? p.repo : '#'}"
            target="_blank"
            rel="noreferrer"
        >
            ${p.repo !== 'Sin repositorio en GitHub' ? 'Repositorio GitHub' : 'Sin repositorio en GitHub'}
        </a>
      </div>
    `;
    projectsEl.appendChild(card);
  });
}

renderProjects(projectsData);

searchEl?.addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = projectsData.filter(p =>
    (p.title + " " + p.desc + " " + p.tags.join(" ")).toLowerCase().includes(q)
  );
  renderProjects(filtered);
});

const savedTheme = localStorage.getItem("theme");
if(savedTheme === "light") document.body.classList.add("light");

themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

