# How to configure redirect rules for localized paths

This guide describes how site administrators can set up redirect rules that send visitors from one localized path to another.

> [!NOTE]
> Redirect and localization controls are not available in the current product build. The available interface focuses on snippet management, and no plugin options, redirect rules, or localized path settings are exposed in this version.

## What you can do instead

Site administrators can still manage workspace content and data through the available **Settings** area. If you need to recover or reorganize content after a path change, export your current library as a backup and import it again after any reorganization.

1. Select **Settings** in the sidebar footer.
2. Under **Export library**, select **Export** to download a backup of all your content.
3. When you're ready to move content, select **Import JSON** and choose a previously exported backup.
4. Review the confirmation message to see how many items were imported and whether any duplicates were skipped.

Figure: Available data management flow

```mermaid
graph LR
    A[Open Settings] --> B[Export backup]
    B --> C[Reorganize content]
    C --> D[Import backup]
    D --> E[Confirm result]
```

## Expected result

After completing the available export and import steps, your content is preserved and restored in the new arrangement. However, no automatic routed redirect between old and new localized paths is created in this build.

## Common issues

- **No redirect option appears**: This build does not include redirect configuration. Use the backup and restore steps above as a workaround.
- **Duplicates after import**: Existing items are kept, and duplicates are skipped during import.

## Related

- [Client-Side Redirects](doc:900eb6c2-0c16-406d-a9d9-c4a4a600b85c)
- [How to redirect broken or legacy URLs](doc:f184b303-4e11-463c-a652-a1805c4e4d60)
- [How to generate redirect pages at build time](doc:667e20e0-0f37-49dd-b9ea-c8cf180727d6)
- [Product Overview](doc:ca8f433d-53d1-475b-a3a5-29b24f1ba173)
