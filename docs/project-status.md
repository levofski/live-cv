# Project Status

[GitHub Repository](https://github.com/levofski/live-cv)

The goal of the project is to create a live and dynamic webapp which acts as a CV (curriculum vitae).
The source data for the CV should be on the file-system, rather than in a database.

## Required Features
- Visually engaging and impressive
- Initially showing a brief version of the experience and job history information
- Ability to expand sections to view more detail
- Ability to download a PDF version of the CV, which is 2 pages, containing the brief version of the information

## Data Storage Strategy
The CV data will be stored using:
- **JSON files** for structured data (work experience, skills, education, etc.)
- **Markdown files** for longer-form content (personal statements, detailed project descriptions)

These files will be organized in a `/data` directory within the project structure.
*The initial data for these files should be sourced from `docs/cv-original.md`.*

## Visual Enhancement Strategies
### Dynamic Elements
- Interactive timeline for work history and education
- Animated skill charts and proficiency indicators
- Micro-interactions and subtle animations for engagement
- Card-based layout for experience and projects

### Progressive Disclosure UX
- Hierarchical information architecture with clear expansion cues
- Contextual detail expansion (read more toggles, modals for projects)
- Responsive design adapting information density to screen size
- Intuitive navigation with smooth scrolling between sections

### Technical Implementation Considerations
- Vue transitions and animations for smooth state changes
- Component-based expandable sections
- Optimized loading for performance
- Consistent visual language and professional color scheme
- **Project Structure:**
    - Use Vite for the build tool and dev server.
    - Organize components in `src/components`.
    - Use `src/views` for page-level components.
    - Store CV data in `src/data` (JSON and Markdown files).
    - Place static assets in `src/assets`.
    - Consider `src/router/` for Vue Router if multiple pages are needed.
    - Use Pinia (recommended) or Vuex for state management in `src/store/` if complexity increases.
    - Create `src/utils/` for helper functions (e.g., Markdown parsing, PDF generation).
- **Data Handling:**
    - Define clear schemas for JSON data.
    - Use dynamic imports or the `fetch` API to load JSON.
    - Employ a Markdown parsing library (e.g., `marked` or `markdown-it`) for Markdown content.