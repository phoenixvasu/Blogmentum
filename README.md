# Blogmentum

Blogmentum is a modern, full-stack blogging platform built with React and Node.js. It allows users to create, read, and manage blog posts with rich text editing capabilities and image uploads.

## Features

- 📝 Rich text editor for creating blog posts
- 🖼️ Image upload support via Cloudinary
- 📱 Responsive design with Tailwind CSS
- 🗂️ Category-based blog organization
- 🚀 Fast and efficient PostgreSQL database
- ⚡ Vite-powered frontend for rapid development

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- React Quill for rich text editing
- Tailwind CSS for styling
- Vite for build tooling
- Axios for API requests

### Backend
- Node.js with Express
- PostgreSQL for database
- Cloudinary for image storage
- Multer for file handling
- CORS for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blogmentum.git
cd blogmentum
```

2. Install dependencies for both frontend and backend:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the development servers:

For frontend (in the frontend directory):
```bash
npm run dev
```

For backend (in the backend directory):
```bash
npm run dev
```

## Production Deployment

To build and start the application for production:

```bash
npm run build
npm start
```

This will build the frontend and start the backend server which will serve the built frontend files.

## API Endpoints

- `GET /api/blog/:cat` - Get blogs by category (use 'all' for all blogs)
- `GET /api/blogbyid/:id` - Get a specific blog by ID
- `POST /api/blog` - Create a new blog post
- `POST /api/blogimage` - Upload an image for a blog post

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License. 