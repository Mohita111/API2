import { LayoutGrid, List, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LANGUAGES, type SnippetFilters } from "@/lib/snippets/types";

interface Props {
  filters: SnippetFilters;
  onChange: (f: Partial<SnippetFilters>) => void;
  categories: string[];
  tags: string[];
  layout: "grid" | "list";
  onLayout: (l: "grid" | "list") => void;
  hasActive: boolean;
  onClear: () => void;
}

export function SearchFilterBar({ filters, onChange, categories, tags, layout, onLayout, hasActive, onClear }: Props) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input aria-label="Filter snippets" value={filters.query} onChange={(e) => onChange({ query: e.target.value })} placeholder="Filter…" className="pl-8" />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Select value={filters.language} onValueChange={(v) => onChange({ language: v as SnippetFilters["language"] })}>
          <SelectTrigger aria-label="Language filter" className="sm:w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.category} onValueChange={(v) => onChange({ category: v })}>
          <SelectTrigger aria-label="Category filter" className="sm:w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.tag} onValueChange={(v) => onChange({ tag: v })}>
          <SelectTrigger aria-label="Tag filter" className="sm:w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All tags</SelectItem>
            {tags.map((t) => <SelectItem key={t} value={t}>#{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.sort} onValueChange={(v) => onChange({ sort: v as SnippetFilters["sort"] })}>
          <SelectTrigger aria-label="Sort" className="sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Recently Added</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="az">A–Z</SelectItem>
          </SelectContent>
        </Select>
        {hasActive && (
          <Button variant="ghost" onClick={onClear} className="col-span-1"><X className="h-4 w-4" />Clear Filters</Button>
        )}
        <ToggleGroup type="single" value={layout} onValueChange={(v) => v && onLayout(v as "grid" | "list")} variant="outline" className="justify-self-end">
          <ToggleGroupItem value="grid" aria-label="Grid view" title="Grid view"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view" title="List view"><List className="h-4 w-4" /></ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
