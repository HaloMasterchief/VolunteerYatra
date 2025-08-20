# Supabase Setup Instructions

## 1. Create a Supabase project
- Go to https://supabase.io/ and create a new project
- Wait for your project to initialize (takes 1-2 minutes)
- Note your project URL and password

## 2. Get your connection string
1. In Supabase dashboard, go to Settings → Database
2. Find "Connection string" section
3. Copy the "URI" connection string (should look like):
   ```
   postgres://postgres:[YOUR-PASSWORD]@[PROJECT-ID].supabase.co:5432/postgres
   ```

## 3. Update .env file
Edit `backend/.env` and replace the placeholder with your actual connection string:
```
SUPABASE_CONNECTION_STRING=your_actual_connection_string_here
PORT=5000
```

## 4. Create database tables
1. In Supabase dashboard, go to SQL Editor
2. Copy the content from `backend/create_tables.sql`
3. Paste and run the SQL to create tables

## 5. Verify network access
1. In Supabase dashboard, go to Settings → Database
2. Under "Connection security", add your IP address to allowed IPs
3. Enable "Allow connections from all IP addresses" for testing (disable in production)

## 6. Test connection
Run the mock data script to verify connection:
```
cd backend
node generate_mock_data.js
```

## Troubleshooting
- **Connection timeout**: Ensure port 5432 is open in your firewall
- **Authentication error**: Verify password in connection string
- **SSL issues**: Your connection string must include `sslmode=require`
- **IP blocked**: Add your current IP to Supabase allow list
