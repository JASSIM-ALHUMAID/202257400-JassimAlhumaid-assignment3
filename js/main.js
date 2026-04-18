/**
 * SWE363 Portfolio - Main Script
 * Assignment 3 portfolio with integrated GitHub metadata
 */

import "../css/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const THEME_STORAGE_KEY = "portfolio-theme";
const PROJECT_PREFERENCES_KEY = "portfolio-project-preferences";
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";
const GITHUB_USERNAME = "JASSIM-ALHUMAID";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const PROJECT_REPO_MAP = {
  portfolio: ["SWE363-portfolio-1", "swe363-portfolio", "portfolio"],
  "training-application-tracker": ["Training-Application-Tracker", "training-application-tracker", "application-tracker"],
  "task-manager": ["task-manager", "taskmanager"],
  "swe363-project": ["SWE363-project", "swe363project", "project"],
};

const rootElement = document.documentElement;
const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const contactForm = document.querySelector("[data-contact-form]");

const projectFilterSelect = document.querySelector("[data-project-filter]");
const projectSortSelect = document.querySelector("[data-project-sort]");
const projectSearchInput = document.querySelector("[data-project-search-input]");
const projectLoading = document.querySelector("[data-project-loading]");
const projectError = document.querySelector("[data-project-error]");
const projectErrorMessage = document.querySelector("[data-project-error-message]");
const projectEmpty = document.querySelector("[data-project-empty]");
const projectGrid = document.querySelector("[data-project-grid]");
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));

const projectState = {
  filter: "all",
  sort: "year",
  search: "",
  reposByProjectKey: {},
  commitCountsByRepo: {},
};

const normalizeName = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const setProjectBlockVisibility = (element, isVisible) => {
  if (!element) return;
  element.classList.toggle("hidden", !isVisible);
};

const saveProjectPreferences = () => {
  localStorage.setItem(
    PROJECT_PREFERENCES_KEY,
    JSON.stringify({
      filter: projectState.filter,
      sort: projectState.sort,
      search: projectState.search,
    })
  );
};

const loadProjectPreferences = () => {
  try {
    const raw = localStorage.getItem(PROJECT_PREFERENCES_KEY);
    if (!raw) return;

    const parsed = JSON.parse(raw);
    if (parsed.filter) projectState.filter = parsed.filter;
    if (parsed.sort) projectState.sort = parsed.sort;
    if (parsed.search) projectState.search = parsed.search;
  } catch (error) {
    localStorage.removeItem(PROJECT_PREFERENCES_KEY);
  }
};

const formatRepoDate = (dateValue) => {
  if (!dateValue) return "Unavailable";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
};

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

  gsap.to("body", {
    backgroundColor: activeTheme === "light" ? "#f8fafc" : "#0a0c14",
    duration: 0.5,
    ease: "power2.inOut",
  });
};

themeToggleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
});

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));

const initHeroAnimations = () => {
  const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  timeline
    .from("#site-nav div", { y: -50, opacity: 0, duration: 1.2 })
    .from("[data-hero-badge]", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.8")
    .from("#home h1", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from("[data-hero-name] h2", { y: 30, opacity: 0, duration: 1 }, "-=0.4")
    .from("[data-hero-description]", { y: 20, opacity: 0, duration: 0.8 })
    .from("[data-hero-actions]", { y: 20, opacity: 0, duration: 0.8 }, "-=0.2")
    .from("#home .absolute.bottom-12", { y: -20, opacity: 0, repeat: -1, yoyo: true, duration: 1.5 }, "-=0.2");
};

const initScrollReveals = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  revealItems.forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  });
};

const initMagneticButtons = () => {
  const buttons = document.querySelectorAll("[data-contact-form] button, .project-cta-button");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.18,
        y: y * 0.18,
        duration: 0.22,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.28,
        ease: "power2.out",
      });
    });
  });
};

const initParallaxBlobs = () => {
  gsap.to(".bg-blue\\/20, .bg-purple\\/20", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    y: (index) => (index % 2 === 0 ? 200 : -200),
    ease: "none",
  });
};

const initStatCounters = () => {
  const statElements = document.querySelectorAll("[data-stat]");

  statElements.forEach((stat) => {
    const countElement = stat.querySelector("[data-count]");
    if (!countElement) return;

    const target = parseInt(stat.dataset.target || "0", 10);
    const suffix = stat.dataset.suffix || "";
    const duration = 2000;

    ScrollTrigger.create({
      trigger: stat,
      start: "top 80%",
      onEnter: () => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCount = () => {
          start += increment;
          if (start < target) {
            countElement.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            countElement.textContent = target + suffix;
          }
        };

        updateCount();
      },
      once: true,
    });
  });
};

const initValueCardEffects = () => {
  const valueCards = document.querySelectorAll(".value-card");

  valueCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", `${x}%`);
      card.style.setProperty("--mouse-y", `${y}%`);
    });
  });
};

const getCommitCountApiUrl = (repo) =>
  `https://api.github.com/repos/${encodeURIComponent(GITHUB_USERNAME)}/${encodeURIComponent(repo.name)}/commits?sha=${encodeURIComponent(repo.default_branch)}&per_page=1`;

const fetchRepoCommitCount = async (repo) => {
  const response = await fetch(getCommitCountApiUrl(repo), {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    return null;
  }

  const linkHeader = response.headers.get("link") || response.headers.get("Link");

  if (linkHeader) {
    const lastPageMatch = linkHeader.match(/[?&]page=(\d+)>;\s*rel="last"/);
    if (lastPageMatch) {
      return Number.parseInt(lastPageMatch[1], 10);
    }
  }

  const commits = await response.json();
  return Array.isArray(commits) ? commits.length : null;
};

const getRepoForProjectKey = (projectKey, repos) => {
  const candidates = PROJECT_REPO_MAP[projectKey] || [];
  const normalizedCandidates = candidates.map(normalizeName);

  return (
    repos.find((repo) => normalizedCandidates.includes(normalizeName(repo.name))) ||
    repos.find((repo) => normalizeName(repo.name).includes(normalizeName(projectKey))) ||
    null
  );
};

const getProjectCardData = (card) => {
  const projectKey = card.dataset.projectKey;
  const repo = projectState.reposByProjectKey[projectKey] || null;
  const commitCount = repo ? projectState.commitCountsByRepo[repo.full_name] : null;

  return {
    card,
    key: projectKey,
    title: card.querySelector("h3")?.textContent?.trim() || "",
    year: Number.parseInt(card.dataset.projectYear || "0", 10),
    filters: (card.dataset.projectFilterValues || "").split(/\s+/).filter(Boolean),
    repo,
    stars: repo?.stargazers_count ?? -1,
    activity: repo?.pushed_at ? new Date(repo.pushed_at).getTime() : 0,
    commitCount,
  };
};

const updateProjectCardMeta = (card) => {
  const projectKey = card.dataset.projectKey;
  const repo = projectState.reposByProjectKey[projectKey] || null;
  const starsElement = card.querySelector("[data-project-stars]");
  const commitsElement = card.querySelector("[data-project-commits]");
  const dateElement = card.querySelector("[data-project-date]");
  const primaryRepoLink = card.querySelector("[data-project-repo-link]");
  const secondaryRepoLink = card.querySelector("[data-project-repo-link-secondary]");

  if (!repo) {
    if (starsElement) starsElement.textContent = "-";
    if (commitsElement) commitsElement.textContent = "-";
    if (dateElement) dateElement.textContent = "Not linked";
    return;
  }

  if (starsElement) starsElement.textContent = String(repo.stargazers_count ?? 0);

  if (commitsElement) {
    const commitCount = projectState.commitCountsByRepo[repo.full_name];
    commitsElement.textContent = commitCount === undefined ? "..." : String(commitCount ?? "-");
  }

  if (dateElement) {
    dateElement.textContent = formatRepoDate(repo.pushed_at || repo.updated_at);
  }

  [primaryRepoLink, secondaryRepoLink].forEach((link) => {
    if (!link) return;
    link.href = repo.html_url;
  });
};

const renderProjectCards = () => {
  if (!projectGrid) return;

  const cardsData = projectCards.map(getProjectCardData);
  const filteredCards = cardsData.filter((item) => {
    const matchesFilter = projectState.filter === "all" || item.filters.includes(projectState.filter);
    const matchesSearch =
      projectState.search === "" ||
      item.card.dataset.projectSearch?.toLowerCase().includes(projectState.search) ||
      item.title.toLowerCase().includes(projectState.search);

    return matchesFilter && matchesSearch;
  });

  filteredCards.sort((left, right) => {
    if (projectState.sort === "name") {
      return left.title.localeCompare(right.title);
    }

    if (projectState.sort === "stars") {
      if (right.stars !== left.stars) return right.stars - left.stars;
      return right.year - left.year;
    }

    if (projectState.sort === "activity") {
      if (right.activity !== left.activity) return right.activity - left.activity;
      return right.year - left.year;
    }

    if (right.year !== left.year) return right.year - left.year;
    return left.title.localeCompare(right.title);
  });

  projectCards.forEach((item) => {
    item.classList.add("hidden");
  });

  filteredCards.forEach((item) => {
    item.card.classList.remove("hidden");
    projectGrid.appendChild(item.card);
  });

  setProjectBlockVisibility(projectEmpty, filteredCards.length === 0);

  projectCards.forEach(updateProjectCardMeta);
  lucide.createIcons();
};

const syncProjectUI = () => {
  if (projectFilterSelect) projectFilterSelect.value = projectState.filter;
  if (projectSortSelect) projectSortSelect.value = projectState.sort;
  if (projectSearchInput) projectSearchInput.value = projectState.search;

  renderProjectCards();
  saveProjectPreferences();
};

const ensureProjectCommitCounts = async () => {
  const repos = Object.values(projectState.reposByProjectKey).filter(Boolean);
  const reposMissingCounts = repos.filter((repo) => projectState.commitCountsByRepo[repo.full_name] === undefined);

  if (reposMissingCounts.length === 0) return;

  await Promise.all(
    reposMissingCounts.map(async (repo) => {
      const commitCount = await fetchRepoCommitCount(repo);
      projectState.commitCountsByRepo[repo.full_name] = commitCount;
    })
  );

  renderProjectCards();
};

const loadProjectGithubData = async () => {
  if (!projectGrid) return;

  loadProjectPreferences();
  syncProjectUI();
  setProjectBlockVisibility(projectLoading, true);
  setProjectBlockVisibility(projectError, false);
  setProjectBlockVisibility(projectEmpty, false);

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: { Accept: "application/vnd.github+json" },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit reached. Try again later.");
      }
      throw new Error("GitHub returned an unexpected response while loading project metadata.");
    }

    const repos = await response.json();
    const publicRepos = Array.isArray(repos) ? repos.filter((repo) => !repo.private) : [];

    projectCards.forEach((card) => {
      const key = card.dataset.projectKey;
      projectState.reposByProjectKey[key] = getRepoForProjectKey(key, publicRepos);
    });

    setProjectBlockVisibility(projectLoading, false);
    syncProjectUI();
    await ensureProjectCommitCounts();
  } catch (error) {
    setProjectBlockVisibility(projectLoading, false);
    setProjectBlockVisibility(projectError, true);
    if (projectErrorMessage) {
      projectErrorMessage.textContent = error.message || "Project metadata could not be loaded from GitHub.";
    }
    syncProjectUI();
  }
};

const initProjectControls = () => {
  if (projectFilterSelect) {
    projectFilterSelect.addEventListener("change", (event) => {
      projectState.filter = event.target.value;
      syncProjectUI();
    });
  }

  if (projectSortSelect) {
    projectSortSelect.addEventListener("change", (event) => {
      projectState.sort = event.target.value;
      syncProjectUI();
    });
  }

  if (projectSearchInput) {
    projectSearchInput.addEventListener("input", (event) => {
      projectState.search = event.target.value.trim().toLowerCase();
      syncProjectUI();
    });
  }
};

if (welcomeMessage) {
  const hour = new Date().getHours();
  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 || hour < 5) greeting = "Good Evening";

  welcomeMessage.textContent = greeting;
}

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      gsap.fromTo(mobileMenu, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
      mobileMenuButton.innerHTML = '<i data-lucide="x" width="20"></i>';
    } else {
      gsap.to(mobileMenu, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => mobileMenu.classList.add("hidden"),
      });
      mobileMenuButton.innerHTML = '<i data-lucide="menu" width="20"></i>';
    }

    lucide.createIcons();
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nMessage:\n${formData.get("message")}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio Inquiry&body=${encodeURIComponent(body)}`;
  });
}

const init = () => {
  initHeroAnimations();
  initScrollReveals();
  initMagneticButtons();
  initParallaxBlobs();
  initStatCounters();
  initValueCardEffects();
  initProjectControls();
  loadProjectGithubData();
  lucide.createIcons();
};

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});
