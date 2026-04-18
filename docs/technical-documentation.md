# SWE363 Portfolio - Technical Documentation

## 1. Project Overview

This portfolio is a single-page personal website built for SWE363 Assignment 3. The project keeps the existing visual identity from the earlier assignment and adds more advanced functionality to meet the new requirements.

The main Assignment 3 enhancement is a live GitHub repository explorer that fetches public repositories from GitHub and renders them dynamically on the page. Visitors can change the repository view through filtering and sorting controls, while the application stores their preferences locally.

## 2. Technology Stack

- **HTML5**: Semantic page structure and form markup.
- **Tailwind CSS v4**: Core layout, spacing, color, and responsive styling.
- **Custom CSS**: Additional component styling for project cards, GitHub cards, and themed UI controls.
- **Vanilla JavaScript**: API integration, state management, form handling, and UI updates.
- **Vite**: Development server and production bundling.
- **GSAP + ScrollTrigger**: Hero animation, section reveal effects, counters, parallax blobs, and horizontal project scroll.
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

- requests public repositories
- handles non-success responses
- shows loading, error, and empty states
- renders repository cards dynamically into the GitHub section

### Complex Logic

The GitHub explorer demonstrates multi-step client-side logic by combining:

- dynamic language filtering
- multiple sorting options
- a 6-item result limit applied after filtering and sorting

This creates a more advanced interaction than a simple one-click action because the result set changes based on several active conditions.

### State Management

The project stores interface preferences in `localStorage`.

- `portfolio-theme` stores the selected light or dark theme.
- `portfolio-github-preferences` stores the chosen GitHub language filter and sort option.

This allows the portfolio to restore the user’s last selected view when they revisit or refresh the page.

### Performance and UX

The site keeps the new feature lightweight by using a single GitHub API request and client-side rendering. Existing animations remain intact, and the repository explorer uses clear UI feedback states so visitors understand what is happening.

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
- horizontal project scrolling on desktop
- animated counters in the About section

### GitHub API Module

The GitHub-related logic in `main.js` performs these steps:

1. Read saved GitHub preferences from `localStorage`.
2. Fetch repository data from GitHub.
3. Build language filter options dynamically from the returned repository data.
4. Filter and sort repositories based on the selected UI controls.
5. Limit the visible set to the 6 most relevant repositories in the current view.
6. Render repository cards into the page.
7. Persist updated preferences after each interaction.
8. Show friendly fallback feedback if the API request fails.

## 7. GitHub Repository Card Data

Each rendered GitHub card may display:

- repository name
- description
- primary language
- last updated date
- star count
- fork count
- visibility
- repository link
- live demo link when a homepage URL exists

## 8. Styling Notes

The project uses Tailwind for most layout and spacing, while `css/styles.css` includes custom component styling for:

- animated project cards
- stat cards and value cards
- horizontal projects section
- GitHub controls
- GitHub feedback states
- GitHub repository cards
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
