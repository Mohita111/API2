# Search and filtering

Search and Filtering helps you locate the right snippet fast, even as your library grows. You can type a search term or choose from several filters to narrow down what you see by language, category, or tag. The snippet list updates immediately with every change.

## Who it's for

Search and Filtering is for anyone with a large snippet library who wants to stop scrolling through dozens of cards and go straight to the code they need. If you save snippets across multiple languages, categories, or tags, these tools help you narrow a long list to a few relevant results in seconds.

## What you can do

The filter bar sits above your snippet list and gives you five controls:

- **Search box**, type a search term to match snippet titles and descriptions
- **Language dropdown**, show snippets written in a specific language, or show every language
- **Category dropdown**, show snippets from one category, or show all categories
- **Tag dropdown**, show snippets that carry a specific tag, or show all tags
- **Sort dropdown**, order results by most recently added, oldest first, or alphabetically by title

A **Clear Filters** button appears whenever any filter is active. One click removes the search term and resets all dropdowns to their default options.

You can also filter directly from the left sidebar. The sidebar shows a **Categories** section and a **Languages** section. Click a category or language to filter the current list; click the same item again to remove that filter.

Figure: How search and filtering works

```mermaid
graph LR
    A[Type search term] --> E[Results update]
    B[Choose language] --> E
    C[Choose category] --> E
    D[Choose tag] --> E
    E --> F{Any matches?}
    F -->|Yes| G[See matching snippets]
    F -->|No
