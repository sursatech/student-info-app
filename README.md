# Student Info Management System

A full-stack student management system with React frontend and Express API backend.

## Quick Start

### **Local Development**
1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Setup environment**
   ```bash
   # Copy .env.example to .env and edit with your values
   cp .env.example .env
   # Edit .env file with your database credentials
   
   cd backend
   bunx prisma generate
   bunx prisma migrate dev --name init
   ```

3. **Start both apps**
   ```bash
   bun start
   ```

### **Server Deployment**
1. **Install dependencies**
   ```bash
   bun install
   ```

2. **Setup database**
   ```bash
   cd backend
   bunx prisma generate
   bunx prisma migrate dev --name init
   cd ..
   ```

3. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your server database credentials
   ```

4. **Start both apps**
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

## Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` file with your values:**
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/student_info_db"
   
   # Server Configuration  
   PORT=3000
   FRONTEND_PORT=5173
   
   # API Configuration
   API_BASE_URL="http://localhost:3000"
   FRONTEND_URL="http://localhost:5173"
   
   # Environment
   NODE_ENV="development"
   ```

**Note:** The `.env.example` file contains all required environment variables with default values. Both frontend and backend will use these shared environment variables.

Built with Bun, React, Express, Prisma & PostgreSQL.
This is from develop branch