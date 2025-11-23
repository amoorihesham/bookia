# Bookia

A modern booking application built with Next.js.

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Auth:** Clerk
- **Payments:** Stripe
- **Job Queue:** Inngest
- **Testing:** Vitest, React Testing Library
- **Linting & Formatting:** ESLint, Prettier

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd bookia
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Copy `.env.example` to `.env.local` and fill in the required values.

    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `pnpm dev`: Run development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint
- `pnpm format`: Format code with Prettier
- `pnpm test`: Run tests
- `pnpm type-check`: Run TypeScript type checking
- `pnpm db:push`: Push schema changes to the database

## Contributing

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Make your changes.
4.  Run tests and linting (`pnpm test`, `pnpm lint`).
5.  Commit your changes (`git commit -m 'Add some amazing feature'`).
6.  Push to the branch (`git push origin feature/amazing-feature`).
7.  Open a Pull Request.
