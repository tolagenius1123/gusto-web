export type CourseCategory = "hse_leadership" | "safety" | "iso_standards" | "project_management" | "management";

export type DeliveryMode = "classroom" | "online" | "blended";

export interface Cohort {
  id: string;
  startDate: string;
  location: string;
  seatsLeft: number;
}

export interface CourseModule {
  title: string;
  hours: number;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  accreditingBody: string;
  certificationShortName: string | null;
  delivery: DeliveryMode;
  durationDays: number;
  priceNgn: number;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  isPopular: boolean;
  summary: string;
  outcomes: string[];
  modules: CourseModule[];
  cohorts: Cohort[];
}

export interface Enrollment {
  course: Course;
  progress: number;
  nextLesson: string;
}
