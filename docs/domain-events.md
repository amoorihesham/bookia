# Events Domain Guide 📅

The **Events Domain** is the core of the Venu application. It handles everything related to event creation, discovery, management, and ticket booking.

**Directory**: `src/features/events/`

---

## 1. Overview

This feature allows users (Organizers) to create and manage events, and other users (Attendees) to browse and book tickets.

**Key Capabilities:**

- **Create Events**: Organizers can list events with details, pricing, and images.
- **Ticket Booking**: Integration with Stripe for secure ticket purchasing.
- **Event Management**: Update details, close bookings, or delete events.
- **Featured Events**: Admin/Organizers can feature events for better visibility.
- **Validation**: Robust checks for capacity, expiration, and user permissions.

---

## 2. Data Model

The `EventTable` (`src/drizzle/schemas/event-table.ts`) defines the structure:

| Field             | Type    | Description                              |
| :---------------- | :------ | :--------------------------------------- |
| `id`              | UUID    | Primary Key.                             |
| `user_id`         | String  | Foreign Key to User (Clerk ID).          |
| `name`            | String  | Event Title.                             |
| `ticket_price`    | Real    | Cost per ticket (0 for free).            |
| `tickets`         | Integer | Total available capacity.                |
| `held_on`         | Date    | Date and time of the event.              |
| `open`            | Boolean | Whether bookings are currently accepted. |
| `featured`        | Boolean | Highlighted status for homepage.         |
| `cover_thumbnail` | String  | URL to Cloudinary image.                 |

> [!NOTE]
> The `tickets` field represents the _remaining_ capacity in some contexts or total capacity depending on implementation updates. Currently, logic decrements this count upon booking.

---

## 3. Core Actions

All business logic is encapsulated in Server Actions (`actions/mutation.ts`).

### Create Event

- **Action**: `createNewEventAction`
- **Process**:
  1.  Validates input using Zod (`createNewEventSchema`).
  2.  Uploads cover image to **Cloudinary**.
  3.  Inserts record into database.
  4.  Invalidates cache tags (`home-page-events`, `user-events`).

### Book Ticket

- **Action**: `bookEventTicket`
- **Process**:
  1.  Checks if event exists, is open, and has capacity.
  2.  Creates a **Stripe Checkout Session**.
  3.  Returns session URL for client redirection.
  - _Note_: The actual booking record is created via Stripe Webhook (`checkout.session.completed`), ensuring data consistency only after payment.

### Manage Event

Organizers can perform the following actions, shielded by `CheckPermission`:

- **Toggle Open Status**: `toggleEventOpenStatusAction` (Stop/Start bookings).
- **Toggle Featured**: `toggleEventFeaturedStatus` (Promote event).
- **Delete Event**: `deleteEventAction`.

---

## 4. Querying Data

Data fetching is handled in `actions/query.ts`. We use granular, page-specific queries to optimize caching and performance.

| Action                    | Description                                        | Cache Tag              |
| :------------------------ | :------------------------------------------------- | :--------------------- |
| `GetHomepageEvents`       | Fetches events for the main landing page.          | `home-page-events`     |
| `GetTodaypageEvents`      | Fetches events happening _today_.                  | `today-page-events`    |
| `GetUpcomingpageEvents`   | Fetches events scheduled for future dates.         | `upcoming-page-events` |
| `GetFeaturedpageEvents`   | Fetches events marked as `featured`.               | `featured-page-events` |
| `GetExpiredpageEvents`    | Fetches past events.                               | `expired-page-events`  |
| `GetEventByIdAction`      | Fetches a single event by ID.                      | `event-[id]`           |
| `GetUserEventsAction`     | Fetches events for a specific organizer.           | `events-[userId]`      |
| `GetUserEventStatsAction` | Aggregates stats (total, open, closed) for a user. | `stats-[userId]`       |

> [!TIP]
> **Caching Strategy**: Each action sets a specific cache tag (e.g., `setPageCacheTag`). When an event is updated (e.g., `updateAllPagesCacheTag` in `mutation.ts`), we invalidate these tags to ensure users see fresh data immediately without rebuilding the entire site.

---

## 5. Security & Validation

- **Permissions**: `CheckPermission` helper ensures only the Organizer (or Admin) can modify an event.
- **Expiration**: Background crons (via Inngest) automatically close events (`open: false`) when `held_on` date passes.
- **Ownership**: All events are strictly tied to a `user_id` (Clerk ID).
