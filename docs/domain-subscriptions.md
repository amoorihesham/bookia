# Subscriptions Domain Guide 🔄

The **Subscriptions Domain** handles the SaaS billing aspect of the application. It links users to pricing plans via Stripe.

**Directory**: `src/features/subscriptions/`

---

## 1. Overview

Users subscribe to **Plans** (e.g., Free, Pro) to unlock features (like creating more events or processing lower fees).

**Key Capabilities:**

- **Track Status**: Knows if a user's subscription is active.
- **Link to Stripe**: Stores the `stripe_customer_id` for billing operations.
- **Plan Association**: Connects a User to a Plan.

---

## 2. Data Model

The `SubscriptionTable` (`src/drizzle/schemas/subscription-schema.ts`) stores the state:

| Field                | Type    | Description                          |
| :------------------- | :------ | :----------------------------------- |
| `id`                 | UUID    | Primary Key.                         |
| `user_id`            | String  | Foreign Key to User.                 |
| `plan_id`            | UUID    | Foreign Key to Plan.                 |
| `stripe_customer_id` | String  | Stripe's Customer ID (for webhooks). |
| `is_active`          | Boolean | Billing status.                      |
| `subscribed_on`      | Date    | Start date.                          |

**Relations:**

- `user`: The subscriber.
- `plan`: The tier they are subscribed to.

---

## 3. Workflow (Stripe Integration)

Subscriptions are primarily managed via **Stripe Webhooks** (`src/services/inngest/functions/stripe.ts`):

1.  **Checkout**: User pays for a plan on a Stripe Checkout page.
2.  **Webhook**: Stripe sends `checkout.session.completed` or `customer.subscription.updated`.
3.  **Inngest**:
    - Finds the user by email or metadata.
    - Updates `SubscriptionTable` with the new `plan_id` and `stripe_customer_id`.
    - Updates `UserTable.plan_id` for quick access.

> [!NOTE]
> We assume a "One Plan Per User" model. The `SubscriptionTable` tracks the _current_ active subscription.

---

## 4. Querying Data

- `findUserSubscription(userId)`: Fetches the active subscription details.
- Typically, the user's current plan is accessed directly via the `User` object (`user.plan_id`) for performance, while this table is used for detailed billing info.
