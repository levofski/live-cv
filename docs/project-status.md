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