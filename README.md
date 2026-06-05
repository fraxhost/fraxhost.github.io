
# 🌐 fraxhost.github.io

Welcome to the source code for **[fraxhost.github.io](https://fraxhost.github.io/)** — a sleek, responsive personal portfolio website. Built with Jekyll, HTML, CSS, and JavaScript, and deployed automatically via GitHub Pages.

---

## 📁 Project Structure

```
├── _layouts/
│   └── default.html      # Shared layout (nav, sidebar, footer, head)
├── _site/                # Jekyll build output (git-ignored)
├── assets/               # Images, icons, fonts
├── css/                  # Stylesheets (style.css = global + shared rules)
├── html/                 # Inner pages (education, experience, project, skill, extracurricular)
├── js/                   # Interactive JavaScript features
├── _config.yml           # Jekyll configuration
└── index.html            # Homepage (About Me)
```

---

## ✨ Features

- Responsive design for mobile and desktop
- Jekyll templating — nav, sidebar, and footer defined once in `_layouts/default.html`
- Modular CSS — shared rules in `style.css`, page-specific rules in individual CSS files
- Automatic deployment via GitHub Pages on every push to `main`

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
