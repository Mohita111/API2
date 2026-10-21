import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSnippets } from "@/lib/snippets/store";

export function SettingsDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { snippets, reset } = useSnippets();
  const [confirm, setConfirm] = useState(false);
  const exportJson = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(snippets, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url; a.download = "codeknit-snippets.json"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported snippets");
  };
  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); setConfirm(false); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Your snippets are stored in this browser.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div><div className="text-sm font-medium">Export library</div><div className="text-xs text-muted-foreground">Download all {snippets.length} snippets as JSON.</div></div>
            <Button variant="secondary" onClick={exportJson}>Export</Button>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
            <div><div className="text-sm font-medium">Reset to sample data</div><div className="text-xs text-muted-foreground">Replaces all your snippets.</div></div>
            <Button variant="destructive" onClick={async () => {
              if (!confirm) return setConfirm(true);
              await reset(); toast.success("Library reset"); onOpenChange(false);
            }}>{confirm ? "Confirm reset" : "Reset"}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
