import { useGetAllUserQuery } from "@/redux/app/feature/api/user/useApi";
import Link from "next/link";
import Loader from "../UI/Loader";
import { IUser } from "@/types/types";
import { FcApproval } from "react-icons/fc";



const RightSidebar = () => {
  const {data, isLoading} = useGetAllUserQuery(undefined);
console.log(data)
const user = data?.data;

  
if (isLoading) {return <Loader />};
    return (
        <div className="">
            <div className="text-lg font-semibold px-4">Who To Follow</div>
            <div className="pt-4 px-4">
            {
              user?.length && user?.map((item: IUser) => (
                <div key={item?._id} className="flex items-center py-2">
                           <img className="object-cover w-10 h-10 rounded-full"
                    src={item?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                    alt="Avatar"
                  />
                    {
       item?.premium &&  <div className='mb-10 -ml-3'><FcApproval className='-mb-3'/></div>
     }

                  <Link
                    href={`/user/${item?._id}`}
                    className="mx-2 hover:text-blue-600 hover:underline font-semibold text-gray-700 dark:text-gray-200"
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