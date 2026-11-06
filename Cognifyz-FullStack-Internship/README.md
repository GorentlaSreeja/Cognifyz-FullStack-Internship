# Cognifyz Full Stack Development Internship — Tasks 1–8

This repository contains the eight task folders from the internship project. Each task is an independent Node.js/Express application. Run one task at a time because the projects use the same default port (3000).

## Tasks

- **Task 1:** Student registration form; renders submitted student details.
- **Task 2:** Student registration with required-field validation and an in-memory student list.
- **Task 3:** Expanded student form with server-side validation and static CSS.
- **Task 4:** Registration form with client-side and server-side validation, password strength feedback, and confirmation.
- **Task 5:** Student CRUD API (in-memory data) with a frontend.
- **Task 6:** User registration/login using MongoDB, bcrypt password hashing, and sessions.
- **Task 7:** Authentication routes, protected dashboard, Nationalize API integration, and rate limiting.
- **Task 8:** Task 7 features plus request logging, server-side caching, and a simulated background job.

## Run Tasks 1–5

Open a terminal inside the task folder, then run:

```bash
npm install
npm start
```

Open `http://localhost:3000`. Stop the server with `Ctrl + C` before starting another task. Tasks 1–5 use in-memory data, so records reset when the server restarts.

## Run Tasks 6–8 (MongoDB Atlas required)

1. Create a MongoDB Atlas cluster and a database user.
2. Add your current IP address under **Network Access** in Atlas.
3. In the task folder, copy `.env.example` to a new file named `.env`.
4. Replace the placeholders in `.env` with your own Atlas connection string and a long random session secret.
5. Run:

```bash
npm install
npm start
```

Open `http://localhost:3000`. Never commit `.env` or share your database password. The `.env` file is ignored by Git.

## Notes

- Every task has its own `package.json` and `package-lock.json`. Use `npm install` inside each task folder to ensure dependencies match that task.
- Do not run multiple tasks simultaneously on port 3000.
- Tasks 6–8 require a working MongoDB Atlas connection.
- Task 8's background job is a demonstration using a timer, not a production email queue.
