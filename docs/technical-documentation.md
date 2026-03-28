# SWE363 Portfolio - Technical Documentation

## 1. Project Overview

The SWE363 Portfolio is a modern, responsive personal portfolio website designed to present projects, technical skills, and contact information in a clear and visually engaging format. The interface uses a glassmorphism-inspired aesthetic and is structured to work effectively across different device sizes.

For Assignment 2, the project was extended with interactive features that improve usability and user feedback, including hover effects, scroll-triggered reveal animations, and a validated contact form that opens a prefilled email draft.

The project is implemented using modern web standards with an emphasis on readability, maintainability, and responsive behavior.

## 2. Technology Stack

- **HTML5**: Semantic markup for structure, forms, and accessibility.
- **Tailwind CSS (v4)**: Utility-first CSS framework for styling, transitions, and animation utilities.
- **Vanilla JavaScript**: Lightweight interactions and dynamic behavior, including section reveals, contact form handling, and UI state updates.
- **Lucide Icons**: Simple and consistent icon library.
- **Font Awesome**: Social and contact icons used in the footer.

## 3. Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 4. Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    This project uses Tailwind CSS through npm.
    ```bash
    npm install
    ```

## 5. Development

To start the development server and watch for CSS changes:

```bash
npm run dev
```

This command runs the Tailwind CLI to compile `css/styles.css` into `css/output.css` and watches for changes during development.

> **Note**: Open `index.html` in a browser to view the site. Using a local development server such as Live Server is recommended.

## 6. Project Structure

```text
SWE363-portfolio/
├── assets/              # Images and static assets
├── css/
│   ├── styles.css       # Source CSS file with Tailwind directives, themes, and animation tokens
│   └── output.css       # Compiled CSS (do not edit directly)
├── docs/                # Documentation files
├── js/
│   └── script.js        # JavaScript for theme, search, section reveals, and contact form behavior
├── index.html           # Main entry point
└── package.json         # Project metadata, Tailwind CLI dependencies, and scripts
```

## 7. Assignment 2 Interactive Features

### Dynamic Content and Navigation

- The hero section includes a dynamic greeting that changes based on the current time of day.
- The main navigation links allow users to move directly between the `Home`, `About`, `Projects`, and `Contact` sections.
- On smaller screens, the mobile navigation menu uses show/hide behavior for a clearer and more usable responsive layout.

### Data Handling

- The project search input filters project cards live as the user types.
- Theme preference is stored in `localStorage`, allowing the selected theme to persist across visits.
- The contact form validates `name`, `email`, `subject`, and `message` before submission.
- After validation passes, JavaScript builds a `mailto:` link that opens the user's default email client with a prefilled draft to `jassim.m.alhumaid@gmail.com`.
- The `mailto:` workflow depends on the visitor having a configured email client and is intended as a lightweight contact solution.

### Animation and Transitions

- Primary call-to-action buttons such as `Download CV` and `Send Message` use smoother hover transitions.
- Project cards and footer social icons also include interactive hover feedback.
- Section content for Home, About, Projects, and Contact reveals when the user scrolls into that section.
- The reveal system uses `IntersectionObserver` in `js/script.js` and animation tokens defined in `css/styles.css`.
- Animations play once per section and respect reduced-motion preferences.

### User Feedback and Empty States

- Invalid or incomplete contact form inputs trigger browser-native validation feedback.
- The projects section includes live status text and an empty-state message when no projects match the search query.
- These behaviors provide immediate feedback and help users understand what happened and what to do next.

## 8. Customization

### Colors

The project uses CSS variables defined in `css/styles.css` to simplify theming and visual adjustments.

```css
@theme {
  --color-primary: #101322;
  --color-blob: #151e4b;
  --color-foreground: #d1d5db;
  --color-blue: #5161f0;
  --color-purple: #c5a3f7;
}
```

Update these values to change the color scheme globally.

### Content

- **Portfolio Items**: Edit the "Projects" section in `index.html`.
- **Bio/Skills**: Update the "About" and "Hero" sections in `index.html`.
- **Dynamic Greeting**: Modify the logic in `js/script.js` to change how the greeting behaves.
- **Contact Recipient**: Update `CONTACT_EMAIL` in `js/script.js` to change the destination email address.
