# Project Setup & Run Guide

This guide details how to clone the repository, check out the code, set up the environment, and run the application locally.

## Prerequisities

- **Node.js**: Ensure Node.js is installed (v20+ recommended).
- **npm**: This project uses `npm` as the package manager.
- **Git**: For cloning the repository.

## 1. Clone the Repository

Clone the project from GitHub:

```bash
git clone https://github.com/amoorihesham/bookia.git
cd bookia
```

## 2. Install Dependencies

Install the required packages using npm:

```bash
npm install
```

## 3. Environment Configuration

Create a `.env.local` file in the root directory. Copy the following keys and fill in the values:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
CLERK_SECRET_WEBHOOK_KEY=whsec_...

# Database (Neon/Postgres)
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Stripe Payments
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary (Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# App Config
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

> [!NOTE]
> You will need accounts for Clerk, Stripe, Cloudinary, and a Postgres database (e.g., Neon) to get these keys.

## 4. Database Setup

Once your `.env.local` is configured with a valid `DATABASE_URL`:

1.  **Push Schema**: Apply the Drizzle schema to your database.

    ```bash
    npm run db:push
    ```

2.  **Seed Data**: Populate the database with initial data (Plans & Events).
    ```bash
    npm run seed:plans
    npm run seed:events
    ```

## 5. Running the Application

### Start Inngest (Background Jobs)

Open a terminal and run the Inngest local dev server:

```bash
npm run inngest:dev
```

_Access the Inngest dashboard at http://localhost:8288_

### Start Next.js Development Server

Open a second terminal and run the main application:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**.

## 6. Webhooks (Optional but Recommended)

To test webhooks (Clerk, Stripe) locally, you may need a tunneling service like `ngrok` (included in devDependencies) or the built-in forwarding features of the respective providers.
