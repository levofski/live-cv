# Project Status

[GitHub Repository](https://github.com/levofski/live-cv)

The goal of the project is to create a live and dynamic webapp which acts as a CV (curriculum vitae).
The source data for the CV should be on the file-system, rather than in a database.

## Data Storage Decision
The CV data will be stored using:
- **JSON files** for structured data (work experience, skills, education, etc.)
- **Markdown files** for longer-form content (personal statements, detailed project descriptions)

These files will be organized in a `/data` directory within the project structure.

## Required Features
- Visually engaging and impressive
- Initially showing a brief version of the experience and job history information
- Ability to expand sections to view more detail

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