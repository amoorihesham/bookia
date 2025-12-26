# Users Domain Guide 👤

The **Users Domain** manages user identity, roles, and profile data. It is tightly integrated with **Clerk** for authentication.

**Directory**: `src/features/users/`

---

## 1. Overview

Users are the central entity of the application. A user can be an **Organizer** (creating events) and an **Attendee** (booking tickets) simultaneously.

**Key Capabilities:**

- **Profile Management**: Stores username, email, and avatar.
- **Role-Based Access**: Distinguishes between `admin` and regular `user`.
- **Plan Association**: Links user to a subscription plan (Free, Pro, etc.).

---

## 2. Data Model

The `UserTable` (`src/drizzle/schemas/user-schema.ts`) syncs data from Clerk:

| Field      | Type   | Description                               |
| :--------- | :----- | :---------------------------------------- |
| `clerk_id` | String | **Primary Key**. Matches Clerk's User ID. |
| `username` | String | Unique handle.                            |
| `email`    | String | Primary email address.                    |
| `role`     | Enum   | `user` or `admin`.                        |
| `plan_id`  | UUID   | Current pricing plan.                     |
| `image`    | String | Avatar URL.                               |

**Relations:**

- `plan`: The user's current subscription tier.
- `subscription`: Details of the active subscription (Stripe data).
- `events`: Events organized by this user.
- `bookings`: Tickets booked by this user.

---

## 3. Synchronization (Clerk & Inngest)

We do **not** create users manually via API endpoints. Instead, we use **Webhooks** to keep our database in sync with Clerk.

- **Trigger**: User signs up or updates profile in Clerk.
- **Webhook**: Clerk sends `user.created` / `user.updated`.
- **Inngest Function**: `clerkCreatedUser` / `clerkDeletedUser` (in `src/services/inngest/functions/clerk.ts`) receives the event and updates the `users` table.

> [!IMPORTANT]
> Because `clerk_id` is the primary key used throughout the system (Foreign Keys in Events, Bookings), it is critical that the Clerk Sync is working correctly.

---

## 4. Querying Data

- **Repository**: `src/features/users/db/user.repo.ts` provides strictly typed CRUD operations (`findUserById`, `findUserByEmail`).
- **Current User**: We use a helper `getCurrentUser()` (`src/shared/lib/auth`) which retrieves the Clerk session and fetches the full profile from our database.
