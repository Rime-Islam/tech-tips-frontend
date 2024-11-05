"use client"
import PostCharts from "@/component/charts/PostCharts";
import UserBarCharts from "@/component/charts/UserBarCharts";
import { useGetAllPostsQuery } from "@/redux/app/feature/api/post/postApi";
import { useGetAllUserQuery } from "@/redux/app/feature/api/user/useApi";


const page = () => {
    const {data: user} = useGetAllUserQuery(undefined);
    const {data: post} = useGetAllPostsQuery(undefined);
    const userData = user?.data;
    const postData = post?.data;

    return (
        <div className="lg:flex gap-10">
        <div className="flex-1">
        <UserBarCharts userData={userData}/>
        </div>
        <div className="flex-1">
        <PostCharts postData={postData}/>
        </div>
        </div>
    )
};

export default page;