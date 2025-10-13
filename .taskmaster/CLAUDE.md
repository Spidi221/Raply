# TaskMaster Configuration for Raply

## Project Context
Raply is a SaaS platform for automated advertising reports from Meta Ads and Google Ads with AI-powered insights.

**Owner**: Bartłomiej (solo founder, bootstrap)
**Timeline**: MVP in 30 days
**Budget**: Minimal (free tier Supabase/Vercel)

## Development Workflow

### 1. Design → Development Process
1. **Bartłomiej creates demo in Figma Make**
2. **Copies to Figma Design**
3. **Claude fetches design via MCP Figma** and follows:
   - Exact layout and spacing
   - Color scheme from design
   - Component structure
   - Typography and sizing
4. **Plan tasks in TaskMaster** before coding
5. **Implement feature** following design
6. **CodeRabbit review** after completion
7. **Fix issues** from CodeRabbit
8. **Generate next tasks** from TaskMaster queue

### 2. Task Planning Rules
- **Break down features** into subtasks (max 2h each)
- **Dependencies first**: auth → database → API → UI
- **Test after each major milestone**
- **Document complex logic** in code comments
- **Always check design** in Figma before implementing UI

### 3. Code Quality Standards
- **TypeScript strict**: No `any`, all types defined
- **Server Components first**: Client only when needed
- **Tailwind only**: Zero custom CSS
- **Shadcn/ui**: Use components, don't build custom
- **Error handling**: Every async in try/catch
- **Loading states**: Suspense + skeleton loaders
- **Supabase RLS**: Always document security policies

### 4. MVP Priorities (DO THESE FIRST)
1. OAuth Meta Ads + Google Ads → fetch data
2. Dashboard: reports list + quick stats
3. Report creator: account → template → dates → generate
4. Claude API: descriptions + recommendations
5. Preview: metrics + AI insights + campaigns table
6. Export: PDF download + email (Resend)

### 5. TaskMaster Usage
- **Update tasks real-time** as you work
- **Mark completed immediately** after finishing
- **Add blockers** as separate tasks when stuck
- **Create subtasks** for complex features
- **Reference Figma links** in task descriptions

### 6. Testing Strategy
- **Manual testing** after each feature
- **Vitest** for critical business logic
- **Test Meta/Google API mocks** before production
- **Supabase local development** for database changes

### 7. Common Patterns

#### Supabase Query Pattern
```typescript
// /lib/db/queries.ts
import { createClient } from '@/lib/supabase/server'

export async function getReports(userId: string) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching reports:', error)
    return { data: null, error }
  }
}
```

#### API Route Pattern
```typescript
// /app/api/reports/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const requestSchema = z.object({
  accountId: z.string(),
  dateRange: z.object({
    from: z.string(),
    to: z.string()
  })
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = requestSchema.parse(body)

    // Your logic here

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

#### Server Component Pattern
```typescript
// /app/(dashboard)/reports/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ReportsList } from '@/components/reports/ReportsList'

export default async function ReportsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/signin')

  const { data: reports } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user.id)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Reports</h1>
      <ReportsList reports={reports} />
    </div>
  )
}
```

### 8. File Structure
```
/app
  /(auth)           # Auth routes (signin, signup)
  /(dashboard)      # Protected routes
    /reports        # Reports list
    /reports/[id]   # Report detail
    /reports/new    # Report creator
  /api              # API routes
/components
  /ui               # Shadcn/ui components
  /reports          # Report-specific components
  /dashboard        # Dashboard components
/lib
  /api              # API wrappers (Meta, Google, Claude)
  /db               # Database queries
  /supabase         # Supabase clients
  /types            # TypeScript types
  /utils            # Utility functions
```

### 9. Environment Variables Template
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Meta Ads
META_APP_ID=
META_APP_SECRET=
NEXT_PUBLIC_META_REDIRECT_URI=

# Google Ads
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=

# Claude API
ANTHROPIC_API_KEY=

# Email (Resend)
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# App
NEXT_PUBLIC_APP_URL=
```

### 10. When Stuck
1. **Check Figma design** for clarity
2. **Review specyfikacja.md** for requirements
3. **Ask Bartłomiej** before making assumptions
4. **Create blocker task** in TaskMaster
5. **Document issue** for future reference

## Remember
- **Design fidelity is critical** - match Figma exactly
- **Security first** - RLS policies for everything
- **Performance matters** - Server Components by default
- **TypeScript strict** - no shortcuts with types
- **Test as you go** - don't batch testing
- **Document decisions** - explain "why" in comments
