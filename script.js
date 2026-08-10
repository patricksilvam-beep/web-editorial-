(() => {
  "use strict";

  /* ---------- año en el footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- menú móvil ---------- */
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const mainNav = document.getElementById("main-nav");

  function openNav(){
    mainNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
  }
  function closeNav(){
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
  navToggle?.addEventListener("click", () => {
    mainNav.classList.contains("open") ? closeNav() : openNav();
  });
  navClose?.addEventListener("click", closeNav);
  mainNav?.querySelectorAll("a[data-nav]").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  /* ---------- resaltar sección activa en el nav ---------- */
  const navLinks = Array.from(document.querySelectorAll("a[data-nav]"));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = "#" + entry.target.id;
      const link = navLinks.find(l => l.getAttribute("href") === id);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

  sections.forEach(sec => spy.observe(sec));

  /* ---------- scroll cue del hero ---------- */
  document.getElementById("scroll-cue")?.addEventListener("click", () => {
    document.getElementById("nosotros")?.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- volver arriba ---------- */
  document.getElementById("to-top")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- marquesina de clientes ---------- */
  const clientes = [
    "Harper Collins", "Tyndale", "Editorial Portavoz", "Editorial Unilit",
    "UNAM México", "McGraw-Hill", "Stanley Publishing", "LID México",
    "CANIEM", "INSP México", "Alba Editorial", "Manual Moderno",
    "San Esteban", "Editorial CLIE", "Nowtilus", "Profit Editorial",
    "Desclée", "Herder", "Rialp", "Sociedad Bíblica de España",
    "FEREDE", "UEBE", "Grupo Nivel 1", "Sílex Ediciones",
    "Almuzara", "Broadstreet", "CLC Colombia", "Origen · Penguin Random House",
    "Médica Panamericana", "Hispanos Media", "Trama Editorial"
  ];
  const track = document.getElementById("marquee-track");
  if (track) {
    const build = () => clientes.map(c => `<span>${c}</span>`).join("");
    // se duplica el contenido para lograr un bucle continuo sin salto
    track.innerHTML = build() + build();
  }

  /* ---------- estantería de servicios ---------- */
  const shelfData = [
    {
      title: "Libros",
      text: "El libro está hecho para pensar, expresar y comunicar las historias que el autor escribe pensando en el lector. Nuestra misión es plasmar esas ideas y emociones en ese objeto maravilloso: el libro."
    },
    {
      title: "Diseño",
      text: "El libro se piensa y se siente para ser leído y disfrutado. Algo aparentemente simple exige un trabajo exhaustivo, exclusivo y delicado, que nuestro equipo realiza cada día con el mimo que merece cada obra."
    },
    {
      title: "Maquetación",
      text: "Cada cliente es distinto, y también lo son sus necesidades y publicaciones. Personalizamos cada proyecto para lograr resultados que se ajusten a la perfección a las exigencias de cada editorial."
    }
  ];
  const spines = Array.from(document.querySelectorAll(".spine"));
  const panelTitle = document.getElementById("panel-title");
  const panelText = document.getElementById("panel-text");

  function setShelf(index){
    spines.forEach((s, i) => s.setAttribute("aria-expanded", i === index ? "true" : "false"));
    if (panelTitle && panelText){
      panelTitle.textContent = shelfData[index].title;
      panelText.textContent = shelfData[index].text;
    }
  }
  spines.forEach(spine => {
    spine.addEventListener("click", () => setShelf(Number(spine.dataset.index)));
  });

  /* ---------- formulario de contacto ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  function validateField(field){
    const input = field.querySelector("input, textarea");
    let valid = input.value.trim().length > 0;
    if (input.type === "email" && valid){
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    }
    field.classList.toggle("invalid", !valid);
    return valid;
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = Array.from(form.querySelectorAll(".field"));
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid){
      status.textContent = "Revisa los campos marcados antes de enviar.";
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    status.textContent = "Enviando…";

    // Simulación de envío: este sitio es estático y no tiene backend propio.
    // Sustituye este bloque por una llamada real (fetch a tu API, Formspree, etc.).
    setTimeout(() => {
      status.textContent = "¡Gracias! Hemos recibido tu mensaje y te responderemos muy pronto.";
      form.reset();
      fields.forEach(f => f.classList.remove("invalid"));
      submitBtn.disabled = false;
    }, 900);
  });

  form?.querySelectorAll(".field input, .field textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input.closest(".field")));
  });

})();
