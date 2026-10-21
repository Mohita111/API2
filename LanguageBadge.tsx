import { cn } from "@/lib/utils";
import type { Language } from "@/lib/snippets/types";

export const LANG_DOT: Record<Language, string> = {
  JavaScript: "bg-syn-number",
  Python: "bg-syn-function",
  SQL: "bg-syn-string",
  Markdown: "bg-syn-keyword",
};

export function LanguageBadge({ language, className }: { language: Language; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md border bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground", className)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", LANG_DOT[language])} />
      {language}
    </span>
  );
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
