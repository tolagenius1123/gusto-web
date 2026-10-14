"use client";

import { BriefcaseBusinessIcon, MapPinIcon, SearchIcon, SlidersHorizontalIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getCertificationMatch } from "@/lib/certifications";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/job";
import {
  countActiveFilters,
  defaultJobFilters,
  filterAndSortJobs,
  type JobFilters,
  type JobSort,
} from "../filter-jobs";
import { JobCard } from "./job-card";
import { JobFiltersPanel } from "./job-filters-panel";

const sortOptions: { value: JobSort; label: string }[] = [
  { value: "relevant", label: "Best match" },
  { value: "newest", label: "Newest" },
];

interface JobsBrowserProps {
  jobs: Job[];
  heldCertifications: string[];
}

export function JobsBrowser({ jobs, heldCertifications }: JobsBrowserProps) {
  const [filters, setFilters] = useState<JobFilters>(defaultJobFilters);
  const [sort, setSort] = useState<JobSort>("relevant");

  const results = useMemo(
    () => filterAndSortJobs(jobs, filters, sort, heldCertifications),
    [jobs, filters, sort, heldCertifications],
  );
  const activeFilterCount = countActiveFilters(filters);
  const qualifiedCount = jobs.filter(
    (job) => getCertificationMatch(job.requiredCertifications, heldCertifications).isQualified,
  ).length;
  const urgentCount = jobs.filter((job) => job.isUrgent).length;

  const resetFilters = () => setFilters({ ...defaultJobFilters, keyword: filters.keyword, location: filters.location });

  return (
    <div className="space-y-6">
      <Card className="animate-rise gap-0 overflow-hidden rounded-2xl py-0">
        <HazardTape animated className="h-1.5" />
        <div className="relative space-y-4 p-5 sm:p-6">
          <div className="relative">
            <h1 className="font-heading text-3xl font-bold tracking-wide uppercase sm:text-4xl">
              Find your next <span className="text-caution">HSE</span> role
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Jobs matched to your certifications, site preferences and rotation.
            </p>
          </div>
          <form role="search" onSubmit={(event) => event.preventDefault()} className="relative grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <label htmlFor="job-keyword" className="sr-only">
                Job title or company
              </label>
              <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="job-keyword"
                type="search"
                value={filters.keyword}
                onChange={(event) => setFilters({ ...filters, keyword: event.target.value })}
                placeholder="Job title or company"
                className="h-11 rounded-full bg-background/70 pl-10"
              />
            </div>
            <div className="relative">
              <label htmlFor="job-location" className="sr-only">
                Location
              </label>
              <MapPinIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="job-location"
                type="search"
                value={filters.location}
                onChange={(event) => setFilters({ ...filters, location: event.target.value })}
                placeholder="City, state or country"
                className="h-11 rounded-full bg-background/70 pl-10"
              />
            </div>
            <Button type="submit" className="h-11 rounded-full px-6">
              <SearchIcon aria-hidden="true" />
              Search
            </Button>
          </form>
          <ul className="relative flex flex-wrap gap-2 text-xs">
            <li className="rounded-full border bg-background/60 px-3 py-1">
              <strong className="font-heading text-sm">{jobs.length}</strong> open roles
            </li>
            <li className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-success">
              <strong className="font-heading text-sm">{qualifiedCount}</strong> you&apos;re qualified for
            </li>
            <li className="rounded-full border border-hivis/30 bg-hivis/10 px-3 py-1 text-caution">
              <strong className="font-heading text-sm">{urgentCount}</strong> urgently hiring
            </li>
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <Card size="sm" className="sticky top-24 hidden rounded-2xl lg:flex">
          <CardHeader className="flex items-center justify-between">
            <WidgetTitle icon={SlidersHorizontalIcon}>Filters</WidgetTitle>
            {activeFilterCount > 0 && (
              <Button variant="link" size="xs" onClick={resetFilters}>
                Reset
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <JobFiltersPanel idPrefix="desktop" filters={filters} onChange={setFilters} />
          </CardContent>
        </Card>

        <section aria-labelledby="job-results-heading" className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="job-results-heading" className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
              <BriefcaseBusinessIcon aria-hidden="true" className="size-4" />
              <span>
                <strong className="font-heading text-base text-foreground">{results.length}</strong>{" "}
                {results.length === 1 ? "job" : "jobs"} found
              </span>
            </h2>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger render={<Button variant="outline" className="rounded-full lg:hidden" />}>
                  <SlidersHorizontalIcon aria-hidden="true" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">{activeFilterCount}</span>
                  )}
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85dvh] rounded-t-2xl">
                  <SheetHeader>
                    <SheetTitle className="font-heading text-xl uppercase">Filters</SheetTitle>
                    <SheetDescription>Narrow down roles by site, schedule and experience.</SheetDescription>
                  </SheetHeader>
                  <div className="overflow-y-auto px-4">
                    <JobFiltersPanel idPrefix="mobile" filters={filters} onChange={setFilters} />
                  </div>
                  <SheetFooter className="flex-row">
                    <Button variant="outline" className="flex-1 rounded-full" onClick={resetFilters}>
                      Reset
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <div role="group" aria-label="Sort jobs" className="flex rounded-full border bg-card p-0.5">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={sort === option.value}
                    onClick={() => setSort(option.value)}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      sort === option.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center">
              <p className="font-heading text-lg font-bold uppercase">No jobs match those filters</p>
              <p className="mt-1 text-sm text-muted-foreground">Try removing a filter or searching a wider location.</p>
              <Button variant="outline" className="mt-4 rounded-full" onClick={() => setFilters(defaultJobFilters)}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((job, index) => (
                <li key={job.id} className="animate-rise" style={{ animationDelay: `${index * 50}ms` }}>
                  <JobCard job={job} match={getCertificationMatch(job.requiredCertifications, heldCertifications)} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
