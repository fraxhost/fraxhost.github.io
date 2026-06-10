
# 🌐 fraxhost.github.io

Welcome to the source code for **[fraxhost.github.io](https://fraxhost.github.io/)** — a sleek, responsive personal portfolio website. Built with Jekyll, HTML, CSS, and JavaScript, and deployed automatically via GitHub Pages.

---

## 📁 Project Structure

```
├── _layouts/
│   ├── default.html      # Shared layout (nav, sidebar, footer, head)
│   └── post.html         # Individual blog post layout (TOC, metadata)
├── _posts/               # Blog posts (Markdown, named YYYY-MM-DD-slug.md)
├── _site/                # Jekyll build output (git-ignored)
├── assets/               # Images, icons, fonts
├── css/                  # Stylesheets (style.css = global + shared rules)
├── html/                 # Inner pages (education, experience, project, skill, extracurricular, blog)
├── js/                   # Interactive JavaScript features
├── _config.yml           # Jekyll configuration
└── index.html            # Homepage (About Me)
```

---

## ✨ Features

- Responsive design for mobile and desktop
- Jekyll templating — nav, sidebar, and footer defined once in `_layouts/default.html`
- Modular CSS — shared rules in `style.css`, page-specific rules in individual CSS files
- Blog with year-grouped index, live search, and per-post sticky table of contents
- Automatic deployment via GitHub Pages on every push to `main`

---

## ✍️ Writing a Blog Post

1. Create a file in `_posts/` named exactly `YYYY-MM-DD-your-slug.md`, e.g.:

   ```text
   _posts/2025-07-15-supply-chain-attacks.md
   ```

2. Add the required front matter at the top:

   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2025-07-15
   ---
   ```

3. Write the body in Markdown below the front matter. Use `##` and `###` headings freely — they are automatically collected into the right-side table of contents.

4. Push to `main` (or the active branch). The post appears on the `/html/blog.html` index automatically, sorted newest-first.

**Notes:**

- The filename date and the `date:` field should match.
- No category, tag, or `page_css` front matter is needed — `_config.yml` sets `page_css: blog` for all posts automatically.
- A post with no `##` headings will render without a TOC (it is hidden automatically).

---

## 🚀 Getting Started

### Prerequisites

Install Ruby 3+ and Jekyll:

```bash
brew install ruby
export PATH="/opt/homebrew/lib/ruby/gems/$(ruby -e 'puts RUBY_VERSION.match(/\d+\.\d+/)[0]').0/bin:/opt/homebrew/opt/ruby/bin:$PATH"
gem install jekyll bundler
```

### Run locally

```bash
git clone https://github.com/fraxhost/fraxhost.github.io.git
cd fraxhost.github.io
jekyll serve --livereload
```

Then open [http://127.0.0.1:4000](http://127.0.0.1:4000).

> **Port already in use?** Another Jekyll process is likely running in the background. Kill it first:
> ```bash
> lsof -ti:4000 | xargs kill -9
> ```
> Then re-run `jekyll serve --livereload`. Alternatively, use a different port: `jekyll serve --livereload --port 4001`

---

## 🛠️ Technologies Used

- **Jekyll** — Templating and static site generation
- **HTML5** — Semantic structure
- **CSS3** — Styling and layout
- **JavaScript** — Interactivity (burger menu, scroll-to-top, smooth anchors)

---

## 📌 Deployment

Deployed via GitHub Pages. Pushing to `main` triggers an automatic Jekyll build and updates the live site.

---

📄 License

This project is open-source. Feel free to fork it and customize your own site!

---

📬 Contact

Created by [fraxhost](mailto:ahmedryanfaiyaz@gmail.com). Drop a message or fork the project if you find it helpful!
