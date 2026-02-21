"use client"
import Loader from "@/component/UI/Loader";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useGetFollowerQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { IUser } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { HiOutlineUserAdd, HiOutlineUsers, HiOutlineExternalLink, HiOutlineSearch } from "react-icons/hi";

const CommunityPage = () => {
    const user = useAppSelector(useCurrentUser);
    const id = user?._id;
    const { data, isLoading } = useGetFollowerQuery(id, { skip: !id });

    const followers = data?.data?.followers || [];
    const following = data?.data?.following || [];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (isLoading) return <Loader />;

    const renderUserList = (users: IUser[], title: string, icon: any, colorClass: string) => (
        <div className="flex-1 space-y-8">
            <div className="flex items-center gap-4 px-2">
                <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center shadow-lg shadow-black/5`}>
                    {icon}
                </div>
                <div>
                    <h2 className="text-2xl font-black font-outfit tracking-tight">{title}</h2>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider opacity-60">
                        {users.length} {users.length === 1 ? 'Person' : 'People'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {users.length > 0 ? (
                    <AnimatePresence>
                        {users.map((item, index) => (
                            <motion.div
                                key={item._id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                className="glass p-5 rounded-3xl border border-white/10 flex items-center gap-5 card-hover group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                
                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all duration-300">
                                        <Image
                                            className="object-cover w-full h-full"
                                            src={item.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                        />
                                    </div>
                                    {item.role === "admin" && (
                                        <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-1 shadow-lg">
                                            <FcApproval className="text-sm" title="Verified Creator" />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0 z-10">
                                    <Link href={`/user/${item._id}`}>
                                        <h3 className="font-black text-lg truncate group-hover:text-primary transition-colors leading-tight">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-muted-foreground truncate opacity-70">
                                        {item.email}
                                    </p>
                                </div>

                                <Link href={`/user/${item._id}`} className="z-10">
                                    <motion.button
                                        whileHover={{ scale: 1.1, x: 2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="p-4 rounded-2xl bg-secondary/50 hover:bg-primary hover:text-white transition-all text-muted-foreground group-hover:shadow-lg group-hover:shadow-primary/20"
                                    >
                                        <HiOutlineExternalLink className="text-xl" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                ) : (
                    <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/20">
                        <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <HiOutlineSearch className="text-2xl text-muted-foreground opacity-50" />
                        </div>
                        <p className="text-muted-foreground font-medium italic">No users in this category yet.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto max-w-6xl"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6 tracking-tight">
                        Your <span className="text-gradient">Community</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Stay connected with the tech enthusiasts you follow and keep track of your growing network of supporters on GrootHub.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    {renderUserList(followers, "Followers", <HiOutlineUsers className="text-2xl text-primary" />, "bg-primary/10")}
                    {renderUserList(following, "Following", <HiOutlineUserAdd className="text-2xl text-indigo-500" />, "bg-indigo-500/10")}
                </div>
            </motion.div>
        </div>
    );
};

export default CommunityPage;
