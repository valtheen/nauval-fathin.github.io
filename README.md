# Nauval Fathin — Portfolio

A static, four-page portfolio for data science, analytics, and software development. Built with HTML, CSS, and vanilla JavaScript, ready for GitHub Pages without a build step or package installation.

## Pages

- `index.html`: introduction, original portrait, key figures, and three selected projects.
- `about.html`: profile, technical skills, education, and experience.
- `projects.html`: all 11 existing projects, with All / Data & ML / Products / Systems filters. Categories overlap.
- `contact.html`: email, LinkedIn, GitHub, location, and access to the existing résumé link through the footer.

Each page has its own URL, title, description, and active navigation state. Navigation and content work without JavaScript; JavaScript adds the collapsible mobile menu, project filters, and redirects for old home-page section bookmarks. Contact links open the visitor's email application; no message is sent by this site.

## Preview and validation

From the repository directory:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173`. Static files are the deliverable; there is no compilation step.

```sh
python3 scripts/validate.py
node --check js/site.js
```

The validator checks HTML nesting, one main heading per page, unique IDs, active navigation, internal files and anchors, image alternative text, and the 11-project inventory.

Browser checks performed: all four pages at 320px, 768px, and 1440px; visual inspection at desktop and 390px; mobile menu and page navigation; all project filters (11 total, 5 Data & ML, 7 Products, 6 Systems); no horizontal overflow, broken images, or browser warnings/errors in the checked views.

## Editing

- Edit content directly in each HTML file. Home intentionally repeats three selected projects; keep those summaries consistent when updating their entries in `projects.html`.
- Shared styles: `css/site.css`. Shared behavior: `js/site.js`.
- Update navigation and footer links consistently across all four pages.
- `img/portrait.jpg` is the original home-page embedded JPEG extracted byte-for-byte into a cacheable asset. Existing image files remain intact.
- Previous CSS files and `js/script.js` are retained for reference and are not loaded by the new pages.

Project descriptions, metrics, experience, contact details, and external destinations were carried over from the existing portfolio. They have not been independently audited. The project artwork on Home is decorative, not a screenshot or additional evaluation evidence. Yelp and TOS had no source/live link in the original page, so they display summaries without a fabricated destination.

Public site: https://valtheen.github.io/nauval-fathin.github.io/

GitHub Pages publishes the repository root from `main`.

## Motion and interaction reliability

The motion pass applies the iart-ai web-animation skill pack (installed in the local Codex skills directory). Runtime remains dependency-free:

- Native cross-document View Transitions crossfade between pages on supporting browsers. Ordinary links remain the fallback; there is no navigation interception or loading overlay.
- WAAPI entrances stagger the hero and reveal sections once. Only opacity and transform animate; actual content is visible by default. No continuous loops, scroll hijacking, or permanent compositor-layer hints.
- Filters use batched FLIP position reads and interrupt prior animations. Long-distance moves become short reveals so cards do not fly across the screen. The `category` query parameter preserves selection on reload and makes filtered collections linkable.
- The footer's Motion toggle persists when local storage is available, and still works for the current page when storage is blocked. The device's reduced-motion preference always takes priority over full motion. Reduced mode retains short fades; Off cancels optional animation. Preference changes and backgrounding cancel running WAAPI effects.
- Mobile navigation supports Escape, outside clicks, and viewport changes without leaving keyboard focus in a hidden menu.

Local-only inspection harness: `index.html?t=0`, `?t=0.25`, and `?t=1` freeze WAAPI at the start, middle, and end. Add `&reduce=1` to inspect the reduced-motion path. These query switches only apply on localhost/127.0.0.1 and are not ordinary visitor controls.

Motion verified in the in-app browser: frozen start/middle/end frames, reduced mode, repeated filter changes, reload persistence, footer toggle, mobile menu/Escape, and responsive layout. The OS preference path is implemented through matchMedia; reduced-mode screenshots use the local override. A device-level performance trace/FPS benchmark has not been run, so this revision does not claim a measured 60fps guarantee.

After editing the shared CSS or JS, run `python3 scripts/version_assets.py` to refresh their content-based version URLs in all four pages. This prevents stale assets after an update; it is a maintenance helper, not a required runtime/build dependency. The current motion preview uses `http://127.0.0.1:4174/index.html`.
