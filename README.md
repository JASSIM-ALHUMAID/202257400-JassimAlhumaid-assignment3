# SWE363 Portfolio - Assignment 3

This project is a responsive personal portfolio website built for SWE363 Assignment 3. It extends the earlier portfolio with live GitHub API integration, client-side filtering and sorting logic, persisted UI state, and refreshed technical documentation.

## Project Description

The portfolio presents personal information, featured projects, and contact details in a polished single-page experience. Assignment 3 enhancements focus on advanced functionality rather than redesigning the full site.

The main addition is a live GitHub repository explorer that fetches public repositories from the GitHub API and lets visitors:

- view the 6 most recent repositories
- filter repositories by language
- sort repositories by recently updated, name, or stars
- keep their selected view using `localStorage`

## Assignment 3 Features

- **GitHub API Integration**: Loads public repositories from GitHub using the REST API.
- **User-Friendly Error Handling**: Shows loading, empty, and error states if the API request is delayed, fails, or returns no matching repositories.
- **Complex Logic**: Combines API data, language filtering, result limiting, and multiple sorting rules to produce different repository views from the same dataset.
- **State Management**: Persists theme preference and GitHub explorer preferences with `localStorage`.
- **Responsive Design**: Works across mobile and desktop layouts while preserving the existing portfolio design language.
- **Interactive UI**: Includes GSAP-powered animation, counters, hover effects, and smooth transitions.

## Tech Stack

- **HTML5** for semantic structure
- **Tailwind CSS v4** for utility-first styling
- **Vanilla JavaScript** for interactive behavior and API logic
- **Vite** for development and production builds
- **GSAP + ScrollTrigger** for animation
- **Lucide Icons** and **Font Awesome** for iconography

## Project Structure

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
├── devfiles/
├── package.json
└── vite.config.js
```

## Setup Instructions

### Prerequisites

- Node.js 16+
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

## GitHub API Details

The live repository section fetches data from:

```text
https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
```

The page then applies client-side logic to:

- build the language filter options dynamically
- sort repositories by multiple rules
- limit the rendered output to the 6 most relevant repositories in the current view
- update the UI without reloading the page

## AI Usage Summary

AI tools were used to support implementation, troubleshooting, and documentation. They were used as assistants for planning, refining code, and improving documentation quality rather than as a replacement for manual development.

Detailed information is available in `docs/ai-usage-report.md`.

## Documentation

- Technical details: `docs/technical-documentation.md`
- AI usage report: `docs/ai-usage-report.md`

## Live Deployment

- GitHub Pages: https://jassim-alhumaid.github.io/-202257400-JassimAlhumaid-assignment2/

## Notes

- The GitHub API is public, so the repository feed may be temporarily limited by GitHub rate limits.
- If that happens, the site shows a fallback message and provides a direct link to the GitHub profile.
