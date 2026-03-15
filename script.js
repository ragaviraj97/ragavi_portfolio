document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelector(".nav-links");
  const header = document.querySelector(".site-header");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        navLinks.classList.remove("open");
      }
    });
  }

  const navAnchors = document.querySelectorAll(".nav-links a[href^='#'], .hero-actions a[href^='#']");

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const target = event.currentTarget;
      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const section = document.querySelector(href);
      if (!section) return;

      event.preventDefault();

      const headerOffset = header ? header.offsetHeight + 12 : 0;
      const rect = section.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.classList.add("section-visible");

          const id = entry.target.id;
          if (!id) return;

          document
            .querySelectorAll(".nav-links a")
            .forEach((link) => link.classList.remove("active"));

          const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll("section.section, section.hero").forEach((section) => {
    if (section instanceof HTMLElement) {
      sectionObserver.observe(section);
    }
  });
});

