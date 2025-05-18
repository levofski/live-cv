# Live CV Project

This project is a dynamic and interactive web application designed to serve as a live Curriculum Vitae (CV). It's built with Vue 3 and Vite, focusing on a visually engaging presentation of professional experience and skills.

## Project Goal

To create a modern, file-system-based CV that is both informative and impressive, moving away from traditional static documents.

## Key Features

- **Visually Engaging Design:** Aims for an impressive and aesthetically pleasing user interface.
- **Dynamic Content:** Utilizes Vue 3 for interactive elements and smooth transitions.
- **Progressive Disclosure:** Initially presents a summary, with options to expand sections for more detailed information.
- **Data-Driven:** CV data is sourced from local JSON and Markdown files, making updates straightforward.
- **PDF Download:** Functionality to download a summarized, 2-page PDF version of the CV.

## Tech Stack

- **Frontend:** Vue 3 (with `<script setup>` SFCs)
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (expected, based on component structure)
- **Data Format:** JSON for structured data, Markdown for narrative content.

## Project Structure

- `src/components`: Reusable Vue components.
- `src/data`: Contains JSON and Markdown files for CV content.
- `src/assets`: Static assets like images and icons.
- `public/`: Publicly accessible static assets.
- `docs/`: Project documentation, including status, code style, and commit guidelines.

## Development

### Prerequisites

- Node.js (version specified in dev container or `package.json`)
- npm

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/levofski/live-cv.git
    cd live-cv
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To start the Vite development server:

```bash
npm run dev
```

This will typically make the application available at `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The output files will be in the `dist` directory.

## Data Management

CV data is stored in the `src/data` directory:

- Structured information (work experience, education, skills) is kept in JSON files.
- Longer textual content (like personal statements or detailed project descriptions) is stored in Markdown files.

Refer to `docs/project-status.md` for more details on data schemas and handling.

## Contributing

Please refer to the following documents for guidelines:

- [Code Style Guide](./docs/code-style.md)
- [Commit Message Style Guide](./docs/commit-style.md)
