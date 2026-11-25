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

/** Screenshot in /public/projects/<slug>/<file>.webp (1600×1000). */
const shot = (slug: string, file: string, alt: string, caption?: string) => ({
  src: `/projects/${slug}/${file}.webp`,
  alt,
  caption,
  width: 1600,
  height: 1000,
});

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
    description: 'AI-powered B2B buyer discovery for exporters from Uzbekistan. Piloted with 4 Uzbek exporters.',
    statusLabel: 'Live demo · Piloted with 4 Uzbek exporters',
    statusTone: 'live',
    visual: 'leadnova',
    liveUrl: 'https://leadnova-production.up.railway.app',
    liveLabel: 'Open Live Demo',
    cover: shot(
      'leadnova',
      'results',
      'LeadNova: saved real search for dried apricots to Germany, with ranked buyers and a company panel',
    ),

    homePoints: [
      { title: 'Finds importers and manufacturers that buy the product, by product and country' },
      { title: 'AI reads company websites for proof of purchasing and scores each buyer 0–100 with a reliability label' },
      { title: 'Contacts, a draft outreach email, PDF & Excel export' },
      { title: '“Where to export”: importing countries from UN Comtrade data' },
    ],
    homeStack: ['FastAPI', 'React', 'Vite', 'Tailwind CSS', 'OpenAI API', 'Serper', 'UN Comtrade', 'Docker', 'Railway'],
    metrics: [
      { value: '400', label: 'automated tests' },
      { value: '7', label: 'reference products in regression tests' },
      { value: '~$0.01', label: 'AI cost per search' },
    ],

    intro: [
      'LeadNova finds B2B buyers abroad for exporters from Uzbekistan. Enter a product and a target country: it searches the web, has AI read company websites for evidence of purchasing, scores each company from 0 to 100 with a reliability label, and returns contacts, a draft outreach email and an Excel or PDF report.',
      'A public demo is live. A saved real search (dried apricots → Germany) opens without an access code, and the “Where to export” view ranks importing countries using UN Comtrade data.',
    ],
    problem: [
      'For an exporter, a new market starts with a simple question: which companies in this country would actually buy this product? Answering it usually means hours of manual searching across scattered sources, then a subjective call on which leads are worth pursuing.',
      'Bought contact databases go stale quickly and do not show who intends to buy. Exhibitions and trips are expensive and guarantee nothing.',
    ],
    concept: [
      'Live search instead of a database. LeadNova generates search queries for the product and market, searches the web, filters out marketplaces, catalogs and social networks, and only then sends the remaining company websites to AI.',
      'Every score can be checked: ten weighted criteria with open weights, plus quotations from the company’s own website that support the verdict. Rejected companies stay in the report with a reason.',
    ],
    workflow: [
      'Product input: product, country, buyer type and approximate volume, or up to 50 rows from Excel / CSV',
      'Search query generation for the product and market',
      'Web search',
      'Filtering: two filters before any AI call',
      'AI company analysis: up to three pages of each website',
      'Buyer report: scores, evidence, contacts, Excel and PDF',
    ],
    features: [
      { title: 'Buyer discovery', text: 'Importers, distributors and manufacturers that consume the product, by product and country.' },
      { title: 'Live web search', text: 'Google results via Serper, not a purchased contact database.' },
      { title: 'Filtering before AI', text: 'Marketplaces, catalogs and social networks are removed before any AI call.' },
      { title: 'AI website analysis', text: 'AI reads up to three pages of each company’s website.' },
      { title: 'Evidence-backed score', text: '0–100 from ten weighted criteria, with a reliability label and quotations from the site.' },
      { title: 'Outreach email', text: 'A first email drafted from facts on the company’s website.' },
      { title: 'Excel & PDF reports', text: 'A three-sheet Excel workbook and an A4 PDF report.' },
      { title: 'Where to export', text: 'Top importing countries for the product, with growth, from UN Comtrade.' },
    ],
    architecture: {
      caption: 'Logical architecture of the deployed system, organised by responsibility.',
      layers: [
        { label: 'Client', nodes: [{ title: 'React + Vite + Tailwind', detail: 'Interface in RU / EN' }] },
        { label: 'API', nodes: [{ title: 'FastAPI service', detail: 'Docker · Railway' }] },
        {
          label: 'Search',
          nodes: [
            { title: 'Query generation', detail: 'Per product and market' },
            { title: 'Serper', detail: 'Google web search' },
          ],
        },
        {
          label: 'Filtering',
          nodes: [{ title: 'Two filters before AI', detail: 'Marketplaces, catalogs, social networks removed' }],
        },
        {
          label: 'Analysis',
          nodes: [
            { title: 'OpenAI API', detail: 'Reads up to 3 pages per website' },
            { title: 'Buyer score', detail: '10 weighted criteria → 0–100' },
          ],
        },
        { label: 'Market data', nodes: [{ title: 'UN Comtrade', detail: '“Where to export”' }] },
        {
          label: 'Output',
          nodes: [
            { title: 'Excel', detail: '3 sheets' },
            { title: 'PDF report', detail: 'A4' },
            { title: 'Outreach email' },
          ],
        },
      ],
    },
    stack: [
      { group: 'Backend', items: ['Python', 'FastAPI'] },
      { group: 'Frontend', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'] },
      { group: 'AI', items: ['OpenAI API'] },
      { group: 'Data', items: ['Serper', 'UN Comtrade'] },
      { group: 'Infrastructure', items: ['Docker', 'Railway'] },
    ],
    process: [
      {
        title: 'Problem framing',
        text: "Started from the exporter's real question: which companies abroad actually buy this product, and how can I be sure before spending time on contacts?",
      },
      {
        title: 'Explainable scoring',
        text: 'Designed the score as ten weighted criteria with open weights, backed by quotations, so every verdict can be checked.',
      },
      {
        title: 'AI-assisted implementation',
        text: 'Built with AI coding agents, including Claude Code, under my direction. I reviewed, tested and debugged the changes.',
      },
      {
        title: 'Testing & deployment',
        text: 'Covered with 400 automated tests and regression tests on 7 reference products, then deployed with Docker on Railway.',
      },
    ],
    testing: {
      points: [
        '400 automated tests.',
        'Regression tests on 7 reference products.',
        'Measured AI cost: about $0.01 per search.',
        'Publicly deployed as a live demo and piloted with 4 Uzbek exporters.',
      ],
    },
    contribution: [
      'Product concept and direction',
      'Requirements drawn from exporter workflows',
      'Pipeline, scoring model and architecture design',
      'Implementation guidance for AI coding agents',
      'Code review, testing and debugging',
      'Deployment: Docker on Railway',
    ],
    status: [
      { label: 'Implemented', level: 'yes', value: 'Yes', note: 'Full pipeline works in production' },
      { label: 'Tested', level: 'yes', value: '400 tests', note: 'Plus regression set of 7 products' },
      { label: 'Publicly deployed', level: 'yes', value: 'Live', note: 'Public demo on Railway' },
    ],
    video: { url: null, title: 'LeadNova product walkthrough' },
    screenshots: [
      shot('leadnova', 'landing', 'LeadNova landing page', 'Landing page'),
      shot('leadnova', 'results', 'Ranked buyers for dried apricots to Germany', 'Saved real search: dried apricots → Germany'),
      shot('leadnova', 'company', 'Company panel with AI verdict and evidence quotes', 'Company panel: AI verdict and evidence quoted from the website'),
      shot('leadnova', 'where-to-export', 'Where to export: importing countries from UN Comtrade', '“Where to export”: importing countries from UN Comtrade'),
    ],
    links: [
      {
        label: 'Live demo',
        href: 'https://leadnova-production.up.railway.app',
        kind: 'live',
        description: 'leadnova-production.up.railway.app',
      },
    ],
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
    liveLabel: 'Open Live Demo',

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
    metrics: [
      { value: '900+', label: 'automated tests' },
      { value: '~$0.03', label: 'AI cost per report' },
    ],

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
        'Publicly deployed.',
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
      { label: 'Implemented', level: 'yes', value: 'Yes', note: 'Core functionality live in production' },
      { label: 'Tested', level: 'yes', value: '900+ tests', note: 'Automated suite and live checks' },
      { label: 'Publicly deployed', level: 'yes', value: 'Live', note: 'Public demo and sign-up' },
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
