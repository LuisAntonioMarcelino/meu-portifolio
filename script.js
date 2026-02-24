if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

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

const mobileMenuBtn = document.getElementById("mobile-menu");
const navLinksContainer = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-item");
const menuIcon = mobileMenuBtn.querySelector("i");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");

    if (navLinksContainer.classList.contains("active")) {
      menuIcon.classList.replace("bi-list", "bi-x-lg");
    } else {
      menuIcon.classList.replace("bi-x-lg", "bi-list");
    }
  });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinksContainer.classList.remove("active");
    if (menuIcon) menuIcon.classList.replace("bi-x-lg", "bi-list");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") === "#") return;

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// --- LÓGICA DOS MODAIS (PROJETOS & CONTATO) ---
const projectModal = document.getElementById("projectModal");
const contactModal = document.getElementById("contactModal");
const closeContactBtn = document.getElementById("closeContactModal");
const btnNavContact = document.getElementById("btnContact");

// Lógica restrita à página Inicial (Projetos)
if (projectModal) {
  const closeProjectBtn = document.getElementById("closeProjectModal");
  const carouselSlidesContainer = document.getElementById("carouselSlides");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const projectCards = document.querySelectorAll(".card[data-project]");

  let currentSlideIndex = 0;
  let totalSlides = 0;

  const projectsData = {
    "proj-1": {
      title: "SaaS Billing",
      description:
        "API criada para fins educacionais que simula diferentes métodos de pagamento, sem integração com gateways de pagamento reais. O foco do projeto é praticar regras de negócio, validações e fluxos transacionais.",
      images: ["src/routes.png", "src/app.png", "src/controller.png"],
    },
    "proj-2": {
      title: "LUMIN Restaurante",
      description:
        "Plataforma para visualização do cardapio, criada para fins de estudo aprofundado em HTML CSS e JS.",
      images: [
        "src/homelumina.png",
        "src/cardapiolumina.png",
        "src/pratolumina.png",
        "src/sobrelumina.png",
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

      if (imgPath.startsWith("src/")) {
        slide.style.backgroundImage = `url('${imgPath}')`;
        slide.style.backgroundSize = "contain";
        slide.style.backgroundRepeat = "no-repeat";
        slide.style.backgroundPosition = "center";
        slide.innerHTML = "";
      } else {
        slide.style.background = imgPath;
        slide.innerHTML = "";
      }

      carouselSlidesContainer.appendChild(slide);
    });

    currentSlideIndex = 0;
    totalSlides = data.images.length;

    projectModal.classList.add("active");
    document.body.style.overflow = "hidden";
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

  closeProjectBtn.addEventListener("click", () => {
    projectModal.classList.remove("active");
    document.body.style.overflow = "auto";
    setTimeout(() => {
      carouselSlidesContainer.innerHTML = "";
    }, 300);
  });

  // Fecha o modal ao clicar na área escura (fora da janela de projeto)
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
      setTimeout(() => {
        carouselSlidesContainer.innerHTML = "";
      }, 300);
    }
  });

  nextBtn.addEventListener("click", () => changeSlide("next"));
  prevBtn.addEventListener("click", () => changeSlide("prev"));
} // Final da lógica de Projetos

// Lógica de Abertura do Modal de Contato (Comum para a Home e Currículo)
if (btnNavContact && contactModal) {
  btnNavContact.addEventListener("click", (e) => {
    e.preventDefault();
    contactModal.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeContactBtn.addEventListener("click", () => {
    contactModal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      contactModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// Navegação global por teclado (ESC e Setas direcionais)
document.addEventListener("keydown", (e) => {
  if (projectModal && projectModal.classList.contains("active")) {
    if (e.key === "Escape") {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
      const carouselContainer = document.getElementById("carouselSlides");
      if (carouselContainer) {
        setTimeout(() => {
          carouselContainer.innerHTML = "";
        }, 300);
      }
    }
    if (e.key === "ArrowRight") {
      const nextBtn = document.querySelector(".next-btn");
      if (nextBtn) nextBtn.click();
    }
    if (e.key === "ArrowLeft") {
      const prevBtn = document.querySelector(".prev-btn");
      if (prevBtn) prevBtn.click();
    }
  }

  if (contactModal && contactModal.classList.contains("active")) {
    if (e.key === "Escape") {
      contactModal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  }
});
