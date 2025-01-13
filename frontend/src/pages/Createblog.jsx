import React, { useState } from 'react';
import { uploadFile, createBlog } from '../api/Api';

const Createblog = () => {
    const blankBlog = {
        title: "",
        image: "",
        post: "",
        category: "",
    };

    const [newblog, setNewblog] = useState(blankBlog);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpload = async (event) => {
        try {
            const uploadedFile = await uploadFile(event.target.files[0]);
            console.log("Uploaded File:", uploadedFile); // Log the response
            if (uploadedFile?.path) {
                setNewblog({ ...newblog, image: uploadedFile.path });
            } else {
                alert('Failed to upload image. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the image.');
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!newblog.title || !newblog.image || !newblog.post || !newblog.category) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        setIsSubmitting(true);
        try {
            const createdBlog = await createBlog(newblog);
            console.log('API Response:', createdBlog);

            if (createdBlog?.desc === 1) {
                setNewblog(blankBlog);
                alert('Blog added successfully!');
            } else {
                alert('Failed to add blog. Please check your inputs.');
            }
        } catch (error) {
            console.error('Error while submitting the blog:', error);
            alert('An error occurred while submitting the blog. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const menu = [
        { text: 'Nature', path: '/' },
        { text: 'Travel', path: '/' },
        { text: 'Technology', path: '/' },
        { text: 'Politics', path: '/' },
    ];

    return (
        <div className="flex w-full items-center justify-center">
            <div className="bg-slate-200 w-[60%] p-5 rounded-xl">
                <h1 className="text-2xl mb-5">Create Blog Post</h1>
                <div className="flex flex-col">
                    <label className="ml-1 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={newblog.title}
                        onChange={(e) => setNewblog({ ...newblog, title: e.target.value })}
                        className="h-10 border border-gray-300 rounded my-2 p-2"
                    />

                    <label className="ml-1 text-gray-500">Category</label>
                    <select
                        value={newblog.category}
                        onChange={(e) => setNewblog({ ...newblog, category: e.target.value })}
                        className="h-10 border border-gray-300 rounded my-2 p-2"
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {menu.map((x) => (
                            <option key={x.text} value={x.text}>
                                {x.text}
                            </option>
                        ))}
                    </select>

                    <label className="ml-1 text-gray-500">Image</label>
                    <input
                        type="file"
                        onChange={(e) => handleUpload(e)}
                        className="border-gray-300 rounded my-2 p-2"
                    />

                    <label className="ml-1 text-gray-500">Post</label>
                    <textarea
                        value={newblog.post}
                        onChange={(e) => setNewblog({ ...newblog, post: e.target.value })}
                        className="h-40 border border-gray-300 rounded my-2 p-2"
                        placeholder="Write your post here..."
                    />

                    <hr />
                    <button
                        onClick={() => handleSubmit()}
                        className={`bg-slate-500 text-white h-8 w-[100px] mt-2 rounded ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Createblog;
