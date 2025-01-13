const express = require('express');
const { Pool } = require('pg'); // Import Pool from pg package
const app = express();
const port = 3000;
const cors = require('cors');
const cloudinary = require('./lib/cloudinary.js'); // Assuming Cloudinary config is correct
const multer = require('multer');
const upload = multer(); // Multer setup to handle in-memory file storage
const path =require('path');
// PostgreSQL connection string
const pool = new Pool({
    user: 'blogdb_9d96_user', // Your PostgreSQL user
    host: 'a.oregon-postgres.render.com', // Database host
    database: 'blogdb_9d96', // Database name
    password: 'zxGeL3viaymdBO6rUkTpjTFT7FZiDZGW', // Your database password
    port: 5432, // Default PostgreSQL port
    ssl: {
      rejectUnauthorized: false, // Set to false to allow self-signed certificates (for development environments)
    },
  });
  

// Check if the PostgreSQL connection is successful
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL successfully!');
    client.release(); // Release the client after checking the connection
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
  });

app.use(express.json());
app.use(cors());

// Static path for uploads (optional)
app.use('/uploads', express.static('uploads'));

// Cloudinary Configuration (ensure cloudinary.js is configured correctly)

// Basic route to check if server is working
app.get('/', (req, res) => {
  res.json({ "message": 'Hello World 123!' });
});

// Fetch blogs by category (if no category provided, fetch all blogs)
app.get('/blog/:cat', async (req, res) => {
  try {
    console.log(`Fetching blogs for category: ${req.params.cat}`); // Debugging log

    // Adjust query depending on the category
    const query = req.params.cat !== 'all'
      ? `SELECT * FROM blogs WHERE category = $1`
      : 'SELECT * FROM blogs';

    // Debugging log to see the query being executed
    console.log('SQL Query:', query);

    const result = await pool.query(query, req.params.cat !== 'all' ? [req.params.cat] : []);

    console.log('Query result:', result.rows); // Debugging log to see the query result

    res.json({ "data": result.rows });
  } catch (error) {
    console.error('Error fetching blogs:', error); // Log full error details
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Fetch blog by ID
app.get('/blogbyid/:id', async (req, res) => {
  try {
    console.log(`Fetching blog with ID: ${req.params.id}`); // Debugging log
    const result = await pool.query('SELECT * FROM blogs WHERE id = $1', [req.params.id]);

    console.log('Blog fetch result:', result.rows); // Debugging log to see fetched blog details

    res.json({ "data": result.rows });
  } catch (error) {
    console.error('Error fetching blog by ID:', error); // Log full error details
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Create a new blog
app.post('/blog', async (req, res) => {
  try {
    console.log('Creating new blog:', req.body); // Debugging log to see the incoming blog data

    // Ensure body contains required fields
    const { title, image, post, category } = req.body;

    if (!title || !post || !category) {
      return res.status(400).json({ message: "Title, post, and category are required." });
    }

    const result = await pool.query(
      'INSERT INTO blogs (title, image, post, category) VALUES ($1, $2, $3, $4)',
      [title, image, post, category]
    );

    console.log('Blog created:', result.rowCount); // Log the result after creating the blog

    res.json({ "message": "Added new blog", "desc": result.rowCount });
  } catch (error) {
    console.error('Error creating blog:', error); // Log full error details
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Cloudinary image upload endpoint
app.post('/blogimage', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    console.log('Uploading image to Cloudinary...'); // Debugging log

    cloudinary.uploader.upload_stream({
      resource_type: 'auto',
      public_id: `${Date.now()}`, // Optional: You can customize the public ID
    }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error); // Log Cloudinary upload error
        return res.status(500).json({ error: 'Failed to upload image.' });
      }

      console.log('Cloudinary image URL:', result.secure_url); // Log Cloudinary URL
      res.json({ path: result.secure_url });
    }).end(req.file.buffer); // Upload the file buffer to Cloudinary
  } catch (error) {
    console.error('Error uploading image:', error); // Log full error details
    res.status(500).json({ error: 'Failed to upload image.', message: error.message });
  }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown of the database connection
process.on('SIGINT', async () => {
  console.log("Closing PostgreSQL connection...");
  try {
    await pool.end(); // Properly close pool on shutdown
    console.log('PostgreSQL connection pool closed');
  } catch (error) {
    console.error('Error closing PostgreSQL connection:', error);
  }
  process.exit();
});
