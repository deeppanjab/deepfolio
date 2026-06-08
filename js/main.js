"use strict";

// FAQ Collapsible
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((item) => {
  item.addEventListener("click", function () {
    const content = this.querySelector(".faq__content");

    collapsibles.forEach((el) => {
      if (el !== this) {
        el.classList.remove("collapsible--expanded");
        el.querySelector(".faq__content").style.maxHeight = null;
      }
    });

    this.classList.toggle("collapsible--expanded");

    if (this.classList.contains("collapsible--expanded")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
});

// Swiper Testimonials
const swiper = new Swiper(".testimonials__container", {
  loop: true,
  speed: 800,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});

// Active Nav on Scroll
const sections = document.querySelectorAll(
  "#home, #about, #services, #portfolio, #work, #blog, #contact"
);
const navLinks = document.querySelectorAll(".nav__link");

function setActiveNav() {
  let current = "";

  if (window.scrollY < 200) {
    current = "home";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveNav);
window.addEventListener("load", setActiveNav);

// Mobile Menu
const hambar = document.querySelector(".nav__hambar");
const navList = document.querySelector(".nav__list");

hambar.addEventListener("click", () => {
  navList.classList.toggle("nav__menu");
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    navList.classList.remove("nav__menu");
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      navList.classList.remove("nav__menu");
    }
  });
});

// Hero Typing Effect
const textEl = document.getElementById("typed-text");
const cursorEl = document.querySelector(".cursor");
const careers = ["Youtuber", "Front-end Developer", "Student", "Educator"];

let careerIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function update() {
  const currentCareer = careers[careerIndex];
  const currentText = isDeleting
    ? currentCareer.slice(0, characterIndex--)
    : currentCareer.slice(0, characterIndex++);

  textEl.textContent = currentText;
  cursorEl.classList.remove("blink");

  if (!isDeleting && characterIndex === currentCareer.length + 1) {
    cursorEl.classList.add("blink");
    setTimeout(() => {
      isDeleting = true;
      update();
    }, 2000);
    return;
  }

  if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
  }

  setTimeout(update, isDeleting ? 50 : 150);
}

update();

// =============================================
// Portfolio Filter
// =============================================

const portfolioSection = document.querySelector("#portfolio");
const filterBtns = portfolioSection.querySelectorAll("[data-filter]");
const filterItems = portfolioSection.querySelectorAll("[data-category]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(function (item) {
    if (selectedValue === "all" || item.dataset.category === selectedValue) {
      item.classList.remove("hidden");

      // Force animation replay
      item.style.animation = "none";
      item.offsetHeight; // trigger reflow
      item.style.animation = "";

    } else {
      item.classList.add("hidden");
    }
  });
};

let lastActive = filterBtns[0];

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selectedValue = this.dataset.filter;

    filterFunc(selectedValue);

    lastActive.classList.remove("active");
    this.classList.add("active");
    lastActive = this;
  });
});

// =============================================
// Lightbox
// =============================================

// Create lightbox elements dynamically
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
lightbox.innerHTML = `
  <button class="lightbox__close">&times;</button>
  <img class="lightbox__img" src="" alt="" />
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector(".lightbox__img");
const lightboxClose = lightbox.querySelector(".lightbox__close");

// Open on image click
filterItems.forEach(function (item) {
  item.addEventListener("click", function () {
    const img = this.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // prevent background scroll
  });
});

// Close on button click
lightboxClose.addEventListener("click", closeLightbox);

// Close on background click
lightbox.addEventListener("click", function (e) {
  if (e.target === lightbox) closeLightbox();
});

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}