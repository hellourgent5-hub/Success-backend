# Multi Module Backend (Complete)

This repo contains a multi-module Node/Express backend for a multi-service marketplace:
admin, store, customer, delivery, and orders. Auth uses JWT and MongoDB.

## Setup
1. copy `.env.example` -> `.env` and set MONGO_URI & JWT_SECRET
2. npm install
3. npm run seed  # optional to create demo users
4. npm run dev

## Deploy
- Push to GitHub and connect to Render.
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables to Render: `MONGO_URI`, `JWT_SECRET`, `PORT` (optional)
