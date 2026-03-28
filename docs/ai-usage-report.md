# AI Usage Report

## 1. Overview

AI tools were used throughout this project to support design exploration, implementation, debugging, refinement, and documentation. The goal of using AI was to improve development speed and code quality while still understanding and reviewing each change before it was added to the portfolio.

## 2. Tools Used

- **Google Stitch**: Used for early layout exploration and general visual direction.
- **AI Assistant**: Used for implementation support, debugging, UI/UX refinement, animation planning, validation logic, and documentation updates.
- **GitHub Copilot**: Used for inline code suggestions, repetitive markup completion, and small JavaScript assistance.

## 3. How AI Was Used

AI was used as a support tool rather than a replacement for development. Suggestions were reviewed, adapted, and integrated manually to fit the portfolio structure, assignment requirements, and desired user experience.

The main areas where AI assistance was used include:

- layout and styling decisions
- responsive design refinement
- JavaScript interactivity
- animation planning and tuning
- form validation and contact flow
- documentation updates

## 4. Section-by-Section Contributions

### Navigation Section

- AI assisted with improving the responsive navigation structure for both desktop and mobile layouts.
- AI helped refine the mobile menu show/hide behavior and the theme toggle interaction.
- AI also supported the addition of theme persistence using `localStorage` so the selected theme remains consistent across visits.

### Hero Section

- Google Stitch influenced the initial hero composition and general visual layout.
- AI helped refine the decorative blob background, spacing, and typography balance in the hero area.
- AI also assisted with the time-based greeting logic and the hover treatment for the `Download CV` button.
- Later refinements included adjusting reveal timing and replacing overly aggressive button motion with a smoother hover effect.

### About Section

- AI supported layout cleanup and responsiveness improvements in the About section.
- AI helped organize the content hierarchy for the biography and toolkit/focus items.
- AI also contributed to the reveal animation setup so the section enters more smoothly as users scroll.

### Projects Section

- AI helped structure the project cards for consistency in layout, spacing, and hover behavior.
- AI assisted in selecting and coordinating icon styling and accent colors for the project cards.
- AI supported implementation of the live search feature, the search status text, and the empty-state message when no projects match the query.
- GitHub Copilot was especially helpful for repetitive project card markup and utility class suggestions.

### Contact Section

- AI assisted with the layout and interaction design of the contact form.
- AI helped identify that the original form did not actually send anything and had limited validation.
- AI then supported the addition of validation for `name`, `email`, `subject`, and `message`, including required fields and minimum lengths.
- AI also helped implement the JavaScript-generated `mailto:` workflow so the form opens a prefilled email draft addressed to `jassim.m.alhumaid@gmail.com`.

### Footer Section

- AI helped refine the footer social links and hover behavior.
- AI also supported the use of Font Awesome icons for GitHub, LinkedIn, and email links in the footer.

## 5. Cross-Cutting Features

### Dynamic Content

- AI assisted with the time-based greeting shown in the hero section.
- AI also supported navigation behavior between sections using anchor links and responsive mobile menu interactions.

### Data Handling

- AI helped implement theme persistence with `localStorage`.
- AI supported live filtering of project cards using search input.
- AI also assisted with form validation and input handling in JavaScript.

### Animation and Transitions

- AI helped design hover effects for buttons, project cards, navigation links, and footer icons.
- AI assisted in defining custom animation tokens and keyframes in `css/styles.css`.
- AI also supported the move from page-load animation to section-entry animation using `IntersectionObserver`.
- Additional AI guidance was used to tune reveal timing, animation duration, and scroll trigger thresholds.

### Error Handling and User Feedback

- AI helped implement browser-native validation feedback for invalid or incomplete contact form inputs.
- AI supported the empty-state handling in the Projects section so users receive clear feedback when search results are empty.

## 6. Documentation Support

- AI was used to improve the structure and wording of `README.md`.
- AI was also used to update `docs/technical-documentation.md` so it reflects the Assignment 2 interactive features accurately.
- AI assisted in expanding this `docs/ai-usage-report.md` file to better document how AI contributed to each section of the project.

## 7. Review and Adaptation

All AI-generated suggestions were reviewed before being added to the project. In several cases, the AI output was modified to better match the intended behavior and design. Examples include:

- simplifying button hover effects when motion felt too strong
- changing section animations from page-load to scroll-triggered reveals
- increasing reveal timing to make animations easier to notice
- switching the contact form approach from a non-functional form to a validated `mailto:` workflow
- refining documentation wording to better match the final implementation

## 8. Reflection

AI tools were valuable for speeding up implementation, comparing alternatives, and improving the polish of the final portfolio. At the same time, the final decisions, testing, and integration work were handled manually to ensure the project remained understandable, functional, and aligned with the assignment requirements.
