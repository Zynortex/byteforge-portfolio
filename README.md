# ByteForge — Portfolio

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion · React Router 7 · lucide-react

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

## Where content lives

All copy and links are in `src/data/`. Components only render it.

| What | File | Field |
| --- | --- | --- |
| Name, email, GitHub, LinkedIn, CV, "Currently" | `src/data/site.ts` | `site.*` |
| Engineering areas, principles, About facets, experiments | `src/data/site.ts` | `engineeringAreas`, `principles`, `aboutFacets`, `secondaryProjects` |
| Featured projects and case studies | `src/data/projects.ts` | `projects[]` |

### Add a demo video
Set `video.url` on a project to one of:
- a YouTube link (`watch?v=`, `youtu.be/`, `embed/`, `shorts/`)
- a Vimeo link
- a file in `/public`, e.g. `"/videos/leadnova.mp4"`

Optional: `video.poster` for a custom thumbnail (YouTube thumbnails are used automatically).
Videos load only when the visitor presses play. With `url: null`, a "Demo coming soon" state is shown.

### Add screenshots
1. Put images in `public/projects/<slug>/` (WebP recommended, ~1600px wide).
2. Add entries to the project's `screenshots` array, including `width` and `height` (prevents layout shift).
3. Optional: set `cover` to a screenshot to replace the illustrative interface on the homepage card.

### Show hidden items
- LinkedIn: set `site.linkedin` to the real profile URL.
- CV: put the PDF in `public/cv/` and set `site.cvUrl` (e.g. `"/cv/cv.pdf"`).
- Name: set `site.ownerName`; it appears in About and the footer.

### Placeholders still open
Search for `To be documented`. They come from `stackPending` and `testing.pending` in `projects.ts`.

## Deploy
`vercel.json` (Vercel) and `public/_redirects` (Netlify) rewrite all routes to `index.html`, so `/projects/<slug>` works on refresh.
