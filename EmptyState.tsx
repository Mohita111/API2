import { SearchX, FileCode2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ filtered, onClear, onCreate, title, description, actionLabel }: { filtered: boolean; onClear: () => void; onCreate: () => void; title?: string; description?: string; actionLabel?: string }) {
  const Icon = filtered ? SearchX : FileCode2;
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center">
      <div className="mb-4 rounded-full bg-accent p-3"><Icon className="h-6 w-6 text-primary" /></div>
      <h3 className="font-semibold">{title ?? (filtered ? "No snippets match" : "No snippets yet")}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {description ?? (filtered ? "Try a different search term or loosen your filters." : "Save your first snippet to start building your library.")}
      </p>
      <Button className="mt-5" variant={filtered ? "secondary" : "default"} onClick={filtered ? onClear : onCreate}>
        {actionLabel ?? (filtered ? "Clear filters" : "+ New Snippet")}
      </Button>
    </div>
  );
}
