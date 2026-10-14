"use client";

import { CalendarCheckIcon, CheckIcon, MapPinIcon } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatShortDate, pluralize } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Cohort } from "@/types/training";

const LOW_SEATS_THRESHOLD = 5;

interface EnrollButtonProps {
  courseTitle: string;
  cohorts: Cohort[];
}

export function EnrollButton({ courseTitle, cohorts }: EnrollButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCohortId, setSelectedCohortId] = useState(cohorts[0]?.id ?? "");
  const [bookedCohort, setBookedCohort] = useState<Cohort | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cohort = cohorts.find((item) => item.id === selectedCohortId);
    if (!cohort) return;
    setBookedCohort(cohort);
    setIsOpen(false);
    toast.success(`Seat reserved for ${formatShortDate(cohort.startDate)}. We will email you payment details.`);
  }

  if (bookedCohort) {
    return (
      <Button disabled className="rounded-full px-5">
        <CheckIcon aria-hidden="true" />
        Booked for {formatShortDate(bookedCohort.startDate)}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        disabled={cohorts.length === 0}
        render={<Button className="rounded-full px-5 shadow-[0_0_24px_-6px_var(--primary)]" />}
      >
        <CalendarCheckIcon aria-hidden="true" />
        Enroll now
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl uppercase">Choose a start date</DialogTitle>
            <DialogDescription>{courseTitle}</DialogDescription>
          </DialogHeader>
          <RadioGroup value={selectedCohortId} onValueChange={(value) => setSelectedCohortId(value as string)}>
            {cohorts.map((cohort) => {
              const isLow = cohort.seatsLeft <= LOW_SEATS_THRESHOLD;
              return (
                <Label
                  key={cohort.id}
                  htmlFor={cohort.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 font-normal has-data-checked:border-primary has-data-checked:bg-primary/5"
                >
                  <RadioGroupItem id={cohort.id} value={cohort.id} />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{formatShortDate(cohort.startDate)}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPinIcon aria-hidden="true" className="size-3" />
                      {cohort.location}
                    </span>
                  </span>
                  <span className={cn("text-xs font-semibold", isLow ? "text-caution" : "text-muted-foreground")}>
                    {pluralize(cohort.seatsLeft, "seat")} left
                  </span>
                </Label>
              );
            })}
          </RadioGroup>
          <DialogFooter>
            <Button type="submit" className="rounded-full px-5">
              Reserve my seat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
