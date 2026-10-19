<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Snippet data goes through `SnippetRepository` (src/lib/snippets/repository.ts), currently localStorage; swap the implementation for an API/database without touching UI components.
- Syntax highlighting is a small in-house regex tokenizer (src/lib/snippets/highlight.ts) — no Prism dependency, keeps SQL/Markdown support simple.
