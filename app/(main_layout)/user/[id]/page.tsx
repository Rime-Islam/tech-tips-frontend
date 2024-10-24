'use client'

import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useFollowUserMutation, useGetSingleUserQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import axios from "axios";
import { FcApproval } from "react-icons/fc";
import { toast } from "sonner";



const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const page = ({ params }: { params: { id: string} }) => {
    const { id } = params;
    const {data} = useGetSingleUserQuery(id);
    const user = data?.data;
    const [followUser] = useFollowUserMutation();
    const currentUser = useAppSelector(useCurrentUser);
    const currentUserId = currentUser?._id;
   

    const handleFollow = async() => {
    try {
        const res = await followUser({ userId: id}).unwrap();
    
        if (res?.success) {
            toast.success(res?.data?.message);
        }
    } catch (error: any) {
        toast.error(error?.data?.message);
    }
    };
    const followsList = user?.followers?.some((followerId: string) => followerId === currentUserId);
   
    return (
        <div>
        <div>
            <div><img className="w-full h-[40vh]" src="https://marketplace.canva.com/EAEmGBdkt5A/3/0/1600w/canva-blue-pink-photo-summer-facebook-cover-gy8LiIJTTGw.jpg" alt="Cover Photo"/></div>
            <div className="mx-12 -mt-10 flex items-center justify-between"> 
                <div className="flex items-center gap-8">
                <img
                    className="object-cover w-20 h-20 md:h-40 md:w-40 lg:h-56 lg:w-56 rounded-full"
                    src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  />
                        <div className="text-3xl flex font-semibold">
                            {user?.name}
                            {
       user?.premium &&  <div><FcApproval className='w-5 h-5'/></div>
     }
                            </div>
     
                </div>

                <div className="">
                   {
                    followsList ? (
                        <button onClick={handleFollow} className="mt-8 text-blue-500 px-6 py-2 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform bg-white rounded-lg hover:bg-gray-200 border border-blue-500">Unfollow</button>
                    ) : (
                        <button onClick={handleFollow} className="mt-8 px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">Follow</button>
                    )
                   } 
                </div>
                  </div>

                  {/* post section  */}
                  <div>

                  </div>

        </div>
        </div>
    );
};

export default page;