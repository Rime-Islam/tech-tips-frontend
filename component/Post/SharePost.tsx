'use client'
import React, { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';


const SharePost = ({ open, setOpen }) => {
    const shareUrl = window.location.href;
    const shareTitle = 'Check out this amazing content!';

    const toggleOpen = ()=> setOpen(!open);

    return (
        <div className="relative mt-2">
            {/* Share Button */}
            <button onClick={toggleOpen} className="flex items-center p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <FaShareAlt className="w-5 h-5 " />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div className=" mt-2 w-56 h-60 bg-black border rounded-lg shadow-lg">
                   <div className='ml-3 mt-3'>Share This Post</div>
                   
                    <div className="flex gap-5 mt-5 my-5 px-5">
                        {/* Facebook */}
                        <div>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-blue-600 rounded-lg p-2"
                            >
                                <FaFacebook className="w-8 h-8" />
                                
                            </a>
                        </div>
                        
                        {/* Twitter */}
                        <div>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-blue-400 rounded-lg p-2"
                            >
                                <FaTwitter className="w-8 h-8" />
                               
                            </a>
                        </div>

                        {/* LinkedIn */}
                        <div>
                            <a
                                href={`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-blue-700 rounded-lg p-2"
                            >
                                <FaLinkedin className="w-8 h-8" />
                           
                            </a>
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" text-green-600 rounded-lg p-2"
                            >
                                <FaWhatsapp className="w-8 h-8" />
                               
                            </a>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
};

export default SharePost;