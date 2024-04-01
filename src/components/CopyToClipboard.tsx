"use client";

import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type CopyToClipboardProps = {
  content: string;
};

export default function CopyToClipboard({ content }: CopyToClipboardProps) {
  const { toast } = useToast();

  function handleClick() {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard!",
    });
  }

  return (
    <div
      onClick={handleClick}
      className="flex transition flex-col items-center p-2 rounded cursor-pointer hover:bg-muted"
    >
      <Copy />
      <small className="text-xs">Copy</small>
    </div>
  );
}
