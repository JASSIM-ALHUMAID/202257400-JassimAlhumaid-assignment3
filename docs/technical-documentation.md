# SWE363 Portfolio - Technical Documentation

## 1. Project Overview

This project is a single-page personal portfolio website built for SWE363 Assignment 3. It builds on an earlier portfolio and adds advanced front-end functionality to satisfy the new assignment requirements without changing the core structure of the site.

The main Assignment 3 enhancement is a GitHub-powered projects section. Instead of showing only static project cards, the portfolio fetches live repository data from GitHub and merges that data into curated featured projects. The site also includes client-side filtering and sorting, state persistence, form validation, and a dynamic graduation countdown.

## 2. Technology Stack

- **HTML5**: Semantic document structure, sections, lists, forms, and accessible attributes.
- **Tailwind CSS v4**: Utility-first layout, spacing, typography, responsiveness, and visual styling.
- **Custom CSS**: Component styling, hover states, transitions, hero motion, project cards, and theme-sensitive UI behavior.
- **Vanilla JavaScript**: API requests, state management, countdown logic, contact validation, DOM updates, and interaction logic.
- **Vite**: Development server, asset handling, and production bundling.
- **Lucide Icons**: General UI icons rendered into inline SVG.
- **Local SVG brand assets**: Official GitHub and LinkedIn icons used in the footer.

## 3. Project Structure

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

## 4. Setup and Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the production bundle:

```bash
npm run build
```

4. Preview the production build locally if needed:

```bash
npm run preview
```

## 5. Assignment 3 Requirements Mapping

### API Integration

The site integrates with the GitHub REST API to fetch public repository data related to the portfolio owner.

Primary endpoint:

```text
https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
```

The application uses fetched data to:

- match repositories to curated project cards
- display repository descriptions
- display star counts
- display repository activity dates
- support GitHub-aware sorting and metadata updates

GitHub commit metadata is requested only for matched repositories to avoid unnecessary requests.

### Complex Logic

The portfolio demonstrates multi-step client-side logic in several places:

1. **Projects explorer**
- filters projects by selected technology
- sorts projects by recent activity, stars, or name
- combines static portfolio data with live GitHub data
- updates visible cards without reloading the page

2. **Contact form**
- trims user input
- checks required fields
- validates email format
- prevents submission if validation fails
- opens a prefilled `mailto:` draft only after validation passes

3. **Graduation countdown**
- calculates remaining time until the target date in May 2027
- updates the display dynamically
- switches to `Graduated` after the target date passes

### State Management

The project manages and persists interface state with `localStorage`.

- `portfolio-theme` stores the selected theme
- `portfolio-project-preferences` stores filter, sort, and search state
- `portfolio-project-github-cache-v1` stores cached GitHub metadata and commit counts

This allows the site to restore theme and project preferences between visits while also reducing repeated API work.

### Performance

Performance-related decisions in the project include:

- using optimized `.webp` project images
- caching GitHub responses in `localStorage`
- fetching commit counts only for matched featured repositories
- updating project cards in-place instead of reloading the page
- bundling and optimizing assets through Vite

## 6. Main JavaScript Responsibilities

`js/main.js` contains the main application logic.

### Theme Management

- applies saved theme or system preference
- toggles theme icons
- stores theme choice in `localStorage`

### Hero Section Interactions

- renders greeting text based on current time
- triggers CSS-based staged hero entrance motion
- calculates and updates graduation countdown

### Navigation and Layout Interactions

- toggles mobile navigation menu
- tracks active navigation section with `IntersectionObserver`
- expands and collapses content sections

### Contact Form

- reads and trims form values
- validates name, email, and message
- builds a subject and body for the mail draft
- updates feedback text when validation fails or succeeds

### Project Explorer Module

The project explorer follows this flow:

1. Load saved project preferences.
2. Render the current UI state.
3. Hydrate cached GitHub data if available.
4. Fetch fresh repository data from GitHub.
5. Match repositories to curated cards.
6. Fetch commit counts for matched repositories.
7. Render metadata into cards.
8. Save the updated cache.
9. Re-render results when search, filter, or sort changes.

## 7. API Data Flow

The GitHub integration uses two main steps:

1. Fetch the public repositories list.
2. Fetch commit metadata only for repositories that match the featured projects.

This keeps the portfolio dynamic while staying lightweight enough for a front-end-only project.

## 8. UI Feedback States

The projects section includes explicit feedback states to make the API integration user-friendly.

- **Loading state**: indicates that GitHub metadata is being fetched.
- **Error state**: explains that repository insights are temporarily unavailable.
- **Empty state**: explains when no projects match the current filter or search.

These states help satisfy the assignment requirement for proper API error handling.

## 9. Styling Notes

The project uses Tailwind for most structure and spacing, while `css/styles.css` contains custom rules for:

- project card shells and metadata rows
- custom project filter and sort controls
- theme-sensitive surface colors
- hero stagger animations and scroll cue motion
- graduation countdown card
- section collapse transitions
- contact feedback styling

## 10. Contact Flow

The contact section uses a validated `mailto:` workflow rather than a backend form handler.

Form fields:

- Name
- Email
- Subject
- Message

Behavior:

- validates required fields before submission
- validates email format on the client side
- uses the subject field in the email subject line
- includes sender name, sender email, and message content in the generated draft body

This keeps the feature lightweight while still demonstrating more advanced form logic.

## 11. Maintainability Notes

The Assignment 3 enhancements were added by extending the existing portfolio instead of rebuilding it. This approach kept the codebase small and focused while still meeting the assignment requirements through:

- reusable state helpers
- centralized project rendering logic
- clear UI feedback blocks
- compact feature additions such as the graduation countdown

## 12. Known Constraints

- GitHub API requests may be rate-limited.
- The site remains functional when live GitHub data cannot be fetched.
- The contact form depends on the visitor having access to a mail client because it uses `mailto:` rather than a backend endpoint.
