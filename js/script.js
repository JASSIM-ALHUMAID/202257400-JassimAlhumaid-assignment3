/**
 * SWE363 Portfolio - Main Script
 * Vite + GSAP Premium UI/UX
 */

import "../css/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Constants
const THEME_STORAGE_KEY = "portfolio-theme";
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";

// Elements
const rootElement = document.documentElement;
const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const siteNav = document.getElementById("site-nav");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const projectCards = document.querySelectorAll("[data-project-card]");
const contactForm = document.querySelector("[data-contact-form]");


// --- Theme Management ---
const applyTheme = (theme) => {
  const activeTheme = theme === "light" ? "light" : "dark";
  rootElement.dataset.theme = activeTheme;
  localStorage.setItem(THEME_STORAGE_KEY, activeTheme);

  themeToggleButtons.forEach((button) => {
    const sunIcon = button.querySelector('[data-theme-icon="sun"]');
    const moonIcon = button.querySelector('[data-theme-icon="moon"]');
    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle("hidden", activeTheme !== "dark");
      moonIcon.classList.toggle("hidden", activeTheme !== "light");
    }
  });

  // GSAP Smooth Background Transition
  gsap.to("body", {
    backgroundColor: activeTheme === "light" ? "#f8fafc" : "#0a0c14",
    duration: 0.5,
    ease: "power2.inOut"
  });
};

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

// Initialize Theme
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

// --- Navigation Enhancements ---
const initNavScroll = () => {
  const allProjectsLinks = document.querySelectorAll('a[href="#projects"]');
  const projectsSection = document.getElementById("projects");

  allProjectsLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const st = ScrollTrigger.getById("projects-pin");
      if (st && window.innerWidth >= 768) {
        e.preventDefault();
        // Scroll exactly to the start of the GSAP pinning trigger
        window.scrollTo({
          top: st.start,
          behavior: "smooth"
        });
      }
      // Mobile handles standard anchor behavior fine
    });
  });
};


// --- GSAP Animations ---

// 1. Hero Stagger Entrance
const initHeroAnimations = () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.from("#site-nav div", { y: -50, opacity: 0, duration: 1.2 })
    .from("#home .inline-flex", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.8")
    .from("#home h1", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from("#home h2", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
    .from("#home p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8")
    .from("#home .flex-wrap a", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6")
    .from("#home .absolute.bottom-12", { y: -20, opacity: 0, repeat: -1, yoyo: true, duration: 1.5 }, "-=0.2");
};

// 2. Scroll-Triggered Reveal (Bento & Projects)
const initScrollReveals = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");
  
  revealItems.forEach((item) => {
    // Optimization: Skip reveal animation for items inside the horizontal track on desktop
    // because the horizontal scrolling logic handles their entrance visually.
    if (window.innerWidth >= 768 && (item.closest(".projects-track") || item.closest("#projects"))) {
      gsap.set(item, { opacity: 1, y: 0 });
      return;
    }

    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  });
};


// 3. Magnetic Buttons
const initMagneticButtons = () => {
  const buttons = document.querySelectorAll("#home a, [data-contact-form] button");
  
  buttons.forEach(btn => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
};

// 4. Parallax Background Blobs
const initParallaxBlobs = () => {
  gsap.to(".bg-blue\\/20, .bg-purple\\/20", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1
    },
    y: (i, target) => i % 2 === 0 ? 200 : -200,
    ease: "none"
  });
};

// 5. Horizontal Projects Scroll
const initHorizontalScroll = () => {
  const track = document.getElementById("projects-track");
  const section = document.getElementById("projects");
  if (!track || !section) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    // Calculate total distance to scroll
    // We want the scroll length to feel proportional to the physical width
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        // Increase end distance to ensure it's long enough for the horizontal travel
        end: () => `+=${track.scrollWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
        id: "projects-pin"
      }
    });

    return () => {
      // Cleanup
      const st = ScrollTrigger.getById("projects-pin");
      if (st) st.kill();
    };
  });
};



// --- Functional Logic ---

// Greeting Logic
if (welcomeMessage) {
  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 || hour < 5) greeting = "Good Evening";
  welcomeMessage.textContent = greeting;
}

// Mobile Menu
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");
    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      mobileMenuButton.innerHTML = '<i data-lucide="x" width="20"></i>';
    } else {
      gsap.to(mobileMenu, { opacity: 0, y: -20, duration: 0.3, onComplete: () => mobileMenu.classList.add("hidden") });
      mobileMenuButton.innerHTML = '<i data-lucide="menu" width="20"></i>';
    }
    lucide.createIcons();
  });
}




// Contact Form
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nMessage:\n${formData.get("message")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio Inquiry&body=${encodeURIComponent(body)}`;
  });
}

// Initialize Everything
const init = () => {
  initHeroAnimations();
  initScrollReveals();
  initMagneticButtons();
  initParallaxBlobs();
  initHorizontalScroll();
  initNavScroll();
  lucide.createIcons();
};



if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Force a refresh after all assets (like those giant images) are fully loaded
window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100); // Small buffer to ensure browser has settled
});

