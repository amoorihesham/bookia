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

## 6. Webhooks Configuration

The application uses webhooks to stay in sync with external providers (**Clerk** & **Stripe**). We utilize **Inngest** to ensure reliable, asynchronous processing of these events.

To test webhooks locally, you must expose your local server to the internet. We recommend using **ngrok**.

### 1. Setup ngrok

1.  **Install ngrok**: Download from [ngrok.com](https://ngrok.com/) or run `npx ngrok`.
2.  **Start the tunnel**:
    ```bash
    ngrok http 3000
    ```
    _Copy the forwarding URL (e.g., `https://your-id.ngrok-free.app`)._

### 2. Configure Stripe Webhook

Stripe webhooks are received by the application API at `/api/webhook/stripe` and then forwarded to Inngest for processing.

1.  Go to **[Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/test/webhooks)**.
2.  **Add Endpoint**:
    - **URL**: `https://<YOUR_NGROK_URL>/api/webhook/stripe`
    - **Events**: Select `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.*`.
3.  **Get Secret**: Reveal the **Signing Secret** (`whsec_...`).
4.  **Update Environment**:
    - In `.env.local`, set `STRIPE_WEBHOOK_SECRET` to this value.

### 3. Configure Clerk Webhook

Clerk webhooks are managed directly through Inngest.

1.  **Inngest Setup**: Ensure the Inngest Dev Server is running (`npm run inngest:dev`).
2.  **Clerk Dashboard**:
    - Go to **[Clerk Dashboard > Webhooks](https://dashboard.clerk.com/)**.
    - **Add Endpoint**:
      - If using **Inngest Cloud**: Point to your Inngest Event Key URL.
      - If running **Locally**: You can generally skip this and manually trigger events via the Inngest Dev Dashboard (`http://localhost:8288`) to simulate user creation (`clerk/user.created`).
      - _Advanced_: If you need real-time sync from Clerk Dev to Local, you must configure a webhook pointing to your Inngest Serve URL via ngrok, but manual triggering is recommended for contributor simplicity.
3.  **Update Environment**:
    - Ensure `CLERK_SECRET_WEBHOOK_KEY` is set in `.env.local` to allow signature verification if you are receiving real webhooks.

> [!TIP]
> **Why Inngest?**
> By using Inngest, we decouple webhook reception from processing. If your local server is down or busy, Inngest will retry the events automatically, ensuring no data is lost during development or production.
