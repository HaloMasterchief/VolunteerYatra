const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection with timeout handling
const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  connectionTimeoutMillis: 5000, // 5 seconds timeout
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

// Test database connection with error handling
const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Database connected at:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    console.error('Please verify your SUPABASE_CONNECTION_STRING in .env file');
    process.exit(1); // Exit if DB connection fails
  }
};

testDatabaseConnection();

// Get all opportunities (with optional search)
app.get('/api/opportunities', async (req, res) => {
  const { search } = req.query;
  let query = 'SELECT * FROM opportunities';
  let params = [];

  if (search) {
    query += ' WHERE title ILIKE $1';
    params.push(`%${search}%`);
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/suggestions', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const result = await pool.query(
      'SELECT title FROM opportunities WHERE title ILIKE $1 LIMIT 5',
      [`%${query}%`]
    );
    res.json(result.rows.map(row => row.title));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new opportunity
app.post('/api/opportunities', async (req, res) => {
  const { title, description, skills } = req.body;
  // Hardcoded user ID for now
  const userId = '00000000-0000-0000-0000-000000000000';

  if (!title || !description || !skills) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO opportunities (title, description, skills, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, skills, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit an application for an opportunity
app.post('/api/applications', async (req, res) => {
  const { opportunity_id } = req.body;
  // Hardcoded user ID for now
  const userId = '00000000-0000-0000-0000-000000000000';

  if (!opportunity_id) {
    return res.status(400).json({ error: 'Missing opportunity ID' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO applications (opportunity_id, user_id) VALUES ($1, $2) RETURNING *',
      [opportunity_id, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
