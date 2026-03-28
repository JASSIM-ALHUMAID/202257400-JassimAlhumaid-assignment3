const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("mobile-menu-open-icon");
const menuCloseIcon = document.getElementById("mobile-menu-close-icon");
const siteNav = document.getElementById("site-nav");
const projectsSearchInput = document.getElementById("projects-search-input");
const projectsSearchStatus = document.getElementById("projects-search-status");
const projectsEmptyState = document.getElementById("projects-empty-state");
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));

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

lucide.createIcons();


