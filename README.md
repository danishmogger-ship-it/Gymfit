# GymFit — Gym Membership and Workout Tracker

A full-stack MERN-style capstone starter with Member, Trainer and Admin roles.

## Features
- JWT registration/login and role-based authorization
- Admin: membership plan CRUD, users, expiring subscriptions, revenue by plan
- Member: subscribe to a plan, log workouts and body measurements, view progress
- Trainer: create routines and assign them to members
- MongoDB aggregation for revenue reporting

## Requirements
- Node.js 20+
- MongoDB Atlas or local MongoDB
- npm

## Setup

### 1. Backend
```bash
cd backend
cp .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET
npm install
npm run dev
```
Backend runs at http://localhost:5000

### 2. Frontend
Open a second terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Frontend runs at http://localhost:5173

## First admin
Register a normal account, then promote it once in MongoDB using mongosh:
```js
use gymfit
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "admin" } })
```
Do not expose public admin registration.

## Notes
- This is an educational capstone starter. Review and test it before production use.
- Configure CORS, HTTPS, rate limiting, validation, backups and secure secrets before deployment.
- Payment processing is not included; subscription creation is a recorded membership purchase, not a real payment.
