import type { Conversation } from "@/types/messaging";
import { currentUser } from "./current-user";
import { mockUsers, networkUsers } from "./users";

const me = currentUser.id;

export const mockConversations: Conversation[] = [
  {
    id: "conv_001",
    kind: "direct",
    title: null,
    label: null,
    participants: [{ user: networkUsers.ngozi, presence: "online", statusNote: null }],
    unreadCount: 1,
    messages: [
      {
        id: "m_001",
        senderId: networkUsers.ngozi.id,
        content: "Thanks for accepting my invite! Your contractor safety talk was brilliant.",
        sentAt: "2026-10-13T16:25:00Z",
        attachment: null,
      },
      {
        id: "m_002",
        senderId: me,
        content: "Thank you Ngozi, glad it was useful. How are things at Coastline?",
        sentAt: "2026-10-13T17:02:00Z",
        attachment: null,
      },
      {
        id: "m_003",
        senderId: networkUsers.ngozi.id,
        content:
          "Busy! We are rolling out a new permit to work system next month. Would you be open to a quick call to share what worked for you at Northbridge?",
        sentAt: "2026-10-14T08:41:00Z",
        attachment: null,
      },
    ],
  },
  {
    id: "conv_002",
    kind: "group",
    title: "Lagos Site HSE Team",
    label: null,
    participants: [
      { user: mockUsers.chinedu, presence: "online", statusNote: null },
      { user: mockUsers.fatima, presence: "away", statusNote: null },
      { user: mockUsers.tunde, presence: "offline", statusNote: "Offshore until Oct 28" },
    ],
    unreadCount: 1,
    messages: [
      {
        id: "m_101",
        senderId: mockUsers.chinedu.id,
        content: "Sharing this from Onne yard. Please brief your crews before Thursday's lifts.",
        sentAt: "2026-10-14T08:20:00Z",
        attachment: {
          kind: "safety_alert",
          title: "Dropped objects during crane lifts",
          summary: "Two near misses this week. Tether all tools above 2m and refresh exclusion zones before each lift.",
        },
      },
      {
        id: "m_102",
        senderId: mockUsers.fatima.id,
        content: "Done for Block C. Crew signed the toolbox talk register.",
        sentAt: "2026-10-14T09:05:00Z",
        attachment: null,
      },
      {
        id: "m_103",
        senderId: me,
        content: "Great work. Fatima, can you upload the signed register to the shared drive?",
        sentAt: "2026-10-14T09:12:00Z",
        attachment: null,
      },
      {
        id: "m_104",
        senderId: mockUsers.chinedu.id,
        content: "Adding the updated lifting plan for reference.",
        sentAt: "2026-10-14T09:30:00Z",
        attachment: { kind: "document", name: "Lifting_Plan_Rev3.pdf", sizeLabel: "1.2 MB" },
      },
    ],
  },
  {
    id: "conv_003",
    kind: "direct",
    title: null,
    label: "Recruiter",
    participants: [{ user: mockUsers.david, presence: "away", statusNote: null }],
    unreadCount: 0,
    messages: [
      {
        id: "m_201",
        senderId: mockUsers.david.id,
        content: "Hi Adaeze, we are expanding our EPC portfolio and I think you would be a strong fit for this role.",
        sentAt: "2026-10-12T11:00:00Z",
        attachment: { kind: "job", jobId: "job_002", title: "HSE Manager, EPC Projects", companyName: "Northbridge Construction" },
      },
      {
        id: "m_202",
        senderId: me,
        content: "Thanks David, I would love to hear more. Is the role open to hybrid working?",
        sentAt: "2026-10-12T12:30:00Z",
        attachment: null,
      },
      {
        id: "m_203",
        senderId: mockUsers.david.id,
        content: "Yes, three days on site and two remote. Shall we book 30 minutes on Friday?",
        sentAt: "2026-10-12T13:10:00Z",
        attachment: null,
      },
    ],
  },
  {
    id: "conv_004",
    kind: "direct",
    title: null,
    label: null,
    participants: [{ user: mockUsers.tunde, presence: "offline", statusNote: "Offshore until Oct 28, limited signal" }],
    unreadCount: 0,
    messages: [
      {
        id: "m_301",
        senderId: mockUsers.tunde.id,
        content: "Here is the JSA for the rig move. Would value your eyes on the lifting section before we sign off.",
        sentAt: "2026-10-10T06:45:00Z",
        attachment: { kind: "document", name: "Rig_Move_JSA.pdf", sizeLabel: "840 KB" },
      },
      {
        id: "m_302",
        senderId: me,
        content: "Reviewed. Add a hold point for wind speed checks before each lift and it is good to go.",
        sentAt: "2026-10-10T09:20:00Z",
        attachment: null,
      },
    ],
  },
  {
    id: "conv_005",
    kind: "direct",
    title: null,
    label: null,
    participants: [{ user: mockUsers.grace, presence: "offline", statusNote: null }],
    unreadCount: 0,
    messages: [
      {
        id: "m_401",
        senderId: mockUsers.grace.id,
        content: "Loved your comment on my ISO 14001 post. Coffee at the next IOSH branch meeting?",
        sentAt: "2026-10-05T14:00:00Z",
        attachment: null,
      },
      {
        id: "m_402",
        senderId: me,
        content: "Absolutely, see you there!",
        sentAt: "2026-10-05T15:30:00Z",
        attachment: null,
      },
    ],
  },
];
