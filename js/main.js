// ------------------------------
// CODEXA Studios - main.js
// Interatividade e animações
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // ===== MENU MOBILE =====
  const menuToggle = document.querySelector("#mobile-menu");
  const nav = document.querySelector(".nav ul");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuToggle.classList.toggle("open");
    });
  }

  // ===== SCROLL SUAVE =====
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth"
        });
        if (nav.classList.contains("show")) {
          nav.classList.remove("show");
          menuToggle.classList.remove("open");
        }
      }
    });
  });

  // ===== ANIMAÇÕES DE ENTRADA =====
  const fadeElements = document.querySelectorAll(".fade-up");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  fadeElements.forEach(el => appearOnScroll.observe(el));

  // ===== FORMULÁRIO NETLIFY =====
  const form = document.querySelector("form[name='contact']");
  const statusOK = document.querySelector(".form-status");
  const statusError = document.querySelector(".form-error");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch("/", {
          method: "POST",
          body: data,
        });

        if (response.ok) {
          form.reset();
          statusOK.style.display = "block";
          statusError.style.display = "none";
        } else {
          statusOK.style.display = "none";
          statusError.style.display = "block";
        }
      } catch (error) {
        statusOK.style.display = "none";
        statusError.style.display = "block";
      }
    });
  }
});
