# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Ahmed Ryan, deployed via GitHub Pages at [fraxhost.github.io](https://fraxhost.github.io/). No build tools, package managers, or frameworks are used — changes to `main` deploy automatically.

## Local Development

The site uses Jekyll (natively supported by GitHub Pages — no build step needed on push). To run locally:

```bash
gem install jekyll bundler
jekyll serve
```

Then open `http://localhost:4000`. Do not open HTML files directly via `file://` — CSS uses root-relative paths that only resolve through a server.

## Architecture

The site uses Jekyll templating to eliminate duplicated HTML across pages.

- **`_layouts/default.html`** — Single shared layout: `<head>`, nav, sidebar, footer, and JS import. All pages use this via `layout: default` front matter.
- **`_config.yml`** — Minimal Jekyll config (title, description).
- **`index.html`** — About Me (homepage); contains only its `.main-body` content with front matter.
- **`html/`** — All other pages: `education.html`, `experience.html`, `project.html`, `skill.html`, `extracurricular.html`. Each contains only its `.main-body` content with front matter.
- **`css/style.css`** — Global styles: CSS variables, nav, sidebar, footer, responsive breakpoints, **and shared cross-page rules** (section titles, dates, info rows, secondary headings).
- **`css/<page>.css`** — Page-specific styles only; linked via `page_css` front matter variable.
- **`js/script.js`** — Shared JS: burger menu toggle, scroll-to-top button, smooth anchor scrolling.
- **`assets/images/`** — Photos and favicon; **`assets/fonts/`** — Local fonts.

### Page front matter

Each page declares:
```yaml
---
layout: default
page_name: Education        # shown as mobile nav label
active: education           # which nav link gets class="selected"
page_css: education         # loads /css/education.css (omit if none)
---
```

The layout renders `{{ content }}` inside `.main-body`, so page files contain only their unique inner content.

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
