# Dev Shah — Portfolio

Premium editorial portfolio for Dev Shah, a founder, developer and designer based in Windsor, Ontario.

## Highlights

- Responsive portfolio with oversized editorial typography
- Current-focus panel and professional experience timeline
- Five data-driven project case studies with live website previews
- Insights section with four long-form articles
- Structured data for Dev Shah, organizations, projects and articles
- Sitemap, crawler rules, canonical URLs and social metadata
- Smooth scrolling, reduced-motion support and accessible navigation

## Technology

- Next.js App Router
- TypeScript
- Tailwind CSS
- GSAP and ScrollTrigger
- Lenis smooth scrolling
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and set the public production URL when one is available:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Vercel's production URL is used automatically when the variable is not supplied.

## Validation

```bash
npm run lint
npm test
```

## Deployment

Import this repository into Vercel. The framework is detected automatically. Add `NEXT_PUBLIC_SITE_URL` if the final custom domain differs from the Vercel production URL.

## Content updates

- Projects: `data/projects.ts`
- Experience: `data/experience.ts`
- Insights: `data/articles.ts`
- Global SEO: `lib/seo.ts`

## License

All portfolio content, branding and project material are © Dev Shah. Source code is provided for this portfolio project and may not be reused without permission.
