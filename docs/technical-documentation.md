# SWE363 Portfolio - Technical Documentation

## 1. Project Overview

This portfolio is a single-page personal website built for SWE363 Assignment 3. The project keeps the existing visual identity from the earlier assignment and adds more advanced functionality to meet the new requirements.

The main Assignment 3 enhancement is an integrated projects explorer. Instead of separating curated projects from GitHub data, the portfolio now fetches repository information from GitHub and injects relevant metadata directly into the featured project cards. Visitors can filter and sort the project grid while the application stores their preferences locally.

## 2. Technology Stack

- **HTML5**: Semantic page structure and form markup.
- **Tailwind CSS v4**: Core layout, spacing, color, and responsive styling.
- **Custom CSS**: Additional component styling for project cards, metadata rows, and themed UI controls.
- **Vanilla JavaScript**: API integration, state management, form handling, and UI updates.
- **Vite**: Development server and production bundling.
- **GSAP + ScrollTrigger**: Hero animation, section reveal effects, counters, and parallax blobs.
- **Lucide + Font Awesome**: Icons used throughout the interface.

## 3. Project Structure

```text
SWE363-portfolio-1/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── CV/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── package.json
└── vite.config.js
```

## 4. Setup and Development

1. Install dependencies:

```bash
npm install
```

2. Start the local development server:

```bash
npm run dev
```

3. Build the production version:

```bash
npm run build
```

## 5. Assignment 3 Requirements Mapping

### API Integration

The site connects to the GitHub REST API using a `fetch` request in `js/main.js`.

Endpoint used:

```text
https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
```

The application:

- requests repository data from GitHub
- handles non-success responses
- shows loading, error, and empty states
- maps repository metadata into the featured project cards

### Complex Logic

The projects explorer demonstrates multi-step client-side logic by combining:

- filtering by technology stack
- multiple sorting options
- GitHub-based ranking using stars and recent activity

This creates a more advanced interaction than a simple one-click action because the visible order and contents of the project grid change based on several active conditions.

### State Management

The project stores interface preferences in `localStorage`.

- `portfolio-theme` stores the selected light or dark theme.
- `portfolio-project-preferences` stores the chosen project filter and sort option.

This allows the portfolio to restore the user’s last selected view when they revisit or refresh the page.

### Performance and UX

The site keeps the new feature lightweight by using one repository request and targeted commit-count requests only for matched projects. Existing animations remain intact, and the integrated project explorer uses clear UI feedback states so visitors understand what is happening.

The current implementation also avoids full-page reloads for filter and sort interactions.

## 6. Main JavaScript Responsibilities

`js/main.js` contains the application logic.

### Theme Management

- applies the saved theme or system preference
- toggles theme icon visibility
- animates background color transitions with GSAP

### Portfolio Interactions

- dynamic greeting based on current time
- mobile navigation menu toggle
- hero animation sequence
- section reveal animations
- parallax background blob motion
- animated counters in the About section

### Project Explorer Module

The projects logic in `main.js` performs these steps:

1. Read saved project preferences from `localStorage`.
2. Fetch repository data from GitHub.
3. Match GitHub repositories to curated featured projects.
4. Fetch commit counts only for matched repositories.
5. Filter and sort the project cards based on the selected controls.
6. Render GitHub metadata into each project card.
7. Persist updated preferences after each interaction.
8. Show friendly fallback feedback if the API request fails.

## 7. Project Card Metadata

Each featured project card may display:

- repository link
- star count
- commit count
- last commit date

## 8. Styling Notes

The project uses Tailwind for most layout and spacing, while `css/styles.css` includes custom component styling for:

- animated project cards
- stat cards and value cards
- project explorer controls
- project feedback states
- project metadata rows
- theme-sensitive surface colors

## 9. Error Handling

GitHub API failures are handled in the UI instead of silently failing.

Examples:

- rate-limit or request failure shows a friendly error message
- empty filter results show a helpful empty-state card
- loading state informs the visitor that data is being fetched

## 10. Contact Flow

The contact form currently uses a `mailto:` flow. When submitted, JavaScript builds a prefilled email draft addressed to `jassim.m.alhumaid@gmail.com`.

This is lightweight and works without a backend, but it depends on the visitor having a configured mail client.

## 11. Maintainability Notes

The Assignment 3 changes were added without restructuring the entire portfolio. This keeps the implementation small and easier to follow while still introducing advanced functionality in a focused way.
