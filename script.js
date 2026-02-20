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

// Smooth scroll apenas para links internos que não são botões de modal
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    // Ignora o link se ele tiver um "#" vazio (usado pelo botão Contato)
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

// Elementos - Projeto
const projectModal = document.getElementById("projectModal");
const closeProjectBtn = document.getElementById("closeProjectModal");
const carouselSlidesContainer = document.getElementById("carouselSlides");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const projectCards = document.querySelectorAll(".card[data-project]");

// Elementos - Contato
const contactModal = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContactModal");
const btnNavContact = document.getElementById("btnContact");

let currentSlideIndex = 0;
let totalSlides = 0;

const projectsData = {
  "proj-1": {
    title: "Fintech App",
    description:
      "Uma aplicação bancária completa com foco em experiência do usuário, dashboards interativos e segurança de dados.",
    images: [
      "linear-gradient(45deg, #0f172a, #1e293b)",
      "linear-gradient(45deg, #000000, #171717)",
      "linear-gradient(45deg, #1a1a2e, #16213e)",
    ],
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

// Funções de Abertura
function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
  carouselSlidesContainer.innerHTML = "";

  data.images.forEach((imgGradient, index) => {
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    if (index === 0) slide.classList.add("active");

    slide.style.background = imgGradient;
    slide.innerHTML = `<span style="opacity: 0.3;">CODE_SCREEN_0${index + 1}</span>`;

    carouselSlidesContainer.appendChild(slide);
  });

  currentSlideIndex = 0;
  totalSlides = data.images.length;

  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function openContactModal(e) {
  e.preventDefault(); // Previne que a página pule para o topo ao clicar em href="#"
  contactModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Função de Fechamento Geral
function closeModals() {
  projectModal.classList.remove("active");
  contactModal.classList.remove("active");
  document.body.style.overflow = "auto";

  setTimeout(() => {
    carouselSlidesContainer.innerHTML = "";
  }, 300);
}

// Navegação do Carrossel
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

// Event Listeners - Abertura
projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    openProjectModal(projectId);
  });
});

btnNavContact.addEventListener("click", openContactModal);

// Event Listeners - Fechamento
closeProjectBtn.addEventListener("click", closeModals);
closeContactBtn.addEventListener("click", closeModals);

[projectModal, contactModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    // Se clicar no overlay escuro (fora do container), fecha o modal
    if (e.target === modal) {
      closeModals();
    }
  });
});

// Event Listeners - Carrossel e Teclado
nextBtn.addEventListener("click", () => changeSlide("next"));
prevBtn.addEventListener("click", () => changeSlide("prev"));

document.addEventListener("keydown", (e) => {
  // Tecla ESC fecha qualquer modal ativo
  if (
    projectModal.classList.contains("active") ||
    contactModal.classList.contains("active")
  ) {
    if (e.key === "Escape") closeModals();
  }

  // Setas controlam o carrossel (apenas se o modal de projeto estiver aberto)
  if (projectModal.classList.contains("active")) {
    if (e.key === "ArrowRight") changeSlide("next");
    if (e.key === "ArrowLeft") changeSlide("prev");
  }
});
