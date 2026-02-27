## Serrinha Website

Next.js (App Router) frontend for `serrinha.pt`, backed by a headless WordPress instance at `https://cms.serrinha.pt/graphql`.

### Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- ESLint
- Headless WordPress via WPGraphQL
- No database

### Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:

   Create `.env.local` (already created here, but you can adjust if needed):

   ```bash
   WORDPRESS_GRAPHQL_ENDPOINT="https://cms.serrinha.pt/graphql"
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   Then open `http://localhost:3000`.

The app will fetch real content from WordPress (pages by path and posts for the blog) and uses ISR (`revalidate = 60`) for all WP-backed routes.

### Deployment (Vercel)

1. Push this `serrinha` folder as a Git repository to GitHub/GitLab.
2. In Vercel, import the project.
3. Set the environment variable:

   - `WORDPRESS_GRAPHQL_ENDPOINT=https://cms.serrinha.pt/graphql`

4. Use the default Next.js build settings:

   - Build command: `npm run build`
   - Output directory: `.next`

Vercel will handle ISR and caching automatically.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
