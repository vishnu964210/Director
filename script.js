
"use strict";

// Automatically update the copyright year.
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Add a background to the navbar when scrolling.
const navbar = document.getElementById("navbar");

function updateNavbar() {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  }
}

window.addEventListener("scroll", updateNavbar, {
  passive: true
});

updateNavbar();

// Mobile navigation menu.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Close the menu after clicking a navigation link.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close the menu when clicking outside it.
  document.addEventListener("click", (event) => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close the mobile menu when returning to desktop width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
}

// Animate elements as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");

// Respect the visitor's reduced-motion preference.
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
} else {
  // Show content immediately when animations are unsupported
  // or the visitor prefers reduced motion.
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}
