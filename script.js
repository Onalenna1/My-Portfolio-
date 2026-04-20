const header = document.getElementById("header");
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

/* Header: add .scrolled class */
const handleScroll = () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
  highlightNav();
};

window.addEventListener("scroll", handleScroll, { passive: true });

/* Active nav link on scroll */
const highlightNav = () => {
  const scrollY = window.scrollY + 160;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const link = navbar.querySelector(`a[href="#${id}"]`);
    if (!link) return;

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
};

/*Mobile menu*/
const openMenu = () => {
  menuBtn.classList.add("open");
  navbar.classList.add("open");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
};

const closeMenu = () => {
  menuBtn.classList.remove("open");
  navbar.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
};

menuBtn.addEventListener("click", () => {
  navbar.classList.contains("open") ? closeMenu() : openMenu();
});

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  if (
    navbar.classList.contains("open") &&
    !navbar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navbar.classList.contains("open")) closeMenu();
});

/* Scroll reveal */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll("[data-reveal]").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  revealObserver.observe(el);
});

/* Contact form */
const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const btnText = submitBtn?.querySelector(".btn-text");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll("[required]");
    let valid = true;

    fields.forEach((field) => {
      field.style.borderColor = "";
      if (!field.value.trim()) {
        field.style.borderColor = "#c1001f";
        valid = false;
      }
    });

    if (!valid) return;

    submitBtn.classList.add("loading");
    if (btnText) btnText.textContent = "Sending…";

    await new Promise((r) => setTimeout(r, 1800));

    submitBtn.classList.remove("loading");
    submitBtn.classList.add("sent");
    if (btnText) btnText.textContent = "Message Sent ✓";
    form.reset();

    setTimeout(() => {
      submitBtn.classList.remove("sent");
      if (btnText) btnText.textContent = "Send Message";
    }, 4000);
  });

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.style.borderColor = "";
    });
  });
}

/*Init*/
handleScroll();
