import { mockCourses } from "@/mocks/courses";
import { mockJobs } from "@/mocks/jobs";
import type { Course, Enrollment } from "@/types/training";

export async function getCourses(): Promise<Course[]> {
  return mockCourses;
}

export async function getCourseById(id: string): Promise<Course | null> {
  return mockCourses.find((course) => course.id === id) ?? null;
}

export async function getSimilarCourses(course: Course, limit = 3): Promise<Course[]> {
  return mockCourses
    .filter((candidate) => candidate.id !== course.id)
    .sort((a, b) => Number(b.category === course.category) - Number(a.category === course.category))
    .slice(0, limit);
}

export async function getCurrentEnrollments(): Promise<Enrollment[]> {
  const course = mockCourses.find((item) => item.id === "hse-management");
  return course ? [{ course, progress: 40, nextLesson: "Module 3: KPIs and leading indicators" }] : [];
}

export async function getCertificationDemand(): Promise<Record<string, number>> {
  const demand: Record<string, number> = {};
  for (const job of mockJobs) {
    for (const certification of job.requiredCertifications) {
      demand[certification] = (demand[certification] ?? 0) + 1;
    }
  }
  return demand;
}
