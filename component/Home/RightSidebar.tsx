import { useGetAllUserQuery, useGetFollowerQuery } from "@/redux/app/feature/api/user/useApi";
import Link from "next/link";
import Loader from "../UI/Loader";
import { IUser } from "@/types/types";
import { FcApproval } from "react-icons/fc";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/app/hook";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";



const RightSidebar = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const id = currentUser?._id;

  // Fetch followers and following data
  const { data: followerData, isLoading: isFollowerLoading } = useGetFollowerQuery(id);
  const followers = followerData?.data?.followers || [];
  const following = followerData?.data?.following || [];

  // Fetch all users
  const { data: allUserData, isLoading: isAllUserLoading } = useGetAllUserQuery(undefined);
  const allUsers = allUserData?.data || [];

  // Combine followers and following into a single set for easier lookup
  const excludedUserIds = new Set([...followers, ...following, id]);

  // Filter users who are not in followers, following, or the current user
  const user = allUsers.filter((user: { _id: any; }) => !excludedUserIds.has(user._id)).slice(0, 5);

  if (isFollowerLoading || isAllUserLoading) {
    return <div>Loading...</div>;
  }
  

    return (
        <div className="mt-10 fixed">
            <div className="lg:text-lg font-semibold px-4">Who To Follow</div>
            <div className="pt-4 px-4">
            {
              user?.length && user?.map((item: IUser) => (
                <div key={item?._id} className="flex items-center py-2">
                          <motion.button
                            whileHover={{
                              scale: 1.4,
                              transition: { duration: 0.5 },
                            }}>
                          <img className="object-cover w-8 lg:w-10 h-8 lg:h-10 rounded-full"
                    src={item?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  />
                          </motion.button>
                    {
       item?.premium &&  <div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>
     }

                  <Link
                    href={`/user/${item?._id}`}
                    className=" mx-2 hover:text-blue-600 hover:underline sm:text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200"
                    tabIndex={0}
                    role="link"
                  >
                    {item?.name} 
                  </Link>
                </div>
              ))
            }
            </div>
            
        </div>
    )
}
export default RightSidebar;