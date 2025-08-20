-- Create opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  skills VARCHAR(255)[] NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  user_id UUID NOT NULL
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  opportunity_id INTEGER NOT NULL REFERENCES opportunities(id),
  user_id UUID NOT NULL,
  applied_at TIMESTAMP DEFAULT NOW()
);

-- Create index for search functionality
CREATE INDEX IF NOT EXISTS idx_opportunities_title ON opportunities(title);
