"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineChevronDown, HiOutlineCloudUpload, HiOutlineSparkles, HiOutlineBookOpen, HiOutlineTag } from "react-icons/hi";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { uploadImage } from '@/utils/imageDB';
import { useAppSelector } from '@/redux/app/hook';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useCreatePostMutation } from '@/redux/app/feature/api/post/postApi';
import { toast } from 'sonner';
import Loader from '@/component/UI/Loader';
import { IPost } from "@/types/types";
import { motion, AnimatePresence } from 'framer-motion';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const categories = [
    'Software Development', 'Web Development', 'Cybersecurity', 'DevOps', 
    'Machine Learning', 'Blockchain', 'UI/UX Design'
];

const contentTypes = [
    'Design Patterns', 'Distributed Systems', 'Refactoring', 
    'Performance Optimization', 'Database Design', 'Fullstack Development', 'Backend Development'
];

const CreatePost = () => {
    const user = useAppSelector(useCurrentUser);
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [editorContent, setEditorContent] = useState('');
    const [file, setFile] = useState<string>('');
    const [premium, setPremium] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [createPost, { isLoading }] = useCreatePostMutation();
  
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setIsUploading(true);
            try {
                const imageUrl = await uploadImage(selectedFile);
                if (imageUrl) {
                    setFile(imageUrl);
                    toast.success("Image uploaded successfully!");
                }
            } catch (error) {
                toast.error("Failed to upload image");
            } finally {
                setIsUploading(false);
            }
        }
    };
  
    const route = useRouter();
    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!category || !content || !editorContent || !title || !file) {
            toast.error("Please fill in all required fields including an image");
            return;
        }
     
        try {
            const data: IPost = {
                title, content, category, user: user?._id,
                images: file, isPremium: premium,
                description: editorContent
            };
  
            const res = await createPost(data).unwrap();
            if (res?.success) {
                toast.success(res?.message);
                route.push("/");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to publish post");
        }
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4">
                        Write a <span className="text-gradient">Post</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Share your technical expertise and insights with the GrootHub community. Help others learn, solve problems, and grow together.
                    </p>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-8">
                    <div className="glass rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 space-y-8">
                        {/* Title & Categories Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-12">
                                <label className="text-sm font-bold flex items-center gap-2 mb-2 px-1 text-primary">
                                    <HiOutlineBookOpen /> Post Title
                                </label>
                                <input
                                    className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-lg font-bold"
                                    type="text"
                                    placeholder="Give your post a compelling title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="md:col-span-6 relative group">
                                <label className="text-sm font-bold flex items-center gap-2 mb-2 px-1">
                                    <HiOutlineTag /> Category
                                </label>
                                <div className="relative">
                                    <select 
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <HiOutlineChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                </div>
                            </div>

                            <div className="md:col-span-6 relative group">
                                <label className="text-sm font-bold flex items-center gap-2 mb-2 px-1">
                                    <HiOutlineSparkles /> Content Type
                                </label>
                                <div className="relative">
                                    <select 
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="w-full px-6 py-4 rounded-2xl bg-secondary/50 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled>Select Content Type</option>
                                        {contentTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <HiOutlineChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                                </div>
                            </div>
                        </div>

                        {/* Editor Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2 mb-2 px-1">
                                <HiOutlineBookOpen /> Post Description
                            </label>
                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white dark:bg-slate-900">
                                <ReactQuill
                                    value={editorContent}
                                    onChange={setEditorContent}
                                    theme="snow"
                                    className="h-[400px]"
                                    placeholder="Share your deep tech insights here..."
                                />
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="pt-8">
                            <label className="text-sm font-bold flex items-center gap-2 mb-4 px-1">
                                <HiOutlineCloudUpload /> Cover Image
                            </label>
                            <label
                                htmlFor="file-upload"
                                className={`flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-white/10 border-dashed cursor-pointer transition-all hover:bg-secondary/30 relative overflow-hidden ${file ? 'border-primary' : 'bg-secondary/10'}`}
                            >
                                {file ? (
                                    <>
                                        <img src={file} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold flex items-center gap-2">
                                                <HiOutlineCloudUpload className="text-2xl" /> Change Image
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <HiOutlineCloudUpload className="w-12 h-12 text-primary mb-4 opacity-70" />
                                        <p className="mb-2 text-sm font-bold">
                                            Click to upload cover image
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            PNG, JPG or WEBP (Max 2MB)
                                        </p>
                                    </div>
                                )}
                                <AnimatePresence>
                                    {isUploading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 bg-black/60 flex items-center justify-center"
                                        >
                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        </div>

                        {/* Premium Toggle */}
                        <div className="flex items-center justify-between p-6 rounded-2xl bg-secondary/30 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                    <HiOutlineSparkles className="text-2xl text-amber-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Premium Content</h4>
                                    <p className="text-xs text-muted-foreground">Only subscribers can access this post</p>
                                </div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={premium}
                                    onChange={(e) => setPremium(e.target.checked)}
                                    className="sr-only peer" 
                                />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading || isUploading}
                                className="w-full md:w-auto px-12 py-4 bg-primary text-white font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                            >
                                {isLoading ? (
                                    <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Publish Post <HiOutlineSparkles className="text-xl" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreatePost;
