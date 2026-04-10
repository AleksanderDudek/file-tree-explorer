const en = {
  app: {
    selectNode: 'Select a file or folder to view details',
  },
  layout: {
    title: 'FileTree Explorer',
    viewTree: 'View Tree',
    clearTree: 'Clear',
    clearTreeTitle: 'Clear loaded tree',
  },
  home: {
    badge: 'JSON-powered file tree explorer',
    title: 'FileTree Explorer',
    subtitle: 'Paste or upload a JSON file to visualize\nyour directory structure',
    treeLoaded: 'A tree is already loaded.',
    viewIt: 'View it →',
    jsonInput: {
      label: 'JSON Input',
      placeholder: '{\n  "name": "root",\n  "type": "folder",\n  "children": []\n}',
    },
    loadExample: 'Load example…',
    visualizeTree: 'Visualize Tree',
    uploadJson: 'Upload JSON',
    expectedFormat: 'Expected format',
    error: {
      emptyInput: 'Please paste or upload a JSON file.',
      invalidJson: 'Invalid JSON — please check for syntax errors.',
      invalidStructure:
        'Invalid tree structure. Each node needs a "name" and "type" ("file" or "folder"). Files need "size", folders need "children".',
      unexpected: 'An unexpected error occurred.',
      fileRead: 'Failed to read file.',
    },
  },
  sidebar: {
    searchPlaceholder: 'Search…',
    clearSearch: 'Clear search',
    noResults: 'No results for "{{query}}"',
    results_one: '{{count}} result',
    results_few: '{{count}} results',
    results_many: '{{count}} results',
    results_other: '{{count}} results',
  },
  treeNode: {
    collapseFolder: 'Collapse folder',
    expandFolder: 'Expand folder',
    emptyFolder: 'empty folder',
  },
  breadcrumb: {
    ariaLabel: 'Breadcrumb',
  },
  nodeDetail: {
    typeBadge: {
      file: 'file',
      folder: 'folder',
    },
    label: {
      name: 'Name',
      size: 'Size',
      fullPath: 'Full path',
      directChildren: 'Direct children',
      totalSize: 'Total size',
    },
    contents: 'Contents',
    items_one: '{{count}} item',
    items_few: '{{count}} items',
    items_many: '{{count}} items',
    items_other: '{{count}} items',
    notFound: 'Node not found',
    backToTree: '← Back to tree',
  },
}

export default en

type DeepString<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepString<T[K]>
}
export type Translation = DeepString<typeof en>
