# Dentist Clinic App

A server-rendered web application for managing a small dental clinic. Clinic staff can register, log in, schedule patient appointments on a calendar, keep patient records, and keep a per-tooth dental chart for each patient (treatments, prosthetics, cleanings).

## Features

- **Authentication**: registration and login with bcrypt-hashed passwords and session-based auth
- **Appointments**: create reservations and view them on an interactive calendar (FullCalendar)
- **Patient records**: create, view, update and delete patients and their contact details
- **Dental chart**: record, update and delete per-tooth treatments, prosthetics and cleanings for each patient
- **Search**: find patients by name or by appointment date
- **Profile management**: update account details and change password
- **Security**: HTTPS, CSRF protection (`csurf`), secure HTTP headers (`helmet`), XSS filtering, HTTP-only session cookies, and secrets loaded from environment variables

## Tech stack

| Layer     | Technology                                          |
|-----------|-----------------------------------------------------|
| Runtime   | Node.js, Express                                    |
| Views     | Handlebars (`express-handlebars`), Bootstrap 4      |
| Database  | MongoDB with Mongoose                               |
| Security  | bcryptjs, helmet, csurf, express-session            |
| Front end | jQuery, FullCalendar, Air Datepicker, Feather icons |

## Project structure

```
├── config/          # Database config (reads from environment)
├── dev-script/      # Generates a local self-signed SSL certificate
├── libs/            # Database connection helper
├── models/          # Mongoose models: Users, Pacientet (patients), Tooth
├── public/          # Static assets (CSS, client-side JS, images)
├── routes/          # Express routers: login, register, home, reservation, patients, search, profile
├── views/           # Handlebars layouts, partials and pages
└── server.js        # App entry point
```

## Getting started

### Prerequisites

- Node.js (LTS)
- A MongoDB instance (local, or a free MongoDB Atlas cluster)
- OpenSSL (to generate a local development certificate)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file and fill in your own values
cp .env.example .env

# 3. Generate a self-signed certificate for local HTTPS
npm run generate-ssl

# 4. Start the server
npm start
```

Then open `https://localhost:3000` (or the port you set in `.env`). The browser will warn about the self-signed certificate; that is expected in local development.

### Environment variables

| Variable         | Description                                     |
|------------------|-------------------------------------------------|
| `MONGODB_URL`    | MongoDB connection string                       |
| `PORT`           | Port the HTTPS server listens on (default 3000) |
| `SESSION_SECRET` | Secret used to sign session cookies             |

Secrets and certificates are never committed: `.env` and `config/sslcerts/` are listed in `.gitignore`.
