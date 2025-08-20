const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_CONNECTION_STRING,
  connectionTimeoutMillis: 5000, // 5 seconds timeout
  ssl: { rejectUnauthorized: false } // Required for Supabase
});

const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    const res = await client.query('SELECT NOW()');
    console.log('Database connected at:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Database connection failed:', err);
    console.error('Please verify your SUPABASE_CONNECTION_STRING in .env file');
  } finally {
    pool.end();
  }
};

testDatabaseConnection();
