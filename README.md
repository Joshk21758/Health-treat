# New Life Medical Centre

New Life Medical Centre is a medical appointment booking system built with Next.js and MongoDB. It provides patients and healthcare providers a simple, secure way to manage appointments, view user profiles, and handle booking workflows.

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
- Role-based access ( providers, admins)
- Simple dashboard for providers and Administrators.

## Tech stack

- Frontend / Server: Next.js (React)
- Database: MongoDB Atlas
- ORM / Driver: MongoDB Node.js driver
- Authentication: JWT, Custom Authentication system.
- Styling: Tailwind CSS / CSS Modules


## Prerequisites

- Node.js >= 20 or Higher version 
- npm or yarn
- A MongoDB database (MongoDB Atlas recommended)


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


