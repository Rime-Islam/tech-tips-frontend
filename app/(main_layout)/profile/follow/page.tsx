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
import { HiOutlineUserAdd, HiOutlineUsers, HiOutlineExternalLink } from "react-icons/hi";

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

    const renderUserList = (users: IUser[], title: string, icon: any) => (
        <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold font-outfit tracking-tight">{title}</h2>
                <span className="ml-auto glass px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {users.length}
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {users.length > 0 ? (
                    users.map((item) => (
                        <motion.div
                            key={item._id}
                            variants={itemVariants}
                            className="glass p-4 rounded-2xl border border-white/10 flex items-center gap-4 card-hover group"
                        >
                            <div className="relative">
                                <Image
                                    className="object-cover w-14 h-14 rounded-xl ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                                    src={item.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                    alt={item.name}
                                    width={56}
                                    height={56}
                                />
                                {item.premium && (
                                    <div className="absolute -top-1 -right-1 bg-white dark:bg-slate-900 rounded-full p-0.5">
                                        <FcApproval className="text-sm" />
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <Link href={`/user/${item._id}`}>
                                    <h3 className="font-bold text-lg truncate hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>
                                <p className="text-xs text-muted-foreground truncate opacity-70">
                                    {item.email}
                                </p>
                            </div>

                            <Link href={`/user/${item._id}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-3 rounded-xl bg-secondary hover:bg-primary hover:text-white transition-all text-muted-foreground"
                                >
                                    <HiOutlineExternalLink className="text-xl" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-12 glass rounded-2xl border border-dashed border-white/20">
                        <p className="text-muted-foreground italic">No users found in this list yet.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h1 className="text-4xl font-black font-outfit mb-4">
                        Your <span className="text-gradient">Community</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Manage your network and discover what other tech enthusiasts are sharing. Stay connected with the best in the industry.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    {renderUserList(followers, "Followers", <HiOutlineUsers className="text-xl text-primary" />)}
                    {renderUserList(following, "Following", <HiOutlineUserAdd className="text-xl text-primary" />)}
                </div>
            </motion.div>
        </div>
    );
};

export default CommunityPage;