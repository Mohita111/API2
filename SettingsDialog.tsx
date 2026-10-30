import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSnippets } from "@/lib/snippets/store";
import { parseSnippetImport } from "@/lib/snippets/import-export";

type UseSnippetsReturn = ReturnType<typeof useSnippets>;
type Snippets = UseSnippetsReturn["snippets"];
type ImportSnippets = UseSnippetsReturn["importSnippets"];
type ImportResult = Awaited<ReturnType<ImportSnippets>>;

interface DownloadSnippetsDeps {
  createObjectURL?: (obj: Blob) => string;
  revokeObjectURL?: (url: string) => void;
  createElement?: (tag: string) => HTMLElement;
  Blob?: typeof Blob;
}

export function downloadSnippets(snippets: Snippets, deps: DownloadSnippetsDeps = {}): void {
  const createObjectURL = deps.createObjectURL ?? ((obj: Blob) => URL.createObjectURL(obj));
  const revokeObjectURL = deps.revokeObjectURL ?? ((url: string) => URL.revokeObjectURL(url));
  const createElement = deps.createElement ?? ((tag: string) => document.createElement(tag));
  const BlobImpl = deps.Blob ?? Blob;

  const url = createObjectURL(new BlobImpl([JSON.stringify(snippets, null, 2)], { type: "application/json" }));
  const anchor = createElement("a") as HTMLAnchorElement;
  anchor.href = url;
  anchor.download = "codeknit-snippets.json";
  anchor.click();
  revokeObjectURL(url);
}

interface ImportSnippetsFromFileDeps {
  readFileText?: (file: File) => Promise<string>;
}

export async function importSnippetsFromFile(
  file: File,
  importSnippets: ImportSnippets,
  deps: ImportSnippetsFromFileDeps = {}
): Promise<{ result: ImportResult; duplicateCount: number }> {
  const readFileText = deps.readFileText ?? ((f: File) => f.text());
  const json = await readFileText(file);
  const preview = parseSnippetImport(json);
  const result = await importSnippets(preview.snippets);
  return { result, duplicateCount: preview.duplicateCount };
}

export function openFilePicker(input: HTMLInputElement | null): void {
  input?.click();
}

export function clearFileInput(input: HTMLInputElement | null): void {
  if (input) input.value = "";
}

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { snippets, reset, importSnippets } = useSnippets();
  const [confirm, setConfirm] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    downloadSnippets(snippets);
    toast.success("Exported snippets", { description: `${snippets.length} snippets downloaded.` });
  };

  const importJson = async (file?: File) => {
    if (!file) return;
    setIsImporting(true);
    try {
      const { result, duplicateCount } = await importSnippetsFromFile(file, importSnippets);
      const skipped = result.skipped + duplicateCount;
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
      clearFileInput(fileInputRef.current);
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
            <Button variant="secondary" disabled={isImporting} onClick={() => openFilePicker(fileInputRef.current)}>
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