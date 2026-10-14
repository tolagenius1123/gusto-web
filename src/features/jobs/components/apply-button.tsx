"use client";

import { CheckIcon, FileTextIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

const savedResumes = [
  { id: "cv_001", name: "Adaeze_Okafor_CV_2026.pdf", updated: "Updated Sep 2026" },
  { id: "cv_002", name: "Adaeze_Okafor_Offshore_CV.pdf", updated: "Updated Mar 2026" },
];

interface ApplyButtonProps {
  jobTitle: string;
  companyName: string;
  defaultEmail: string;
}

export function ApplyButton({ jobTitle, companyName, defaultEmail }: ApplyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasApplied(true);
    setIsOpen(false);
    toast.success(`Application sent to ${companyName}`);
  }

  if (hasApplied) {
    return (
      <Button disabled className="rounded-full px-5">
        <CheckIcon aria-hidden="true" />
        Applied
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={<Button className="rounded-full px-5 shadow-[0_0_24px_-6px_var(--primary)]" />}>
        <SendIcon aria-hidden="true" />
        Apply now
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl uppercase">Apply to {companyName}</DialogTitle>
            <DialogDescription>{jobTitle}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="apply-email">Email</Label>
              <Input id="apply-email" name="email" type="email" defaultValue={defaultEmail} required autoComplete="email" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="apply-phone">Phone</Label>
              <Input id="apply-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+234" />
            </div>
          </div>

          <fieldset className="grid gap-2">
            <legend className="mb-2 text-sm font-medium">Resume</legend>
            <RadioGroup name="resume" defaultValue={savedResumes[0].id}>
              {savedResumes.map((resume) => (
                <Label
                  key={resume.id}
                  htmlFor={resume.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 font-normal has-data-checked:border-primary has-data-checked:bg-primary/5"
                >
                  <RadioGroupItem id={resume.id} value={resume.id} />
                  <FileTextIcon aria-hidden="true" className="size-5 text-destructive" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{resume.name}</span>
                    <span className="text-xs text-muted-foreground">{resume.updated}</span>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </fieldset>

          <div className="grid gap-1.5">
            <Label htmlFor="apply-note">Cover note (optional)</Label>
            <Textarea id="apply-note" name="note" maxLength={1000} placeholder="Why are you a great fit for this role?" className="min-h-24" />
          </div>

          <DialogFooter>
            <Button type="submit" className="rounded-full px-5">
              <SendIcon aria-hidden="true" />
              Submit application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
