"use client"
import Loader from "@/component/UI/Loader";
import { useGetSinglePostQuery } from "@/redux/app/feature/api/post/postApi";
import axios from "axios";



const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const page = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    
    const { data, isLoading } = useGetSinglePostQuery(id);
const post = data?.data;


if (isLoading) {return <Loader />};
    return (
        <div className="min-h-[100vh]">



        </div>
    )
};

export default page;