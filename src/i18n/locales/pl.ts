import type { Translation } from './en'

const pl: Translation = {
  app: {
    selectNode: 'Wybierz plik lub folder, aby zobaczyć szczegóły',
  },
  layout: {
    title: 'FileTree Explorer',
    viewTree: 'Pokaż drzewo',
    clearTree: 'Wyczyść',
    clearTreeTitle: 'Wyczyść załadowane drzewo',
  },
  home: {
    badge: 'Eksplorator drzewa plików oparty na JSON',
    title: 'FileTree Explorer',
    subtitle: 'Wklej lub prześlij plik JSON, aby zwizualizować\nstrukturę katalogów',
    treeLoaded: 'Drzewo jest już załadowane.',
    viewIt: 'Zobacz →',
    jsonInput: {
      label: 'Dane JSON',
      placeholder: '{\n  "name": "root",\n  "type": "folder",\n  "children": []\n}',
    },
    loadExample: 'Załaduj przykład…',
    visualizeTree: 'Wizualizuj drzewo',
    uploadJson: 'Prześlij JSON',
    expectedFormat: 'Oczekiwany format',
    error: {
      emptyInput: 'Proszę wkleić lub przesłać plik JSON.',
      invalidJson: 'Nieprawidłowy JSON — sprawdź błędy składni.',
      invalidStructure:
        'Nieprawidłowa struktura drzewa. Każdy węzeł wymaga "name" i "type" ("file" lub "folder"). Pliki wymagają "size", foldery "children".',
      unexpected: 'Wystąpił nieoczekiwany błąd.',
      fileRead: 'Nie udało się odczytać pliku.',
    },
  },
  sidebar: {
    searchPlaceholder: 'Szukaj…',
    clearSearch: 'Wyczyść wyszukiwanie',
    noResults: 'Brak wyników dla „{{query}}"',
    results_one: '{{count}} wynik',
    results_few: '{{count}} wyniki',
    results_many: '{{count}} wyników',
    results_other: '{{count}} wyników',
  },
  treeNode: {
    collapseFolder: 'Zwiń folder',
    expandFolder: 'Rozwiń folder',
    emptyFolder: 'pusty folder',
  },
  breadcrumb: {
    ariaLabel: 'Ścieżka nawigacji',
  },
  nodeDetail: {
    typeBadge: {
      file: 'plik',
      folder: 'folder',
    },
    label: {
      name: 'Nazwa',
      size: 'Rozmiar',
      fullPath: 'Pełna ścieżka',
      directChildren: 'Bezpośrednie elementy',
      totalSize: 'Całkowity rozmiar',
    },
    contents: 'Zawartość',
    items_one: '{{count}} element',
    items_few: '{{count}} elementy',
    items_many: '{{count}} elementów',
    items_other: '{{count}} elementów',
    notFound: 'Nie znaleziono węzła',
    backToTree: '← Powrót do drzewa',
  },
}

export default pl
