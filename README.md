# Student Info CRUD (Frontend)

A simple student information CRUD app built with React, TypeScript, and Tailwind CSS (CDN). Connects to a REST API backend.

## Features
- List, add, edit, and delete students
- Minimal, single-page UI
- Fast prototyping with Tailwind CDN

## Setup
1. Clone this repo
2. Install [Bun](https://bun.sh/) if you haven't already:
   ```sh
   curl -fsSL https://bun.sh/install | bash
   ```
3. Install dependencies:
   ```sh
   bun install
   ```
4. Start the dev server:
   ```sh
   bun run dev
   ```
5. Make sure your backend API is running at `http://localhost:3000`.

## Troubleshooting
- **CORS error?**
  - Add `cors` middleware to your backend:
    ```js
    const cors = require('cors');
    app.use(cors());
    ```
- **No styles?**
  - Make sure `<script src="https://cdn.tailwindcss.com"></script>` is in your `index.html`.

---
For demo/testing only. No authentication or advanced features included.
