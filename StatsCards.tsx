import { Code2, Languages, Star } from "lucide-react";
import type { Snippet } from "@/lib/snippets/types";

export function StatsCards({ snippets }: { snippets: Snippet[] }) {
  const langs = new Set(snippets.map((s) => s.language));
  const items = [
    { label: "Total snippets", value: snippets.length, icon: Code2, hint: "in your library" },
    { label: "Favorites", value: snippets.filter((s) => s.isFavorite).length, icon: Star, hint: "starred for quick access" },
    { label: "Languages", value: langs.size, icon: Languages, hint: [...langs].join(", ") || "none yet" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map(({ label, value, icon: Icon, hint }) => (
        <div key={label} className="rounded-xl border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {label}<Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">{value}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{hint}</div>
        </div>
      ))}
    </div>
  );
}
