
"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { FcApproval } from "react-icons/fc";
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { IPost } from '@/types/types';
import { FaComment, FaHeart, FaRegHeart, FaRegComment, FaShareAlt } from "react-icons/fa";
import Loader from '../UI/Loader';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import { filteredPost, setPosts } from '@/redux/app/feature/api/post/postSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Card = () => {
    const user = useAppSelector(useCurrentUser);
    const id = user?._id;
    const { data: userData } = useGetSingleUserQuery(id);
    const { data, isLoading } = useGetAllPostsQuery(undefined);
    const posts = data?.data;
    const premium = userData?.data?.premium;
    const filterPost = useAppSelector(filteredPost);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (data) {
            dispatch(setPosts(posts));
        }
    }, [data, posts, dispatch]);

    if (isLoading) return <div className="flex justify-center py-20"><Loader /></div>;

    return (
        <div className="space-y-6">
            <AnimatePresence mode="popLayout">
                {filterPost?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filterPost.map((post: IPost, index: number) => (
                            <motion.div
                                key={post?._id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="group relative glass rounded-2xl overflow-hidden card-hover flex flex-col h-full border border-white/10 dark:border-white/5"
                            >
                                {/* Premium Badge */}
                                {post?.isPremium && (
                                    <div className="absolute top-4 right-4 z-10 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-1">
                                        PREMIUM
                                    </div>
                                )}

                                {/* Image Section */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    {post?.isPremium && !premium ? (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-10 transition-opacity duration-300">
                                            <h3 className="text-white font-bold mb-2">Exclusive Content</h3>
                                            <Link
                                                href="/profile/payment"
                                                className="px-4 py-2 bg-primary text-white text-sm rounded-full font-semibold hover:bg-primary/90 transition"
                                            >
                                                Unlock Now
                                            </Link>
                                        </div>
                                    ) : (
                                        <Link href={`/post/${post?._id}`} className="block h-full">
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                src={post?.images || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085'}
                                                alt={post?.title}
                                            />
                                        </Link>
                                    )}
                                </div>

                                {/* Content Section */}
                                <div className="p-5 flex flex-col flex-grow">
                                    {/* Category */}
                                    <div className="mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-md">
                                            {post?.category}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <Link
                                        href={post?.isPremium && !premium ? "#" : `/post/${post?._id}`}
                                        className="block mb-3"
                                    >
                                        <h3 className="text-xl font-bold font-outfit leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {post?.title}
                                        </h3>
                                    </Link>

                                    <div className="mt-auto">
                                        {/* Author */}
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                                            <Link href={`/profile/${post?.user?._id}`} className="flex items-center gap-2 group/author">
                                                <div className="relative">
                                                    <img
                                                        className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 group-hover/author:ring-primary/50 transition-all"
                                                        src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                                        alt={post?.user?.name}
                                                    />
                                                    {post?.user?.premium && (
                                                        <FcApproval className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-medium text-muted-foreground group-hover/author:text-foreground transition-colors">
                                                    {post?.user?.name}
                                                </span>
                                            </Link>

                                            {/* Stats */}
                                            <div className="flex items-center gap-4 text-muted-foreground">
                                                <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group/stat">
                                                    <FaRegHeart className="text-sm group-hover/stat:fill-red-500" />
                                                    <span className="text-xs font-semibold">{post?.upvotesCount}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer group/stat">
                                                    <FaRegComment className="text-sm" />
                                                    <span className="text-xs font-semibold">{post?.comments?.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 glass rounded-3xl"
                    >
                        <p className="text-xl font-outfit text-muted-foreground">No insights found in this category.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 text-primary hover:underline font-semibold"
                        >
                            View all posts
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Card;
