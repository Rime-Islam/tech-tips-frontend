"use client"
import HtmlContent from "@/component/UI/html/htmlContent";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useDeletePostMutation, useGetMyPostQuery } from "@/redux/app/feature/api/post/postApi";
import { useGetSingleUserQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { IPost } from "@/types/types";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBack2Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const page = () => {
    const use = useAppSelector(useCurrentUser);
    const id = use?._id;
    const {data: userData } = useGetSingleUserQuery(id);
    const user = userData?.data;
      const [deletePost] = useDeletePostMutation();
      const {data: myPostData} = useGetMyPostQuery(undefined);
      const myPost = myPostData?.data;

      
      const handleDelete = (_id: string | undefined) => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
              const res = await deletePost({ _id }).unwrap();
             
               if (res?.success) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
               } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text:  "An Error occured"
                });
               }
             
            }
          });
        };
      return (
          <div>
               {
        user?.role && (
          <>
          <div className='mt-8 md:mt-16 text-center text-3xl'>
  {
      myPost ? <span>My Posts</span> : <span>No Post Available</span>
  }
  </div>
  <div>
    {/* post section  */}
    <div className='my-8 md:mt-12 grid gap-5'>
      {
          myPost?.length ? (myPost?.map((post: IPost) => (
              <div key={post._id} className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
    <div className="md:flex">
      <div className="md:shrink-0">
        <img
          className="h-48 w-full object-cover md:h-full md:w-48"
          src={post?.images}
        />
      </div>
      <div className="p-8">
  <div className='flex justify-between'>
  <div className='mb-2'>
   <div>
   <Link
          href={`post/${post?._id}`}
          className="block mt-1 text-lg dark:text-white leading-tight font-medium text-black hover:underline"
        >
          {post?.title}
        </Link>
   </div>
     </div>
        <div className='flex gap-3'>
       <div><Link href={`/post/edit/${post?._id}`}> <AiFillEdit className='w-6 h-6 text-amber-600'/></Link></div>
      <div> <button onClick={() => handleDelete(post._id)}> <RiDeleteBack2Fill className='w-6 h-6 text-red-600'/></button></div>
        </div>
  </div>
          <HtmlContent content={post?.description.slice(0, 200)}/>
      </div>
    </div>
  </div>
          ))) : ( 
            <span className='text-center'>No post Available</span>
          )
      }
  </div>
  
  {/* follower section  */}
  
  
  </div>
          </>
        )
       }
          </div>
      )
  };
  
  export default page;