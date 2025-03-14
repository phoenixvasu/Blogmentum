const { Client } = require('pg');

// Retrieve the DATABASE_URL from environment variables or use the hardcoded connection string
const connectionString = process.env.DATABASE_URL || "postgresql://blogdb3_user:iEiHbI6rudefB3X1hYGteMbYWYP4h8EV@dpg-cva13blumphs73acme8g-a.oregon-postgres.render.com/blogdb3";

// Create the PostgreSQL client with SSL configuration for Render PostgreSQL
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false, // Required for SSL connection with Render's PostgreSQL
    },
});

// Function to test the connection (optional, you can remove it after confirming it's working)
async function check() {
    try {
        await client.connect();
        const res = await client.query('SELECT NOW()'); // Simple query to test the connection
        console.log('Connected to PostgreSQL:', res.rows[0]);
        await client.end(); // Close the connection after the test
    } catch (err) {
        console.error('Connection error:', err.stack);
    }
}

check();

module.exports = client;
