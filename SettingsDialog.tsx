import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSnippets } from "@/lib/snippets/store";
import { parseSnippetImport } from "@/lib/snippets/import-export";

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { snippets, reset, importSnippets } = useSnippets();
  const [confirm, setConfirm] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(snippets, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "codeknit-snippets.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported snippets", { description: `${snippets.length} snippets downloaded.` });
  };

  const importJson = async (file?: File) => {
    if (!file) return;
    setIsImporting(true);
    try {
      const json = await file.text();
      // Validate the entire file before touching saved data.
      const preview = parseSnippetImport(json);
      const result = await importSnippets(preview.snippets);
      const skipped = result.skipped + preview.duplicateCount;
      if (result.imported === 0) {
        toast.info("No new snippets imported", { description: `${skipped} duplicate snippet(s) skipped.` });
      } else {
        toast.success("Import complete", {
          description: `${result.imported} imported${skipped ? `, ${skipped} duplicate(s) skipped` : ""}.`,
        });
      }
    } catch (error) {
      toast.error("Import failed", {
        description: error instanceof Error ? error.message : "Could not read this file.",
      });
    } finally {
      setIsImporting(false);
      // Let the same file be selected again after correcting it.
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); setConfirm(false); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Your snippets are stored in this browser. Export a backup or import a previously exported CodeKnit library.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div><div className="text-sm font-medium">Export library</div><div className="text-xs text-muted-foreground">Download all {snippets.length} snippets as JSON.</div></div>
            <Button variant="secondary" onClick={exportJson}>Export</Button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div className="min-w-0"><div className="text-sm font-medium">Import library</div><div className="text-xs text-muted-foreground">Merge snippets from a CodeKnit JSON export. Existing snippets are kept; duplicates are skipped.</div></div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              aria-label="Choose CodeKnit JSON export"
              onChange={(event) => void importJson(event.target.files?.[0])}
            />
            <Button variant="secondary" disabled={isImporting} onClick={() => fileInputRef.current?.click()}>
              {isImporting ? "Importing…" : "Import JSON"}
            </Button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div><div className="text-sm font-medium">Reset to sample data</div><div className="text-xs text-muted-foreground">Replaces all your snippets.</div></div>
            <Button variant="destructive" onClick={async () => {
              if (!confirm) return setConfirm(true);
              try {
                await reset();
                toast.success("Library reset");
                onOpenChange(false);
              } catch (error) {
                toast.error("Could not reset library", { description: error instanceof Error ? error.message : "Please try again." });
              }
            }}>{confirm ? "Confirm reset" : "Reset"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
