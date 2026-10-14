import type { UserSummary } from "@/types/user";

export const mockUsers = {
  chinedu: {
    id: "u_002",
    username: "chinedu-eze",
    firstName: "Chinedu",
    lastName: "Eze",
    headline: "Process Safety Engineer at Deltaline Energy",
    avatarUrl: null,
  },
  fatima: {
    id: "u_003",
    username: "fatima-bello",
    firstName: "Fatima",
    lastName: "Bello",
    headline: "HSE Officer | NEBOSH IDip | Construction Safety",
    avatarUrl: null,
  },
  david: {
    id: "u_004",
    username: "david-mensah",
    firstName: "David",
    lastName: "Mensah",
    headline: "Head of HSE at Northbridge Construction",
    avatarUrl: null,
  },
  grace: {
    id: "u_005",
    username: "grace-adeyemi",
    firstName: "Grace",
    lastName: "Adeyemi",
    headline: "Environmental Consultant | ISO 14001 Lead Implementer",
    avatarUrl: null,
  },
  tunde: {
    id: "u_006",
    username: "tunde-balogun",
    firstName: "Tunde",
    lastName: "Balogun",
    headline: "Safety Supervisor, Offshore Operations",
    avatarUrl: null,
  },
} satisfies Record<string, UserSummary>;
