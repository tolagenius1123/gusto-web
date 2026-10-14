"use client";

import { GraduationCapIcon, SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { FilterChip, FilterChipGroup } from "@/components/shared/filter-chip";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Course, CourseCategory, DeliveryMode } from "@/types/training";
import { categoryConfig, courseCategories, deliveryLabels } from "../course-options";
import { CourseCard } from "./course-card";

type CategoryFilter = CourseCategory | "all";
type DeliveryFilter = DeliveryMode | "any";

const deliveryOptions: { value: DeliveryFilter; label: string }[] = [
  { value: "any", label: "Any" },
  ...(Object.keys(deliveryLabels) as DeliveryMode[]).map((value) => ({ value, label: deliveryLabels[value] })),
];

interface TrainingBrowserProps {
  courses: Course[];
  certificationDemand: Record<string, number>;
  highlights?: React.ReactNode;
}

export function TrainingBrowser({ courses, certificationDemand, highlights }: TrainingBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [delivery, setDelivery] = useState<DeliveryFilter>("any");

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courses.filter(
      (course) =>
        (category === "all" || course.category === category) &&
        (delivery === "any" || course.delivery === delivery) &&
        (!normalizedQuery ||
          `${course.title} ${course.accreditingBody} ${course.certificationShortName ?? ""}`
            .toLowerCase()
            .includes(normalizedQuery)),
    );
  }, [courses, query, category, delivery]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setDelivery("any");
  }

  return (
    <div className="space-y-6">
      <Card className="animate-rise gap-0 overflow-hidden rounded-2xl py-0">
        <HazardTape animated className="h-1.5" />
        <div className="relative space-y-4 overflow-hidden p-5 sm:p-6">
          <GraduationCapIcon
            aria-hidden="true"
            strokeWidth={1.25}
            className="pointer-events-none absolute -top-6 -right-6 size-44 -rotate-12 text-primary/10"
          />
          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.2em] text-caution uppercase">Gusto Academy</p>
            <h1 className="font-heading text-3xl font-bold tracking-wide uppercase sm:text-4xl">
              Train. Certify. <span className="text-success">Lead.</span>
            </h1>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground">
              Accredited HSE courses from NEBOSH, IOSH, OPITO and IRCA, matched to the certifications employers are
              hiring for right now.
            </p>
          </div>
          <form role="search" onSubmit={(event) => event.preventDefault()} className="relative max-w-xl">
            <label htmlFor="course-search" className="sr-only">
              Search courses
            </label>
            <SearchIcon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              id="course-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search NEBOSH, First Aid, ISO 45001..."
              className="h-11 rounded-full bg-background/70 pl-10"
            />
          </form>
        </div>
      </Card>

      {highlights}

      <section aria-labelledby="courses-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="courses-heading" className="font-heading text-xl font-bold tracking-wide uppercase">
            Courses <span className="text-base text-muted-foreground">({results.length})</span>
          </h2>
          <SegmentedControl label="Delivery mode" options={deliveryOptions} value={delivery} onChange={setDelivery} />
        </div>

        <FilterChipGroup label="Filter by category">
          <FilterChip label="All" isSelected={category === "all"} onSelect={() => setCategory("all")} />
          {courseCategories.map((value) => (
            <FilterChip
              key={value}
              label={categoryConfig[value].label}
              icon={categoryConfig[value].icon}
              isSelected={category === value}
              onSelect={() => setCategory(value)}
            />
          ))}
        </FilterChipGroup>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-10 text-center">
            <p className="font-heading text-lg font-bold uppercase">No courses match</p>
            <p className="mt-1 text-sm text-muted-foreground">Try another category or delivery mode.</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((course, index) => (
              <li key={course.id} className="animate-rise" style={{ animationDelay: `${index * 50}ms` }}>
                <CourseCard
                  course={course}
                  jobDemand={course.certificationShortName ? (certificationDemand[course.certificationShortName] ?? 0) : 0}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
