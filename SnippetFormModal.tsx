import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useSnippets } from "@/lib/snippets/store";
import { DEFAULT_CATEGORIES, LANGUAGES, type Language, type Snippet, type SnippetInput } from "@/lib/snippets/types";
import { CodeEditor } from "./CodeEditor";
import { TagInput } from "./TagInput";

const CUSTOM = "__custom__";
const empty = (): SnippetInput => ({
  title: "", description: "", language: "JavaScript", code: "", category: "Utilities", tags: [], isFavorite: false,
});

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  editing: Snippet | null;
  categories: string[];
}

export function SnippetFormModal({ open, onOpenChange, editing, categories }: Props) {
  const { create, update } = useSnippets();
  const [form, setForm] = useState<SnippetInput>(empty);
  const [customCat, setCustomCat] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<"title" | "code" | "category", string>>>({});
  const [saving, setSaving] = useState(false);
  const allCats = Array.from(new Set([...DEFAULT_CATEGORIES, ...categories]));

  useEffect(() => {
    if (!open) return;
    if (editing) {
      const { id, createdAt, updatedAt, ...rest } = editing;
      setForm(rest);
    } else setForm(empty());
    setCustomCat(false);
    setErrors({});
  }, [open, editing]);

  const set = <K extends keyof SnippetInput>(k: K, v: SnippetInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<"title" | "code" | "category", string>> = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.code.trim()) errs.code = "Code is required.";
    if (!form.category.trim()) errs.category = "Enter a category name.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      const data = { ...form, title: form.title.trim(), category: form.category.trim() };
      if (editing) await update(editing.id, data);
      else await create(data);
      toast.success(editing ? "Snippet updated" : "Snippet saved");
      onOpenChange(false);
    } catch (err) {
      toast.error((err as Error).message || "Couldn't save the snippet");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit snippet" : "New snippet"}</DialogTitle>
          <DialogDescription>{editing ? "Update the details of this snippet." : "Save a piece of code you want to reuse."}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="sn-title">Title <span className="text-destructive">*</span></Label>
            <Input id="sn-title" value={form.title} onChange={(e) => set("title", e.target.value)} aria-invalid={!!errors.title} aria-describedby={errors.title ? "sn-title-err" : undefined} placeholder="e.g. Debounce utility" />
            {errors.title && <p id="sn-title-err" className="text-xs text-destructive">{errors.title}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sn-desc">Description</Label>
            <Textarea id="sn-desc" rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What does it do?" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="sn-lang">Language <span className="text-destructive">*</span></Label>
              <Select value={form.language} onValueChange={(v) => set("language", v as Language)}>
                <SelectTrigger id="sn-lang"><SelectValue /></SelectTrigger>
                <SelectContent>{LANGUAGES.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sn-cat">Category</Label>
              {customCat ? (
                <div className="flex gap-2">
                  <Input id="sn-cat" autoFocus value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Custom category" aria-invalid={!!errors.category} />
                  <Button type="button" variant="ghost" onClick={() => { setCustomCat(false); set("category", "Utilities"); }}>Back</Button>
                </div>
              ) : (
                <Select value={form.category} onValueChange={(v) => {
                  if (v === CUSTOM) { setCustomCat(true); set("category", ""); } else set("category", v);
                }}>
                  <SelectTrigger id="sn-cat"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {allCats.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    <SelectItem value={CUSTOM}>+ Custom category…</SelectItem>
                  </SelectContent>
                </Select>
              )}
              {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sn-tags">Tags</Label>
            <TagInput id="sn-tags" value={form.tags} onChange={(t) => set("tags", t)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sn-code">Code <span className="text-destructive">*</span></Label>
            <CodeEditor id="sn-code" value={form.code} onChange={(v) => set("code", v)} language={form.language} invalid={!!errors.code} />
            {errors.code && <p className="text-xs text-destructive">{errors.code}</p>}
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sn-fav" checked={form.isFavorite} onCheckedChange={(c) => set("isFavorite", c)} />
            <Label htmlFor="sn-fav">Mark as favorite</Label>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={saving}>{saving ? "Saving…" : "Save Snippet"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
