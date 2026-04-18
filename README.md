# SWE363 Portfolio - Assignment 3

This project is a responsive personal portfolio website built for SWE363 Assignment 3. It extends the earlier portfolio with integrated GitHub API metadata, client-side project filtering and sorting logic, persisted UI state, and refreshed technical documentation.

## Project Description

The portfolio presents personal information, featured projects, and contact details in a polished single-page experience. Assignment 3 enhancements focus on advanced functionality rather than redesigning the full site.

The main addition is an integrated project explorer that fetches GitHub repository data and uses it inside the featured project cards. Visitors can:

- filter featured projects by technology
- sort featured projects by year, name, GitHub stars, or recent GitHub activity
- view GitHub metadata directly inside each project card
- keep their selected view using `localStorage`

## Assignment 3 Features

- **GitHub API Integration**: Loads repository data from GitHub using the REST API and maps it to curated portfolio cards.
- **User-Friendly Error Handling**: Shows loading, empty, and error states if GitHub metadata cannot be loaded.
- **Complex Logic**: Combines project filtering, multiple sorting rules, and GitHub activity data inside a single curated projects section.
- **State Management**: Persists theme preference and project explorer preferences with `localStorage`.
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

The portfolio fetches repository data from:

```text
https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
```

The page then applies client-side logic to:

- match GitHub repositories to curated featured projects
- load commit counts for matched repositories
- sort projects by multiple rules
- update the project grid without reloading the page

## AI Usage Summary

AI tools were used to support implementation, troubleshooting, and documentation. They were used as assistants for planning, refining code, and improving documentation quality rather than as a replacement for manual development.

Detailed information is available in `docs/ai-usage-report.md`.

## Documentation

- Technical details: `docs/technical-documentation.md`
- AI usage report: `docs/ai-usage-report.md`

## Live Deployment

- GitHub Pages: https://jassim-alhumaid.github.io/-202257400-JassimAlhumaid-assignment2/

## Notes

- The GitHub API may be temporarily limited by rate limits.
- If that happens, the portfolio still works and shows a fallback message for the missing metadata.
