import React from 'react';
import { Link } from 'react-router-dom';
import { IoApps } from "react-icons/io5";

const Blogcard = (props) => {
    let blogdata = props.blogdata;
    const apiURL = import.meta.env.MODE === "development" ? 'http://localhost:3000/api' : '/api'; // Updated to include /api prefix

    return (
        <div className='bg-white shadow-md overflow-hidden rounded-xl'>
            <Link to={`/blog/${blogdata.id}`}>
                <div className="flex flex-col w-full">
                    {/* Removed commented-out image */}
                    <div className="w-full h-[250px] bg-no-repeat bg-cover bg-center" 
                         style={{ backgroundImage: `url(${blogdata.image})` }}> {/* Added /api to image URL */}
                    </div>
                    <div className='p-2'>
                        <h5 className='mt-1 text-left'>{blogdata.title}</h5>
                        <p className='flex justify-start items-center opacity-70'>
                            <IoApps />
                            <span className='text-sm text-left ml-2'>{blogdata.category}</span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Blogcard;
