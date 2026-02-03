const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach((item) => {
  item.addEventListener("click", function () {
    collapsibles.forEach((el) => {
      if (el !== this) el.classList.remove("collapsible--expanded");
    });

    this.classList.toggle("collapsible--expanded");
  });
});

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

const sections = document.querySelectorAll(
  "#home, #about, #services, #portfolio, #work, #blog, #contact"
);

const navLinks = document.querySelectorAll(".nav__link");

function setActiveNav() {
  let current = "";

  // Home when near top
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

// Run on scroll
window.addEventListener("scroll", setActiveNav);

// Run on page load
window.addEventListener("load", setActiveNav);


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

// Close mobile menu when a nav link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      navList.classList.remove("nav__menu");
    }
  });
});


// Hero Profile Typing

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

  // Turn off blinking while typing/deleting
  cursorEl.classList.remove("blink");

  // Finished typing
  if (!isDeleting && characterIndex === currentCareer.length + 1) {
    cursorEl.classList.add("blink"); // Blink after typing finishes
    setTimeout(() => {
      isDeleting = true;
      update();
    }, 2000); // Wait 2 seconds before erasing
    return;
  }

  // Finished deleting
  if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
  }

  setTimeout(update, isDeleting ? 50 : 150);
}

update();
