# SWE363 Portfolio

This project is my SWE363 Assignment 3 portfolio website. It keeps the single-page portfolio structure from the earlier assignment, then extends it with live GitHub data, stronger client-side logic, saved UI preferences, and updated documentation.

## Features

- **Responsive Layout**: Adapts across mobile, tablet, and desktop screen sizes.
- **GitHub API Integration**: Pulls live repository metadata and recent activity into the featured projects area.
- **Project Explorer Logic**: Supports project search, stack filtering, and multiple sorting modes.
- **State Persistence**: Remembers theme and project explorer preferences using `localStorage`.
- **Validated Contact Flow**: Validates contact fields before opening a prefilled email draft.
- **Graduation Countdown**: Displays a live countdown to the expected graduation date in May 2027.
- **CSS-Based Motion**: Uses staged hero motion, hover transitions, and reduced-motion-safe interactions without adding another animation library.

## Assignment 3 Checklist

The following checklist maps the current implementation to `portfolio assignment-3.md`:

- [x] Connected to an external API by fetching live repository data from the GitHub REST API.
- [x] Handled API failures with loading, error, and fallback UI states.
- [x] Added complex logic through project filtering, sorting, GitHub metadata mapping, contact validation, and graduation countdown behavior.
- [x] Used state management with `localStorage` for theme and project explorer preferences.
- [x] Applied performance improvements such as optimized images, GitHub response caching, and targeted metadata requests.
- [x] Documented AI usage in `docs/ai-usage-report.md`.
- [x] Updated `README.md` and technical documentation to match the final implementation.

## Tech Stack

- **HTML5**: Semantic page structure and accessible markup.
- **Tailwind CSS v4**: Utility-first styling, spacing, transitions, and responsive layout.
- **Custom CSS**: Hero motion, project card styling, countdown styling, and theme-sensitive surface design.
- **Vanilla JavaScript**: API integration, project logic, local state management, countdown logic, and contact validation.
- **Vite**: Development server and production build tooling.
- **Lucide Icons**: General iconography across the interface.
- **Official SVG Brand Assets**: GitHub and LinkedIn footer icons.

## Project Structure

```text
SWE363-portfolio-1/
├── index.html                         # Main HTML file
├── css/
│   └── styles.css                     # Custom styles, themes, and animations
├── js/
│   └── main.js                        # API logic, state, countdown, and UI behavior
├── assets/
│   ├── CV/                            # Resume PDF
│   └── images/                        # Project images and SVG assets
├── docs/
│   ├── ai-usage-report.md             # Detailed AI usage documentation
│   └── technical-documentation.md     # Technical implementation details
├── template/                          # Template docs used as documentation reference
├── package.json                       # Project dependencies and scripts
├── vite.config.js                     # Vite configuration
└── portfolio assignment-3.md          # Assignment brief
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd SWE363-portfolio-1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Open the local Vite URL shown in the terminal.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## AI Usage Summary

AI tools were used to compare solutions, speed up repetitive edits, refine UI details, and help rewrite documentation. Suggestions were reviewed, adjusted, and tested manually before being kept in the project.

### Tools Used

- **AI Assistant**: Requirement analysis, implementation support, debugging, and documentation updates.
- **GitHub Copilot**: Inline suggestions and repetitive code completion.
- **Design-Oriented AI Support**: UI refinement for the hero, projects, contact, and footer sections.

For detailed AI usage information, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Live Deployment

- **GitHub Pages**: https://jassim-alhumaid.github.io/202257400-JassimAlhumaid-assignment3/

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Lucide](https://lucide.dev/) for the icon set used across the interface.
- [GitHub REST API](https://docs.github.com/en/rest) for live repository metadata used in the projects section.
- AI tools for implementation support, UI refinement, and documentation assistance.
