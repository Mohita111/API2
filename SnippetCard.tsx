import { Check, Copy, Eye, MoreHorizontal, Pencil, Star, Trash2, Folder } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Snippet } from "@/lib/snippets/types";
import { CodePreview } from "./CodePreview";
import { LanguageBadge, formatDate } from "./LanguageBadge";
import { useCopy } from "./use-copy";

interface Props {
  snippet: Snippet;
  layout: "grid" | "list";
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  onRecordCopy: () => Promise<void>;
}

function IconAction({ label, onClick, children, active }: { label: string; onClick: () => void; children: React.ReactNode; active?: boolean }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={label} aria-pressed={active} className="h-8 w-8"
          onClick={(e) => { e.stopPropagation(); onClick(); }}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function SnippetCard({ snippet: s, layout, onView, onEdit, onDelete, onToggleFavorite, onRecordCopy }: Props) {
  const { copied, copy } = useCopy();
  const list = layout === "list";
  return (
    <article
      onClick={onView}
      className={cn(
        "group flex cursor-pointer gap-4 rounded-xl border bg-card p-4 shadow-card transition-colors hover:border-primary/40",
        list ? "flex-col md:flex-row" : "flex-col",
      )}
    >
      <div className={cn("flex min-w-0 flex-col gap-2", list && "md:w-80 md:shrink-0")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight">
              <button
                className="text-left hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                onClick={(e) => { e.stopPropagation(); onView(); }}
              >{s.title}</button>
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <LanguageBadge language={s.language} />
              <span className="inline-flex items-center gap-1"><Folder className="h-3 w-3" />{s.category}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center">
            <IconAction label={s.isFavorite ? "Remove from favorites" : "Add to favorites"} onClick={onToggleFavorite} active={s.isFavorite}>
              <Star className={cn("h-4 w-4", s.isFavorite && "fill-syn-number text-syn-number")} />
            </IconAction>
            <DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More actions" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>More actions</TooltipContent>
              </Tooltip>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onSelect={onEdit}><Pencil className="h-4 w-4" />Edit</DropdownMenuItem>
                <DropdownMenuItem onSelect={onDelete} className="text-destructive focus:text-destructive">
                  <Trash2 className="h-4 w-4" />Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {s.description && <p className="line-clamp-2 text-sm text-muted-foreground">{s.description}</p>}
        {s.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.tags.map((t) => (
              <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">#{t}</span>
            ))}
          </div>
        )}
        {list && <CardFooter />}
      </div>
      <CodePreview code={s.code} language={s.language} maxLines={list ? 6 : 8} className="min-w-0 flex-1" />
      {!list && <CardFooter />}
    </article>
  );

  function CardFooter() {
    return (
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <div className="flex flex-col gap-0.5">
          <time dateTime={s.updatedAt} className="text-xs text-muted-foreground">
            {s.updatedAt !== s.createdAt ? "Updated " : ""}{formatDate(s.updatedAt)}
          </time>
          {(s.copyCount ?? 0) > 0 && <span className="text-[11px] text-muted-foreground">Copied {s.copyCount} {(s.copyCount ?? 0) === 1 ? "time" : "times"}</span>}
        </div>
        <div className="flex gap-1.5">
          <Button size="sm" variant="secondary" className="h-8" onClick={async (e) => { e.stopPropagation(); if (await copy(s.code)) { onRecordCopy().catch((e) => toast.error(e.message)); } }}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button size="sm" variant="ghost" className="h-8" onClick={(e) => { e.stopPropagation(); onView(); }}>
            <Eye className="h-3.5 w-3.5" />View
          </Button>
        </div>
      </div>
    );
  }
}