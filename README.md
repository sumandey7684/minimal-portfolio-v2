# Suman Dey — Portfolio

A high-performance, responsive, and aesthetically premium personal portfolio built with React, Vite, Tailwind CSS, and TypeScript. It combines a minimalist retro-terminal aesthetic with modern typography, interactive animations, and a structured grid-based layout.

## Tech Stack

- **Core & Routing:** React 18 and React Router v6
- **Build Tool:** Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom typography
- **Animations:** Framer Motion for transitions, hover effects, and layout animations
- **Analytics:** `@vercel/analytics` for web traffic insights
- **Icons:** `@iconify/react` and `lucide-react`

## Features

- **Retro Grid Portfolio Design:** A minimalist, grid-based interface with typography-focused layouts, subtle borders, responsive components, and smooth animations.
- **Interactive Profile Section:** A personalized profile presentation with interactive elements and animated transitions.
- **Search Command Palette:** A keyboard-accessible command menu with shortcuts for navigating portfolio sections and opening external links.
- **GitHub Contributions Matrix:** A responsive contribution heatmap that displays GitHub activity.
- **Animated Tech Stack:** A filterable technology section covering Languages, Frontend, Backend, Databases, Systems, DevOps & Cloud, and AI.
- **Project Showcase:** A dedicated section for full-stack, frontend, AI, and systems projects.
- **Experience and Education:** Sections presenting professional experience, AI/ML internship experience, and academic background.
- **Responsive Navigation:** Desktop and mobile navigation with smooth scrolling and animated interactions.
- **Visitor Counter:** A lightweight system for tracking portfolio visits.
- **Interactive Experiments:** Projects such as Memory Box, Vending Machine, and an interactive football experience.
- **Smooth Animations:** Motion effects for page transitions, hover states, interactive elements, and layout changes.

## Getting Started

### Prerequisites

Install Node.js and npm. Use a Node.js version compatible with the project's dependencies.

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/sumandey7684/minial-portfolio.git
cd minial-portfolio
```

Install the dependencies:

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Build for Production

```bash
npm run build
```

### Preview the Production Build

```bash
npm run preview
```

## Project Structure

```text
minial-portfolio/
├── public/
│   ├── assets/
│   ├── fonts/
│   └── social-previews/
├── src/
│   ├── components/
│   │   ├── football/
│   │   └── ...
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── icons/
│   ├── pages/
│   │   └── experiments/
│   ├── sections/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Performance

The project includes performance-focused improvements such as optimized image assets, locally bundled skill icons, reduced unused assets, and code splitting for selected interactive sections. These changes aim to reduce initial network transfer and defer non-essential code.

To check the production build, run:

```bash
npm run build
```

Review the build output for bundle sizes and warnings.

## Deployment

The project is configured for deployment with Vercel.

1. Import the GitHub repository into Vercel.
2. Confirm the build command is `npm run build`.
3. Confirm the output directory is `dist`.
4. Deploy the project.

For future updates, push commits to the connected GitHub branch to trigger a new deployment.

## License

No license is specified here. Add a `LICENSE` file if you want to define the terms under which others can use, modify, or distribute this project.

## Author

**Suman Dey**

- GitHub: https://github.com/sumandey7684
- LinkedIn: https://www.linkedin.com/
- LeetCode: https://leetcode.com/u/suman_dey/
- X: https://x.com/sumxnnn
