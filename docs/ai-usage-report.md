# AI Usage Report

## 1. Overview

AI tools were used throughout this project to support requirement analysis, implementation, debugging, refinement, and documentation. The goal of using AI was to improve development speed and code quality while still understanding and reviewing each change before it was added to the portfolio.

## 2. Tools Used

- **AI Assistant**: Used for requirement analysis, implementation support, debugging, UI/UX refinement, animation planning, validation logic, and documentation updates.
- **GitHub Copilot**: Used for inline code suggestions, repetitive markup completion, and small JavaScript assistance.
- **Design-Oriented AI Support**: Used to compare UI options for the hero, projects, contact, and footer sections.

## 3. How AI Was Used

AI was used as a support tool rather than a replacement for development. Suggestions were reviewed, adapted, and integrated manually to fit the portfolio structure, Assignment 3 requirements, and desired user experience.

The main areas where AI assistance was used include:

- comparing the current project against Assignment 3 requirements
- planning GitHub API integration for the projects section
- refining filtering, sorting, caching, and state logic
- improving contact form validation and mailto flow
- tuning hero motion and other interaction details
- updating documentation to match the final implementation

## 4. Section-by-Section Contributions

### Navigation Section

- AI assisted with improving the responsive navigation structure for both desktop and mobile layouts.
- AI helped refine active section highlighting and the mobile menu show/hide behavior.
- AI also supported theme persistence using `localStorage` so the selected theme remains consistent across visits.

### Hero Section

- AI helped refine spacing, typography balance, and the decorative blob background.
- AI assisted with the time-based greeting logic.
- AI also supported the CSS-based staged entrance motion and the graduation countdown card for May 2027.

### About Section

- AI supported layout cleanup and responsiveness improvements in the About section.
- AI helped organize content hierarchy for biography, focus areas, and stat cards.
- AI also contributed to reveal motion and small visual polish decisions.

### Projects Section

- AI helped plan the GitHub API integration so live metadata could be merged into curated project cards.
- AI assisted with search, filter, sort, and cached metadata behavior.
- AI also supported implementation of loading, empty, and error states for project feedback.
- GitHub Copilot was especially helpful for repetitive project card markup and utility class suggestions.

### Contact Section

- AI assisted with contact form layout and interaction design.
- AI helped identify that the form needed stronger validation.
- AI then supported validation for `name`, `email`, and `message`, plus subject handling in the prefilled draft.
- AI also helped implement the JavaScript-generated `mailto:` workflow addressed to `jassim.m.alhumaid@gmail.com`.

### Footer Section

- AI helped refine the footer social links and hover behavior.
- AI also supported the move from generic icon treatment to official GitHub and LinkedIn SVG brand assets.

## 5. Cross-Cutting Features

### Dynamic Content

- AI assisted with the time-based greeting shown in the hero section.
- AI also supported the graduation countdown and navigation behavior between sections.

### Data Handling

- AI helped implement theme persistence with `localStorage`.
- AI supported project search, filtering, sorting, and GitHub metadata caching.
- AI also assisted with form validation and input handling in JavaScript.

### Animation and Transitions

- AI helped design hover effects for buttons, cards, navigation links, and footer icons.
- AI assisted in defining custom animation tokens and keyframes in `css/styles.css`.
- AI also supported the CSS-only staged hero animation approach instead of adding an unnecessary animation library.

### Error Handling and User Feedback

- AI helped implement user-friendly GitHub loading, empty, and error states.
- AI supported validation feedback in the contact section so invalid or incomplete input does not open the email draft.

## 6. Documentation Support

- AI was used to improve the structure and wording of `README.md`.
- AI was also used to update `docs/technical-documentation.md` so it reflects Assignment 3 features accurately.
- AI assisted in expanding this `docs/ai-usage-report.md` file to document how AI contributed across the project.

## 7. Review and Adaptation

All AI-generated suggestions were reviewed before being added to the project. In several cases, the AI output was modified to better match the intended behavior and design. Examples include:

- choosing GitHub API integration because it is directly relevant to a portfolio website
- integrating GitHub metadata into curated project cards instead of adding a disconnected repositories section
- using CSS-based hero motion instead of introducing GSAP unnecessarily
- simplifying the contact section when earlier UI ideas felt too heavy
- correcting documentation when earlier drafts referenced outdated libraries or older assignment details

Builds and manual code review were used after changes to confirm that AI suggestions matched the actual codebase and did not introduce broken behavior.

## 8. Reflection

AI tools were valuable for speeding up implementation, comparing alternatives, and improving the polish of both the interface and the documentation. At the same time, the final decisions, testing, and integration work were handled manually to ensure the project remained understandable, functional, and aligned with Assignment 3 requirements.

This assignment reinforced that responsible AI use means understanding every suggested change, validating it in context, and modifying it when necessary to produce an original and correct result.
