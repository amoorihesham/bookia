# Project Structure Guide

This document provides a comprehensive overview of the project's architecture and directory structure. We follow a **Feature-Based Architecture** to keep code modular, maintainable, and scalable.

## Root Directory

| File / Folder       | Description                                                 |
| :------------------ | :---------------------------------------------------------- |
| `src/`              | properties source code for the application.                 |
| `public/`           | Static assets (images, icons, fonts).                       |
| `docs/`             | Project documentation (Setup, Structure, etc.).             |
| `drizzle.config.ts` | Configuration for Drizzle Kit (migrations & introspection). |
| `package.json`      | Dependencies and npm scripts.                               |
| `.env.local`        | Local environment variables.                                |
| `components.json`   | Shadcn UI configuration.                                    |
| `middleware.ts`     | request interception (Auth protection).                     |

---

## Source Directory (`src/`)

### 1. Features (`src/features/`)

**The Core Business Logic.** Code is organized by domain.

- `events/`: Event CRUD, browsing, and display logic.
- `bookings/`: Ticket reservation and booking flow.
- `users/`: User profiles, roles, and data.
- `subscriptions/`: SaaS plan management & billing.
- `plans/`: Pricing tiers definition.

**Feature Structure:**

```
src/features/events/
├── actions/      # Server Actions (Mutations & Queries)
├── components/   # UI Components specific to this feature
├── db/           # Database repositories & queries
├── helpers/      # Utilities & Validators
└── schemas/      # Zod validation schemas
```

### 2. Application (`src/app/`)

**Next.js App Router (Routing Layer)**.

- `(root)/`: Main user-facing application (Home, Events, Dashboard).
- `(auth)/`: Authentication pages (Clerk managed).
- `admin/`: Specialized Admin Dashboard routes.
- `api/`: Route Handlers (Webhooks, Inngest endpoints).
- `globals.css`: Global styles & Tailwind directives.
- `layout.tsx`: Root application layout.

### 3. Services (`src/services/`)

**External Integrations.**

- `clerk/`: Authentication logic & helpers.
- `stripe/`: Payment processing & webhook handling.
- `inngest/`: Background job queues & event functions.
- `cloudinary/`: Image storage & optimization.

### 4. Components (`src/components/`)

**Reusable UI Library.**

- `ui/`: Primitive UI elements (Buttons, Inputs, Dialogs) - powered by Shadcn UI.
- `shared/`: Common compound components used across multiple features.
- `providers/`: Global React Context providers (Theme, Toast, etc.).
- `buttons/`: Specialized global buttons.
- `sidebar/`: App navigation sidebar components.

### 5. Database (`src/drizzle/`)

**Data Layer Configuration.**

- `schema.ts`: Main schema export.
- `schemas/`: Individual table definitions.
- `db.ts`: Database client instance.
- `migrations/`: SQL migration history.

### 6. State & Logic

- `src/hooks/`: Global custom hooks (e.g., `useAppForm`, `useMobile`).
- `src/store/`: Global state management (Zustand stores).

### 7. Utilities & Types

- `src/types/`: shared TypeScript definitions (e.g., `ActionResult`).
- `src/data/`: Static data & Environment variable schemas (`env/`).
- `src/shared/`: Shared helper functions and libraries.
  - `utils/`: General utility functions.
  - `lib/`: Auth & specific library wrappers.

---

## Key Development Patterns

- **Server Actions**: We prefer Server Actions (`actions/mutation.ts`, `actions/query.ts`) over API routes for data interaction.
- **Type Safety**: We use Zod for validation and TypeScript for strict typing across the stack.
- **Styling**: Tailwind CSS is used for all styling, with Shadcn UI providing the component primitives.
