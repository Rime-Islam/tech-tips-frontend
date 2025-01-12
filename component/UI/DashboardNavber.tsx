import { logout } from "@/lib/AuthServices";
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useGetSingleUserQuery } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import Link from "next/link";
import { useState } from "react";

const DashboardNavber = () => {
     const use = useAppSelector(useCurrentUser);
      const id = use?._id;
      const {data: userData, isLoading } = useGetSingleUserQuery(id);
      const user = userData?.data;

    const [isOpen, setIsOpen] = useState(false);
      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };

      const close = () => {
        setIsOpen(false);
      };

        const handleLogout = async () => {
          await logout();;
         window.location.reload();
        };
      
    return (
        <div className="fixed top-0 z-50 w-full rounded bg-white dark:bg-gray-900">
<div className="flex justify-between container mx-auto">
<div>
<div className="flex justify-center mt-2 sm:justify-start">
  <label className="hidden py-1 px-3" htmlFor="bar-search" />
  <input
    className="appearance-none text-md py-1 px-2 focus:outline-none border-2 focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-900 text-purple-900 dark:text-gray-100 placeholder-blue-300 dark:placeholder-gray-600 font-semibold rounded-l"
    type="search"
    name="q"
    placeholder="Search"
  />
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-800 px-5 py-1 text-lg font-bold hover:shadow-2xl cursor-pointer transition duration-250 ease-in-out rounded-r text-white"
    value="Search"
    color="blue"
  >
    Search
  </button>
</div>

    </div>
    <div className="">
    {
          user && 
        <>
           <div className=" relative ">
      <button
       
        onClick={toggleDropdown}
        className="z-10 rounded-md"
      >
        <img
          className="w-10 h-10 mt-1 rounded-full"
          src={user?.profilePicture || "https://i.ibb.co.com/544PSXp/blank-profile-picture-973460-960-720.webp"}
          alt="logo"
        />
      </button>
    
      {isOpen && (
        <div
          className="absolute z-20 right-5 py-2 mt-4 bg-white rounded-md shadow-xl dark:bg-gray-800"
          style={{ right: '0px', width: '131px' }} 
          onClick={close}
        >
          <div className="px-2 text-center">
            <Link
              href='/profile'
              className="block my-2 rounded hover:bg-gray-400 py-2 font-medium text-gray-600 hover:text-black capitalize transition-colors duration-300 transform dark:text-gray-300"
              onClick={close}
            >
              Profile 
            </Link>
    
            <button
              
              onClick={handleLogout}
              className="px-3 md:px-6 mx-5 py-2  tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400"
            >
              LogOut
            </button>
          </div>
        </div>
      )}
    </div>
        </>
          
        }
    </div>
</div>
        </div>
    )
};
export default DashboardNavber;