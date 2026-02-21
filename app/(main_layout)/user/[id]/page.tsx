'use client'
import Loader from "@/component/UI/Loader";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useFollowUserMutation, useGetSingleUserQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { motion, AnimatePresence } from "framer-motion";
import { FcApproval } from "react-icons/fc";
import { HiOutlineUserAdd, HiOutlineUserRemove, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineHashtag } from "react-icons/hi";
import { toast } from "sonner";
import Image from "next/image";

const UserDetailsPage = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    const { data, isLoading } = useGetSingleUserQuery(id);
    const user = data?.data;
    const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
    const currentUser = useAppSelector(useCurrentUser);
    const currentUserId = currentUser?._id;
    
    const isFollowingThisUser = user?.followers?.some((followerId: string) => followerId === currentUserId);

    const handleFollow = async () => {
        try {
            const res = await followUser({ userId: id }).unwrap();
            if (res?.success) {
                toast.success(res?.message || (isFollowingThisUser ? "Unfollowed successfully" : "Following successfully"));
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    if (isLoading) return <Loader />;

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen pb-20 pt-16">
            {/* Header / Cover Section */}
            <div className="h-[40vh] relative overflow-hidden">
                <Image 
                    src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2024&auto=format&fit=crop"
                    alt="Cover"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 -mt-32 relative z-10"
            >
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Profile Card */}
                    <motion.div variants={itemVariants} className="w-full lg:w-[400px] shrink-0">
                        <div className="glass rounded-[40px] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            
                            <div className="relative mb-6">
                                <div className="w-44 h-44 mx-auto rounded-[32px] overflow-hidden ring-4 ring-primary/20 shadow-2xl">
                                    <Image
                                        src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                        alt={user?.name}
                                        width={176}
                                        height={176}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                {user?.premium && (
                                    <div className="absolute -bottom-2 -right-2 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-xl ring-1 ring-white/20">
                                        <FcApproval className="text-2xl" />
                                    </div>
                                )}
                            </div>

                            <div className="text-center space-y-2 mb-8">
                                <h1 className="text-3xl font-black font-outfit tracking-tight">{user?.name}</h1>
                                <p className="text-muted-foreground font-bold tracking-widest text-xs uppercase opacity-60">
                                    {user?.role} • {user?.status || 'Active'}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-secondary/30 p-4 rounded-3xl text-center border border-white/5">
                                    <p className="text-2xl font-black font-outfit">{user?.followers?.length || 0}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Followers</p>
                                </div>
                                <div className="bg-secondary/30 p-4 rounded-3xl text-center border border-white/5">
                                    <p className="text-2xl font-black font-outfit">{user?.following?.length || 0}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Following</p>
                                </div>
                            </div>

                            {/* Action - Only show if not current user */}
                            {currentUserId !== id && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleFollow}
                                    disabled={isFollowing}
                                    className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                                        isFollowingThisUser 
                                        ? 'bg-secondary text-foreground hover:bg-red-500/10 hover:text-red-500 border border-white/10' 
                                        : 'bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40'
                                    }`}
                                >
                                    {isFollowing ? (
                                        <div className="h-5 w-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {isFollowingThisUser ? <HiOutlineUserRemove className="text-xl" /> : <HiOutlineUserAdd className="text-xl" />}
                                            {isFollowingThisUser ? 'Unfollow' : 'Follow'}
                                        </>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Right Column: Details & Bio */}
                    <div className="flex-1 w-full space-y-8">
                        <motion.div variants={itemVariants} className="glass rounded-[40px] border border-white/10 p-8 md:p-10 shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <HiOutlineHashtag className="text-xl text-primary" />
                                </div>
                                <h2 className="text-2xl font-black font-outfit">About {user?.name.split(' ')[0]}</h2>
                            </div>
                            
                            <p className="text-lg text-muted-foreground leading-relaxed italic mb-8">
                                "{user?.bio || `${user?.name} is a dedicated tech enthusiast exploring the latest in software development and technical insights.`}"
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <HiOutlineMail className="text-xl text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email Address</p>
                                        <p className="font-bold">{user?.email}</p>
                                    </div>
                                </div>
                                {user?.phone && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <HiOutlinePhone className="text-xl text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Phone Number</p>
                                            <p className="font-bold">{user?.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {user?.address && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                            <HiOutlineLocationMarker className="text-xl text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Location</p>
                                            <p className="font-bold">{user?.address}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Additional Content Section placeholder */}
                        <motion.div variants={itemVariants} className="text-center py-20 glass rounded-[40px] border border-dashed border-white/10 opacity-60">
                            <p className="font-bold font-outfit text-xl mb-2">User Collections</p>
                            <p className="text-sm">Posts and contributions will appear here soon.</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserDetailsPage;
