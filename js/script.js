/**
 * SWE363 Portfolio - Main Script
 * Hybrid Premium UI/UX
 */

const THEME_STORAGE_KEY = "portfolio-theme";
const rootElement = document.documentElement;
const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const siteNav = document.getElementById("site-nav");
const themeToggleButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
const projectsSearchInput = document.getElementById("projects-search-input");
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const contactForm = document.querySelector("[data-contact-form]");
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";

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
};

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

// Initialize theme
const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    siteNav.querySelector("div").classList.add("py-1", "px-4", "scale-95");
    siteNav.querySelector("div").classList.remove("py-2", "px-6");
  } else {
    siteNav.querySelector("div").classList.remove("py-1", "px-4", "scale-95");
    siteNav.querySelector("div").classList.add("py-2", "px-6");
  }
});

// --- Greeting Logic ---
if (welcomeMessage) {
  const hour = new Date().getHours();
  let greeting = "Good Morning";
  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 || hour < 5) greeting = "Good Evening";
  welcomeMessage.textContent = greeting;
}

// --- Mobile Menu ---
if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenuButton.innerHTML = isOpen 
      ? '<i data-lucide="x" width="20"></i>' 
      : '<i data-lucide="menu" width="20"></i>';
    lucide.createIcons();
  });

  // Close menu on link click
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.innerHTML = '<i data-lucide="menu" width="20"></i>';
      lucide.createIcons();
    });
  });
}

// --- Project Search ---
const projectsEmptyState = document.getElementById("projects-empty-state");
if (projectsSearchInput && projectCards.length) {
  projectsSearchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    let visibleCount = 0;
    
    projectCards.forEach(card => {
      const content = card.dataset.projectSearch.toLowerCase();
      const isVisible = content.includes(query);
      card.style.display = isVisible ? "flex" : "none";
      if (isVisible) visibleCount++;
    });

    if (projectsEmptyState) {
      projectsEmptyState.classList.toggle("hidden", visibleCount > 0);
    }
  });
}

// --- Scroll Reveal ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Staggered delay for grid items
      const delay = entry.target.closest('.grid') ? (index % 3) * 100 : 0;
      setTimeout(() => {
        entry.target.classList.add("is-revealed");
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealItems.forEach(item => revealObserver.observe(item));

// --- Contact Form ---
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nMessage:\n${formData.get("message")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio Inquiry&body=${encodeURIComponent(body)}`;
  });
}

// Initialize Lucide icons
lucide.createIcons();
