export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  duration?: string;
  tier: "fast" | "pro" | "studio_max";
  isStarred: boolean;
  isPublic: boolean;
}

export interface GenerationMode {
  id: "fast" | "pro" | "studio_max";
  label: string;
  credits: string;
  quality: string;
  status: "available" | "high_demand";
  statusLabel: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  isActive?: boolean;
  badge?: number;
}

export interface PreviewCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tier: string;
  hasPlayButton: boolean;
}

export interface AIModel {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface RecentProject {
  id: string;
  title: string;
  dotColor: string;
}
