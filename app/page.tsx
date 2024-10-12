"use client"
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import Loader from '@/component/UI/Loader';
import Sidebar from "@/component/Home/Sidebar";
import PostContent from "@/component/Home/PostContent";

export default function Home() {
const {data, isLoading} = useGetAllPostsQuery(undefined);
console.log(data?.data);

if (isLoading) {return <Loader />};
  return (
    <div className="flex gap-10 my-12">
      <Sidebar />
    <PostContent />
   
    </div>
  );
}
