import { Check, Copy, Folder, Pencil, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { Snippet } from "@/lib/snippets/types";
import { CodePreview } from "./CodePreview";
import { LanguageBadge, formatDate } from "./LanguageBadge";
import { useCopy } from "./use-copy";

interface Props {
  snippet: Snippet | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

export function SnippetDetailViewer({ snippet: s, onClose, onEdit, onDelete, onToggleFavorite }: Props) {
  const { copied, copy } = useCopy();
  return (
    <Dialog open={!!s} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-3xl">
        {s && (
          <>
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <LanguageBadge language={s.language} />
                <span className="inline-flex items-center gap-1"><Folder className="h-3 w-3" />{s.category}</span>
              </div>
              <DialogTitle className="text-xl">{s.title}</DialogTitle>
              <DialogDescription>{s.description || "No description."}</DialogDescription>
            </DialogHeader>
            {s.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map((t) => <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">#{t}</span>)}
              </div>
            )}
            <CodePreview code={s.code} language={s.language} className="max-h-[50vh] overflow-auto" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                Created {formatDate(s.createdAt)} · Updated {formatDate(s.updatedAt)}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={onToggleFavorite} aria-pressed={s.isFavorite}>
                  <Star className={cn("h-4 w-4", s.isFavorite && "fill-syn-number text-syn-number")} />
                  {s.isFavorite ? "Favorited" : "Favorite"}
                </Button>
                <Button variant="ghost" size="sm" onClick={onDelete} className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />Delete
                </Button>
                <Button variant="secondary" size="sm" onClick={onEdit}><Pencil className="h-4 w-4" />Edit</Button>
                <Button size="sm" onClick={() => copy(s.code)}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied!" : "Copy code"}
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
