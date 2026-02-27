# Serrinha

Public website for Serrinha, a regenerative agriculture farm in Portugal. The site presents the farm’s work, values, and offerings and allows visitors to explore content, plan visits, and read blog posts.

## Prerequisites

- **Node.js** 18+ (or current LTS)
- **WordPress backend:** Read access to the headless WordPress instance (GraphQL endpoint) for content fetching

## Architecture

- **Backend:** Headless WordPress at [https://cms.serrinha.pt](https://cms.serrinha.pt), exposing content via WPGraphQL.
- **Frontend:** Next.js (App Router) with TypeScript and Tailwind CSS.
- **Data:** All page and post content is fetched from the WordPress GraphQL endpoint; the frontend has no database.

## Project structure

```
src/
├── app/                 # App Router routes and layouts
│   ├── (site)/          # Shared page helpers (makePage, makeMetadata)
│   ├── about/           # Static pages (regenerative, products, visit, etc.)
│   ├── blog/            # Blog index and [slug] post pages
│   ├── layout.tsx
│   └── page.tsx         # Home
├── components/          # Reusable UI (Header, Footer, HeroSection, Card, Button, Prose, Section)
└── lib/
    ├── wpgraphql/       # GraphQL client and WordPress data
    │   ├── api.ts       # getPageByPath, getAllPosts, getPostBySlug, getAllPostSlugs
    │   ├── fetchGraphQL.ts
    │   ├── queries.ts
    │   └── types.ts
    └── seo.ts           # buildMetadataFromContent (title, description from content)
```

## Environment variables

| Variable | Description |
|----------|-------------|
| `WORDPRESS_GRAPHQL_ENDPOINT` | Full URL of the WPGraphQL endpoint (e.g. `https://cms.serrinha.pt/graphql`). Required for all WordPress data fetching. |

Create `.env.local` in the project root and set this variable (do not wrap the URL in quotes). It is not committed to the repo.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add `.env.local` with one line: `WORDPRESS_GRAPHQL_ENDPOINT=https://cms.serrinha.pt/graphql` (no quotes around the URL).

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push the repository to GitHub or GitLab and import the project in Vercel.
2. In project settings → Environment Variables, add `WORDPRESS_GRAPHQL_ENDPOINT` with value `https://cms.serrinha.pt/graphql`. Set it for **Production** and **Preview** so both environments can fetch content.
3. Deploy using the default Next.js build (`npm run build`). Vercel will use the standard output and handle ISR.

**Before going live:** Ensure `cms.serrinha.pt` has a valid SSL certificate so the GraphQL endpoint is served over HTTPS.

## Security notes

- Do not reference or expose WordPress admin URLs (e.g. wp-admin) in public documentation or config.
- Use HTTPS only for `WORDPRESS_GRAPHQL_ENDPOINT`; the frontend must not call the CMS over plain HTTP.
- In Vercel, set all required environment variables for production (and preview if you use preview deployments).

## Content editing workflow

- Content is edited in WordPress at `cms.serrinha.pt` (pages, posts, media).
- The frontend requests that content over WPGraphQL; it does not connect to the WordPress database directly.
- All WordPress-backed routes use Incremental Static Regeneration (ISR) with a 60-second revalidate window, so updates in WordPress typically appear on the site within about a minute.

## Going live

- **Public site:** Point the `serrinha.pt` domain to the Vercel deployment (e.g. via Vercel’s domain settings and DNS).
- **CMS:** Keep WordPress at `cms.serrinha.pt` on its current host (e.g. SiteGround). Ensure the GraphQL endpoint is reachable from Vercel and that CORS/allowed origins are configured if required.
