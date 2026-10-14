import type { NewsItem } from "@/types/news";
import type { Post } from "@/types/post";
import { currentUser } from "./current-user";
import { mockUsers } from "./users";

export const mockPosts: Post[] = [
  {
    id: "p_001",
    kind: "safety_alert",
    author: mockUsers.chinedu,
    content:
      "Safety alert: Two near misses this week involving dropped objects during crane lifts at our Onne yard. Root cause points to unsecured tools at height.\n\nAction for all teams: tether every tool above 2m, refresh exclusion zones before each lift, and stop the job if the banksman loses line of sight.\n\nShare this with your site teams. #DroppedObjects #LiftingOperations #StopWorkAuthority",
    images: [],
    createdAt: "2026-10-14T08:15:00Z",
    reactionCounts: { like: 84, support: 21, insightful: 37 },
    viewerReaction: null,
    commentCount: 18,
    repostCount: 42,
    comments: [
      {
        id: "cm_001",
        author: mockUsers.tunde,
        content: "We had the same issue offshore last quarter. Tool lanyards cut our dropped object reports by half.",
        createdAt: "2026-10-14T09:02:00Z",
      },
      {
        id: "cm_002",
        author: mockUsers.david,
        content: "Thanks for sharing openly, Chinedu. Circulating this in our Monday toolbox talk.",
        createdAt: "2026-10-14T09:40:00Z",
      },
    ],
  },
  {
    id: "p_002",
    kind: "post",
    author: mockUsers.fatima,
    content:
      "I am happy to share that I have passed my NEBOSH International Diploma! 🎉\n\nTwo years of evenings, weekends and a lot of coffee. Huge thanks to my mentors and to everyone in this community who answered my questions along the way. #NEBOSH #CareerGrowth",
    images: [],
    createdAt: "2026-10-13T17:30:00Z",
    reactionCounts: { like: 212, celebrate: 156, support: 12 },
    viewerReaction: "celebrate",
    commentCount: 64,
    repostCount: 3,
    comments: [],
  },
  {
    id: "p_003",
    kind: "post",
    author: mockUsers.david,
    content:
      "This morning's toolbox talk at our Abuja site focused on working at height. Short, practical and led by the crew themselves. Engagement is always higher when the people doing the work lead the conversation. #ToolboxTalk #WorkingAtHeight",
    images: [
      {
        url: "https://picsum.photos/seed/gusto-toolbox/1200/675",
        alt: "Placeholder image for a site toolbox talk",
        width: 1200,
        height: 675,
      },
    ],
    createdAt: "2026-10-13T07:45:00Z",
    reactionCounts: { like: 143, insightful: 18 },
    viewerReaction: "like",
    commentCount: 9,
    repostCount: 6,
    comments: [],
  },
  {
    id: "p_004",
    kind: "post",
    author: mockUsers.grace,
    content:
      "Five things I check first in any ISO 14001 gap assessment:\n\n1. Is the environmental aspects register actually used, or just filed?\n2. Do legal requirements have named owners and review dates?\n3. Are objectives measurable and linked to significant aspects?\n4. Can frontline staff explain how their work affects the environment?\n5. Is there evidence that management review leads to real decisions?\n\nIf the answer to most of these is no, certification is the least of your worries. What would you add to this list? #ISO14001 #EnvironmentalManagement #Audit",
    images: [],
    createdAt: "2026-10-12T12:10:00Z",
    reactionCounts: { like: 98, insightful: 75 },
    viewerReaction: null,
    commentCount: 27,
    repostCount: 15,
    comments: [],
  },
  {
    id: "p_005",
    kind: "post",
    author: currentUser,
    content:
      "We are hiring two HSE Officers for a new EPC project in Port Harcourt. NEBOSH IGC required, oil and gas experience preferred. Applications are open on the Jobs tab. #Hiring #HSEJobs",
    images: [],
    createdAt: "2026-10-11T10:00:00Z",
    reactionCounts: { like: 57 },
    viewerReaction: null,
    commentCount: 11,
    repostCount: 22,
    comments: [],
  },
];

export const mockNews: NewsItem[] = [
  { id: "n_001", title: "Updated ISO 45001 amendment on climate action", href: "#", meta: "2d ago, 1,204 readers" },
  { id: "n_002", title: "Regulator tightens confined space permit rules", href: "#", meta: "3d ago, 892 readers" },
  { id: "n_003", title: "Heat stress guidance for outdoor crews", href: "#", meta: "4d ago, 2,310 readers" },
  { id: "n_004", title: "Demand for HSE managers up 18% this year", href: "#", meta: "5d ago, 3,017 readers" },
  { id: "n_005", title: "New NEBOSH syllabus changes explained", href: "#", meta: "1w ago, 1,566 readers" },
];
