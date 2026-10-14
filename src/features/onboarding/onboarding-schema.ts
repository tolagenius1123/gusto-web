import { z } from "zod";
import { experienceLevels } from "@/config/experience-levels";
import { industries } from "@/config/industries";
import { siteTypes } from "@/config/site-types";

export const onboardingSchema = z.object({
  headline: z.string().trim().min(2, "Tell us your current role").max(120, "Keep it under 120 characters"),
  experienceLevel: z.enum(experienceLevels, "Choose your experience level"),
  industries: z.array(z.enum(industries)).min(1, "Pick at least one industry"),
  siteTypes: z.array(z.enum(siteTypes)).min(1, "Pick at least one site type"),
  location: z.string().trim().min(2, "Enter your city or region").max(80),
  certifications: z.array(z.string()),
  openToWork: z.boolean(),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;

export const onboardingSteps = [
  {
    id: "role",
    title: "Your role",
    description: "Help people and recruiters understand what you do.",
    fields: ["headline", "experienceLevel"],
  },
  {
    id: "work",
    title: "Where you work",
    description: "We use this to tailor jobs, alerts and people suggestions.",
    fields: ["industries", "siteTypes", "location"],
  },
  {
    id: "certifications",
    title: "Your certifications",
    description: "Add the tickets you hold. You can verify them on your profile later.",
    fields: ["certifications", "openToWork"],
  },
] as const satisfies { id: string; title: string; description: string; fields: (keyof OnboardingValues)[] }[];

export const commonCertifications = [
  "NEBOSH IGC",
  "NEBOSH IDip",
  "IOSH Managing Safely",
  "First Aid at Work",
  "BOSIET",
  "ISO 45001 Lead Auditor",
  "ISO 14001 Lead Implementer",
  "HAZOP Leader",
];
