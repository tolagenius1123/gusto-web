"use client";

import { PaperclipIcon, SendHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { notifyComingSoon } from "@/lib/notify";

const MAX_MESSAGE_LENGTH = 2000;

export function MessageComposer({ onSend }: { onSend: (content: string) => void }) {
  const [draft, setDraft] = useState("");
  const canSend = draft.trim().length > 0;

  function send() {
    if (!canSend) return;
    onSend(draft.trim());
    setDraft("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send();
    }
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      className="flex items-end gap-2 border-t p-3"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="shrink-0 rounded-full"
        aria-label="Attach a file"
        onClick={() => notifyComingSoon("Attachments")}
      >
        <PaperclipIcon aria-hidden="true" />
      </Button>
      <label htmlFor="message-composer" className="sr-only">
        Write a message
      </label>
      <Textarea
        id="message-composer"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        maxLength={MAX_MESSAGE_LENGTH}
        rows={1}
        className="max-h-32 min-h-10 resize-none rounded-2xl bg-muted/50"
      />
      <Button type="submit" size="icon" disabled={!canSend} className="shrink-0 rounded-full" aria-label="Send message">
        <SendHorizontalIcon aria-hidden="true" />
      </Button>
    </form>
  );
}
