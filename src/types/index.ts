// src/types/index.ts
export interface NavItem {
  text: string;
  href: string;
}

export interface ActionLink {
  text: string;
  href: string;
}

export interface Benefit {
  id: string;
  title: string;
  points: string[];
}

export interface VideoDetail {
  id: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  title: string;
  focus: string;
  duration: string;
  equipment: string;
  level: string;
  videoLink: string; // Could be an ID to an actual video player or a URL
}
