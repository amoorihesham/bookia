# Venu 🌟

**The Ultimate Event Management & Booking Platform.**

Venu is a modern, full-stack application designed to streamline event organization and ticket booking. Built with performance and user experience in mind, it leverages the latest web technologies to provide a seamless experience for both organizers and attendees.

Whether you are hosting a small workshop or a large conference, Venu provides the tools you need to manage bookings, payments, and attendees efficiently. It serves two main roles:

1.  **For Organizers**: A powerful suite to create events, manage tickets, track revenue, and analyze performance.
2.  **For Attendees**: A smooth, fast, and secure interface to discover events and book tickets in seconds.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 🚀 Key Features

- **Event Management**: Complete lifecycle management—create, update, and delete events with ease.
- **Admin Dashboard**: A comprehensive command center for platform administrators.
  - **Global Analytics**: View total revenue, active users, and event statistics.
  - **User & Event Moderation**: Manage users and events to ensure platform safety.
  - **Financial Overview**: Track Stripe payouts and platform fees.
- **Smart Ticketing**: Secure payment processing with **Stripe Integration**.
- **User Authentication**: Robust auth system powered by **Clerk**.
- **Real-time Updates**: Background jobs handling event expiration and status updates via **Inngest**.
- **Fast & Responsive**: Powered by **Next.js 16** and **Tailwind CSS**.
- **Media Optimization**: Automatic image optimization with **Cloudinary**.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Database**: PostgreSQL (via [Neon](https://neon.tech/)) & [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Background Jobs**: [Inngest](https://www.inngest.com/)

---

## 📚 Documentation & Setup

We have prepared detailed documentation to help you get started quickly.

👉 **[Read the Setup Guide](docs/setup_guide.md)** to clone, configure, and run the project locally.

### Quick Start

If you have already set up your environment variables:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/setup_guide.md) for more details.

## 📄 License

This project is licensed under the MIT License.
