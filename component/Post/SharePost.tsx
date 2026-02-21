'use client'
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineDuplicate, HiOutlineCheck } from "react-icons/hi";
import { useState } from 'react';

interface SharePostProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const SharePost: React.FC<SharePostProps> = ({ open, setOpen }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareTitle = 'Check out this amazing content on TechTips!';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const platforms = [
        {
            name: 'Facebook',
            icon: FaFacebook,
            color: 'hover:text-blue-600',
            bg: 'hover:bg-blue-600/10',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        },
        {
            name: 'Twitter',
            icon: FaTwitter,
            color: 'hover:text-blue-400',
            bg: 'hover:bg-blue-400/10',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        },
        {
            name: 'LinkedIn',
            icon: FaLinkedin,
            color: 'hover:text-blue-700',
            bg: 'hover:bg-blue-700/10',
            url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`
        },
        {
            name: 'WhatsApp',
            icon: FaWhatsapp,
            color: 'hover:text-green-600',
            bg: 'hover:bg-green-600/10',
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`
        }
    ];

    return (
        <AnimatePresence>
            {open && (
                <>
                    <div 
                        className="fixed inset-0 z-[110]" 
                        onClick={() => setOpen(false)} 
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-full mt-4 w-72 glass border border-white/10 shadow-2xl rounded-3xl p-6 z-[120] overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-500" />
                        
                        <h4 className="font-bold text-lg mb-6 tracking-tight">Share this post</h4>
                        
                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {platforms.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center gap-2 group transition-all`}
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl transition-all ${platform.bg} ${platform.color} group-hover:scale-110`}>
                                        <platform.icon />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                                        {platform.name}
                                    </span>
                                </a>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">Or copy link</p>
                            <div className="relative group">
                                <input 
                                    readOnly 
                                    value={shareUrl}
                                    className="w-full h-12 glass border border-white/10 rounded-2xl px-4 text-xs pr-12 focus:border-primary/50 transition-colors cursor-default"
                                />
                                <button 
                                    onClick={copyToClipboard}
                                    className="absolute right-2 top-2 w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                    {copied ? <HiOutlineCheck className="text-lg" /> : <HiOutlineDuplicate className="text-lg" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SharePost;