import Link from "next/link";
import { FcBookmark } from "react-icons/fc";


const ProfileSidebar= () => {

    return (
        <div className="mt-5 ">
                <div className="flex px-1 md:px-2">
       
          <div className="px-1 md:px-2">
            <Link
              className=" "
              href="/profile/update"
            >
              <span className=" md:bg-blue-500 md:text-white md:hover:bg-blue-600 px-1 md:px-3 py-2  text-sm md:text-lg rounded font-medium">Update Profile</span>
            </Link>
          </div>
          <div className="px-1 md:px-2">
            <Link
              className=" "
              href="/profile/mypost"
            >
              <span className=" md:bg-blue-500 md:text-white md:hover:bg-blue-600 px-1 md:px-3 py-2  text-sm md:text-lg rounded font-medium">My Post</span>
            </Link>
          </div>
          <div className="px-1 md:px-2">
            <Link
              className=" "
              href="/post/create"
            >
              <span className=" md:bg-blue-500 md:text-white md:hover:bg-blue-600 px-1 md:px-3 py-2  text-sm md:text-lg rounded font-medium">Create Post</span>
            </Link>
          </div>
          <div className="px-1 md:px-2">
            <Link
              className=" "
              href="/profile/follow"
            >
              <span className=" md:bg-blue-500 md:text-white md:hover:bg-blue-600 px-1 md:px-3 py-2  text-sm md:text-lg rounded font-medium">Follow</span>
            </Link>
          </div>
          <div className="px-1 md:px-2">
            <Link
              className=" "
              href="/profile/payment"
            >
              <span className=" md:bg-blue-500  md:text-white md:hover:bg-blue-600 px-1 md:px-3 py-2  text-sm md:text-lg rounded font-medium">Subscribe</span>
            </Link>
          </div>

        </div>
</div>
)
};

export default ProfileSidebar;