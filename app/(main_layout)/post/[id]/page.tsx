"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

import { 
    useCreateCommentMutation, 
    useDeleteCommentMutation, 
    useGetSinglePostQuery, 
    useUpdateCommentMutation, 
    useUpvotePostMutation 
} from "@/redux/app/feature/api/post/postApi";

import Loader from "@/component/UI/Loader";
import HtmlContent from '@/component/UI/html/htmlContent';
import SharePost from '@/component/Post/SharePost';

import { 
    HiOutlineThumbUp, 
    HiThumbUp, 
    HiOutlineAnnotation, 
    HiOutlineShare, 
    HiOutlineDownload,
    HiOutlineCalendar,
    HiOutlineTag,
    HiOutlinePencilAlt,
    HiOutlineTrash
} from "react-icons/hi";
import { FcApproval } from "react-icons/fc";

const PostDetailsPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [editCommentId, setEditCommentId] = useState<string | null>(null);
    const [editCommentText, setEditCommentText] = useState<string>('');

    const { data, isLoading } = useGetSinglePostQuery(id);
    const post = data?.data;
    const comments = post?.comments || [];

    const [upvotePost] = useUpvotePostMutation();
    const [createComment] = useCreateCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handleUpvote = async () => {
        try {
            const res = await upvotePost({ postId: post._id }).unwrap();
            if (res?.success) toast.success(res?.message);
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to upvote");
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        try {
            const res = await createComment({ postId: post?._id, commentText: comment }).unwrap();
            if (res.success) {
                toast.success(res?.message);
                setComment('');
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to add comment");
        }
    };

    const handleDeleteComment = async (comentId: string) => {
        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await deleteComment({ postId: post?._id, comentId }).unwrap();
                if (res?.success) Swal.fire("Deleted!", "Your comment has been removed.", "success");
            } catch (error) {
                Swal.fire("Error", "Failed to delete comment", "error");
            }
        }
    };

    const handleUpdateComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editCommentText.trim()) return;
        try {
            const res = await updateComment({ 
                postId: post?._id, 
                commentId: editCommentId, 
                commentText: editCommentText 
            }).unwrap();
            if (res.success) {
                toast.success(res?.message);
                setEditCommentId(null);
            }
        } catch (error: any) {
            toast.error(error?.data?.message);
        }
    };

    const generatePDF = async () => {
        const postContent = document.getElementById('post-main-content');
        if (!postContent) return toast.error("Content not found");

        const btn = document.getElementById('download-btn');
        if (btn) btn.style.display = 'none';

        try {
            const pdf = new jsPDF("p", "mm", "a4");
            const canvas = await html2canvas(postContent, { useCORS: true, scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            
            const padding = 10;
            const imgWidth = 210 - padding * 2;
            const pageHeight = 295 - padding * 2;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            let heightLeft = imgHeight;
            let position = padding;

            pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight + padding;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", padding, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${post?.title}.pdf`);
        } catch (error) {
            toast.error("Failed to generate PDF");
        } finally {
            if (btn) btn.style.display = 'block';
        }
    };

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen bg-transparent pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <article id="post-main-content">
                    {/* Category & Header */}
                    <div className="mb-8">
                        <Link href={`/`} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 hover:bg-primary/20 transition-colors">
                            <HiOutlineTag />
                            {post?.category}
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight mb-8 leading-[1.1]">
                            {post?.title}
                        </h1>

                        {/* Author & Meta Bar */}
                        <div className="glass rounded-2xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <Link href={`/profile/${post?.user?._id}`} className="relative group">
                                    <img 
                                        src={post?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"} 
                                        alt={post?.user?.name}
                                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                                    />
                                    {post?.user?.isVerified && (
                                        <div className="absolute -top-1 -right-1">
                                            <FcApproval className="text-lg" />
                                        </div>
                                    )}
                                </Link>
                                <div>
                                    <Link href={`/profile/${post?.user?._id}`} className="font-bold hover:text-primary transition-colors block text-sm md:text-base">
                                        {post?.user?.name}
                                    </Link>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                        <span className="flex items-center gap-1">
                                            <HiOutlineCalendar />
                                            {new Date(post?.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30 hidden sm:block" />
                                        <span className="hidden sm:block">5 min read</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleUpvote}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white transition-all font-bold text-sm"
                                >
                                    <HiThumbUp className="text-lg" />
                                    <span>{post?.upvotesCount}</span>
                                </motion.button>

                                <div className="h-8 w-px bg-white/10 mx-1" />

                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => setIsShareOpen(!isShareOpen)}
                                        className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary text-xl transition-colors"
                                    >
                                        <HiOutlineShare />
                                    </motion.button>
                                    <SharePost open={isShareOpen} setOpen={setIsShareOpen} />
                                </div>

                                <motion.button
                                    id="download-btn"
                                    whileHover={{ scale: 1.05 }}
                                    onClick={generatePDF}
                                    className="p-2 rounded-xl bg-secondary/50 hover:bg-secondary text-xl transition-colors"
                                    title="Download PDF"
                                >
                                    <HiOutlineDownload />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 rounded-3xl overflow-hidden glass border border-white/10 aspect-video shadow-2xl"
                    >
                        <img 
                            src={post?.images} 
                            alt="Post cover" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="prose prose-lg dark:prose-invert max-w-none mb-20 px-2 lg:px-0">
                        <HtmlContent content={post?.description} />
                    </div>
                </article>

                {/* Comments Section */}
                <div className="border-t border-white/10 pt-16">
                    <div className="flex items-center gap-3 mb-10">
                        <HiOutlineAnnotation className="text-3xl text-primary" />
                        <h2 className="text-3xl font-black font-outfit">Discussion ({comments.length})</h2>
                    </div>

                    <form onSubmit={handleCommentSubmit} className="mb-12">
                        <div className="glass p-6 rounded-3xl border border-white/10 relative group focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="What are your thoughts on this?"
                                rows={3}
                                className="w-full bg-transparent outline-none resize-none text-lg placeholder:text-muted-foreground/50 border-none p-0 focus:ring-0"
                            />
                            <div className="flex justify-end mt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                                >
                                    Post Comment
                                </motion.button>
                            </div>
                        </div>
                    </form>

                    <div className="space-y-6">
                        <AnimatePresence>
                            {comments.map((item: any) => (
                                <motion.div
                                    key={item._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="glass p-6 rounded-3xl border border-white/10 flex gap-4 group"
                                >
                                    <Link href={`/profile/${item?.user?._id}`} className="flex-shrink-0">
                                        <img 
                                            src={item?.user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"} 
                                            alt={item?.user?.name}
                                            className="w-10 h-10 rounded-xl object-cover ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all"
                                        />
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/profile/${item?.user?._id}`} className="font-bold text-sm tracking-tight hover:text-primary transition-colors">
                                                    {item?.user?.name}
                                                </Link>
                                                {item?.user?.premium && <FcApproval className="text-sm" />}
                                                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                                <span className="text-xs text-muted-foreground">{new Date(item?.createdAt).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button 
                                                    onClick={() => {
                                                        setEditCommentId(item._id);
                                                        setEditCommentText(item.comment);
                                                    }}
                                                    className="p-1.5 rounded-lg hover:bg-amber-500/10 text-amber-500 transition-colors"
                                                >
                                                    <HiOutlinePencilAlt />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteComment(item._id)}
                                                    className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                                                >
                                                    <HiOutlineTrash />
                                                </button>
                                            </div>
                                        </div>

                                        {editCommentId === item._id ? (
                                            <form onSubmit={handleUpdateComment} className="mt-2 text-right">
                                                <textarea
                                                    value={editCommentText}
                                                    onChange={(e) => setEditCommentText(e.target.value)}
                                                    className="w-full glass p-4 rounded-xl border border-primary/30 outline-none resize-none text-sm mb-2 h-24"
                                                />
                                                <div className="flex gap-2 justify-end">
                                                    <button type="submit" className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold transition-all hover:shadow-lg ">Save Changes</button>
                                                    <button onClick={() => setEditCommentId(null)} className="px-4 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-bold">Cancel</button>
                                                </div>
                                            </form>
                                        ) : (
                                            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                                                {item?.comment}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {comments.length === 0 && (
                            <div className="text-center py-20 glass rounded-[2.5rem] border border-dashed border-white/10">
                                <p className="text-muted-foreground italic">No discussion yet. Be the first to share your thoughts!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetailsPage;
