# Raply

SaaS platform for automated advertising reports from Meta Ads and Google Ads with AI-powered insights.

**🚀 Ready for Vercel deployment!** See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + Shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Email + OAuth)
- **AI**: Claude API (Anthropic)
- **Email**: Resend
- **Validation**: Zod
- **i18n**: next-intl (Polish + English)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Meta Developer account (for Meta Ads integration)
- Google Cloud account (for Google Ads integration)
- Anthropic API key (for AI insights)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /(auth)           # Unauthorized routes (signin, signup)
  /(dashboard)      # Protected routes (reports, integrations, settings)
  /api              # API routes

/components
  /ui               # Shadcn/ui base components
  /reports          # Report-specific components
  /dashboard        # Dashboard components
  /forms            # Form components

/lib
  /api              # API client wrappers (Meta, Google, Claude)
  /db               # Database queries
  /supabase         # Supabase clients
  /types            # TypeScript types
  /utils            # Utility functions
  /validators       # Zod schemas
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Check TypeScript types

## Features (MVP - Phase 1)

### ✅ Completed
- ✅ **Landing Page** - Responsive landing page with Polish/English translations
- ✅ **Project Setup** - Next.js 15 + TypeScript + Tailwind CSS
- ✅ **Database Schema** - PostgreSQL with RLS policies via Supabase
- ✅ **Admin Role System** - Unlimited access for platform management
- ✅ **Authentication** - Email + OAuth preparation (Supabase Auth)
- ✅ **Dashboard Home** - Stats cards, reports list, empty states, loading states
- ✅ **i18n** - Full internationalization (Polski + English)
- ✅ **Deployment Ready** - Configured for Vercel with production settings

### 🚧 In Progress (60% MVP complete)
- 🚧 Meta Ads OAuth integration
- 🚧 Google Ads OAuth integration
- 🚧 Report creator wizard
- 🚧 Claude API integration for AI insights
- 🚧 Report preview page
- 🚧 PDF export functionality
- 🚧 Email sending with Resend

## Development Workflow

1. Check TaskMaster for active tasks (`.taskmaster/tasks.json`)
2. Fetch Figma design before implementing UI
3. Follow design 1:1 - no improvisation
4. Use Server Components first, Client Components only when needed
5. TypeScript strict - no `any` types
6. Zod validation for all inputs
7. Run CodeRabbit review before committing
8. Update TaskMaster after completing tasks

## Environment Variables

See `.env.example` for all required environment variables.

**For local development:**
```bash
cp .env.example .env.local
# Fill in your credentials in .env.local
```

**For Vercel deployment:**
See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete guide on setting up environment variables in Vercel Dashboard.

## Deployment

**Ready to deploy?** Follow the step-by-step guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

Quick steps:
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

## License

MIT
