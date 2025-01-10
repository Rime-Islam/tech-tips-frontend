import Link from "next/link";
import { FcBearish, FcDocument, FcEngineering, FcFaq, FcHome, FcSearch } from "react-icons/fc";
import { MdOutlineAccountCircle } from "react-icons/md";

const ProfileSidebar= () => {

    return (
        <div className=" ">
                <div className=" px-2">
       
          <div className="flex flex-col items-center w-full mt-2 ">
         
            <Link
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300"
              href="#"
            >
             <FcEngineering className='w-6 h-6'/>
              <span className="ml-2 text-sm font-medium">Settings</span>
            </Link>
           
          </div>
        </div>
</div>
)
};

export default ProfileSidebar;