# Student Info Management System

A full-stack student management system with React frontend and Express API backend.

## Quick Start

1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Setup database**
   ```bash
   cd backend
   echo 'DATABASE_URL="postgresql://username:password@localhost:5432/student_info_db"' > .env
   bunx prisma generate
   bunx prisma migrate dev --name init
   ```

3. **Start both apps**
   ```bash
   bun start
   ```

## URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Scripts
- `bun start` - Start both frontend and backend
- `bun dev` - Development mode
- `bun build` - Build both apps

Built with Bun, React, Express, Prisma & PostgreSQL.
