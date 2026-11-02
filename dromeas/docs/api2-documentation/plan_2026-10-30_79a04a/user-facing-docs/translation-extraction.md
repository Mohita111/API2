# Translation extraction

Translation extraction finds text in your project that is marked for translation and gathers it into one organized list. That list is the starting point for offering your site in more than one language.

**Who it is for**

- Developers who write the text that visitors see on screen
- Translators and localization managers who need a complete list of every message a project can show

**The translation extraction workflow**

When a project supports translation extraction, you first mark the text that appears on screen. A scanning step then walks through the project, finds every marked piece of text, and writes them into a single inventory. Translators work from the inventory without needing to touch the rest of the project. When translations are done, they are merged back in and each visitor sees the site in their own language.

Figure: Translation extraction workflow

```mermaid
graph LR
    A[Mark on-screen text] --> B[Scan project for marked text]
    B --> C[Generate message inventory]
    C --> D[Translators translate each message]
    D --> E[Merge finished translations]
    E --> F[Publish site in multiple languages]
```

**Benefits**

- Translators see every message in one place, with no risk of missing text
- Developers can add context for translators, such as where a message appears or what it means
- New text is found automatically in the next scan, so the inventory stays current
- Translation work can be handed to a team or a translation service without giving access to the whole project

**What you can do in this project**

This project does not currently include translation extraction. The available project setup does not offer a way to mark individual pieces of text for translation, scan your content into a translation list, or generate an inventory to share with translators.

The interface text you see in CodeKnit, section names, buttons, form labels, and status messages such as “Your code, organized.” and “Save, discover, and reuse your best snippets.”, is written directly in English. There is no built-in way to replace those messages with translated versions.

**What is not available**

- Marking a piece of text as ready for translation
- Collecting marked text from across your project into one list
- Adding a stable identifier or translator note to a piece of text
- Generating a translation inventory for translators to work from

**Limits**

Translation extraction is not a supported feature in this project version. Every message shown in the interface is written directly in English, so there is no marked text for a scanning step to collect. If you need to translate this site, you will need to add a translation workflow outside of the current setup, or replace the fixed messages with a translation system first.

**Related**

- [How to extract translation messages from source code](doc:105bd8a3-1a4c-404c-b4a8-a8574611c52c)
- [Getting Started with CodeKnit](doc:7f234e87-e4ba-4033-b8f7-2d5423f61808)
