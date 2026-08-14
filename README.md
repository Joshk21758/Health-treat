# New Life Medical Centre

Med-care is a medical appointment booking system built with Next.js and MongoDB. It provides patients and healthcare providers a simple, secure way to manage appointments, view user profiles, and handle booking workflows.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Demo / Screenshots](#demo--screenshots)
- [Prerequisites](#prerequisites)
- [Getting started (local)](#getting-started-local)
  - [Clone the repo](#clone-the-repo)
  - [Install dependencies](#install-dependencies)
  - [Environment variables](#environment-variables)
  - [Run the app](#run-the-app)
- [Database setup](#database-setup)
- [API endpoints (overview)](#api-endpoints-overview)
- [Project structure](#project-structure)
- [Testing & seeding data](#testing--seeding-data)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Patient registration and authentication
- Provider profiles and availability management
- Appointment booking, cancellation, and rescheduling
- Email / SMS notifications (hookable)
- Role-based access (patients, providers, admins)
- Simple dashboard for providers and patients

## Tech stack

- Frontend / Server: Next.js (React)
- Database: MongoDB (Atlas or self-hosted)
- ORM / Driver: MongoDB Node.js driver or Mongoose
- Authentication: JWT, NextAuth.js, or custom (project-specific)
- Styling: Tailwind CSS / CSS Modules / your choice

> Note: Replace or extend any of the above to match the exact libraries used in your repo (e.g., Mongoose, NextAuth, Tailwind). This README gives a general setup that is compatible with typical Next.js + MongoDB projects.

## Demo / Screenshots

Add screenshots or a demo link here. Example:

- Homepage: docs/screenshots/home.png
- Booking flow: docs/screenshots/booking.png

If you have a running demo, add the URL here.

## Prerequisites

- Node.js >= 16 (or the version your project requires)
- npm or yarn
- A MongoDB database (MongoDB Atlas recommended)

## Getting started (local)

### Clone the repo

```bash
git clone https://github.com/Joshk21758/Med-care.git
cd Med-care
```

### Install dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn
```

### Environment variables

Create a `.env.local` file in the project root and add the variables below (example `.env.example` is included):

```env
# MongoDB connection URI
MONGODB_URI="your-mongodb-connection-string"

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# JWT / Auth
JWT_SECRET="a-very-secure-secret"

# Optional: mail provider credentials (SendGrid, Mailgun, etc.)
MAIL_PROVIDER_API_KEY=""

# Optional: Twilio or SMS provider
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_PHONE_NUMBER=""
```

Be careful not to commit secrets to source control. Use `.env.local` which is ignored by Git by default.

### Run the app

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

For production build:

```bash
npm run build
npm start
```

or with yarn:

```bash
yarn build
yarn start
```

## Database setup

- If using MongoDB Atlas, create a cluster and whitelist your IP (or enable access from anywhere during development). Copy the connection string and set `MONGODB_URI`.
- If using a local MongoDB instance, ensure the daemon is running and use a URI like `mongodb://localhost:27017/med-care`.

If the project uses Mongoose, check for a `scripts/seed.js` or `scripts/` folder that seeds initial data (providers, specialities, example users). You can run it with:

```bash
node scripts/seed.js
```

(Adjust the command if your project uses a different seed pattern.)

## API endpoints (overview)

This section should be updated to reflect your project's API routes. Example endpoints commonly present in a booking system:

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and return a token
- `GET /api/providers` — list providers
- `GET /api/providers/:id` — provider profile and availability
- `POST /api/appointments` — create a new appointment
- `GET /api/appointments?user=:id` — list appointments for a user
- `PATCH /api/appointments/:id` — update appointment status (cancel/reschedule)

Add details (required fields, response shapes, auth requirements) for each route found in `pages/api` or `app/api` in your codebase.

## Project structure

A typical structure for a Next.js + MongoDB booking app:

```
/ (root)
├─ pages/ or app/
│  ├─ api/
│  │  ├─ auth/
│  │  ├─ providers/
│  │  └─ appointments/
│  ├─ index.js
│  └─ dashboard/
├─ components/
├─ lib/
│  └─ mongodb.js    # MongoDB connection helper
├─ models/          # Mongoose models (if used)
├─ scripts/         # seed or migration scripts
├─ public/
└─ styles/
```

Adjust the layout to match your repository.

## Testing & seeding data

If you have tests, list how to run them:

```bash
npm test
# or
yarn test
```

To seed sample data, point to any seeding script or instructions here.

## Deployment

You can deploy a Next.js app to Vercel, Netlify (with adapter), or any Node host.

- Vercel (recommended for Next.js):
  - Connect your GitHub repo in Vercel.
  - Set environment variables in the Vercel dashboard.
  - Deploy.

- Docker:
  - Create a Dockerfile and set the `MONGODB_URI` as an env var or secret.

- Traditional Node hosting:
  - Build the app (`npm run build`) and run `npm start`.

## Contributing

Contributions are welcome. Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add my feature"`
4. Push to your fork and open a pull request.

Add tests and update the README where appropriate.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details. Replace this with the actual license you want to use.

## Contact

- Author: Josh (GitHub: @Joshk21758)

If you want, I can:

- Add a `.env.example` to the repo with recommended variables
- Inspect your codebase and fill in the API endpoints and scripts sections with exact details
- Add badges (build, license, coverage) to the top of this README

