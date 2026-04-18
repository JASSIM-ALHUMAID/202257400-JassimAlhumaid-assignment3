import "../css/styles.css";

const THEME_STORAGE_KEY = "portfolio-theme";
const PROJECT_PREFERENCES_KEY = "portfolio-project-preferences";
const PROJECT_GITHUB_CACHE_KEY = "portfolio-project-github-cache-v1";
const PROJECT_GITHUB_CACHE_TTL = 1000 * 60 * 60;
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";
const GITHUB_USERNAME = "JASSIM-ALHUMAID";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const ICONS = {
  menu: '<path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9Z"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-.09-1.4"/><path d="M9 22v-4a4.8 4.8 0 0 1 .09-1.4"/><path d="M12 2a10 10 0 0 0-3.16 19.49"/><path d="M15.16 21.49A10 10 0 0 0 12 2"/><path d="M8 18c-4.5 2-5-2-7-2"/><path d="M8 14c-1.5-4.5 3.5-4.5 4-7 .5 2.5 5.5 2.5 4 7"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z"/><rect width="4" height="12" x="2" y="9" rx="1"/><circle cx="4" cy="4" r="2"/>',
  mail: '<path d="m4 4 8 7 8-7"/><rect width="18" height="14" x="3" y="5" rx="2"/>',
  "arrow-down-to-line": '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  "folder-code": '<path d="M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8l-2-2Z"/><path d="m9.5 12-2 2 2 2"/><path d="m14.5 12 2 2-2 2"/>',
  "git-branch": '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  star: '<path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.6L12 18l-5.8 3 1.1-6.6L2.6 9.8l6.5-.9Z"/>',
  "code-2": '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1 1-1h8"/><path d="M21 18a1 1 0 0 0-1-1h-8"/><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4H12v14H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M20 6.5A2.5 2.5 0 0 0 17.5 4H12v14h5.5A2.5 2.5 0 0 1 20 20.5Z"/>',
  "graduation-cap": '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.015L12 18l-4.992 2.905 1.515-8.015"/>',
  "arrow-right": '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "git-fork": '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-6 8.48"/><path d="M6 9a9 9 0 0 0 6 8.48"/>',
  "arrow-up-right": '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  send: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4Z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  funnel: '<path d="M3 5h18"/><path d="M7 12h10"/><path d="M10 19h4"/>',
  "arrow-up-down": '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/><path d="M12 4v16"/>',
};

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
const contactFeedback = document.querySelector("[data-contact-feedback]");
const copyEmailButtons = Array.from(document.querySelectorAll("[data-copy-email]"));
const projectFilterSelect = document.querySelector("[data-project-filter]");
const projectSortSelect = document.querySelector("[data-project-sort]");
const projectSearchInput = document.querySelector("[data-project-search-input]");
const projectLoading = document.querySelector("[data-project-loading]");
const projectError = document.querySelector("[data-project-error]");
const projectErrorMessage = document.querySelector("[data-project-error-message]");
const projectEmpty = document.querySelector("[data-project-empty]");
const projectGrid = document.querySelector("[data-project-grid]");
const projectCards = Array.from(document.querySelectorAll("[data-project-card]"));
const sectionToggles = Array.from(document.querySelectorAll("[data-section-toggle]"));

const projectState = {
  filter: "all",
  sort: "activity",
  search: "",
  reposByProjectKey: {},
  commitCountsByRepo: {},
};

const supportsReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const normalizeName = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const safeLocalStorageGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeLocalStorageSet = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures in private mode or blocked storage.
  }
};

const safeLocalStorageRemove = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage failures in private mode or blocked storage.
  }
};

const setProjectBlockVisibility = (element, isVisible) => {
  if (!element) return;
  element.classList.toggle("hidden", !isVisible);
};

const createIconSvg = (name, width = 24, className = "") => {
  const icon = ICONS[name];
  if (!icon) return "";

  const cleanClassName = className.trim();
  const classAttribute = cleanClassName ? ` class="icon ${cleanClassName}"` : ' class="icon"';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${width}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${classAttribute}>${icon}</svg>`;
};

const renderIcons = (root = document) => {
  root.querySelectorAll("[data-lucide]").forEach((element) => {
    const name = element.dataset.lucide;
    const width = Number.parseInt(element.getAttribute("width") || "24", 10);
    const className = element.getAttribute("class") || "";
    const markup = createIconSvg(name, width, className);

    if (markup) {
      element.outerHTML = markup;
    }
  });
};

const setMobileMenuIcon = (isOpen) => {
  if (!mobileMenuButton) return;
  mobileMenuButton.innerHTML = createIconSvg(isOpen ? "x" : "menu", 20);
};

const saveProjectPreferences = () => {
  safeLocalStorageSet(
    PROJECT_PREFERENCES_KEY,
    JSON.stringify({
      filter: projectState.filter,
      sort: projectState.sort,
      search: projectState.search,
    })
  );
};

const loadProjectPreferences = () => {
  const raw = safeLocalStorageGet(PROJECT_PREFERENCES_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (parsed.filter) projectState.filter = parsed.filter;
    if (parsed.sort) projectState.sort = parsed.sort;
    if (parsed.search) projectState.search = parsed.search;
  } catch {
    safeLocalStorageRemove(PROJECT_PREFERENCES_KEY);
  }
};

const loadGithubCache = () => {
  const raw = safeLocalStorageGet(PROJECT_GITHUB_CACHE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.savedAt || Date.now() - parsed.savedAt > PROJECT_GITHUB_CACHE_TTL) {
      safeLocalStorageRemove(PROJECT_GITHUB_CACHE_KEY);
      return null;
    }
    return parsed;
  } catch {
    safeLocalStorageRemove(PROJECT_GITHUB_CACHE_KEY);
    return null;
  }
};

const saveGithubCache = () => {
  safeLocalStorageSet(
    PROJECT_GITHUB_CACHE_KEY,
    JSON.stringify({
      savedAt: Date.now(),
      reposByProjectKey: projectState.reposByProjectKey,
      commitCountsByRepo: projectState.commitCountsByRepo,
    })
  );
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
  safeLocalStorageSet(THEME_STORAGE_KEY, activeTheme);

  themeToggleButtons.forEach((button) => {
    const sunIcon = button.querySelector('[data-theme-icon="sun"]');
    const moonIcon = button.querySelector('[data-theme-icon="moon"]');

    if (sunIcon && moonIcon) {
      sunIcon.classList.toggle("hidden", activeTheme !== "dark");
      moonIcon.classList.toggle("hidden", activeTheme !== "light");
    }
  });
};

const revealElements = (selectors) => {
  const elements = Array.from(document.querySelectorAll(selectors));
  if (elements.length === 0) return;

  if (!("IntersectionObserver" in window) || supportsReducedMotion) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  elements.forEach((element) => observer.observe(element));
};

const animateCount = (countElement, target, suffix) => {
  if (!countElement) return;

  if (supportsReducedMotion) {
    countElement.textContent = `${target}${suffix}`;
    return;
  }

  const duration = 1200;
  const startTime = performance.now();

  const tick = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - (1 - progress) ** 3;
    countElement.textContent = `${Math.round(target * eased)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

const initStatCounters = () => {
  const statElements = document.querySelectorAll("[data-stat]");
  if (statElements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    statElements.forEach((stat) => {
      const countElement = stat.querySelector("[data-count]");
      animateCount(countElement, Number.parseInt(stat.dataset.target || "0", 10), stat.dataset.suffix || "");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const stat = entry.target;
        const countElement = stat.querySelector("[data-count]");
        const target = Number.parseInt(stat.dataset.target || "0", 10);
        const suffix = stat.dataset.suffix || "";

        stat.classList.add("is-visible");
        animateCount(countElement, target, suffix);
        observer.unobserve(stat);
      });
    },
    { threshold: 0.35 }
  );

  statElements.forEach((stat) => observer.observe(stat));
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
  if (!card) return;

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

  projectCards.forEach((card) => card.classList.add("hidden"));

  filteredCards.forEach((item) => {
    item.card.classList.remove("hidden");
    projectGrid.appendChild(item.card);
  });

  setProjectBlockVisibility(projectEmpty, filteredCards.length === 0);
  projectCards.forEach(updateProjectCardMeta);
};

const openProjectCardLink = (card) => {
  if (!card) return;

  const primaryLink = card.querySelector("[data-project-repo-link]");
  const href = primaryLink?.href;
  if (!href) return;

  window.open(href, "_blank", "noopener,noreferrer");
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
      updateProjectCardMeta(projectCards.find((card) => card.dataset.projectKey && projectState.reposByProjectKey[card.dataset.projectKey]?.full_name === repo.full_name));
    })
  );

  saveGithubCache();
};

const hydrateGithubCache = () => {
  const cache = loadGithubCache();
  if (!cache) return false;

  projectState.reposByProjectKey = cache.reposByProjectKey || {};
  projectState.commitCountsByRepo = cache.commitCountsByRepo || {};
  syncProjectUI();
  return true;
};

const loadProjectGithubData = async () => {
  if (!projectGrid) return;

  loadProjectPreferences();
  syncProjectUI();

  const hadCache = hydrateGithubCache();
  if (!hadCache) {
    setProjectBlockVisibility(projectLoading, true);
  }

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
    saveGithubCache();
    await ensureProjectCommitCounts();
  } catch (error) {
    setProjectBlockVisibility(projectLoading, false);

    if (!hadCache) {
      setProjectBlockVisibility(projectError, true);
      if (projectErrorMessage) {
        projectErrorMessage.textContent = error.message || "Project metadata could not be loaded from GitHub.";
      }
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

const initThemeToggle = () => {
  themeToggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = rootElement.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });

  const savedTheme = safeLocalStorageGet(THEME_STORAGE_KEY);
  const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  applyTheme(savedTheme || (prefersLightTheme ? "light" : "dark"));
};

const initMobileMenu = () => {
  if (!mobileMenuButton || !mobileMenu) return;

  let closeTimer = null;
  setMobileMenuIcon(false);

  const closeMenu = () => {
    if (!mobileMenu.classList.contains("is-open")) return;
    mobileMenu.classList.remove("is-open");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    setMobileMenuIcon(false);
    closeTimer = window.setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, supportsReducedMotion ? 0 : 250);
  };

  const openMenu = () => {
    mobileMenu.classList.remove("hidden");
    requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
    mobileMenuButton.setAttribute("aria-expanded", "true");
    setMobileMenuIcon(true);
  };

  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  });

  mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu.classList.contains("is-open")) return;
    if (mobileMenu.contains(event.target) || mobileMenuButton.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
};

const initGreeting = () => {
  if (!welcomeMessage) return;

  const hour = new Date().getHours();
  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) greeting = "Good Afternoon";
  else if (hour >= 17 || hour < 5) greeting = "Good Evening";

  welcomeMessage.textContent = greeting;
};

const initContactForm = () => {
  copyEmailButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.emailValue || CONTACT_EMAIL;

      try {
        await navigator.clipboard.writeText(email);
        if (contactFeedback) {
          contactFeedback.textContent = `Email copied: ${email}`;
        }
      } catch {
        if (contactFeedback) {
          contactFeedback.textContent = `Copy failed. Email: ${email}`;
        }
      }
    });
  });

  if (!contactForm) return;

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\nMessage:\n${formData.get("message")}`;
    if (contactFeedback) {
      contactFeedback.textContent = "Opening default email app with message prefilled.";
    }
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Portfolio Inquiry&body=${encodeURIComponent(body)}`;
  });
};

const setSectionCollapsed = (sectionId, collapsed) => {
  const toggle = document.querySelector(`[data-section-toggle="${sectionId}"]`);
  const content = document.querySelector(`[data-section-content="${sectionId}"]`);
  if (!toggle || !content) return;

  toggle.setAttribute("aria-expanded", String(!collapsed));
  content.classList.toggle("is-collapsed", collapsed);
  content.classList.toggle("is-expanded", !collapsed);
  content.setAttribute("aria-hidden", String(collapsed));
};

const expandSectionFromHash = () => {
  const sectionId = window.location.hash.replace("#", "");
  if (!sectionId) return;
  if (!document.querySelector(`[data-section-content="${sectionId}"]`)) return;
  setSectionCollapsed(sectionId, false);
};

const initSectionToggles = () => {
  if (sectionToggles.length === 0) return;

  sectionToggles.forEach((toggle) => {
    const sectionId = toggle.dataset.sectionToggle;

    setSectionCollapsed(sectionId, false);

    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      setSectionCollapsed(sectionId, isExpanded);
    });
  });

  expandSectionFromHash();
  window.addEventListener("hashchange", expandSectionFromHash);
};

const initProjectCardLinks = () => {
  projectCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("a, button, input, select, textarea")) return;
      openProjectCardLink(card);
    });

    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openProjectCardLink(card);
    });
  });
};

const defer = (callback) => {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(callback, { timeout: 1200 });
    return;
  }
  window.setTimeout(callback, 0);
};

const init = () => {
  renderIcons();
  initThemeToggle();
  initGreeting();
  initMobileMenu();
  initSectionToggles();
  initContactForm();
  initProjectControls();
  initProjectCardLinks();
  revealElements("[data-reveal]");
  initStatCounters();
  syncProjectUI();
  defer(loadProjectGithubData);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
