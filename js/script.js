const THEME_STORAGE_KEY = "portfolio-theme";
const rootElement = document.documentElement;
const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("mobile-menu-open-icon");
const menuCloseIcon = document.getElementById("mobile-menu-close-icon");
const siteNav = document.getElementById("site-nav");
const themeToggleButtons = Array.from(document.querySelectorAll("[data-theme-toggle]"));
const projectsSearchInput = document.getElementById("projects-search-input");
const projectsSearchStatus = document.getElementById("projects-search-status");
const projectsEmptyState = document.getElementById("projects-empty-state");
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
const contactForm = document.querySelector("[data-contact-form]");
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";

const getStoredTheme = () => {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    return null;
  }
};

const setStoredTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
  }
};

const applyTheme = (theme) => {
  const activeTheme = theme === "light" ? "light" : "dark";
  const nextThemeLabel =
    activeTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  rootElement.dataset.theme = activeTheme;

  themeToggleButtons.forEach((button) => {
    const sunIcon = button.querySelector('[data-theme-icon="sun"]');
    const moonIcon = button.querySelector('[data-theme-icon="moon"]');

    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle("hidden", activeTheme !== "dark");
      moonIcon.classList.toggle("hidden", activeTheme !== "light");
    }

    button.setAttribute("aria-pressed", String(activeTheme === "dark"));
    button.setAttribute("aria-label", nextThemeLabel);
    button.setAttribute("title", nextThemeLabel);
  });
};

if (themeToggleButtons.length) {
  themeToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
      setStoredTheme(nextTheme);
    });
  });

  applyTheme(getStoredTheme() || rootElement.dataset.theme || "dark");
}

if (welcomeMessage) {
  const time = new Date().getHours();

  if (time < 12) {
    welcomeMessage.textContent = "Good Morning";
  } else if (time < 18) {
    welcomeMessage.textContent = "Good Afternoon";
  } else {
    welcomeMessage.textContent = "Good Evening";
  }
}

if (mobileMenuButton && mobileMenu && menuOpenIcon && menuCloseIcon && siteNav) {
  const mobileMenuLinks = mobileMenu.querySelectorAll("a[href^='#']");

  const setMobileMenuState = (isOpen) => {
    mobileMenu.classList.toggle("hidden", !isOpen);
    menuOpenIcon.classList.toggle("hidden", isOpen);
    menuCloseIcon.classList.toggle("hidden", !isOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  };

  mobileMenuButton.addEventListener("click", () => {
    setMobileMenuState(mobileMenu.classList.contains("hidden"));
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMobileMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth >= 768 || mobileMenu.classList.contains("hidden")) {
      return;
    }

    if (!siteNav.contains(event.target)) {
      setMobileMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenuState(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMobileMenuState(false);
    }
  });
}

if (projectsSearchInput && projectsSearchStatus && projectsEmptyState && projectCards.length) {
  const totalProjects = projectCards.length;

  const updateProjectsSearch = () => {
    const query = projectsSearchInput.value.trim().toLowerCase();
    let visibleProjects = 0;

    projectCards.forEach((card) => {
      const searchText = (card.dataset.projectSearch || card.textContent || "").toLowerCase();
      const isMatch = query === "" || searchText.includes(query);

      card.classList.toggle("hidden", !isMatch);
      card.setAttribute("aria-hidden", String(!isMatch));

      if (isMatch) {
        visibleProjects += 1;
      }
    });

    projectsEmptyState.classList.toggle("hidden", visibleProjects !== 0);

    if (query === "") {
      projectsSearchStatus.textContent = `Showing all ${totalProjects} projects.`;
      return;
    }

    if (visibleProjects === 0) {
      projectsSearchStatus.textContent = `No projects match "${projectsSearchInput.value.trim()}".`;
      return;
    }

    projectsSearchStatus.textContent = `Showing ${visibleProjects} of ${totalProjects} projects for "${projectsSearchInput.value.trim()}".`;
  };

  projectsSearchInput.addEventListener("input", updateProjectsSearch);
  updateProjectsSearch();
}

if (revealItems.length) {
  const revealItem = (item) => {
    item.classList.add("is-revealed");
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(revealItem);
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealItem(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");
    const mailtoLink =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  });
}

lucide.createIcons();


