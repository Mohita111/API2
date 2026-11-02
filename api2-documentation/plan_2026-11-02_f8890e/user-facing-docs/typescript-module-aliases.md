# TypeScript module aliases

TypeScript module aliases give developers a short, stable way to import project code. Instead of typing long relative paths, you can start an import with the`@/` prefix and let the project resolve the location for you.

This page is for developers who build on or extend this project. You'll benefit most if you already work with TypeScript and the project's components or data utilities.

## What aliases do for you

When you create or update parts of the app, you often need to reuse existing building blocks, such as buttons, inputs, dialogs, or helpers. With module aliases, you can import those pieces using a consistent`@/` prefix.

For example, the app imports shared interface components this way:

```ts
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
```

The same pattern applies to app-wide helpers:

```ts
import { cn } from "@/lib/utils";
```

And to domain data and behavior:

```ts
import { useSnippets } from "@/lib/snippets/store";
import type { Snippet, SnippetFilters } from "@/lib/snippets/types";
```

The alias keeps imports readable even when files are several folders apart.

## Who this helps

Module aliases are most valuable to developers who:

- build or modify the app interface
- add or change shared components
- work with the snippet data layer
- move files between folders and want imports to keep working

## Benefits

### Shorter, more readable imports

You avoid chains of`../../../` that are hard to scan and easy to mistype.

### Stability when files move

Because the`@/` prefix points to a fixed project root, imports remain valid when you relocate a component within its area of the app.

### Better tooling support

TypeScript recognizes the alias during type checking, so your editor can suggest completions, flag missing modules, and help you navigate to the imported code. The project includes TypeScript 5.8.3 for this checking.

## How aliases are used in this project

The`@/` prefix appears throughout the app for:

- shared interface components, such as buttons, dialogs, inputs, and menus
- general utilities, such as class-name merging
- snippet data logic, including the snippet store, filtering, import/export, and syntax highlighting
- domain types shared across screens

The alias itself is configured through the project's TypeScript path settings and is recognized by the Vite tsconfig paths plugin. The provided source files confirm the alias in use and the plugin dependency, but they do not include the full TypeScript configuration file, so your project's exact alias mapping should be confirmed there.

## Related

- [Key concepts and terminology](doc:08c7b9ec-c366-4fc5-b62c-01999c0ae167)
- [System requirements and installation](doc:1016cd5f-d53c-46d7-a74a-15b623ef5387)
