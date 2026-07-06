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

const spotlightEvents = [
  ["Weddings and receptions", "Photos, recap film, reels"],
  ["Concerts and stage shows", "Performance edits, crowd shots"],
  ["Conferences and summits", "Livestream, speakers, highlights"],
  ["Birthdays and private parties", "Guest moments, recap clips"],
];

const eventSpotlight = document.querySelector("#eventSpotlight");
const deliverySpotlight = document.querySelector("#deliverySpotlight");
let spotlightIndex = 0;

function swapSpotlight() {
  if (!eventSpotlight || !deliverySpotlight) return;

  spotlightIndex = (spotlightIndex + 1) % spotlightEvents.length;
  eventSpotlight.classList.add("is-changing");
  deliverySpotlight.classList.add("is-changing");

  window.setTimeout(() => {
    eventSpotlight.textContent = spotlightEvents[spotlightIndex][0];
    deliverySpotlight.textContent = spotlightEvents[spotlightIndex][1];
    eventSpotlight.classList.remove("is-changing");
    deliverySpotlight.classList.remove("is-changing");
  }, 220);
}

window.setInterval(swapSpotlight, 3200);

const heroServices = ["LED Screens", "Sound Systems", "Stage Lighting", "Media Support"];
const heroServiceWord = document.querySelector("#heroServiceWord");
let heroServiceIndex = 0;

function swapHeroService() {
  if (!heroServiceWord) return;

  heroServiceIndex = (heroServiceIndex + 1) % heroServices.length;
  heroServiceWord.classList.add("is-changing");

  window.setTimeout(() => {
    heroServiceWord.textContent = heroServices[heroServiceIndex];
    heroServiceWord.classList.remove("is-changing");
  }, 220);
}

window.setInterval(swapHeroService, 2800);

const heroSlides = Array.from(document.querySelectorAll(".hero-led-card"));
const heroSlideDots = Array.from(document.querySelectorAll(".hero-led-dot"));
let heroSlideIndex = 0;
let heroSlideTimer;

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  heroSlideIndex = (index + heroSlides.length) % heroSlides.length;

  heroSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === heroSlideIndex;
    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  heroSlideDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === heroSlideIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
}

function startHeroSlideshow() {
  if (heroSlides.length < 2) return;

  window.clearInterval(heroSlideTimer);
  heroSlideTimer = window.setInterval(() => {
    showHeroSlide(heroSlideIndex + 1);
  }, 4200);
}

if (heroSlides.length) {
  showHeroSlide(0);
  startHeroSlideshow();

  heroSlideDots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showHeroSlide(dotIndex);
      startHeroSlideshow();
    });
  });
}

const videoSlider = document.querySelector("[data-video-slider]");

if (videoSlider) {
  const videoPlayer = videoSlider.querySelector(".video-slider-player");
  const videoSource = videoPlayer?.querySelector("source");
  const videoCaption = videoSlider.querySelector(".video-slider-caption");
  const videoItems = Array.from(videoSlider.querySelectorAll("[data-video-src]"));
  const videoDots = Array.from(videoSlider.querySelectorAll(".video-dot"));
  const previousVideo = videoSlider.querySelector("[data-video-prev]");
  const nextVideo = videoSlider.querySelector("[data-video-next]");
  const playVideo = videoSlider.querySelector("[data-video-play]");
  let videoIndex = 0;

  function showVideo(index) {
    if (!videoPlayer || !videoSource || !videoItems.length) return;

    videoIndex = (index + videoItems.length) % videoItems.length;
    const selectedVideo = videoItems[videoIndex];
    const videoTitle = selectedVideo.dataset.videoTitle || `Video ${videoIndex + 1}`;
    const videoSrc = selectedVideo.dataset.videoSrc;

    videoPlayer.pause();
    videoSlider.classList.remove("is-playing");
    videoSource.src = videoSrc;
    videoPlayer.load();

    if (videoCaption) {
      videoCaption.textContent = videoTitle;
    }

    videoDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === videoIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
  }

  previousVideo?.addEventListener("click", () => {
    showVideo(videoIndex - 1);
  });

  nextVideo?.addEventListener("click", () => {
    showVideo(videoIndex + 1);
  });

  playVideo?.addEventListener("click", () => {
    videoPlayer?.play();
  });

  videoPlayer?.addEventListener("play", () => {
    videoSlider.classList.add("is-playing");
  });

  videoPlayer?.addEventListener("pause", () => {
    videoSlider.classList.remove("is-playing");
  });

  videoPlayer?.addEventListener("ended", () => {
    videoSlider.classList.remove("is-playing");
  });

  videoDots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      showVideo(dotIndex);
    });
  });

  showVideo(0);
}

const eventCount = document.querySelector("#eventCount");
let countStarted = false;

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || countStarted || !eventCount) return;
      countStarted = true;

      const target = 100;
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

document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formTitle = form.dataset.formTitle || "Website Enquiry";
    const formData = new FormData(form);
    const lines = [`Hello 234-Multimedia, I would like to send a ${formTitle}.`];

    formData.forEach((value, key) => {
      const cleanValue = String(value).trim();
      if (cleanValue) {
        lines.push(`${key}: ${cleanValue}`);
      }
    });

    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/2347010002830?text=${message}`, "_blank", "noopener");
  });
});
