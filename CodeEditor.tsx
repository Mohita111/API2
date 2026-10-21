import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/snippets/types";
import { Highlighted } from "./CodePreview";

interface Props {
  id: string;
  value: string;
  onChange: (v: string) => void;
  language: Language;
  invalid?: boolean;
}

export function CodeEditor({ id, value, onChange, language, invalid }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const lines = Math.max(value.split("\n").length, 8);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const el = e.currentTarget;
      const { selectionStart: s, selectionEnd: end } = el;
      onChange(value.slice(0, s) + "  " + value.slice(end));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 2;
      });
    }
  };

  return (
    <div
      className={cn(
        "max-h-80 overflow-auto rounded-lg border bg-code-bg font-mono text-[13px] leading-6 focus-within:ring-2 focus-within:ring-ring",
        invalid && "border-destructive",
      )}
    >
      <div className="flex min-w-full w-max">
        <div aria-hidden className="sticky left-0 select-none border-r bg-code-bg px-3 py-3 text-right text-muted-foreground/60">
          {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <div className="relative grid flex-1">
          <pre aria-hidden className="col-start-1 row-start-1 whitespace-pre px-4 py-3 text-foreground/90">
            <Highlighted code={value + "\n"} language={language} />
          </pre>
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
        </div>
      </div>
    </div>
  );
}
