"use client"
import HtmlContent from "@/component/UI/html/htmlContent";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useDeletePostMutation, useGetMyPostQuery } from "@/redux/app/feature/api/post/postApi";
import { useGetSingleUserQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { IPost } from "@/types/types";
import Link from "next/link";
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/component/UI/Loader";

const Page = () => {
    const userFromRedux = useAppSelector(useCurrentUser);
    const id = userFromRedux?._id;
    const { data: userData, isLoading: isUserLoading } = useGetSingleUserQuery(id, { skip: !id });
    const user = userData?.data;
    const [deletePost] = useDeletePostMutation();
    const { data: myPostData, isLoading: isPostsLoading } = useGetMyPostQuery(undefined);
    const myPost = myPostData?.data;

    const handleDelete = (_id: string | undefined) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "hsl(var(--destructive))",
            cancelButtonColor: "hsl(var(--muted))",
            confirmButtonText: "Yes, delete it!",
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            customClass: {
                popup: 'rounded-3xl border border-white/10 glass',
                confirmButton: 'rounded-xl px-6 py-3 font-bold',
                cancelButton: 'rounded-xl px-6 py-3 font-bold'
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deletePost({ _id }).unwrap();
                    if (res?.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your post has been removed.",
                            icon: "success",
                            background: "hsl(var(--background))",
                            color: "hsl(var(--foreground))",
                            customClass: {
                                popup: 'rounded-3xl border border-white/10 glass'
                            }
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        background: "hsl(var(--background))",
                        color: "hsl(var(--foreground))",
                    });
                }
            }
        });
    };

    if (isUserLoading || isPostsLoading) return <Loader />;

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black font-outfit mb-4">
                        My <span className="text-gradient">Content</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Manage and track all your contributions to the GrootHub tech community.
                    </p>
                </div>

                {/* Posts Grid */}
                {myPost && myPost.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        <AnimatePresence mode="popLayout">
                            {myPost.map((post: IPost, index: number) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 card-hover shadow-xl"
                                >
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={post?.images || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"}
                                            alt={post.title}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                            <Link href={`post/${post?._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-primary transition-colors"
                                                >
                                                    <HiOutlineEye className="text-xl" />
                                                </motion.button>
                                            </Link>
                                            <Link href={`/post/edit/${post._id}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-amber-500 transition-colors"
                                                >
                                                    <HiOutlinePencilAlt className="text-xl" />
                                                </motion.button>
                                            </Link>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleDelete(post._id)}
                                                className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-red-500 transition-colors"
                                            >
                                                <HiOutlineTrash className="text-xl" />
                                            </motion.button>
                                        </div>
                                        {post.isPremium && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-lg">
                                                    Premium
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-1 bg-primary/10 rounded-lg">
                                                {post.category || "General"}
                                            </span>
                                        </div>
                                        <Link href={`post/${post?._id}`}>
                                            <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors leading-tight">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <div className="text-muted-foreground text-sm line-clamp-3 opacity-80 mb-6 flex-1 leading-relaxed">
                                            <HtmlContent content={post.description || ""} />
                                        </div>
                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                                <span>{post.content || "Standard"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 px-4">
                        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6">
                            <HiOutlinePencilAlt className="text-4xl text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Posts Yet</h2>
                        <p className="text-muted-foreground mb-8 text-center max-w-sm">
                            You haven't shared any posts yet. Start sharing your knowledge with the community today!
                        </p>
                        <Link href="/post/create">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all"
                            >
                                Create Your First Post
                            </motion.button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
