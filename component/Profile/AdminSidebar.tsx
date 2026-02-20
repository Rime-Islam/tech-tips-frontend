import Link from "next/link";
import { FaUsers } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";


const AdminSidebar = () => {
    return (
        <div className='fixed bg-white dark:bg-gray-800 '>
  <div className=" text-gray-400 pt-5 rounded">
          <div className=" px-2 hover:bg-gray-300">
          <div className="  mt-3 ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/"
            >
             <FaHome className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium text-black">Home</span>
            </Link>  
  </div>
          <div className="  mt-3 ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/dashboard/users"
            >
             <FaUsers className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium text-black">All Users</span>
            </Link>  
  </div>
          <div className="  mt-3 ">
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="/dashboard"
            >
             <FaChartArea className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Statistics</span>
            </Link>  
  </div>
   </div>
   </div>
   </div>
    )
};

export default AdminSidebar;