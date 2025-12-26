# Plans Domain Guide 🏷️

The **Plans Domain** defines the pricing tiers available in the application.

**Directory**: `src/features/plans/`

---

## 1. Overview

This feature is relatively static compared to others. It serves as the "Product Catalog" for subscriptions. Plans are typically seeded once and rarely change.

**Key Capabilities:**

- **List Plans**: Display available pricing options to users.
- **Resolve Plan**: Look up plan details by name or ID.

---

## 2. Data Model

The `PlanTable` (`src/drizzle/schemas/plan-schema.ts`) contains:

| Field             | Type          | Description                             |
| :---------------- | :------------ | :-------------------------------------- |
| `id`              | UUID          | Primary Key.                            |
| `name`            | String        | Unique name (e.g., `free`, `pro`).      |
| `price`           | Real          | Monthly cost.                           |
| `stripe_price_id` | String        | ID of the Price object in Stripe.       |
| `benfits`         | Array<String> | List of features/perks displayed on UI. |

---

## 3. Querying Data

- `findAllPlans()`: Fetches all available plans for the pricing page.
- `findPlanByName(name)`: Helper to quickly retrieve a specific tier (e.g., finding the "Free" plan during user registration).

> [!NOTE]
> Plans are often used as "Constants" in the code logic. For example, when a user registers, we default them to the plan where `name === 'free'`.

---

## 4. Seeding

Since plans are foundational data, they are populated via a seed script:
`src/drizzle/seed/plans.ts`

To update plans, modify the seed script and re-run:

```bash
npm run seed:plans
```
