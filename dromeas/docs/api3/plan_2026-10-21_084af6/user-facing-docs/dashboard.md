# Dashboard

CodeKnit's dashboard is your home base for managing a personal snippet library. It gives you an at-a-glance view of what you have saved, quick access to common actions, and a clear path into any part of your collection. Whether you are opening CodeKnit for the first time or returning to find a snippet you saved weeks ago, the dashboard is where you start.

## Who the dashboard is for

The dashboard is for everyone who uses CodeKnit. It is especially useful when you want to:

- Quickly check how many snippets you have saved and which languages they cover
- Jump straight to creating a new snippet
- Move between your full collection, favorites, and recently added snippets
- Get oriented when the library is empty

New users see a guided starting point. Experienced users get instant visibility into the size and shape of their library before drilling into the detail.

## What you see on the dashboard

When the library is ready, the dashboard shows three statistics cards at the top of the page:

| Card | What it shows | Helpful hint |
| --- | --- | --- |
| **Total snippets** | Number of snippets in your library | "in your library" |
| **Favorites** | Number of snippets marked as favorite | "starred for quick access" |
| **Languages** | Number of distinct programming languages | The actual language names, or "none yet" |

These cards update automatically as you add, remove, or favorite snippets. They are summaries, not historical records, there is no trend line or change-over-time view.

Below the statistics cards, the dashboard shows the **Your Snippets** section. This area includes the search and filter bar, the layout toggle, and the snippets themselves in either a grid or a list.

Figure: Dashboard overview flow

```mermaid
graph LR
    A[Open CodeKnit] --> B{"Dashboard ready?"}
    B -->|Yes| C[View statistics cards]
    C --> D[Choose section]
    D --> E[Search or filter]
    E --> F[View snippets]
    F --> G[Tile or row layout]
    B -->|No snippets yet| H[Empty state]
    H --> I[Create first snippet]
```

## Navigating between sections

The dashboard is one of four built-in views, each accessible from the sidebar:

- **Dashboard**, the overview page with statistics cards and the general snippet area
- **All Snippets**, every snippet in your library with no section-specific filtering
- **Favorites**, only snippets you have starred for quick access
- **Recently Added**, your newest snippets, limited to the 10 most recent

Each section shows a title and a live count of how many snippets are currently displayed. When you switch sections, the snippet area updates to match.

Figure: Section navigation structure

```mermaid
graph LR
    Sidebar[Sidebar] --> Dashboard[Dashboard]
    Sidebar --> All[All Snippets]
    Sidebar --> Favorites[Favorites]
    Sidebar --> Recent[Recently Added]
    Dashboard --> Stats[Statistics cards]
    Dashboard --> YourSnippets[Your Snippets]
    All --> Grid[All snippets grid]
    Favorites --> Starred[Starred snippets only]
    Recent --> Latest[10 most recent]
```

## Searching and filtering from the dashboard

The dashboard provides two places to search your snippets:

- A **search field in the top header** with the placeholder "Search snippets, tags, or code…"
- A dedicated **filter bar** above the snippet grid with a more compact "Filter…" field

The filter bar also includes dropdowns for **language**, **category**, **tag**, and **sort order**. When any filter is active, a **Clear Filters** button appears so you can reset everything with one click. For full details on what each filter does, see Search and Filtering.

## Switching between grid and list views

The snippet display supports two layouts:

- **Grid**, cards arranged in a responsive column arrangement (two or three columns depending on screen width)
- **List**, cards displayed as full-width rows for easier scanning of longer snippets

You switch between layouts using the grid and list icons at the right end of the filter bar. CodeKnit remembers your choice, so the next time you open the app, the same layout is restored.

## Accessing key actions

Most common actions are one click away from the dashboard:

- **New Snippet**, available as a button in the top header and again in the sidebar footer. This opens the snippet creation form.
- **Settings**, a gear icon in the sidebar footer that opens the settings dialog for exporting, importing, or resetting your library.
- **Sidebar toggle**, a menu button that shows or hides the navigation sidebar on smaller screens.

Figure: Quick navigation actions

```mermaid
graph LR
    Header[Top header] --> Search[Search field]
    Header --> NewHeader[New Snippet button]
    Sidebar[Sidebar] --> Sections[Sections]
    Sidebar --> Categories[Categories]
    Sidebar --> Languages[Languages]
    Sidebar --> NewSidebar[New Snippet button]
    Sidebar --> Settings[Settings]
    NewHeader --> Form[Snippet form]
    NewSidebar --> Form
```

## Understanding the empty state

When no snippets exist in your library, the dashboard displays a friendly empty state instead of a blank page. You see a document icon, the heading **"No snippets yet"**, and a message: "Save your first snippet to start building your library." A prominent **+ New Snippet** button takes you directly into the creation form.

If you have snippets but filters hide them all, the empty state changes. You see a search icon, the heading **"No snippets match"**, and a message suggesting you try a different term or loosen your filters. The button changes to **Clear filters** so you can recover your full library quickly.

Figure: Empty state decision

```mermaid
stateDiagram-v2
    [*] --> Ready
    Ready --> HasSnippets: snippets exist
    Ready --> Empty: no snippets at all
    HasSnippets --> Visible: filters show results
    HasSnippets --> FilteredEmpty: no results match filters
    Empty --> Creating: click New Snippet
    FilteredEmpty --> Visible: click Clear filters
    Visible --> ViewingSnippet: click a card
```

## What the dashboard does not do

The dashboard is intentionally focused. It provides a summary and a launchpad, not a configurable workspace:

- Statistics cards are **read-only**. You cannot change what they show or rearrange them.
- There are **no customizable widgets**. The dashboard always shows the same three statistics cards.
- Navigation is limited to the **four built-in sections**, Dashboard, All Snippets, Favorites, and Recently Added. You cannot add custom dashboard sections.
- There is **no historical or trend data**. Statistics reflect only your current library.
- The **Recently Added** section shows at most 10 snippets.
