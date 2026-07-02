# EasyDeen — Islamic Learning Platform

A React-based web app for reading and studying Islamic content, currently centered on **Bulugh al-Maram** (a classical hadith compilation) with a **Sahaba (Companions)** reference section. Built with React 19, React Router, and Bootstrap, and deployed via Netlify.

> Note: `package.json` name is `deen-learnings` — this repo is a work-in-progress learning/portfolio project.

## About

EasyDeen is being built to make classical Islamic texts easier to access and read online, starting with **Bulugh al-Maram** and a companion reference for the **Sahaba**. The goal is a clean, distraction-free reading experience with bilingual (Arabic/Urdu) support, structured navigation (Book → Chapter → Hadith), and room to grow into a broader Islamic learning platform over time.

**Live site:** [EasyDeen.netlify.app](https://easydeen.netlify.app)

## Features

- **Bulugh al-Maram reader**
  - Browse the full list of books
  - Drill down: Book → Chapter → individual Hadith
  - Hadith detail view with edit support (`BMEditHadith`)
  - Urdu text toggle for bilingual (Arabic/Urdu) display
- **Sahaba section**
  - List of Sahaba (Companions of the Prophet ﷺ)
  - Individual profile page per Sahabi
- Client-side routing with `react-router` v7
- Responsive UI using Bootstrap 5

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router v7 |
| Styling | Bootstrap 5 + custom CSS |
| Linting | ESLint 9 |
| Deployment | Netlify |

## Project Structure

```
src/
├── App.jsx                 # Root component
├── AppRouter.jsx            # All app routes
├── components/
│   ├── Loading.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Bulugh-al-Maram.jsx  # BM layout wrapper
│   ├── BM-main.jsx          # BM landing / book list
│   ├── BMSingleBook.jsx
│   ├── BMSingleChapter.jsx
│   ├── BMSingleHadith.jsx
│   ├── BMEditHadith.jsx
│   ├── Sahaba.jsx           # Sahaba layout wrapper
│   └── SingleSahabi.jsx
└── styles/
    └── bulugh-al-maram.css

public/assets/
├── bulugh-al-maram/books/   # Book cover images + archive
├── sahaba-data.json         # Sahaba data source
└── logo/                    # Branding assets
```

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/abdullahsaeed-git/learnings.git
cd learnings
npm install
```

### Development

```bash
npm run dev
```

Runs the app locally with hot module reloading (Vite dev server).

### Build

```bash
npm run build
```

Outputs a production-ready build to `dist/`.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

| Path | Description |
|---|---|
| `/` | Home |
| `/sahaba/:sahabiSlug` | Individual Sahabi profile |
| `/bulugh-al-maram` | Book list |
| `/bulugh-al-maram/:bookId` | Single book |
| `/bulugh-al-maram/chapter/:chapterId` | Single chapter |
| `/bulugh-al-maram/hadith-detail/:hadithId` | Single hadith |
| `/bulugh-al-maram/hadith-detail/:hadithId/edit` | Edit a hadith |

## Deployment

This project includes a `netlify.toml` for direct deployment to Netlify. Connect the repo to Netlify and it will build using `npm run build` and serve the `dist/` folder.

## Status

This is an active, evolving project (part of a broader effort to build Islamic-content platforms). Content data (hadith text, Sahaba profiles) is still being populated, and UI/UX is being refined incrementally.

## License

No license specified yet — all rights reserved by default until one is added.