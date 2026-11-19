import type { FeaturedProject } from '../types';
import { site } from './site';

/**
 * Featured projects — single source of truth for cards and case study pages.
 *
 * To add media:
 *  - Video:       set `video.url` to a YouTube / Vimeo link or a file in /public (e.g. "/videos/leadnova.mp4").
 *  - Screenshots: put images in /public/projects/<slug>/ and add entries to `screenshots`
 *                 (include width/height to avoid layout shift).
 *  - Cover:       optionally set `cover` to show a real screenshot on the homepage instead of
 *                 the illustrative interface.
 */

const githubProfile = {
  label: 'GitHub profile',
  href: site.github,
  kind: 'profile' as const,
  description: 'Other work and public repositories',
};

export const projects: FeaturedProject[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: 'leadnova',
    index: '01',
    name: 'LeadNova',
    category: 'B2B Export Intelligence',
    description:
      'An AI-powered B2B intelligence platform designed to help exporters discover international market opportunities and potential buyers.',
    statusLabel: 'Used by exporter clients · Runs locally',
    statusTone: 'active',
    visual: 'leadnova',

    homePoints: [
      {
        title: 'Business problem',
        text: 'Finding credible international buyers is slow, manual and scattered across sources.',
      },
      {
        title: 'Data collection & processing',
        text: 'Gathers market and buyer information for a target country and product, then structures it.',
      },
      {
        title: 'AI-based analysis',
        text: 'Evaluates potential buyers and market opportunities against the product and volume.',
      },
      {
        title: 'Structured reporting',
        text: 'Delivers the findings as a structured PDF intelligence report.',
      },
      {
        title: 'Real business use',
        text: 'Used by four exporter clients under a commission-based arrangement.',
      },
    ],

    intro: [
      'LeadNova is an AI-powered B2B intelligence platform that helps exporters find international market opportunities and potential buyers. The exporter says what they sell, how much, and where they want to sell it. LeadNova researches the market and returns a structured intelligence report.',
      'It is a working product that has been used in a real exporter business context. It currently runs locally and is not yet publicly deployed.',
    ],
    problem: [
      'For an exporter, a new market starts with a simple question: who would buy this product, in this quantity, in this country? Answering it usually means hours of manual searching across scattered sources, then a subjective call on which leads are worth pursuing.',
      'That costs time, misses opportunities, and leaves decisions resting on incomplete information.',
    ],
    concept: [
      'LeadNova turns buyer discovery into a repeatable workflow. Three structured inputs (target country, product and quantity) drive a pipeline that collects information, processes it, applies AI-based analysis and produces a report.',
      'The output is built for a business decision rather than a dashboard: a PDF the exporter can read, share and act on.',
    ],
    workflow: [
      'Select target country',
      'Specify exported product',
      'Enter export quantity',
      'Discover and evaluate potential buyers and market opportunities',
      'Process and analyse collected information',
      'Generate a structured PDF intelligence report',
    ],
    features: [
      { title: 'Target market selection', text: 'The exporter chooses the country they want to sell into.' },
      { title: 'Product & volume input', text: 'The exported product and quantity frame the whole search.' },
      { title: 'Buyer & opportunity discovery', text: 'Finds and evaluates potential buyers and market openings.' },
      { title: 'Data processing', text: 'Collected information is processed into a consistent structure.' },
      { title: 'AI-based analysis', text: 'Potential buyers and opportunities are analysed for relevance.' },
      { title: 'PDF intelligence report', text: 'Findings are compiled into a structured, shareable report.' },
    ],
    architecture: {
      caption:
        'High-level pipeline as implemented. Component-level details (data sources, models, libraries) are still to be documented.',
      layers: [
        {
          label: 'Input',
          nodes: [{ title: 'Target country' }, { title: 'Exported product' }, { title: 'Export quantity' }],
        },
        {
          label: 'Collection',
          nodes: [{ title: 'Buyer & market discovery', detail: 'Information gathering for the target market' }],
        },
        {
          label: 'Processing',
          nodes: [{ title: 'Data processing', detail: 'Collected information structured for analysis' }],
        },
        {
          label: 'Analysis',
          nodes: [{ title: 'AI-based evaluation', detail: 'Buyers and opportunities assessed' }],
        },
        {
          label: 'Output',
          nodes: [{ title: 'Structured PDF report', detail: 'Delivered to the exporter' }],
        },
      ],
    },
    stack: null,
    stackPending: 'The LeadNova technology stack will be documented here.',
    process: [
      {
        title: 'Problem framing',
        text: "Started from the exporter's real question: who are realistic buyers for this product, at this volume, in this market?",
      },
      {
        title: 'Workflow design',
        text: 'Designed one linear pipeline from three structured inputs to a single report.',
      },
      {
        title: 'AI-assisted implementation',
        text: 'Built with AI coding agents, including Claude Code, under my direction. I reviewed, tested and debugged the changes.',
      },
      {
        title: 'Real-world use',
        text: 'Put to work in real exporter engagements with four clients.',
      },
    ],
    testing: {
      points: [
        'Used end to end in real exporter engagements with four clients.',
        'Runs locally. Not yet publicly deployed.',
      ],
      pending: 'Test approach and validation criteria will be documented here.',
    },
    contribution: [
      'Product concept and direction',
      'Requirements drawn from exporter workflows',
      'Pipeline and architecture design',
      'Implementation guidance for AI coding agents',
      'Code review, testing and debugging',
      'Delivery to exporter clients under a commission-based arrangement',
    ],
    status: [
      { label: 'Implemented', level: 'yes', value: 'Yes', note: 'Full workflow is functional' },
      { label: 'Tested', level: 'yes', value: 'In real use', note: 'Used in live exporter engagements' },
      { label: 'Publicly deployed', level: 'no', value: 'Not yet', note: 'Runs locally' },
      { label: 'Customer use', level: 'yes', value: '4 exporter clients', note: 'Commission-based arrangement' },
    ],
    video: { url: null, title: 'LeadNova product walkthrough' },
    screenshots: [],
    links: [githubProfile],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'bytereport',
    index: '02',
    name: 'ByteReport',
    category: 'AI Financial Intelligence',
    description:
      'An AI-powered financial intelligence platform that transforms bank statements into structured financial insights and actionable reports.',
    statusLabel: 'Live demo',
    statusTone: 'live',
    visual: 'bytereport',
    liveUrl: 'https://bytereport-frontend.vercel.app/demo',

    homePoints: [
      { title: 'CSV, Excel & PDF statement processing' },
      { title: 'Uzbek, Russian & English interface' },
      { title: 'Deterministic financial calculations' },
      { title: 'Financial Health Score' },
      { title: 'Cash-flow forecasting' },
      { title: 'Anomaly detection' },
      { title: 'AI-generated interpretation' },
      { title: 'PDF reports & Excel export' },
    ],
    homeStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Supabase', 'pandas', 'OpenAI API'],

    intro: [
      'ByteReport turns raw bank statements into structured financial insight. Upload a statement as CSV, Excel or PDF, and ByteReport produces calculations, a Financial Health Score, forecasts, anomaly flags and an AI-written interpretation, all exportable as PDF or Excel.',
      'It is publicly deployed: a live demo report opens instantly, and anyone can sign up and analyse their own statement. The visual design is still being refined.',
    ],
    problem: [
      'A bank statement holds a complete record of financial activity, but not in a form anyone can reason with. Turning hundreds of transactions into an understanding of cash flow, spending and risk takes spreadsheet work most people never do.',
      'Handing the whole job to a language model is not safe either. Financial figures have to be exact and reproducible.',
    ],
    concept: [
      'Split the two jobs. A deterministic engine computes the numbers: totals, scores, forecasts, anomalies. An LLM layer then explains those computed results in plain language.',
      'An Uzbek, Russian and English interface makes it usable in the market it was designed for. Voice, text and image notes let users attach context to their finances.',
    ],
    features: [
      { title: 'Statement processing', text: 'Imports bank statements from CSV, Excel and PDF files.' },
      { title: 'Multilingual interface', text: 'Full interface in Uzbek, Russian and English.' },
      { title: 'Deterministic calculations', text: 'Financial figures are computed by code, not generated by a model.' },
      { title: 'Financial Health Score', text: 'A single score summarising overall financial condition.' },
      { title: 'Cash-flow forecasting', text: 'Projects future cash flow from historical activity.' },
      { title: 'Anomaly detection', text: 'Flags transactions that break from normal patterns.' },
      { title: 'Expense analysis', text: 'Breaks spending down to show where money goes.' },
      { title: 'AI interpretation', text: 'Plain-language explanation of the computed results.' },
      { title: 'PDF financial reports', text: 'Formatted reports ready to read or share.' },
      { title: 'Excel export', text: 'Structured data exported for further analysis.' },
      { title: 'Tax simulation', text: 'Simulates tax scenarios from the financial data.' },
      { title: 'Financial notes', text: 'Voice, text and image-based notes.' },
    ],
    architecture: {
      caption: 'Logical architecture of the implemented system, organised by responsibility.',
      layers: [
        {
          label: 'Client',
          nodes: [
            { title: 'React + TypeScript', detail: 'Interface in UZ / RU / EN' },
            { title: 'Financial notes', detail: 'Voice · text · image' },
          ],
        },
        { label: 'API', nodes: [{ title: 'FastAPI service', detail: 'Python backend' }] },
        {
          label: 'Ingestion',
          nodes: [
            { title: 'pdfplumber', detail: 'PDF statements' },
            { title: 'pandas', detail: 'CSV & Excel statements' },
          ],
        },
        {
          label: 'Deterministic engine',
          nodes: [
            { title: 'Calculations & expenses' },
            { title: 'Health Score' },
            { title: 'Cash-flow forecast' },
            { title: 'Anomaly detection' },
            { title: 'Tax simulation' },
          ],
        },
        {
          label: 'Interpretation',
          nodes: [{ title: 'OpenAI API', detail: 'Narrative over computed results' }],
        },
        {
          label: 'Output & data',
          nodes: [
            { title: 'ReportLab', detail: 'PDF reports' },
            { title: 'Excel export' },
            { title: 'Supabase', detail: 'Data layer' },
          ],
        },
      ],
    },
    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI'] },
      { group: 'Data processing', items: ['pandas', 'pdfplumber'] },
      { group: 'Reporting', items: ['ReportLab'] },
      { group: 'AI', items: ['OpenAI API'] },
      { group: 'Frontend', items: ['React', 'TypeScript'] },
      { group: 'Platform', items: ['Supabase'] },
    ],
    process: [
      {
        title: 'Problem framing',
        text: 'Defined the core job: turn a raw statement into figures and explanations someone can trust.',
      },
      {
        title: 'Deterministic-first design',
        text: 'Kept every calculation in code and gave the LLM only the job of interpreting results.',
      },
      {
        title: 'AI-assisted implementation',
        text: 'Built with AI coding agents, including Claude Code, under my direction. I reviewed, tested and debugged the changes.',
      },
      {
        title: 'Interface refinement',
        text: 'Mobile layout, three-language copy and motion are done. The visual design is still being refined.',
      },
    ],
    testing: {
      points: [
        'An automated suite of 900+ tests, including regression tests that fail if a fixed bug is reintroduced.',
        'Because calculations are deterministic, numeric results are reproducible and can be checked independently.',
        'Found and fixed two event-loop blocking bugs (the AI call and PDF parsing) that froze the whole API, each proven with a before/after health-check test.',
        'Cut peak memory on a 150-page PDF statement from ~700 MB to ~140 MB so it runs on a 512 MB free instance.',
        'Measured cost per AI report: about $0.03.',
        'Publicly deployed. No customer usage is claimed.',
      ],
    },
    contribution: [
      'Product concept and direction',
      'Feature requirements and scope',
      'Architecture: deterministic engine and LLM interpretation layer',
      'Implementation guidance for AI coding agents',
      'Code review, testing and debugging',
      'Deployment: Render (API), Vercel (web), Supabase (auth & data)',
      'Ongoing interface and UX refinement',
    ],
    status: [
      { label: 'Implemented', level: 'yes', value: 'Yes', note: 'Core functionality works locally' },
      { label: 'Tested', level: 'yes', value: '900+ tests', note: 'Automated suite and live checks' },
      { label: 'Publicly deployed', level: 'yes', value: 'Live', note: 'Public demo and sign-up' },
      { label: 'Customer use', level: 'no', value: 'Not yet', note: 'No customer usage claimed' },
    ],
    video: { url: null, title: 'ByteReport product walkthrough' },
    screenshots: [],
    links: [
      {
        label: 'Live demo',
        href: 'https://bytereport-frontend.vercel.app/demo',
        kind: 'live',
        description: 'bytereport-frontend.vercel.app/demo',
      },
      {
        label: 'Source code',
        href: 'https://github.com/Zynortex/bytereport',
        kind: 'repo',
        description: 'github.com/Zynortex/bytereport',
      },
      githubProfile,
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: 'bytecheck-uz',
    index: '03',
    name: 'ByteCheck UZ',
    category: 'Corporate Credit Intelligence',
    description: 'A corporate financial intelligence platform designed for the Uzbek market.',
    statusLabel: 'Live product',
    statusTone: 'live',
    visual: 'bytecheck',
    liveUrl: 'https://bytecheck-uz-frontend.vercel.app/',

    homePoints: [
      { title: 'Company lookup by INN' },
      { title: 'Financial statement analysis' },
      { title: 'Financial ratio calculations' },
      { title: 'Deterministic credit scoring' },
      { title: '0–100 score · AAA–D rating' },
      { title: 'AI analytical commentary' },
      { title: 'PDF reporting' },
    ],
    homeStack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Supabase'],

    intro: [
      "ByteCheck UZ is a corporate financial intelligence platform designed for the Uzbek market. Enter a company's INN (taxpayer identification number) and ByteCheck analyses its financial statements, calculates financial ratios, produces a deterministic credit score from 0 to 100 mapped to an AAA–D rating, and adds AI-generated analytical commentary.",
      'It is publicly deployed and available as a live web application.',
    ],
    problem: [
      'Before lending, offering credit terms or starting a partnership, you need to know whether a company is financially sound. That usually means collecting financial statements, computing ratios by hand, and reaching a judgement that is hard to compare across companies.',
    ],
    concept: [
      'One lookup by INN replaces the manual process. Scoring is deterministic: the same financial data always gives the same score and rating, so results are transparent and comparable.',
      'AI commentary explains the result. It does not decide it.',
    ],
    features: [
      { title: 'Company lookup by INN', text: "Find a company by its taxpayer identification number." },
      { title: 'Financial statement analysis', text: "Analyses the company's reported financials." },
      { title: 'Financial ratio calculations', text: 'Computes the ratios that feed the score.' },
      { title: 'Deterministic credit scoring', text: 'The same inputs always give the same score.' },
      { title: '0–100 scoring system', text: 'A single numeric score for comparison.' },
      { title: 'AAA–D rating', text: 'The score mapped onto a familiar rating scale.' },
      { title: 'AI analytical commentary', text: 'Generated commentary that explains the result.' },
      { title: 'PDF reporting', text: 'A downloadable report of the full analysis.' },
    ],
    architecture: {
      caption: 'Logical architecture of the live system, organised by responsibility.',
      layers: [
        { label: 'Client', nodes: [{ title: 'React + TypeScript', detail: 'Live web application' }] },
        { label: 'API', nodes: [{ title: 'FastAPI service', detail: 'Python backend' }] },
        {
          label: 'Data',
          nodes: [
            { title: 'Company lookup', detail: 'By INN' },
            { title: 'Financial statements' },
            { title: 'Supabase', detail: 'Data layer' },
          ],
        },
        {
          label: 'Scoring engine',
          nodes: [
            { title: 'Ratio calculations' },
            { title: 'Credit score', detail: '0–100' },
            { title: 'Rating map', detail: 'AAA – D' },
          ],
        },
        { label: 'Interpretation', nodes: [{ title: 'AI commentary', detail: 'Explains the computed result' }] },
        {
          label: 'Output',
          nodes: [{ title: 'Web results' }, { title: 'PDF report' }],
        },
      ],
    },
    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI'] },
      { group: 'Frontend', items: ['React', 'TypeScript'] },
      { group: 'Platform', items: ['Supabase'] },
    ],
    process: [
      {
        title: 'Problem framing',
        text: 'Defined the job: a fast, consistent first assessment of an Uzbek company from its INN.',
      },
      {
        title: 'Deterministic scoring design',
        text: 'Built scoring as transparent, rule-based logic so every rating can be traced back to its inputs.',
      },
      {
        title: 'AI-assisted implementation',
        text: 'Built with AI coding agents, including Claude Code, under my direction. I reviewed, tested and debugged the changes.',
      },
      {
        title: 'Public deployment',
        text: 'Released as a live web application that anyone can use.',
      },
    ],
    testing: {
      points: [
        'Deterministic scoring: identical inputs produce identical scores and ratings.',
        'Publicly deployed and working as a live web application.',
      ],
      pending: 'The validation dataset and scoring calibration notes will be documented here.',
    },
    contribution: [
      'Product concept and direction for the Uzbek market',
      'Scoring model and rating design',
      'Architecture and data flow',
      'Implementation guidance for AI coding agents',
      'Code review, testing and debugging',
      'Deployment of the live product',
    ],
    status: [
      { label: 'Implemented', level: 'yes', value: 'Yes', note: 'Full feature set' },
      { label: 'Tested', level: 'yes', value: 'Yes', note: 'Running in live deployment' },
      { label: 'Publicly deployed', level: 'yes', value: 'Live', note: 'Public web application' },
      { label: 'Customer use', level: 'unknown', value: 'Not claimed', note: 'No usage figures stated' },
    ],
    video: { url: null, title: 'ByteCheck UZ product walkthrough' },
    screenshots: [],
    links: [
      {
        label: 'Live product',
        href: 'https://bytecheck-uz-frontend.vercel.app/',
        kind: 'live',
        description: 'bytecheck-uz-frontend.vercel.app',
      },
      githubProfile,
    ],
  },
];

export const getProject = (slug: string | undefined) => projects.find((p) => p.slug === slug);

export const projectName = (slug: string) => projects.find((p) => p.slug === slug)?.name ?? slug;
