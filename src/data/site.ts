import type { EngineeringArea, SecondaryProject, TitledText } from '../types';

/**
 * Global site content. Edit here — components read from this file.
 */
export const site = {
  brand: 'BYTEFORGE',
  role: 'Applied AI Engineer & Founder',
  positioning: ['Applied AI Engineer', 'Founder', 'Software Developer'],
  headline: 'Building intelligent products for real-world impact.',
  supporting: 'From complex business problems to functional AI-powered systems.',
  subtitle:
    'Applied AI engineering, intelligent automation, and software products designed to solve real business problems.',

  /**
   * Your display name. Left null on purpose — it was not provided.
   * Set it (e.g. 'First Last') and it will appear in the About section and footer.
   */
  ownerName: null as string | null,

  email: 'azizbekbax0505@gmail.com',
  github: 'https://github.com/Zynortex',
  githubHandle: 'Zynortex',
  /** Hidden until a real profile URL is added. */
  linkedin: null as string | null,
  /** Hidden until a real file exists, e.g. '/cv/byteforge-cv.pdf' placed in /public/cv. */
  cvUrl: null as string | null,

  currently: [
    'Refining the ByteReport interface and visual design',
    'Open to applied AI engineering roles and product collaborations',
  ],
};

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

export const engineeringAreas: EngineeringArea[] = [
  {
    title: 'Applied AI & LLM Systems',
    text: 'LLM layers that interpret computed results, analyse collected information and write structured commentary, grounded in deterministic data rather than replacing it.',
    appliedIn: ['leadnova', 'bytereport', 'bytecheck-uz'],
    tools: ['OpenAI API'],
    icon: 'brain',
  },
  {
    title: 'Backend Engineering',
    text: 'Python and FastAPI services that handle file ingestion, data processing, scoring pipelines and report generation.',
    appliedIn: ['leadnova', 'bytereport', 'bytecheck-uz'],
    tools: ['Python', 'FastAPI', 'Supabase', 'ReportLab'],
    icon: 'server',
  },
  {
    title: 'Financial Intelligence',
    text: 'Statement parsing, ratio analysis, health scoring, cash-flow forecasting, anomaly detection and credit rating logic.',
    appliedIn: ['bytereport', 'bytecheck-uz'],
    tools: ['pandas', 'pdfplumber'],
    icon: 'chart',
  },
  {
    title: 'B2B Intelligence & Automation',
    text: 'Automated research pipelines that turn a business question into collected data, analysis and a report someone can act on.',
    appliedIn: ['leadnova'],
    icon: 'network',
  },
  {
    title: 'Product Architecture',
    text: 'Modular systems that keep ingestion, deterministic computation, AI interpretation and reporting in separate layers, so each one can change on its own.',
    appliedIn: ['leadnova', 'bytereport', 'bytecheck-uz'],
    tools: ['React', 'TypeScript'],
    icon: 'boxes',
  },
  {
    title: 'AI-assisted Software Development',
    text: 'Directing AI coding agents such as Claude Code with clear requirements, then reviewing, testing and debugging what they produce.',
    appliedIn: ['leadnova', 'bytereport', 'bytecheck-uz'],
    tools: ['Claude Code'],
    icon: 'bot',
  },
];

export const principles: TitledText[] = [
  {
    title: 'Understand the business problem first',
    text: 'Code comes last. I start with the workflow, the decision it supports, and what a useful result looks like for the person who will use it.',
  },
  {
    title: 'Design modular architectures',
    text: 'Ingestion, computation, interpretation and reporting sit in separate layers with clear boundaries, so each can be tested and replaced on its own.',
  },
  {
    title: 'Deterministic logic, LLM interpretation',
    text: 'Numbers that matter are computed deterministically and can be reproduced. Language models explain results; they do not invent them.',
  },
  {
    title: 'AI coding agents as development tools',
    text: 'I use AI coding agents, including Claude Code, to speed up implementation. My requirements and architecture decisions direct them.',
  },
  {
    title: 'Review generated code',
    text: 'Generated code gets the same review as any other contribution. I read it, question it, and change it when it falls short.',
  },
  {
    title: 'Run tests and validate functionality',
    text: 'A feature is done when it has been run, tested and checked against real inputs, not when the code compiles.',
  },
  {
    title: 'Efficiency and user experience',
    text: 'Faster workflows and clearer interfaces are part of the product, not polish added at the end.',
  },
  {
    title: 'Build around practical workflows',
    text: 'Each product starts from a real workflow: an exporter looking for buyers, a business reading its statements, a lender assessing a company.',
  },
];

export const aiRole = [
  'Product direction',
  'Requirements',
  'Architecture decisions',
  'Implementation guidance',
  'Testing',
  'Debugging',
  'Validation',
  'Product development',
];

export const aboutFacets: TitledText[] = [
  {
    title: 'Product thinking',
    text: 'I start from who uses the product and what decision it helps them make.',
  },
  {
    title: 'Engineering curiosity',
    text: 'Credit scoring, statement parsing, multiplayer networking: I go where the hard problem is.',
  },
  {
    title: 'Practical systems',
    text: 'I build software meant to run in a real workflow, not demos meant to impress.',
  },
  {
    title: 'Learning through implementation',
    text: 'Every product here taught me something I could only learn by building it.',
  },
  {
    title: 'International ambition',
    text: 'I build for the Uzbek market today and for international markets next.',
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    name: 'Real Warfare: Conquest',
    summary: 'A 3D medieval strategy and battle game built with Godot 4.7.',
    tech: 'Godot 4.7',
    focus: ['Game systems', 'AI bots', 'Simulation', 'Deterministic validation', 'Gameplay design'],
    visual: 'warfare',
  },
  {
    name: 'BlockFront',
    summary: 'A browser-based voxel RTS multiplayer prototype.',
    tech: 'Browser',
    status: 'Prototype',
    focus: ['Real-time multiplayer', 'Browser graphics', 'Game systems'],
    visual: 'voxel',
  },
];
