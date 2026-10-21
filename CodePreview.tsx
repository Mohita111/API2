import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { tokenize, type TokenType } from "@/lib/snippets/highlight";
import type { Language } from "@/lib/snippets/types";

const CLASS: Record<TokenType, string> = {
  comment: "text-syn-comment italic",
  string: "text-syn-string",
  keyword: "text-syn-keyword",
  function: "text-syn-function",
  number: "text-syn-number",
  variable: "text-syn-variable",
  heading: "text-syn-heading font-semibold",
  bold: "text-foreground font-semibold",
  link: "text-syn-function underline",
  punct: "text-muted-foreground",
  plain: "",
};

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

interface Props {
  code: string;
  language: Language;
  maxLines?: number;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodePreview({ code, language, maxLines, showLineNumbers = true, className }: Props) {
  const lines = code.split("\n");
  const truncated = maxLines !== undefined && lines.length > maxLines;
  const shown = truncated ? lines.slice(0, maxLines).join("\n") : code;
  const count = truncated ? maxLines! : lines.length;
  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-code-bg", className)}>
      <div className="flex overflow-x-auto font-mono text-[12.5px] leading-6">
        {showLineNumbers && (
          <div aria-hidden className="select-none border-r px-3 py-3 text-right text-muted-foreground/60">
            {Array.from({ length: count }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>
        )}
        <pre className="flex-1 whitespace-pre px-4 py-3 text-foreground/90"><code><Highlighted code={shown} language={language} /></code></pre>
      </div>
      {truncated && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-12 items-end justify-center bg-gradient-to-t from-code-bg to-transparent pb-1.5">
          <span className="rounded-full border bg-card px-2 py-0.5 text-[11px] text-muted-foreground">
            +{lines.length - maxLines!} more lines
          </span>
        </div>
      )}
    </div>
  );
}
