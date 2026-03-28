# SWE363 Portfolio

This project is a modern, responsive portfolio website built with HTML, Tailwind CSS, and JavaScript. It presents personal information, skills, featured projects, and contact details through an interactive interface designed for Assignment 2.

## Features

- **Glassmorphism Design**: Uses layered transparency, blur, and soft shadows to create a modern visual style.
- **Responsive Layout**: Adapts cleanly across mobile, tablet, and desktop screen sizes.
- **Dynamic Content**: Displays a greeting that updates according to the time of day.
- **Project Showcase**: Presents featured projects with hover feedback, icons, and technology tags.

## Assignment 2 Checklist

The following checklist summarizes the Assignment 2 requirements implemented in this project, based on `portfolio assignment-2.md`:

- [x] Added a dynamic greeting that changes based on the time of day.
- [x] Added section navigation through the main navigation links for `Home`, `About`, `Projects`, and `Contact`.
- [x] Added show/hide behavior for interactive content, including the mobile navigation menu.
- [x] Added live project filtering through the search input.
- [x] Used `localStorage` to save the selected theme preference.
- [x] Added contact form validation for `name`, `email`, `subject`, and `message`.
- [x] Added smooth transitions, hover effects, and scroll-triggered reveal animations.
- [x] Added an empty-state message when no projects match the search query.

## Tech Stack

- **HTML5**: Semantic markup and accessible page structure.
- **Tailwind CSS v4.1.18**: Utility-first styling, transitions, and animation support.
- **JavaScript**: Dynamic behavior for theme handling, section reveals, search, and form submission.
- **Lucide Icons**: Consistent iconography across the interface.
- **Font Awesome**: Social and utility icons used in the footer and contact links.
- **GitHub Copilot**: AI-assisted support during development.

## Project Structure

```
SWE363-portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css          # Custom styles and Tailwind imports
│   └── output.css          # Compiled Tailwind CSS
├── js/
│   └── script.js           # JavaScript functionality
├── assets/
│   └── images/             # Project images and assets
├── docs/
│   ├── ai-usage-report.md  # Detailed AI usage documentation
│   └── technical-documentation.md  # Technical specifications
└── package.json            # Project dependencies and scripts
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/JASSIM-ALHUMAID/SWE363-portfolio.git
   cd SWE363-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development workflow**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Open `index.html` in your preferred browser.
   - A local development server such as Live Server is recommended.

### Build for Production

To generate the production CSS bundle:

```bash
npx tailwindcss -i ./css/styles.css -o ./css/output.css --minify
```

## AI Usage Summary

AI tools were used to support implementation, refinement, and documentation throughout the project.

### Tools Used

- **Google Stitch**: Initial design exploration and layout ideation.
- **AI Assistant**: Implementation support, refinement, and troubleshooting.
- **GitHub Copilot**: Code suggestions and auto-completion.

For detailed AI usage information, see [docs/ai-usage-report.md](docs/ai-usage-report.md).

## Live Deployment

The project is deployed at:

- **GitHub Pages**: (https://jassim-alhumaid.github.io/-202257400-JassimAlhumaid-assignment2/)

## Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework.
- [Lucide](https://lucide.dev/) for the icon set used throughout the interface.
- [GitHub Copilot](https://github.com/features/copilot) for AI-assisted development support.
- AI tools for design guidance, documentation support, and iterative refinement.

---
