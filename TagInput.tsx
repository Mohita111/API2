import { useState, type KeyboardEvent } from "react";
import { X } from "lucide-react";

export function TagInput({ id, value, onChange }: { id: string; value: string[]; onChange: (t: string[]) => void }) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const t = raw.trim().toLowerCase().replace(/^#/, "");
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      add(draft);
    } else if (e.key === "Backspace" && !draft && value.length) {
      onChange(value.slice(0, -1));
    }
  };
  return (
    <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-2 py-1.5 focus-within:ring-2 focus-within:ring-ring">
      {value.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
          #{t}
          <button type="button" aria-label={`Remove tag ${t}`} onClick={() => onChange(value.filter((x) => x !== t))} className="rounded-full hover:text-destructive focus-visible:outline-2 focus-visible:outline-ring">
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        id={id}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => draft && add(draft)}
        placeholder={value.length ? "" : "Type a tag and press Enter"}
        className="min-w-24 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
