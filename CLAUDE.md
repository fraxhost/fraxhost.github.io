# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Ahmed Ryan, deployed via GitHub Pages at [fraxhost.github.io](https://fraxhost.github.io/). No build tools, package managers, or frameworks are used — changes to `main` deploy automatically.

## Local Development

Open `index.html` directly in a browser, or use any static file server:

```bash
python3 -m http.server 8000
```

Note: CSS uses root-relative paths (`/css/style.css`, `/assets/...`), so opening HTML files directly via `file://` will break styles. Use a local server instead.

## Architecture

The site is a multi-page app with a shared layout pattern repeated across all pages:

- **`index.html`** — About Me (homepage)
- **`html/`** — All other pages: `education.html`, `experience.html`, `project.html`, `skill.html`, `extracurricular.html`
- **`css/style.css`** — Global styles: CSS variables, nav, sidebar, footer, responsive breakpoints
- **`css/<page>.css`** — Page-specific styles (e.g. `education.css`, `project.css`)
- **`js/script.js`** — Shared JS: burger menu toggle, scroll-to-top button, smooth anchor scrolling
- **`assets/images/`** — Photos and favicon; **`assets/fonts/`** — Local fonts

Each page follows the same structure: sticky nav → two-column `<main>` (`.side-bar` + `.main-body`) → footer. The sidebar (profile card + links) is sticky within its column and hidden on mobile (<920px) via media query.

## Design System

All colors are CSS custom properties defined in `style.css`:

| Variable | Value | Use |
|---|---|---|
| `--background-color` | `#f8fffc` | Page background |
| `--foreground-color` | `#242424` | Primary text |
| `--secondary-color` | `#04aa6d` | Accent / active nav link |

Font: Poppins (Google Fonts). Font sizes use `rem` with `font-size: 62.5%` on `*` so `1rem = 10px`.

External dependencies (CDN only, no npm): Font Awesome 6.0.0-beta3, Google Fonts Poppins.

## Adding a New Page

1. Create `html/<page>.html` following the existing page structure
2. Add a `css/<page>.css` for page-specific styles and link it in the new HTML file
3. Add the nav `<a>` link to all existing pages and `index.html`
4. Set `class="selected"` on the nav link that matches the current page
