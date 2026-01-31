# AGENTS.md - TestApp BI Dashboard

## Project Overview

**Stack**: Bun + React + TypeScript + Vite + Tailwind CSS + Shadcn UI + Radix UI + Recharts
**Type**: Frontend-only BI dashboard demo/mock app
**Theme**: Light mode default, with optional dark mode toggle
**Deployment**: Vercel

## Commands

```bash
# Development
bun install              # Install dependencies
bun run dev              # Start dev server (Vite)
bun run build            # Production build
bun run preview          # Preview production build

# Linting & Formatting
bun run lint             # Run ESLint
bun run lint:fix         # Fix ESLint issues
bun run format           # Format with Prettier
bun run typecheck        # TypeScript type checking

# Testing
bun test                 # Run all tests
bun test --watch         # Run tests in watch mode
bun test --coverage      # Run tests with coverage
bun test <pattern>       # Run specific test file (e.g., "bun test KPICard")
bun test --testNamePattern="<name>"  # Run specific test by name

# Shadcn UI
bunx shadcn add <component>   # Add shadcn component
bunx shadcn init              # Initialize shadcn (already done)

# Deployment
vercel                   # Deploy to Vercel
vercel --prod            # Deploy to production
```

## Code Style

### TypeScript

- Use strict TypeScript with explicit types
- Define interfaces in `src/types/index.ts`
- Use `type` for unions, `interface` for object shapes
- Avoid `any` - use `unknown` with type guards instead
- Enable `strictNullChecks` and `noImplicitAny`

### Naming Conventions

- **Components**: PascalCase (e.g., `KPICard.tsx`, `RevenueChart.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useRealtime.ts`)
- **Utilities**: camelCase (e.g., `formatCurrency.ts`)
- **Types/Interfaces**: PascalCase (e.g., `DashboardData`, `ChartConfig`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `REFRESH_INTERVAL`)
- **CSS Classes**: kebab-case (Tailwind utilities)

### File Structure

```
src/
├── components/ui/        # shadcn components (auto-generated)
├── components/layout/    # Sidebar, Header, Layout
├── components/kpi/       # KPI card components
├── components/charts/    # Recharts wrappers
├── components/table/     # Data table components
├── pages/                # Route pages (Dashboard, Analytics, Reports)
├── hooks/                # Custom React hooks
├── data/                 # Mock data generators
├── lib/                  # Utilities (cn function from shadcn)
├── types/                # TypeScript types
└── App.tsx               # Root with routing
```

### Imports Order

1. React imports
2. Third-party libraries (recharts, lucide-react)
3. Shadcn components (@/components/ui/\*)
4. Internal components (@/components/\*)
5. Hooks (@/hooks/\*)
6. Types (@/types/\*)
7. Data/utilities (@/data/_, @/lib/_)
8. Relative imports (./, ../)

Use `@/` path aliases. Group with blank lines between sections.

### Component Structure

```tsx
// Types first
interface Props {
  title: string;
  value: number;
}

// Component
export function Component({ title, value }: Props) {
  // hooks
  // state
  // effects
  // handlers
  // render
}
```

### Styling (Tailwind)

- Use Tailwind utility classes exclusively
- Use `cn()` utility from `lib/utils.ts` for conditional classes
- Follow shadcn's design system tokens
- Group related classes: layout → spacing → sizing → colors → typography
- Use `className` prop for component customization

### Error Handling

- Use try/catch for async operations
- Display user-friendly error messages via toast or alert components
- Log errors to console for debugging
- Use error boundaries for component-level error handling

### State Management

- Use React hooks (useState, useReducer) for local state
- Use Context API only if prop drilling exceeds 3 levels
- Keep state as close to where it's used as possible

### Performance

- Memoize expensive calculations with `useMemo`
- Memoize callbacks with `useCallback` when passed to children
- Use `React.memo` for pure components receiving stable props
- Lazy load routes with `React.lazy()` and `Suspense`

### Testing

- Use Bun's built-in test runner
- Place tests next to components: `Component.tsx` → `Component.test.tsx`
- Test component behavior, not implementation
- Mock external dependencies (recharts, fetch)
- Use `describe` blocks for grouping, `it` for test cases

### Git Conventions

- Commit message format: `<type>: <concise description>`
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`
- Keep commits atomic and focused
- Branch naming: `dhruv2mars/<feature-name>`

### Mock Data

- Place in `src/data/mockData.ts`
- Use realistic value ranges
- Include 12 months of time-series data
- 5 product categories: Electronics, Fashion, Home, Sports, Books
- 5 funnel stages: Visit → Signup → Trial → Paid → Retained

### Dashboard Features

- **KPI Cards**: Revenue, Users, Conversion Rate, Active Sessions
- **Charts**: Revenue (Area), Categories (Pie), User Growth (Line), Funnel (Bar), Regions (Horizontal Bar)
- **Drill-down**: Click chart → Analytics page with context
- **Real-time**: KPIs refresh every 15 seconds (±5% fluctuation)
- **Filters**: Date range picker affects all views

### Vercel Deployment

- SPA routing configured in `vercel.json`
- Build output directory: `dist/`
- Environment: Node.js 18+
