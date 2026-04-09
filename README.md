# FileTree Explorer

A developer tool for visualizing JSON directory structures. Paste or upload a JSON file to explore your file tree interactively.

## Getting started

```bash
npm install && npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Features

- **Tree view** — expandable/collapsible folder navigation with file icons
- **Node detail** — per-file (name, size, path) and per-folder (children count, total subtree size, children list) detail pages
- **Search** — full-tree name search with path display; results persist on page refresh via URL params (`?q=…`)
- **Persistence** — loaded tree is saved to `localStorage` and survives page refresh
- **Breadcrumb navigation** — clickable path chain on detail pages

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home — paste or upload JSON |
| `/tree` | Tree view with sidebar navigation |
| `/tree/root/src/…` | Node detail page (path segments match the node hierarchy) |

## Architectural decisions

### Context + localStorage for state persistence
Tree data lives in React Context, initialised from `localStorage` so it survives a page reload without a backend. The `setTree` helper keeps both in sync atomically.

### URL search params for search persistence
The search query is stored as `?q=…` on whatever route is currently active. This means search results survive a refresh and are bookmarkable. `useSearchParams` with a functional updater preserves any other params already in the URL.

### Nested React Router v6 routes with `<Outlet />`
`/tree` is a layout route (`TreeLayout`) that renders the sidebar + `<Outlet />`. Both the "no node selected" placeholder and the node detail panel are child routes. This avoids duplicating the sidebar across pages and gives a consistent shell.

### Splat route for multi-segment node paths
Node paths contain `/` (e.g. `root/src/components/Button.tsx`). Using a splat child route `path="*"` inside `/tree` captures the full path as a single param without needing URL encoding.

### Discriminated union for `TreeNode`
`TreeNode = FileNode | FolderNode` lets TypeScript narrow to the correct shape based on `type`. No `any`, no casting — strict mode throughout.

### Folders-first sort
Both the sidebar tree and folder detail children list sort folders before files, then alphabetically within each group — matching the convention used by most file browsers and IDEs.

## What would be done with more time

- **Virtual scrolling** for trees with thousands of nodes (`@tanstack/virtual`)
- **Highlight matched substring** in search results
- **Keyboard navigation** — arrow keys to move focus through the tree
- **File type icons** based on extension (`.ts`, `.json`, `.md`, …)
- **Collapse-state persistence** — remember which folders are open across navigations
- **Multiple tabs / history** — load several trees and switch between them
- **Export** — serialize the current (possibly modified) tree back to JSON
- **Tree statistics panel** — total files, total size, max depth

## Known limitations

- Large JSON files (> ~5 MB) may hit `localStorage` quota; the tree will still render but won't persist
- `JSON.parse` runs synchronously on the main thread — very large inputs (> 50 MB) may briefly block the UI
- Folder expand/collapse state resets on page refresh
- Node names containing `/` will break path resolution (paths use `/` as the separator)
