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

function createUser(id: string, firstName: string, lastName: string, headline: string): UserSummary {
  return {
    id,
    username: `${firstName}-${lastName}`.toLowerCase(),
    firstName,
    lastName,
    headline,
    avatarUrl: null,
  };
}

export const networkUsers = {
  ngozi: createUser("u_007", "Ngozi", "Umeh", "QHSE Lead at Coastline Marine Services"),
  ibrahim: createUser("u_008", "Ibrahim", "Musa", "Construction Safety Manager | NEBOSH IGC"),
  kwame: createUser("u_009", "Kwame", "Asante", "Mine Safety Superintendent, Tarkwa"),
  amara: createUser("u_010", "Amara", "Nwosu", "Environmental Compliance Officer | ISO 14001"),
  samuel: createUser("u_011", "Samuel", "Ojo", "HSE Coordinator at Apex Manufacturing"),
  halima: createUser("u_012", "Halima", "Yusuf", "Occupational Health Nurse | First Aid Trainer"),
  emeka: createUser("u_013", "Emeka", "Obi", "Process Safety Engineer | HAZOP Facilitator"),
  zainab: createUser("u_014", "Zainab", "Lawal", "Graduate HSE Trainee | NEBOSH IGC candidate"),
  peter: createUser("u_015", "Peter", "Adjei", "Group HSE Director, 25 years in oil and gas"),
  folake: createUser("u_016", "Folake", "Ade", "Principal Environmental Consultant"),
} satisfies Record<string, UserSummary>;
