# MDX and markdown authoring security controls

This page documents the security-relevant behavior of Markdown and MDX authoring in the CodeKnit API2 code snippet manager. It covers authentication, authorization, data handling, secrets, and threat areas strictly from the provided React source files and`package.json`.

## Scope and evidence

The Markdown authoring surface is implemented in these files:

-`src/components/CodeEditor.tsx`, raw code input with a highlighted overlay
-`src/components/CodePreview.tsx`, tokenized rendering for cards, previews, and the detail viewer
-`src/components/SnippetFormModal.tsx`, create and edit snippet validation
-`src/components/SettingsDialog.tsx`, import, export, and reset controls
-`src/components/AppLayout.tsx`, top-level state and local layout persistence
-`src/components/LanguageBadge.tsx`, supported-language metadata
-`package.json`, dependency inventory

Markdown is a first-class`Language` value in`LanguageBadge.tsx`:

```ts
export const LANG_DOT: Record<Language, string> = {
  JavaScript: "bg-syn-number",
  Python: "bg-syn-function",
  SQL: "bg-syn-string",
  Markdown: "bg-syn-keyword",
};
```

MDX is not present in the provided source.`package.json` lists no`@mdx-js/*`,`remark`,`rehype`,`unified`, or Docusaurus dependency. The provided components contain no MDX compiler, evaluator, or`run` call. Therefore Markdown syntax highlighting is the only authoring path evidenced by the source. MDX-specific risks are not applicable to this code as provided.

## Authentication and authorization

No authentication or authorization mechanism exists in the Markdown authoring flow. The components operate entirely in the browser and do not check user identity, roles, or permissions.

Evidence from`AppSidebar.tsx` labels the workspace as local and device-bound:

```tsx
<div className="truncate text-sm font-medium">My workspace</div>
<div className="truncate text-xs text-muted-foreground">Saved on this device</div>
```

`SnippetFormModal`,`AppLayout`, and`SettingsDialog` call store methods such as`create`,`update`,`remove`,`reset`, and`importSnippets` without any authorization gate.

**Security implication:** Access control is delegated to the browser profile and local device. Anyone who can open the same browser profile can read, modify, export, or reset the snippet library.

## Data handling

### Markdown rendering and escaping

`CodePreview.tsx` tokenizes Markdown code and renders each token as either a React text node or a`<span>` with a fixed CSS class:

```tsx
export function Highlighted({ code, language }: { code: string; language: Language }) {
  const tokens = useMemo(() => tokenize(code, language), [code, language]);
  return (
    <>
      {tokens.map((t, i) =>
        t.type === "plain" ? t.value : <span key={i} className={CLASS[t.type]}>{t.value}</span>,
      )}
    </>
  );
}
```

Markdown-specific token classes are style-only:

```ts
heading: "text-syn-heading font-semibold",
bold: "text-foreground font-semibold",
link: "text-syn-function underline",
```

React escapes all text children and span children. The component does not use`dangerouslySetInnerHTML`,`innerHTML`,`eval`,`new Function`, or an iframe. Markdown heading, bold, and link syntax is converted only into visual styling; it is not interpreted as HTML or executed as a link.

**Security control:** Even if imported or pasted Markdown contains`<script>`,`javascript:` URLs, or event handler attributes, the rendering path treats them as plain text and does not create interactive HTML.

### Raw editor input

`CodeEditor.tsx` edits Markdown through a controlled`<textarea>`:

```tsx
<textarea
  ref={ref}
  id={id}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={onKeyDown}
  spellCheck={false}
  wrap="off"
  aria-invalid={invalid}
  placeholder="// Paste or write your code here"
  className="col-start-1 row-start-1 h-full w-full resize-none overflow-hidden whitespace-pre bg-transparent px-4 py-3 text-transparent caret-foreground outline-none placeholder:text-muted-foreground/50 selection:bg-primary/30"
/>
```

The editor stores raw string state. The only keyboard handling inserts two spaces for Tab:

```ts
if (e.key === "Tab" && !e.shiftKey) {
  e.preventDefault();
  const el = e.currentTarget;
  const { selectionStart: s, selectionEnd: end } = el;
  onChange(value.slice(0, s) + "  " + value.slice(end));
  ...
}
```

No Markdown is compiled, evaluated, or rendered as HTML while the user types.

### Form validation

`SnippetFormModal.tsx