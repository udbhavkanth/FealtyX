# FealtyX

> **A modern full‑stack sandbox showcasing role‑based dashboards, real‑time task tracking, animated auth, and AI‑powered helpers.**

---

## ✨ Project Highlight

| Area                              | Why it matters                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Auth Flow**                     | Animation‑driven login that works without hard‑coded credentials, demonstrating a clean user‑experience loop. |
| **Task Timer**                    | Uses a persisted `startedAt` timestamp + `useInterval` hook so timers keep running after page refreshes.      |
| **Memoised Selectors**            | `tasksSlice` shows pattern to prevent redundant re‑renders—solving the selector warning you spotted.          |
| **Modular Vite + Tailwind setup** | Instant HMR in dev and <70 KB gzip production bundle.                                                         |
| **Flowchart Canvas**              | Drag‑and‑drop nodes, connect with arrows, export to PDF—handy for brainstorming and demos.                    |

---

## 🚀 Quick‑Start (Local)

```bash
# 1. Clone
git clone https://github.com/udbhavkanth/FealtyX.git
cd FealtyX

# 2. Install deps
npm install   # or pnpm / yarn

# 3. Environment variables
cp .env.example .env      # then tweak as needed

# 4. Run dev servers (frontend + mock backend)
# Frontend (Vite ➜ http://localhost:5173)
npm run dev
# Mock API (JSON‑Server ➜ http://localhost:4000)
npm run mock:server
```

One‑liner for the impatient:

```bash
npm i && npm run dev
```

### Production build & preview

```bash
npm run build   # bundles to /dist
npm run preview # static preview at http://localhost:4173
```

### Lint & tests

```bash
npm run lint   # eslint + prettier
npm run test   # vitest unit tests
```

---

## 🗂️ Folder Structure (high‑level)

```
src/
 ├─ assets/         # Images & icons
 ├─ components/     # Reusable UI atoms & molecules
 ├─ features/       # Redux Toolkit slices
 ├─ hooks/          # Custom hooks (e.g., useInterval, useDebounce)
 ├─ pages/          # Route‑level views (Auth, Dashboard, Manager)
 └─ utils/          # Helper functions
```

---

## 🔧 Assumptions

* **Node ≥ 18** and **npm ≥ 10** available.
* Project is **front‑end only** by default; API requests are mocked by JSON‑Server on port 4000.
* When pointed at a real backend, routes mirror the mock schema (`/api/tasks`, `/api/auth`, ...).
* Evergreen browsers (Chrome 137+, Firefox 126+, Safari 17+) with support for ES modules, Fetch, and ResizeObserver.
* Animation is powered by the ESM build of `animejs` bundled via Vite.

---

## 🛣️ Roadmap

* ✅ Core CRUD & Timer functionality
* ✅ Manager dashboard chart
* ⏳ OAuth 2.0 + JWT backend integration
* ⏳ End‑to‑end Cypress suite

---

## 📄 License

MIT © 2025 Udbhav Kanth
