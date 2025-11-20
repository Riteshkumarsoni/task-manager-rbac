# Task Manager RBAC (SQLite) — AVPL Assignment

## Setup

### Backend
```bash
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm start

both directory is run in different terminal




📝 Task Manager with Role-Based Access (RBAC)

A full-stack Task Management System built with:

Backend: Node.js, Express.js, SQLite

Frontend: React (Vite), Axios, React Router

Auth: JWT + bcrypt

RBAC: Admin & User permissions

Users can register, log in, create tasks, edit tasks, delete tasks, and manage their own data.
Admins can view all tasks, and delete any task.

🚀 Features
✅ Authentication

User registration

Login with JWT

Password hashing (bcrypt)

✅ Role-based Access Control

User: create, view, update, delete only their tasks

Admin: view all tasks + delete any task

✅ Tasks

Create

Update

Delete

View (own tasks / all tasks for admin)

✅ Frontend

React + Vite

Protected routes

Axios interceptor for JWT

Simple UI for task CRUD

Admin dashboard support

📁 Project Structure
task-manager-rbac/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md