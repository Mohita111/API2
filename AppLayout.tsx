import { useEffect, useMemo, useState } from "react";
import { Plus, Search, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { filterSnippets } from "@/lib/snippets/filter";
import { useSnippets } from "@/lib/snippets/store";
import type { Snippet, SnippetFilters } from "@/lib/snippets/types";
import { AppSidebar, type Section } from "./AppSidebar";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { EmptyState } from "./EmptyState";
import { SearchFilterBar } from "./SearchFilterBar";
import { SettingsDialog } from "./SettingsDialog";
import { SnippetCard } from "./SnippetCard";
import { SnippetDetailViewer } from "./SnippetDetailViewer";
import { SnippetFormModal } from "./SnippetFormModal";
import { StatsCards } from "./StatsCards";

const DEFAULTS: SnippetFilters = { query: "", language: "all", category: "all", tag: "all", sort: "recent" };
const TITLES: Record<Section, string> = {
  dashboard: "Your Snippets", all: "All Snippets", favorites: "Favorites", recent: "Recently Added", archived: "Archived Snippets",
};

function deriveCategories(snippets: Snippet[]) {
  const m = new Map<string, number>();
  snippets.forEach((s) => m.set(s.category, (m.get(s.category) ?? 0) + 1));
  return [...m].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name));
}

function deriveTags(snippets: Snippet[]) {
  return [...new Set(snippets.flatMap((s) => s.tags))].sort();
}

function deriveCounts(snippets: Snippet[]) {
  return {
    all: snippets.filter((s) => !s.isArchived).length,
    favorites: snippets.filter((s) => s.isFavorite && !s.isArchived).length,
    archived: snippets.filter((s) => s.isArchived).length,
  };
}

function getVisibleSnippets(snippets: Snippet[], filters: SnippetFilters, section: Section) {
  const f = {
    ...filters,
    favoritesOnly: section === "favorites",
    archivedOnly: section === "archived",
    sort: section === "recent" ? "recent" as const : filters.sort,
  };
  const r = filterSnippets(snippets, f);
  return section === "recent" ? r.slice(0, 10) : r;
}

function useSnippetFilters() {
  const [filters, setFilters] = useState<SnippetFilters>(DEFAULTS);
  const update = (p: Partial<SnippetFilters>) => setFilters((f) => ({ ...f, ...p }));
  const clear = () => setFilters((f) => ({ ...DEFAULTS, sort: f.sort }));
  const hasActive = filters.query !== "" || filters.language !== "all" || filters.category !== "all" || filters.tag !== "all";
  return { filters, update, clear, hasActive };
}

function useLayoutPreference() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const saved = localStorage.getItem("codeknit.layout");
    if (saved === "list" || saved === "grid") setLayout(saved);
  }, []);

  const changeLayout = (l: "grid" | "list") => {
    setLayout(l);
    localStorage.setItem("codeknit.layout", l);
  };

  return { layout, changeLayout };
}

type SnippetActionsDeps = Pick<
  ReturnType<typeof useSnippets>,
  "snippets" | "remove" | "toggleFavorite" | "togglePinned" | "toggleArchived"
>;

function useSnippetActions({ snippets, remove, toggleFavorite, togglePinned, toggleArchived }: SnippetActionsDeps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Snippet | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Snippet | null>(null);

  const viewing = snippets.find((s) => s.id === viewingId) ?? null;

  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (s: Snippet) => {
    setViewingId(null);
    setEditing(s);
    setFormOpen(true);
  };

  const fav = (s: Snippet) => toggleFavorite(s.id).catch((e: Error) => toast.error(e.message));

  const pin = (s: Snippet) =>
    togglePinned(s.id)
      .then(() => toast.success(s.isPinned ? "Snippet unpinned" : "Snippet pinned to top"))
      .catch((e: Error) => toast.error(e.message));

  const archive = (s: Snippet) =>
    toggleArchived(s.id)
      .then(() => toast.success(s.isArchived ? "Snippet restored" : "Snippet archived"))
      .catch((e: Error) => toast.error(e.message));

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      await remove(deleting.id);
      if (viewingId === deleting.id) setViewingId(null);
      toast.success("Snippet deleted");
    } catch (e) {
      toast.error((e as Error).message);
    }
    setDeleting(null);
  };

  return {
    formOpen,
    setFormOpen,
    editing,
    setEditing,
    viewingId,
    setViewingId,
    deleting,
    setDeleting,
    viewing,
    openNew,
    openEdit,
    fav,
    pin,
    archive,
    confirmDelete,
  };
}

export function AppLayout() {
  const { snippets, status, error, reload, remove, toggleFavorite, togglePinned, toggleArchived } = useSnippets();
  const [section, setSection] = useState<Section>("dashboard");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const { filters, update, clear, hasActive } = useSnippetFilters();
  const { layout, changeLayout } = useLayoutPreference();

  const {
    formOpen,
    setFormOpen,
    editing,
    viewingId,
    setViewingId,
    deleting,
    setDeleting,
    viewing,
    openNew,
    openEdit,
    fav,
    pin,
    archive,
    confirmDelete,
  } = useSnippetActions({ snippets, remove, toggleFavorite, togglePinned, toggleArchived });

  const categories = useMemo(() => deriveCategories(snippets), [snippets]);
  const tags = useMemo(() => deriveTags(snippets), [snippets]);
  const counts = useMemo(() => deriveCounts(snippets), [snippets]);
  const visible = useMemo(() => getVisibleSnippets(snippets, filters, section), [snippets, filters, section]);

  return (
    <TooltipProvider delayDuration={300}>
      <SidebarProvider>
        <AppSidebar
          section={section} onSection={setSection}
          language={filters.language} onLanguage={(l) => update({ language: l })}
          category={filters.category} onCategory={(c) => update({ category: c })}
          categories={categories}
          counts={counts}
          onNew={openNew} onSettings={() => setSettingsOpen(true)}
        />
        <SidebarInset className="min-w-0">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur md:px-8">
            <SidebarTrigger aria-label="Toggle navigation" />
            <div className="relative max-w-xl flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search snippets"
                value={filters.query}
                onChange={(e) => update({ query: e.target.value })}
                placeholder="Search snippets, tags, or code..."
                className="h-9 bg-card pl-9"
              />
            </div>
            <Button onClick={openNew} className="hidden sm:inline-flex"><Plus className="h-4 w-4" />New Snippet</Button>
            <Button onClick={openNew} size="icon" className="sm:hidden" aria-label="New snippet"><Plus className="h-4 w-4" /></Button>
          </header>

          <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-8 md:px-8">
            {section === "dashboard" && (
              <section className="space-y-6">
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Your code, organized.</h1>
                  <p className="mt-1 text-muted-foreground">Save, discover, and reuse your best snippets.</p>
                </div>
                {status === "ready" && <StatsCards snippets={snippets} />}
              </section>
            )}

            <section className="space-y-4">
              <div className="flex items-baseline justify-between gap-2">
                {section === "dashboard"
                  ? <h2 className="text-lg font-semibold">{TITLES[section]}</h2>
                  : <h1 className="text-2xl font-semibold tracking-tight">{TITLES[section]}</h1>}
                <span className="text-sm text-muted-foreground">{visible.length} shown</span>
              </div>
              <SearchFilterBar
                filters={filters} onChange={update} categories={categories.map((c) => c.name)} tags={tags}
                layout={layout} onLayout={changeLayout} hasActive={hasActive} onClear={clear}
              />

              {status === "loading" && (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {[0, 1, 2].map((i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
                </div>
              )}
              {status === "error" && (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/40 p-10 text-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <p className="text-sm">Couldn't load your snippets: {error}</p>
                  <Button variant="secondary" onClick={reload}>Try again</Button>
                </div>
              )}
              {status === "ready" && (visible.length === 0 ? (
                <EmptyState filtered={hasActive || section === "favorites"} onClear={() => { clear(); setSection("all"); }} onCreate={openNew} />
              ) : (
                <div className={cn("grid gap-4", layout === "grid" ? "md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                  {visible.map((s) => (
                    <SnippetCard
                      key={s.id} snippet={s} layout={layout}
                      onView={() => setViewingId(s.id)} onEdit={() => openEdit(s)}
                      onDelete={() => setDeleting(s)} onToggleFavorite={() => fav(s)}
                      onTogglePinned={() => pin(s)} onToggleArchived={() => archive(s)}
                    />
                  ))}
                </div>
              ))}
            </section>
          </main>
        </SidebarInset>

        <SnippetDetailViewer
          snippet={viewing} onClose={() => setViewingId(null)}
          onEdit={() => viewing && openEdit(viewing)}
          onDelete={() => viewing && setDeleting(viewing)}
          onToggleFavorite={() => viewing && fav(viewing)}
        />
        <SnippetFormModal open={formOpen} onOpenChange={setFormOpen} editing={editing} categories={categories.map((c) => c.name)} />
        <ConfirmDeleteDialog open={!!deleting} title={deleting?.title} onOpenChange={(o) => !o && setDeleting(null)} onConfirm={confirmDelete} />
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      </SidebarProvider>
    </TooltipProvider>
  );
}