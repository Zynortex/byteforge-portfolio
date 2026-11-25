/** Shared content types. All site copy lives in src/data — components only render it. */

export type StatusLevel = 'yes' | 'partial' | 'no' | 'unknown';

export interface StatusItem {
  label: 'Implemented' | 'Tested' | 'Publicly deployed';
  level: StatusLevel;
  value: string;
  note: string;
}

/**
 * Video demo source.
 * `url` accepts a YouTube link (watch / youtu.be / embed), a Vimeo link,
 * or a direct .mp4 / .webm file (e.g. "/videos/leadnova.mp4" in /public).
 * Leave `url` as null to show the "Demo coming soon" state.
 */
export interface VideoSource {
  url: string | null;
  /** Optional custom thumbnail. YouTube thumbnails are used automatically when omitted. */
  poster?: string;
  title: string;
}

export interface Screenshot {
  /** Path relative to /public, e.g. "/projects/leadnova/dashboard.webp" */
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic size — prevents layout shift. */
  width: number;
  height: number;
  /** Optional frame for narrow screens (below `sm`, 640px), e.g. the mobile layout of the app. */
  mobile?: { src: string; width: number; height: number };
}

export interface ArchitectureNode {
  title: string;
  detail?: string;
}

export interface ArchitectureLayer {
  label: string;
  nodes: ArchitectureNode[];
}

export interface ProjectLink {
  label: string;
  href: string;
  kind: 'live' | 'repo' | 'profile';
  description: string;
}

export interface TitledText {
  title: string;
  text: string;
}

export type ProjectVisual = 'leadnova' | 'bytecheck';

export interface FeaturedProject {
  slug: string;
  index: string;
  name: string;
  category: string;
  description: string;
  /** Short, honest status shown on cards. */
  statusLabel: string;
  statusTone: 'live' | 'active' | 'local';
  /** Illustrative interface, used only when there is no real `cover` screenshot. */
  visual?: ProjectVisual;
  /** Optional real screenshot used instead of the illustrative interface on cards. */
  cover?: Screenshot;
  /** Small line under the window when the cover is shown, e.g. "Real interface · sample data". */
  coverCaption?: string;

  /** Homepage summary points. Items with text render as a definition list. */
  homePoints: { title: string; text?: string }[];
  homeStack?: string[];
  /** Real, verifiable numbers only (shown on the card). */
  metrics?: { value: string; label: string }[];

  intro: string[];
  problem: string[];
  concept: string[];
  workflow?: string[];
  features: TitledText[];
  architecture: {
    caption: string;
    layers: ArchitectureLayer[];
  };
  /** null renders a clearly-marked "to be documented" placeholder. */
  stack: { group: string; items: string[] }[] | null;
  stackPending?: string;
  process: TitledText[];
  testing: { points: string[]; pending?: string };
  contribution: string[];
  status: StatusItem[];
  video: VideoSource;
  screenshots: Screenshot[];
  links: ProjectLink[];
  liveUrl?: string;
  /** Button text for liveUrl. Defaults to "View Live Product". */
  liveLabel?: string;
}

export interface EngineeringArea {
  title: string;
  text: string;
  appliedIn: string[]; // project slugs
  tools?: string[];
  icon: 'brain' | 'server' | 'chart' | 'network' | 'boxes' | 'bot';
}

export interface SecondaryProject {
  name: string;
  summary: string;
  tech: string;
  status?: string;
  focus: string[];
  visual: 'warfare' | 'voxel';
}
