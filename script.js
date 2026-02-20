// --- Configurações Iniciais (AOS e Navbar) ---

AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
  offset: 50,
});

const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- LÓGICA DO MENU MOBILE ---
const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinksContainer = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-item");
const menuIcon = mobileMenuBtn.querySelector("i");

// Abre/Fecha Menu
mobileMenuBtn.addEventListener("click", () => {
  navLinksContainer.classList.toggle("active");

  // Troca o ícone (Hamburger <-> X)
  if (navLinksContainer.classList.contains("active")) {
    menuIcon.classList.replace("bi-list", "bi-x-lg");
  } else {
    menuIcon.classList.replace("bi-x-lg", "bi-list");
  }
});

// Fecha o menu ao clicar em um link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    menuIcon.classList.replace("bi-x-lg", "bi-list");
  });
});

// Smooth Scroll (ignora href="#")
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") return;

    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// --- LÓGICA DOS MODAIS (PROJETOS & CONTATO) ---

const projectModal = document.getElementById("projectModal");
const closeProjectBtn = document.getElementById("closeProjectModal");
const carouselSlidesContainer = document.getElementById("carouselSlides");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const projectCards = document.querySelectorAll(".card[data-project]");

const contactModal = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContactModal");
const btnNavContact = document.getElementById("btnContact");

let currentSlideIndex = 0;
let totalSlides = 0;

const projectsData = {
  "proj-1": {
    title: "SaaS Billing",
    description:
      "Uma aplicação desenvolvida para fins de estudo. Por esse motivo, certos trechos do código — com exceção do arquivo .env — está disponibilizado neste repositório.",
    images: ["src/routes.png", "src/controller.png", "src/app.png"],
  },
  "proj-2": {
    title: "E-commerce Platform",
    description:
      "Plataforma de vendas escalável com painel administrativo, gestão de inventário e checkout otimizado.",
    images: [
      "linear-gradient(45deg, #064e3b, #065f46)",
      "linear-gradient(45deg, #312e81, #3730a3)",
    ],
  },
};

function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  carouselSlidesContainer.innerHTML = "";

  data.images.forEach((imgPath, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (index === 0) slide.classList.add("active");

    // NOVO: Aplica a imagem real como background-image
    slide.style.backgroundImage = `url('${imgPath}')`;
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";

    // NOVO: Deixamos o innerHTML vazio para tirar o texto "CODE_SCREEN"
    slide.innerHTML = "";

    carouselSlidesContainer.appendChild(slide);
  });

  currentSlideIndex = 0;
  totalSlides = data.images.length;

  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openContactModal(e) {
  e.preventDefault();
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModals() {
  projectModal.classList.remove("active");
  contactModal.classList.remove("active");
  document.body.style.overflow = "auto";

  setTimeout(() => {
    carouselSlidesContainer.innerHTML = "";
  }, 300);
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length === 0) return;

  slides[currentSlideIndex].classList.remove("active");

  if (direction === "next") {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  } else {
    currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
  }

  slides[currentSlideIndex].classList.add("active");
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    openProjectModal(projectId);
  });
});

btnNavContact.addEventListener("click", openContactModal);

closeProjectBtn.addEventListener("click", closeModals);
closeContactBtn.addEventListener("click", closeModals);

[projectModal, contactModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModals();
    }
  });
});

nextBtn.addEventListener("click", () => changeSlide("next"));
prevBtn.addEventListener("click", () => changeSlide("prev"));

document.addEventListener("keydown", (e) => {
  if (
    projectModal.classList.contains("active") ||
    contactModal.classList.contains("active")
  ) {
    if (e.key === "Escape") closeModals();
  }

  if (projectModal.classList.contains("active")) {
    if (e.key === "ArrowRight") changeSlide("next");
    if (e.key === "ArrowLeft") changeSlide("prev");
  }
});
