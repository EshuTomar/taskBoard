
# TaskBoard

TaskBoard is a lightweight task manager for planning and tracking work in a
workspace. Create, edit, view, and delete tasks; organize them by status and
priority; and search tasks by title or description. Tasks are stored in the
browser's `localStorage`, so they remain available after refreshing the page in
the same browser.

The app is built with React 18, Vite, and Tailwind CSS 4.

## Requirements

- Node.js 18 or later
- npm

## Setup

Clone or download the project, then open a terminal in its root directory and
install dependencies:

```bash
npm install
```

## Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:5173`).
Press `Ctrl+C` in the terminal to stop the server.

## Build and preview

Create a production build:

```bash
npm run build
```

To serve that build locally for a preview:

```bash
npm run preview
```

## Project structure

- `src/components/` — task board, task forms and details, navigation, and
  shared UI components
- `src/hooks/useLocalStorage.js` — browser storage persistence
- `src/utils/` — task status, priority, and date helpers
- `src/App.jsx` — application state and page composition
