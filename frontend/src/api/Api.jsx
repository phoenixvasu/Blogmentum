import axios from 'axios';

const apiURL = import.meta.env.MODE === "development" ?'http://localhost:3000':'/';  // Adjust URL if needed for your backend

// Get blogs by category
export const getBlogs = (cat) => {
    if (!cat) {
        cat = 'all';  // Default category is 'all' if no category is provided
    }
    return axios.get(`${apiURL}/blog/${cat}`)
        .then(result => {
            return result.data;
        })
        .catch(error => {
            console.error('Error fetching blogs:', error);
            return error.response ? error.response.data : error.message;
        });
}

// Create a new blog
export const createBlog = (data) => {
    return axios.post(`${apiURL}/blog`, data)
        .then(result => {
            return result.data;
        })
        .catch(error => {
            console.error('Error creating blog:', error);
            return error.response ? error.response.data : error.message;
        });
}

// Get a single blog by ID
export const getBlogbyid = (id) => {
    return axios.get(`${apiURL}/blogbyid/${id}`)
        .then(result => {
            return result.data;
        })
        .catch(error => {
            console.error('Error fetching blog by ID:', error);
            return error.response ? error.response.data : error.message;
        });
}

// Upload an image to the server or Cloudinary
export const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);  // Append the file to the FormData object

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    return axios.post(`${apiURL}/blogimage`, formData, config)
        .then(result => {
            console.log('Image uploaded successfully:', result.data);
            return result.data;  // Returning the Cloudinary response or server response
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            // Return the error message or handle error more gracefully
            return error.response ? error.response.data : error.message;
        });
}
