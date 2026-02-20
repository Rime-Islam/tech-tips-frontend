"use client"
import { useGetAllUserQuery, useGetFollowerQuery } from "@/redux/app/feature/api/user/useApi";
import Link from "next/link";
import Loader from "../UI/Loader";
import { IUser } from "@/types/types";
import { FcApproval } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/redux/app/hook";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import Category from "./Category";

interface RightSidebarProps {
  handleCategory: (category: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ handleCategory }) => {
  const currentUser = useAppSelector(useCurrentUser);
  const id = currentUser?._id;

  const { data: followerData, isLoading: isFollowerLoading } = useGetFollowerQuery(id);
  const followers = followerData?.data?.followers || [];
  const following = followerData?.data?.following || [];

  const { data: allUserData, isLoading: isAllUserLoading } = useGetAllUserQuery(undefined);
  const allUsers = allUserData?.data || [];

  const excludedUserIds = new Set([...followers, ...following, id]);
  const suggestions = allUsers.filter((user: IUser) => !excludedUserIds.has(user._id)).slice(0, 5);

  if (isFollowerLoading || isAllUserLoading) {
    return <div className="p-4 glass rounded-2xl"><Loader /></div>;
  }

  return (
    <div className="space-y-8">
      {/* Categories Section */}
      <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm">
        <h3 className="text-lg font-bold font-outfit mb-4">Discover <span className="text-primary">Topics</span></h3>
        <Category handleCategory={handleCategory} />
      </div>
      
      {/* Suggestions Section */}
      <div className="glass p-6 rounded-2xl border border-white/10 shadow-sm">
        <h3 className="text-lg font-bold font-outfit mb-4">Who to <span className="text-primary">Follow</span></h3>
        <div className="space-y-4">
          <AnimatePresence>
            {suggestions.map((item: IUser, idx: number) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between group"
              >
                <Link href={`/user/${item._id}`} className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/10 group-hover:ring-primary/40 transition-all"
                      src={item.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                      alt={item.name}
                    />
                    {item.premium && (
                      <FcApproval className="absolute -bottom-1 -right-1 text-sm bg-white rounded-full shadow-sm" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold truncate max-w-[120px]">{item.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold tracking-wider">Tech Explorer</p>
                  </div>
                </Link>
                <Link
                  href={`/user/${item._id}`}
                  className="px-3 py-1.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  Follow
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {suggestions.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">No new suggestions for now.</p>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 space-y-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-widest">
          <Link href="#" className="hover:text-primary transition-colors">About</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
          <Link href="#" className="hover:text-primary transition-colors">Help</Link>
        </div>
        <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">© 2026 TechTips Inc.</p>
      </div>
    </div>
  );
}

export default RightSidebar;
