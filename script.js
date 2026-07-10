const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const eventCount = document.querySelector("#eventCount");
let countStarted = false;

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || countStarted || !eventCount) return;
      countStarted = true;

      const target = 50;
      const duration = 1200;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        eventCount.textContent = String(Math.round(target * eased));

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      }

      window.requestAnimationFrame(tick);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.35 }
);

if (eventCount) {
  countObserver.observe(eventCount);
}

document.querySelectorAll("[data-email-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formTitle = form.dataset.formTitle || "Website Enquiry";
    const formData = new FormData(form);
    const lines = [`Hello LISORI LTD, I would like to send a ${formTitle}.`];

    formData.forEach((value, key) => {
      const cleanValue = String(value).trim();
      if (cleanValue) {
        lines.push(`${key}: ${cleanValue}`);
      }
    });

    const subject = encodeURIComponent(`${formTitle} for LISORI LTD`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:lisoriltd@gmail.com?subject=${subject}&body=${body}`;
  });
});
