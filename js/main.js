const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  }),
);

// Swiper Testimonial Cards

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

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

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
