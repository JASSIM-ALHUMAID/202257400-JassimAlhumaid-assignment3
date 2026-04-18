# SWE363 Portfolio - Assignment 3

This project is a single-page personal portfolio website built for SWE363 Assignment 3. It extends an earlier portfolio with advanced front-end functionality, external API integration, stronger client-side logic, local state persistence, and updated documentation.

## Project Description

The website presents personal information, featured projects, and contact details in a responsive portfolio experience. Assignment 3 focuses on adding practical application logic instead of redesigning the site from scratch.

The main enhancement is a GitHub-powered project explorer. The page fetches repository data from the GitHub REST API and uses it to enrich curated project cards with live metadata such as stars, recent activity, and repository descriptions.

## Assignment 3 Requirements Coverage

### 1. API Integration

- Uses the GitHub REST API to fetch public repository data.
- Displays meaningful portfolio-related data inside the projects section.
- Handles loading, empty, and error states with user-friendly feedback.

### 2. Complex Logic

- Filters projects by stack.
- Sorts projects by recent activity, stars, or name.
- Validates the contact form before opening the email draft.
- Shows a live graduation countdown in the hero section.

### 3. State Management

- Persists light/dark theme with `localStorage`.
- Persists project filter, sort, and search preferences with `localStorage`.
- Restores the saved UI state when the page reloads.

### 4. Performance

- Uses optimized `.webp` project images.
- Caches GitHub metadata in `localStorage` to reduce repeated API calls.
- Fetches commit counts only for matched repositories.
- Bundles assets with Vite for production.

## Key Features

- Responsive single-page portfolio layout
- GitHub repository metadata integration
- Project search, filter, and sort controls
- Loading, empty, and error states for GitHub data
- Theme toggle with persisted preference
- Contact form with validation and prefilled `mailto:` flow
- Graduation countdown for May 2027
- CSS-based hero animations and interactive UI polish

## Tech Stack

- **HTML5** for semantic markup
- **Tailwind CSS v4** for utility-first styling
- **Custom CSS** for component styling and animation details
- **Vanilla JavaScript** for API logic, state, validation, and UI updates
- **Vite** for development and production builds
- **Lucide Icons** for general UI icons
- **Official GitHub and LinkedIn SVG assets** for footer social icons

## Project Structure

```text
SWE363-portfolio-1/
├── README.md
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
├── portfolio assignment-3.md
└── vite.config.js
```

## Setup Instructions

### Prerequisites

- Node.js 18+ recommended
- npm

### Run Locally

1. Clone the repository.

```bash
git clone <repository-url>
cd SWE363-portfolio-1
```

2. Install dependencies.

```bash
npm install
```

3. Start the development server.

```bash
npm run dev
```

4. Open the local Vite URL shown in the terminal.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## GitHub API Integration Details

Primary endpoint used:

```text
https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
```

Additional commit metadata is fetched only for repositories matched to featured projects.

The application uses this API data to:

- match repositories to curated portfolio cards
- display repository descriptions
- display star counts
- display recent repository activity
- support sorting by GitHub-based criteria

If GitHub data cannot be loaded, the site still works and shows a friendly fallback message instead of breaking the page.

## User Experience Notes

- Project cards remain visible even if the API fails.
- Search, filter, and sort controls update the page without a full reload.
- The contact form validates user input before opening the email draft.
- The graduation countdown adds a small dynamic milestone without distracting from the main content.

## AI Usage Summary

AI tools were used to support implementation, troubleshooting, UI refinement, and documentation updates. They were used as assistants for ideation, comparison, debugging, and editing rather than as a replacement for manual development.

Detailed information is available in `docs/ai-usage-report.md`.

## Documentation

- Technical documentation: `docs/technical-documentation.md`
- AI usage report: `docs/ai-usage-report.md`

## Live Deployment

- GitHub Pages: `TBD`

## Notes

- GitHub API requests may occasionally be limited by GitHub rate limits.
- Cached GitHub metadata is used to reduce repeat requests and improve resilience.
- The portfolio is designed to remain usable even when live API data is unavailable.
