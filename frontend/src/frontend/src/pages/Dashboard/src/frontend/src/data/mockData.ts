import type {
  AIModel,
  GenerationMode,
  NavItem,
  PreviewCard,
  Project,
  RecentProject,
} from "@/types";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "House", isActive: true },
  { id: "recent", label: "Recent Projects", icon: "Clock" },
  { id: "all-projects", label: "All Projects", icon: "FolderOpen" },
  { id: "starred", label: "Starred", icon: "Star" },
  { id: "shared", label: "Shared", icon: "Users" },
  { id: "templates", label: "Templates", icon: "LayoutTemplate" },
  { id: "channels", label: "Channels", icon: "Radio" },
  { id: "support", label: "Support", icon: "LifeBuoy" },
  { id: "settings", label: "Settings", icon: "Settings" },
];

export const recentProjectsNav: RecentProject[] = [
  { id: "rp1", title: "Neon Requiem", dotColor: "#00d4ff" },
  { id: "rp2", title: "The Last Signal", dotColor: "#a855f7" },
  { id: "rp3", title: "Void Protocol", dotColor: "#10b981" },
];

export const generationModes: GenerationMode[] = [
  {
    id: "fast",
    label: "Fast",
    credits: "800 credits/min",
    quality: "Standard quality",
    status: "available",
    statusLabel: "Now",
  },
  {
    id: "pro",
    label: "Pro",
    credits: "2,400 credits/min",
    quality: "Cinematic quality",
    status: "available",
    statusLabel: "Now",
  },
  {
    id: "studio_max",
    label: "Studio Max",
    credits: "6,000 credits/min",
    quality: "8K Ultra quality",
    status: "high_demand",
    statusLabel: "High",
  },
];

export const previewCards: PreviewCard[] = [
  {
    id: "pc1",
    title: "Chrome Phantom",
    subtitle: "Sci-Fi Thriller",
    image: "/assets/generated/preview-card-1.dim_600x800.jpg",
    tier: "Pro",
    hasPlayButton: true,
  },
  {
    id: "pc2",
    title: "Neon Vertigo",
    subtitle: "Cyberpunk Drama",
    image: "/assets/generated/preview-card-2.dim_600x800.jpg",
    tier: "Studio Max",
    hasPlayButton: true,
  },
  {
    id: "pc3",
    title: "Cipher Protocol",
    subtitle: "Tech Thriller",
    image: "/assets/generated/preview-card-3.dim_600x800.jpg",
    tier: "Pro",
    hasPlayButton: true,
  },
  {
    id: "pc4",
    title: "Shadow Meridian",
    subtitle: "Neo-Noir",
    image: "/assets/generated/preview-card-4.dim_600x800.jpg",
    tier: "Fast",
    hasPlayButton: true,
  },
  {
    id: "pc5",
    title: "Vega Prime",
    subtitle: "Space Opera",
    image: "/assets/generated/preview-card-5.dim_600x800.jpg",
    tier: "Studio Max",
    hasPlayButton: true,
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Neon Requiem",
    description:
      "A cyberpunk elegy set in the rain-soaked underworld of Neo-Tokyo",
    thumbnail: "/assets/generated/project-thumb-1.dim_800x500.jpg",
    createdAt: "2026-05-21",
    updatedAt: "2026-05-28",
    duration: "8 days ago",
    tier: "studio_max",
    isStarred: true,
    isPublic: false,
  },
  {
    id: "p2",
    title: "Velvet Underground",
    description:
      "Underground resistance thriller with holographic propaganda aesthetics",
    thumbnail: "/assets/generated/project-thumb-2.dim_800x500.jpg",
    createdAt: "2026-05-22",
    updatedAt: "2026-05-28",
    duration: "1 day ago",
    tier: "pro",
    isStarred: false,
    isPublic: false,
  },
  {
    id: "p3",
    title: "The Last Signal",
    description:
      "An intercepted transmission from the edge of the known universe",
    thumbnail: "/assets/generated/project-thumb-3.dim_800x500.jpg",
    createdAt: "2026-05-23",
    updatedAt: "2026-05-27",
    duration: "1 day ago",
    tier: "pro",
    isStarred: true,
    isPublic: true,
  },
  {
    id: "p4",
    title: "Astral Protocol",
    description:
      "Arcane rituals collide with synthetic intelligence in a dying empire",
    thumbnail: "/assets/generated/project-thumb-4.dim_800x500.jpg",
    createdAt: "2026-05-20",
    updatedAt: "2026-05-26",
    duration: "3 days ago",
    tier: "studio_max",
    isStarred: false,
    isPublic: false,
  },
  {
    id: "p5",
    title: "Heist of the Century",
    description:
      "A five-act neo-heist epic across the floating cities of Europa",
    thumbnail: "/assets/generated/project-thumb-5.dim_800x500.jpg",
    createdAt: "2026-05-18",
    updatedAt: "2026-05-25",
    duration: "4 days ago",
    tier: "pro",
    isStarred: true,
    isPublic: false,
  },
  {
    id: "p6",
    title: "Vega Prime",
    description:
      "An ocean-world discovery arc with bioluminescent alien civilizations",
    thumbnail: "/assets/generated/project-thumb-6.dim_800x500.jpg",
    createdAt: "2026-05-15",
    updatedAt: "2026-05-24",
    duration: "5 days ago",
    tier: "fast",
    isStarred: false,
    isPublic: true,
  },
];

export const aiModels: AIModel[] = [
  { id: "ai-plus", label: "AI+", isActive: true },
  { id: "ai-base", label: "AI", isActive: false },
  { id: "mks", label: "MKS", isActive: false },
  { id: "ai-v2", label: "AI v2", isActive: false },
  { id: "nfpo", label: "NFPO", isActive: false },
];
