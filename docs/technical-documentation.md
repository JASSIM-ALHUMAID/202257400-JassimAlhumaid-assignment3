# SWE363 Portfolio - Technical Documentation

## 1. Project Overview

The SWE363 Portfolio is a single-page personal website used to present my projects, background, and contact information in one place. The interface keeps the glass-style look from the earlier assignment, but the Assignment 3 work focused more on behavior than on redesigning the whole site.

For Assignment 3, the main addition is a GitHub-powered projects section. Instead of replacing the curated cards with a plain repositories list, the site fetches live GitHub data and merges it into the existing featured projects. That made the portfolio feel more dynamic without losing the original presentation.

The rest of the work follows the same idea: keep the interface familiar, then add stronger logic through filtering, sorting, validation, caching, and small dynamic elements like the graduation countdown.

## 2. Technology Stack

- **HTML5**: Semantic markup for structure, forms, and accessibility.
- **Tailwind CSS (v4)**: Utility-first styling, transitions, layout, and responsive behavior.
- **Custom CSS**: Theme variables, hero motion, project components, countdown card, and feedback styling.
- **Vanilla JavaScript**: API integration, filtering, sorting, state persistence, countdown logic, and contact form behavior.
- **Vite**: Development server, asset handling, and production bundling.
- **Lucide Icons**: General interface icons rendered as inline SVG.
- **Local SVG Brand Assets**: Official GitHub and LinkedIn icons used in the footer.

## 3. Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 4. Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd SWE363-portfolio-1
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## 5. Development

To start the development server:

```bash
npm run dev
```

To build the production version:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 6. Project Structure

```text
SWE363-portfolio-1/
├── assets/                    # Images, SVG assets, and CV
├── css/
│   └── styles.css             # Source CSS with themes, components, and animation rules
├── docs/                      # Documentation files
├── js/
│   └── main.js                # Theme, API, project logic, countdown, and contact behavior
├── template/                  # Template documentation reference files
├── index.html                 # Main entry point
├── package.json               # Project metadata, dependencies, and scripts
├── vite.config.js             # Vite configuration
└── portfolio assignment-3.md  # Assignment brief
```

## 7. Assignment 3 Features

### API Integration

- The portfolio fetches public repository data from the GitHub REST API.
- Endpoint used:

  ```text
  https://api.github.com/users/JASSIM-ALHUMAID/repos?per_page=100&sort=updated
  ```

- The fetched data is matched to curated cards such as `Portfolio Website`, `KFUPM Campus Route Visualizer`, and the other featured projects already shown in the UI.
- Additional commit metadata is fetched only for matched repositories.
- Live GitHub data is used to display descriptions, star counts, and recent activity.

### Complex Logic

- The projects section supports search, stack filtering, and multiple sorting modes at the same time.
- The contact form validates `name`, `email`, and `message` before allowing submission.
- The form builds a prefilled `mailto:` draft only after validation passes.
- A graduation countdown calculates remaining time until May 2027 and updates the hero section dynamically.

### State Management

- Theme preference is stored in `localStorage`.
- Project search, filter, and sort preferences are stored in `localStorage`.
- GitHub metadata is cached in `localStorage` to reduce repeated API calls and make the project section more resilient when GitHub is temporarily unavailable.

### Performance

- Project images are stored as optimized `.webp` files.
- GitHub metadata is cached locally to reduce repeat requests.
- Commit count requests are limited to repositories that match featured cards.
- UI updates happen client-side without full page reloads.

## 8. Section-by-Section Technical Notes

### Navigation Section

- Desktop and mobile navigation support quick movement between `Home`, `About`, `Projects`, and `Contact`.
- The mobile menu uses show/hide behavior with animated state changes.
- Active section highlighting is handled with `IntersectionObserver`.

### Hero Section

- Displays a greeting that changes based on the current time of day.
- Uses CSS-based staged entrance motion for the badge, headline, copy, actions, countdown, and quick highlights.
- Includes a graduation countdown card for the expected graduation date in May 2027.

### About Section

- Uses reveal animations and grouped content cards for biography, focus areas, and stats.
- Keeps the section collapsible for interaction consistency with other sections.

### Projects Section

- Combines curated project cards with live GitHub repository metadata.
- Supports project search, stack filtering, and sorting by activity, stars, and name.
- Includes loading, error, and empty-state feedback blocks so the section still explains what is happening when GitHub data is delayed or unavailable.

### Contact Section

- Validates user input on the client side.
- Builds a `mailto:` draft addressed to `jassim.m.alhumaid@gmail.com`.
- Uses `subject` as the mail subject line and includes sender details plus message in the draft body.
- This stayed as a `mailto:` flow instead of adding a backend form handler because the assignment did not require a backend service.

### Footer Section

- Uses official GitHub and LinkedIn SVG assets for brand-accurate social icons.
- Keeps email icon separate as a general utility icon.

## 9. Data Handling and Error States

- Non-success GitHub responses are handled explicitly in JavaScript.
- GitHub rate-limit cases show a friendly error message instead of breaking the UI.
- If cached GitHub data exists, the site can still render project metadata while fresh data is unavailable.
- Empty filter/search results show a dedicated empty-state message.

## 10. Customization

### Colors and Visual Styling

The project uses theme variables in `css/styles.css` to control colors, surfaces, borders, and hover behavior.

Examples include:

- `--color-primary`
- `--color-blue`
- `--color-purple`
- `--surface-color`
- `--surface-border-color`

Updating these values changes the visual theme globally.

### Content

- **Portfolio Items**: Edit the Projects section in `index.html` and the project mapping logic in `js/main.js`.
- **Bio and Hero Text**: Update the Home and About sections in `index.html`.
- **Graduation Date**: Update `GRADUATION_TARGET_DATE` in `js/main.js`.
- **Contact Recipient**: Update `CONTACT_EMAIL` in `js/main.js`.
- **GitHub Username**: Update `GITHUB_USERNAME` in `js/main.js`.

## 11. Maintainability Notes

The project keeps all Assignment 3 functionality inside one front-end codebase without introducing a backend or extra heavy libraries. That choice kept the implementation smaller and easier to explain while still covering the assignment requirements through:

- reusable local storage helpers
- centralized project rendering logic
- explicit feedback states
- small dynamic additions such as the graduation countdown

## 12. Known Constraints

- GitHub API requests may be rate-limited.
- The contact flow depends on the visitor having access to a mail client because it uses `mailto:`.
- The portfolio stays usable even when live GitHub metadata is temporarily unavailable.
