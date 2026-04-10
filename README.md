# FileTree Explorer

A developer tool for visualizing JSON directory structures. Paste or upload a JSON file to explore your file tree interactively.

**Live demo:** [aleksanderdudek.github.io/file-tree-explorer](https://aleksanderdudek.github.io/file-tree-explorer/)

## Getting started

```bash
npm install && npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Assignment requirements

The task required building a file tree explorer module with the following specification.

### Routes

| Route | Description |
| ----- | ----------- |
| `/` | Home — paste or upload a JSON file |
| `/tree` | Tree view with expandable/collapsible folders |
| `/tree/:nodePath` | Node detail page (e.g. `src/components/Button.tsx`) |

### File detail

- Name, size (formatted as B / KB / MB), full path from root

### Folder detail

- Name, direct children count, total subtree size, children list with links

### Search

- Full-tree search by name, showing the full path of each result
- Results survive page refresh (stored in URL `?q=…`)

### Status

| Requirement | Status |
| ----------- | ------ |
| `/` with JSON input and file upload | ✅ |
| `/tree` with expand/collapse | ✅ |
| `/tree/:nodePath` node detail | ✅ |
| File detail: name, size (B/KB/MB), full path | ✅ |
| Folder detail: name, children count, total size, children list | ✅ |
| Full-tree search with path display | ✅ |
| Search results survive page refresh | ✅ |

---

## Extra features

Beyond the assignment requirements, the following was added:

### Internationalisation (EN / PL)

Full i18n with `react-i18next`. English and Polish are bundled; the active language is persisted in `localStorage`. Adding a new language is one file + one entry in `SUPPORTED_LANGUAGES`. The English dictionary is the TypeScript source of truth — the Polish file is typed against `DeepString<typeof en>`, so a missing or mistyped key is a compile error.

### File-type icons

`src/utils/fileIcons.tsx` maps 40+ extensions and special filenames (`Dockerfile`, `.gitignore`, `.env`, …) to a Lucide icon with a semantic colour (TypeScript → blue, Python → emerald, Swift → orange, JSON → teal, CSS → pink, shell → green, …).

### Animations

- Floating hero icon (`animate-float`)
- Shimmer gradient on the page title (`text-shimmer`)
- Staggered list entrance on folder contents (`stagger-item`)
- Card hover lift (`card-hover`)
- Subtle bounce on the empty-state placeholder (`animate-bounce-subtle`)

### CI / CD pipeline

Three-job GitHub Actions workflow on every push to `main`:

```text
test → build → deploy (GitHub Pages)
```

Each stage is gated on the previous one. A deployment only happens after all tests pass and the build succeeds.

### Pre-push hook (Husky)

```bash
npm run lint      # ESLint — TypeScript + react-hooks rules
npm run test:run  # Vitest — 30 unit tests
```

A push is blocked if either lint or tests fail.

### 30 unit tests

Vitest + Testing Library covering JSON parsing and validation, tree rendering, expand/collapse interactions, search, breadcrumb navigation, and node detail views.

### Component architecture split

Each component is split into focused files (`Component.tsx`, `Component.spec.ts`, `Component.consts.ts`, `Component.service.ts`) where it makes sense. Shared UI primitives (`EmptyState`, `FileIcon`, `NodeHeader`) and custom hooks (`useFileUpload`, `useNodePath`) are extracted to avoid duplication. `TreeNodeItem` is wrapped in `React.memo` to prevent re-rendering the entire tree on unrelated state changes.

### Typed parse errors

`TreeParseError` carries an error `code` (`'invalidJson'` | `'invalidStructure'`) instead of an English string. The component translates the code via `t(\`home.error.${e.code}\`)` — no hardcoded user-facing text in business logic.

### Four example trees

The home page ships with four realistic presets: React/Vite app, FastAPI backend, Turborepo monorepo, and an iOS/Swift project.

---

## Architectural decisions

### Context + localStorage for state persistence

Tree data lives in React Context, initialised from `localStorage` so it survives a page reload without a backend. The `setTree` helper keeps both in sync atomically.

### URL search params for search persistence

The search query is stored as `?q=…` in the active route. Results survive a refresh and are bookmarkable. `useSearchParams` with a functional updater preserves any other params already in the URL.

### Nested React Router v6 routes with `<Outlet />`

`/tree` is a layout route (`TreeLayout`) that renders the sidebar + `<Outlet />`. Both the placeholder and the detail panel are child routes, which avoids duplicating the sidebar across pages.

### Splat route for multi-segment node paths

Node paths contain `/` (e.g. `root/src/components/Button.tsx`). Using `path="*"` inside `/tree` captures the full path as a single param without URL encoding.

### Discriminated union for `TreeNode`

`TreeNode = FileNode | FolderNode` lets TypeScript narrow to the correct shape based on `type`. No `any`, no casting — strict mode throughout.

### Folders-first sort

Both the sidebar and folder detail lists sort folders before files, then alphabetically within each group — matching the convention of most file browsers and IDEs.

---

## Project structure

```text
src/
├── components/
│   ├── Breadcrumb/          # Breadcrumb + spec
│   ├── EmptyState/          # Reusable empty/not-found state
│   ├── FileIcon/            # Extension-aware icon component
│   ├── LanguageSwitcher/    # EN / PL toggle
│   ├── Layout/              # Header + main wrapper
│   ├── NodeHeader/          # Icon + title + badge pattern
│   ├── TreeNodeItem/        # Recursive tree node (React.memo)
│   └── TreeSidebar/         # Search input + tree / results panel
├── context/
│   └── TreeContext.tsx      # Global tree state + localStorage
├── hooks/
│   ├── useFileUpload.ts     # Async file-read side-effect
│   └── useNodePath.ts       # URL params → pathParts
├── i18n/
│   ├── index.ts             # i18next init + SUPPORTED_LANGUAGES
│   └── locales/
│       ├── en.ts            # English (source of truth + Translation type)
│       └── pl.ts            # Polish (typed against Translation)
├── pages/
│   ├── Home/                # JSON input form
│   ├── NodeDetail/          # File / folder detail view
│   └── TreeLayout/          # /tree layout route
├── types/
│   └── tree.ts              # TreeNode, FileNode, FolderNode, SearchResult
└── utils/
    ├── fileIcons.tsx        # Extension → Lucide icon + colour map
    ├── formatters.ts        # formatSize (B / KB / MB)
    └── treeUtils.ts         # findNodeByPath, searchNodes, sortNodes, getTotalSize, validateTreeNode
```

---

## What would be done with more time

- **Virtual scrolling** for trees with thousands of nodes (`@tanstack/virtual`)
- **Highlight matched substring** in search results
- **Keyboard navigation** — arrow keys through the tree, `Enter` to navigate
- **Collapse-state persistence** — remember open folders across navigations
- **Tree editing** — rename, add, or remove nodes
- **Export** — serialize the current tree back to JSON
- **Statistics panel** — total files, total size, max depth
- **Multiple tree history** — load several trees and switch between them
- **Error boundary** — isolate render errors with a recovery message

---

## Known limitations

- Large JSON files (> ~5 MB) may exceed the `localStorage` quota; the tree will still render but won't persist
- `JSON.parse` runs synchronously on the main thread — very large inputs (> 50 MB) may briefly block the UI
- Folder expand/collapse state resets on page refresh
- Node names containing `/` will break path resolution (the path separator is `/`)
