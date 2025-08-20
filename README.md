# Volunteer Yatra Platform

A fullstack app to list volunteering opportunities and allow users to apply.

## Tech Stack

- **Frontend:** Next.js (TypeScript, App Router, Tailwind CSS)
- **Backend:** Express.js (Node.js, REST API)
- **Database:** Supabase (PostgreSQL, raw SQL via `pg`)

## Folder Structure

```
Volunteer/
  frontend/   # Next.js app
  backend/    # Express.js API
```

## Quick Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Volunteer
```

### 2. Supabase Setup

- Create a Supabase project and get your PostgreSQL connection string.
- Create tables using SQL:

```sql
-- Opportunities table
CREATE TABLE opportunities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] NOT NULL,
  user_id UUID NOT NULL
);

-- Applications table
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  opportunity_id INTEGER REFERENCES opportunities(id),
  user_id UUID NOT NULL
);
```

### 3. Backend Setup

```bash
cd backend
cp .env.example .env   # Create .env and add your SUPABASE_CONNECTION_STRING
npm install
node generate_mock_data.js   # (Optional) Seed mock data
npm start
```

- The backend runs on `http://localhost:5000` by default.

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

- The frontend runs on `http://localhost:3000` by default.

### 5. Environment Variables

- **Backend:**  
  - `.env` file with `SUPABASE_CONNECTION_STRING` and `PORT`
- **Frontend:**  
  - If needed, set API base URL in your code or environment

### 6. Usage

- Visit `http://localhost:3000` to view and apply for opportunities.
- Backend API endpoints:
  - `GET /api/opportunities` (with optional `search`)
  - `POST /api/opportunities`
  - `POST /api/applications`

## Deployment

- **Frontend:** Vercel (recommended), Netlify
- **Backend:** Render, Railway, Heroku
- **Database:** Supabase (cloud-hosted)

## License

MIT
