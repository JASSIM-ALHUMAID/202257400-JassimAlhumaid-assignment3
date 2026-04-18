/**
 * SWE363 Portfolio - Main Script
 * Assignment 3 enhancements with GitHub API integration
 */

import "../css/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const THEME_STORAGE_KEY = "portfolio-theme";
const GITHUB_PREFERENCES_KEY = "portfolio-github-preferences";
const CONTACT_EMAIL = "jassim.m.alhumaid@gmail.com";
const GITHUB_USERNAME = "JASSIM-ALHUMAID";
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
const MAX_VISIBLE_GITHUB_REPOS = 6;

const rootElement = document.documentElement;
const welcomeMessage = document.getElementById("welcome-message");
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");
const contactForm = document.querySelector("[data-contact-form]");

const githubLanguageFilter = document.querySelector("[data-github-language-filter]");
const githubSortSelect = document.querySelector("[data-github-sort]");
const githubStatus = document.querySelector("[data-github-status]");
const githubLoading = document.querySelector("[data-github-loading]");
const githubError = document.querySelector("[data-github-error]");
const githubErrorMessage = document.querySelector("[data-github-error-message]");
const githubEmpty = document.querySelector("[data-github-empty]");
const githubGrid = document.querySelector("[data-github-grid]");

const githubState = {
  repos: [],
  language: "all",
  sort: "updated",
  commitCounts: {},
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

const initNavScroll = () => {
  const allProjectsLinks = document.querySelectorAll('a[href="#projects"]');

  allProjectsLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const scrollTrigger = ScrollTrigger.getById("projects-pin");

      if (scrollTrigger && window.innerWidth >= 768) {
        event.preventDefault();
        window.scrollTo({
          top: scrollTrigger.start,
          behavior: "smooth",
        });
      }
    });
  });
};

const initHeroAnimations = () => {
  const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });

  timeline
    .from("#site-nav div", { y: -50, opacity: 0, duration: 1.2 })
    .from("#home .inline-flex", { scale: 0.8, opacity: 0, duration: 0.8 }, "-=0.8")
    .from("#home h1", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
    .from("#home h2", { y: 30, opacity: 0, duration: 1 }, "-=0.6")
    .from("#home p", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8")
    .from("#home .flex-wrap a", { y: 20, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.6")
    .from("#home .absolute.bottom-12", { y: -20, opacity: 0, repeat: -1, yoyo: true, duration: 1.5 }, "-=0.2");
};

const initScrollReveals = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  revealItems.forEach((item) => {
    if (window.innerWidth >= 768 && (item.closest(".projects-track") || item.closest("#projects"))) {
      gsap.set(item, { opacity: 1, y: 0 });
      return;
    }

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
  const buttons = document.querySelectorAll("#home a, [data-contact-form] button");

  buttons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
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

const initHorizontalScroll = () => {
  const track = document.getElementById("projects-track");
  const section = document.getElementById("projects");

  if (!track || !section) return;

  const mediaMatch = gsap.matchMedia();

  mediaMatch.add("(min-width: 768px)", () => {
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    gsap.to(track, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${track.scrollWidth}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        pinSpacing: true,
        id: "projects-pin",
      },
    });

    return () => {
      const scrollTrigger = ScrollTrigger.getById("projects-pin");
      if (scrollTrigger) scrollTrigger.kill();
    };
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

const setGithubBlockVisibility = (element, isVisible) => {
  if (!element) return;
  element.classList.toggle("hidden", !isVisible);
};

const setGithubStatus = (message) => {
  if (githubStatus) githubStatus.textContent = message;
};

const saveGithubPreferences = () => {
  localStorage.setItem(
    GITHUB_PREFERENCES_KEY,
    JSON.stringify({
      language: githubState.language,
      sort: githubState.sort,
    })
  );
};

const loadGithubPreferences = () => {
  try {
    const rawPreferences = localStorage.getItem(GITHUB_PREFERENCES_KEY);
    if (!rawPreferences) return;

    const parsedPreferences = JSON.parse(rawPreferences);

    if (parsedPreferences.language) githubState.language = parsedPreferences.language;
    if (parsedPreferences.sort) githubState.sort = parsedPreferences.sort;
  } catch (error) {
    localStorage.removeItem(GITHUB_PREFERENCES_KEY);
  }
};

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatRepoDate = (dateValue) => {
  if (!dateValue) return "Unknown";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateValue));
};

const getRepoTopics = (repo) => {
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 3) : [];

  if (topics.length > 0) {
    return topics;
  }

  if (repo.language) {
    return [repo.language, "GitHub API"];
  }

  return ["Open Source"];
};

const getLanguageOptions = (repos) => {
  const languages = repos
    .map((repo) => repo.language)
    .filter(Boolean)
    .sort((left, right) => left.localeCompare(right));

  return ["all", ...new Set(languages)];
};

const getVisibleGithubRepos = () => {
  const filteredRepos = githubState.repos.filter((repo) => {
    return githubState.language === "all" || repo.language === githubState.language;
  });

  return filteredRepos.sort((left, right) => {
    if (githubState.sort === "name") {
      return left.name.localeCompare(right.name);
    }

    if (githubState.sort === "stars") {
      if (right.stargazers_count !== left.stargazers_count) {
        return right.stargazers_count - left.stargazers_count;
      }
      return new Date(right.updated_at) - new Date(left.updated_at);
    }

    return new Date(right.updated_at) - new Date(left.updated_at);
  }).slice(0, MAX_VISIBLE_GITHUB_REPOS);
};

const getCommitCountApiUrl = (repo) =>
  `https://api.github.com/repos/${encodeURIComponent(GITHUB_USERNAME)}/${encodeURIComponent(repo.name)}/commits?sha=${encodeURIComponent(repo.default_branch)}&per_page=1`;

const fetchRepoCommitCount = async (repo) => {
  const response = await fetch(getCommitCountApiUrl(repo), {
    headers: {
      Accept: "application/vnd.github+json",
    },
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

const ensureVisibleRepoCommitCounts = async () => {
  const visibleRepos = getVisibleGithubRepos();
  const reposMissingCounts = visibleRepos.filter((repo) => githubState.commitCounts[repo.full_name] === undefined);

  if (reposMissingCounts.length === 0) {
    return;
  }

  await Promise.all(
    reposMissingCounts.map(async (repo) => {
      const commitCount = await fetchRepoCommitCount(repo);
      githubState.commitCounts[repo.full_name] = commitCount;
    })
  );

  renderGithubRepos();
};

const renderGithubLanguageOptions = () => {
  if (!githubLanguageFilter) return;

  const languageOptions = getLanguageOptions(githubState.repos);

  githubLanguageFilter.innerHTML = languageOptions
    .map((language) => {
      const isSelected = githubState.language === language ? " selected" : "";
      const label = language === "all" ? "All languages" : language;
      return `<option value="${escapeHtml(language)}"${isSelected}>${escapeHtml(label)}</option>`;
    })
    .join("");
};

const renderGithubControls = () => {
  if (githubSortSelect) githubSortSelect.value = githubState.sort;
  if (githubLanguageFilter) githubLanguageFilter.value = githubState.language;
};

const renderGithubRepos = () => {
  if (!githubGrid) return;

  const visibleRepos = getVisibleGithubRepos();
  const totalRepos = githubState.repos.length;

  setGithubBlockVisibility(githubLoading, false);
  setGithubBlockVisibility(githubError, false);
  setGithubBlockVisibility(githubEmpty, visibleRepos.length === 0);
  githubGrid.innerHTML = "";

  if (visibleRepos.length === 0) {
    setGithubStatus(`0 of ${totalRepos} repositories match the current view.`);
    return;
  }

  setGithubStatus(`Showing ${visibleRepos.length} recent repositories from ${totalRepos} total.`);

  githubGrid.innerHTML = visibleRepos
    .map((repo) => {
      const repoDescription = repo.description || "No description provided for this repository yet.";
      const repoTopics = getRepoTopics(repo);
      const demoLink = repo.homepage
        ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noopener noreferrer" class="github-card-link github-card-link-secondary">Live Demo</a>`
        : "";

      return `
        <article class="github-card">
          <div class="github-card-topline">
            <span class="github-card-badge">${escapeHtml(repo.language || "Multi-stack")}</span>
            <span class="github-card-badge github-card-badge-muted">${escapeHtml(formatRepoDate(repo.pushed_at || repo.updated_at))}</span>
          </div>

          <div class="github-card-body">
            <div>
              <h3 class="github-card-title">${escapeHtml(repo.name)}</h3>
              <p class="github-card-description">${escapeHtml(repoDescription)}</p>
            </div>

            <div class="github-card-metrics" aria-label="Repository metrics">
              <span><i data-lucide="star" width="14"></i>${repo.stargazers_count}</span>
              <span><i data-lucide="git-fork" width="14"></i>${githubState.commitCounts[repo.full_name] ?? "..."}</span>
            </div>

            <div class="github-card-topics">
              ${repoTopics
                .map((topic) => `<span class="github-topic-pill">${escapeHtml(topic)}</span>`)
                .join("")}
            </div>
          </div>

          <div class="github-card-actions">
            <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="github-card-link">
              View Repository
            </a>
            ${demoLink}
          </div>
        </article>
      `;
    })
    .join("");

  lucide.createIcons();
};

const showGithubError = (message) => {
  if (githubErrorMessage) githubErrorMessage.textContent = message;

  setGithubBlockVisibility(githubLoading, false);
  setGithubBlockVisibility(githubEmpty, false);
  setGithubBlockVisibility(githubError, true);

  if (githubGrid) githubGrid.innerHTML = "";

  setGithubStatus("GitHub repositories could not be loaded.");
};

const syncGithubUI = () => {
  renderGithubControls();
  renderGithubRepos();
  saveGithubPreferences();
  ensureVisibleRepoCommitCounts();
};

const loadGithubRepos = async () => {
  if (!githubGrid) return;

  loadGithubPreferences();
  renderGithubControls();
  setGithubBlockVisibility(githubLoading, true);
  setGithubBlockVisibility(githubError, false);
  setGithubBlockVisibility(githubEmpty, false);
  setGithubStatus("Loading repositories from GitHub...");

  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("GitHub API rate limit reached. Please try again later or view the GitHub profile directly.");
      }

      throw new Error("GitHub returned an unexpected response while loading repositories.");
    }

    const repos = await response.json();

    githubState.repos = Array.isArray(repos) ? repos.filter((repo) => !repo.private) : [];
    renderGithubLanguageOptions();

    if (!getLanguageOptions(githubState.repos).includes(githubState.language)) {
      githubState.language = "all";
    }

    syncGithubUI();
  } catch (error) {
    showGithubError(error.message || "GitHub data is unavailable right now.");
  }
};

const initGithubControls = () => {
  if (githubLanguageFilter) {
    githubLanguageFilter.addEventListener("change", (event) => {
      githubState.language = event.target.value;
      syncGithubUI();
    });
  }

  if (githubSortSelect) {
    githubSortSelect.addEventListener("change", (event) => {
      githubState.sort = event.target.value;
      syncGithubUI();
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
  initHorizontalScroll();
  initNavScroll();
  initStatCounters();
  initValueCardEffects();
  initGithubControls();
  loadGithubRepos();
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
