"use client"
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import Loader from '@/component/UI/Loader';
import Sidebar from "@/component/Home/Sidebar";
import PostContent from "@/component/Home/PostContent";
import RightSidebar from "@/component/Home/RightSidebar";

export default function Home() {



  return (
    <div className="flex gap-10 mt-5 mb-12">
     <div className="mt-12">
     <Sidebar />
     </div>
    <PostContent />
    <div className="mt-12">
    <RightSidebar />
    </div>
    </div>
  );
}
