# SWE363 Portfolio

This project is a modern, responsive portfolio website built with HTML, Tailwind CSS, and JavaScript. It presents personal information, featured projects, and contact details through an interactive interface that was extended for Assignment 3 with API integration, stronger application logic, state persistence, and updated documentation.

## Features

- **Responsive Layout**: Adapts across mobile, tablet, and desktop screen sizes.
- **GitHub API Integration**: Loads repository metadata and recent activity for featured projects.
- **Project Explorer Logic**: Supports project search, stack filtering, and multiple sorting modes.
- **State Persistence**: Remembers theme and project explorer preferences using `localStorage`.
- **Validated Contact Flow**: Validates contact fields before opening a prefilled email draft.
- **Graduation Countdown**: Displays a live countdown to the expected graduation date in May 2027.
- **CSS-Based Motion**: Uses staged hero motion, hover transitions, and reduced-motion-safe interactions.

## Assignment 3 Checklist

The following checklist summarizes the Assignment 3 requirements implemented in this project, based on `portfolio assignment-3.md`:

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

AI tools were used to support requirement analysis, implementation planning, UI refinement, debugging, and documentation. Suggestions were reviewed, adapted, and tested manually before being kept in the project.

### Tools Used

- **AI Assistant**: Requirement analysis, implementation support, debugging, and documentation updates.
- **GitHub Copilot**: Inline suggestions and repetitive code completion.
- **Design-Oriented AI Support**: UI refinement for hero, projects, and contact sections.

For detailed AI usage information, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Live Deployment

- **GitHub Pages**: `TBD`

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Lucide](https://lucide.dev/) for the icon set used across the interface.
- [GitHub REST API](https://docs.github.com/en/rest) for live repository metadata.
- AI tools for implementation support, UI refinement, and documentation assistance.
