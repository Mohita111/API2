# Snippet management

Snippet management is how you build and keep a library of reusable code snippets. You can save code you write often, organize it by language, tag it for context, and return to it later without hunting through old projects.

## What snippet management does

With snippet management you can:

- **Create** a snippet by entering a title, code, language, and optional metadata.
- **Save** it so it is available the next time you open the application.
- **Find** saved snippets from the Dashboard, All Snippets, Favorites, Recently Added, or Recently Used views.
- **Edit** a snippet when your code, description, language, category, or tags change.
- **Mark as favorite** for quick access from the dedicated Favorites view.
- **Delete** snippets you no longer need, with a confirmation step.
- **View details** in a dedicated viewer that shows the full code, metadata, tags, creation dates, and copy history.
- **Copy code** from the card or detail viewer to use it in another place.
- **Track usage** through copy counts and last-copied dates that appear on cards, in the detail viewer, and in the Recently Used view.
- **Filter and sort** your library by text, language, category, tag, and date.

The application keeps your snippets in one central place: the Dashboard. From there you can open the code editor to write or adjust a snippet, with syntax highlighting applied as you type.

## Who snippet management is for

Snippet management is for developers who reuse the same small pieces of code and want a personal code library. It is useful when you are:

- keeping quick references for SQL queries, Markdown templates, JavaScript utilities, or Python functions
- building a reference collection for your own projects
- reducing the time spent copying solutions from scattered notes
- storing code you use across multiple languages in one searchable place

## How a snippet moves through the system

The snippet lifecycle starts when you create a draft in the form, then save it. Once saved, you can view, edit, favorite, or delete it at any time.

Figure: Snippet lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Saved: Save Snippet
    Saved --> Viewed: View
    Viewed --> Editing: Edit
    Editing --> Saved: Save Snippet
    Saved --> Favorited: Star
    Favorited --> Saved: Unstar
    Saved --> Deleted: Delete
    Deleted --> [*]
```

When you save a snippet, the application stores it locally in your browser, and it appears on the Dashboard and in the All Snippets view.

Figure: Saving a new snippet

```mermaid
graph LR
    A[Click New Snippet] --> B[Enter title]
    B --> C[Write or paste code]
    C --> D[Choose language]
    D --> E[Pick or create category]
    E --> F["Optional: add tags and mark favorite"]
    F --> G[Save Snippet]
    G --> H[Snippet appears on Dashboard]
```

## Snippet options

Each snippet has the following fields:

| Field | Required | What it does |
|---|---|---|
| **Title** | Yes | A name you can recognize later. The form shows an error if you leave it empty. |
| **Code** | Yes | The content of the snippet itself. The form shows an error if you leave it empty. |
| **Language** | Yes | Choose from JavaScript, Python, SQL, or Markdown. JavaScript is preselected. The choice determines syntax highlighting and language badge color. |
| **Description** | No | A short summary of what the snippet does. |
| **Category** | Yes | Select a predefined category, choose an existing one from your library, or enter a new custom category. The default category is **Utilities**. If you switch to custom and leave it blank, the form prevents saving. |
| **Tags** | No | Flexible, user-defined labels for contextual searching. Add as many as you like. |
| **Favorite** | No | A toggle that marks the snippet as a favorite for quick access. |

When you fill out the form, only the title and code are strictly required. The category must also contain a value, but it is normally prefilled for you unless you switch to entering a custom category.

For a closer look at what each metadata field means, see [Understanding Snippet Metadata](doc:0454440c-0145-46fc-910a-1e0a7ef4c962).

## Copying and usage history

Every snippet card includes a **Copy** button, and the detail viewer includes a **Copy code** button. When you copy a snippet, the application records that the copy happened.

After a snippet has been copied at least once:

- The snippet card shows **Copied** followed by the total number of copies.
- The detail viewer shows the total number of copies and the date it was last copied.
- The **Recently Used** view lists copied snippets with the most recently copied first.

## Organizing and finding snippets

Your library is structured around five views available from the sidebar:

- **Dashboard**, an overview with statistics for total snippets, favorites, and languages used.
- **All Snippets**, every snippet in your library.
- **Favorites**, only snippets you have marked as favorites.
- **Recently Added**, the 10 most recently saved snippets.
- **Recently Used**, snippets you have copied, ordered by most recently copied.

Categories are listed in the sidebar with counts, letting you filter to a specific category with one click. Languages are also listed individually, so you can quickly see all your JavaScript snippets, for example. Tags appear in the filter bar and on each snippet card, giving you another way to narrow down results. For details, see [Search and Filtering](doc:d4db354c-9033-416f-babe-aaab07cc3975) and [Snippet Organization](doc:c88b9d7b-71f1-4365-b228-3a4ca18a9db4).

You can also switch between a grid layout and a list layout. Your layout preference is remembered on your device.

## Storage and availability

By default, snippets are saved in **browser storage** on the device where you create them. This means:

- Your snippets remain available when you close and reopen the application on the same browser.
- They are tied to the same browser and device.
- They are not automatically synced to another computer or browser.

You can export your library as a JSON backup and import it on another device from the settings dialog. For more on moving your data, see [Import and Export](doc:1e956dfa-9562-4730-ba21-e1a0b0316b86).

## Benefits

- **Quick access to frequently used code**, save a snippet once and open it whenever you need it.
- **Less time rewriting**, reuse working code instead of recreating it from memory.
- **Organized references**, group and find snippets by language, category, or tag.
- **Favorites for the snippets you use most**, keep high-use snippets a click away.
- **Usage insight**, see how often and when each snippet has been copied.
- **A cleaner workflow**, keep small, reusable pieces separate from full projects.

## Limitations

- **Browser storage capacity**, local browser storage has a limited size, typically a few megabytes depending on your browser. Very large snippets or many stored snippets can eventually fill it.
- **Local-only storage by default**, snippets are stored on the current device and browser. They are not available on other devices unless you export and import them yourself.
- **No built-in cloud sync**, the current storage does not synchronize snippets across devices or team members automatically.
- **Single-user workspace**, the workspace is designed for one user on one device at a time. There is no collaborative editing or shared team library.
- **No full version history**, the application tracks created and updated dates, but does not keep a separate version history for each snippet.
