# Translation extraction

Translation extraction identifies and collects all user-facing text in an application so it can be translated into multiple languages. It separates the English text that appears on screen from the code that displays it, enabling translation workflows without changing the underlying functionality.

## Who it is for

Translation extraction is designed for:

- **Developers** who need to prepare an application for multiple languages
- **Translators** who need a consolidated list of text strings to translate
- **Site administrators** who manage which languages are available to users

## Availability in this release

Translation extraction is not currently available in this product. The source files provided contain no string extraction tooling, localization infrastructure, or internationalization support. The project's dependency list includes no translation or internationalization libraries.

All user-facing text is written directly into the interface. For example:

- The delete confirmation reads **Delete this snippet?** with **Cancel** and **Delete** buttons
- The search placeholder reads **Search snippets, tags, or code...**
- The sidebar displays **Dashboard**, **All Snippets**, **Favorites**, **Recently Added**, and **Recently Used**
- The settings dialog reads **Export library** and **Import library**
- Form labels include **Title**, **Description**, **Language**, **Category**, and **Tags**

These labels, buttons, and messages are embedded directly in the interface and cannot be extracted automatically for translation in the current version.

## What this means for you

In this release, the product runs in English only. If your team needs to support additional languages, you would need to modify the interface text directly rather than working from translation files.

## Planned capability

When translation extraction becomes available, it will:

- Scan the interface for all user-facing text
- Collect those strings into a translatable format
- Allow translators to provide translations for each language you choose to support
- Display the interface in the user's preferred language without further code changes
- Track which strings are translated and which remain in the source language

## Limitations

- No translation files or locale directories are included in this release
- No automated string extraction occurs at build time or during development
- User interface text is fixed in English and cannot be changed without code edits
- No language switching, locale detection, or language preference setting is available
- No integration with translation management platforms is present
