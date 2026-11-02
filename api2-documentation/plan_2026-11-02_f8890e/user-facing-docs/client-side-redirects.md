# Client-Side redirects

Client-Side Redirects is a feature for **site administrators and maintainers** who need to keep links working when pages move, get renamed, or change URL structure. It helps you create redirects that send visitors from an old or misspelled address to the current page, which preserves search engine rankings and keeps visitor bookmarks valid.

## Availability in this release

> [!NOTE]
> Based on the source files reviewed for this documentation, Client-Side Redirects is not yet implemented in the current version of CodeKnit. None of the provided files contain redirect rules, redirect page generation, or URL rewriting logic. The following sections describe the feature as planned.

## What this feature is for

When a content author renames a page, a site administrator re-organizes documentation, or a legacy URL needs to point to a new location, visitors and search engines can otherwise land on missing pages. Client-Side Redirects lets you define rules that automatically send those visitors to the correct destination.

Who benefits:

- **Site administrators**, maintain clean URL structures without breaking existing links
- **Content maintainers**, rename or reorganize pages without creating dead ends
- **Visitors**, always arrive at working pages even when their bookmark or search result is out of date

## Planned capabilities

The feature aims to support these common redirect scenarios:

- **Page renames**, send visitors from an old page address to the new one without seeing a "page not found" error
- **Broken or legacy URLs**, redirect retired or outdated addresses to the most relevant current page
- **Localized paths**, configure redirect rules that respect different language versions of the site
- **Build-time generation**, produce ready-to-use redirect pages during the site build process so no server setup is required

## Who this page is for

| Audience | What they can do with redirects |
| --- | --- |
| Site administrators | Define and manage redirect rules across the site |
| Content maintainers | Publish page moves with confidence that old links keep working |
| Developers | Generate redirect pages as part of a production build |

## Benefits

- Preserves SEO value by showing search engines a proper destination instead of a missing page
- Keeps visitor bookmarks and shared links working
- Reduces support questions caused by broken links
- Allows site re-organization without interrupting the visitor experience

## Key options and boundaries

The planned feature focuses on client-side redirects, which run in the visitor's browser once the site is loaded. This means:

- Redirects work on static hosting and don't require server configuration
- Redirect pages are generated at build time, not created by hand
- Rules can be defined for localized paths so language versions remain in sync

When available, the following guides cover the common redirect workflows:

- [How to handle page renames without 404s](doc:3bba0cd8-b2ff-4a98-b4b7-c1569009a038)
- [How to redirect broken or legacy URLs](doc:f184b303-4e11-463c-a652-a1805c4e4d60)
- [How to configure redirect rules for localized paths](doc:83261685-f759-485c-ab93-e876b7a69a5f)
- [How to generate redirect pages at build time](doc:667e20e0-0f37-49dd-b9ea-c8cf180727d6)

## What is available now

The current CodeKnit application is a client-side snippet manager. The features that are implemented and documented include:

- [Dashboard](doc:0cccb845-62f3-4e2b-b0ca-c7d768eaf700), home screen with library statistics
- [Snippet Library](doc:9f431e10-b005-4cc0-80b1-0af4acdcb3d8), core storage and retrieval of code snippets
- [Search and Filter](doc:3704cb56-cf68-421d-9db0-d3816a8af756), find snippets by query, language, category, and favorites
- [Favorites](doc:b66c5560-9b68-42eb-922d-a8aecab0dfcb), mark snippets for quick access
- [Import and Export](doc:f1b42dc6-1597-47d7-b921-658815f5af20), back up and restore your snippet library

If you have questions about whether Client-Side Redirects is available in a newer release, check the release notes for your current version.
