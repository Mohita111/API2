import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied!");
      timer.current = window.setTimeout(() => setCopied(false), 1500);
      return true;
    } catch {
      toast.error("Couldn't copy — your browser blocked clipboard access.");
      return false;
    }
  }, []);
  return { copied, copy };
}