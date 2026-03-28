const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const menuOpenIcon = document.getElementById("mobile-menu-open-icon");
const menuCloseIcon = document.getElementById("mobile-menu-close-icon");
const siteNav = document.getElementById("site-nav");

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

lucide.createIcons();


