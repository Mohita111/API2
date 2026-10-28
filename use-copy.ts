import { useCallback, useState } from "react";
import { toast } from "sonner";

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 1500);
      return true;
    } catch {
      toast.error("Couldn't copy — your browser blocked clipboard access.");
      return false;
    }
  }, []);
  return { copied, copy };
}

