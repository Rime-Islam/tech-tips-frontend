import Link from "next/link";
import { FcEngineering,  } from "react-icons/fc";


const ProfileSidebar= () => {

    return (
        <div className="mt-5 ">
                <div className="flex px-2">
       
          <div className=" px-2">
            <Link
              className=" "
              href="/profile/update"
            >
              <span className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-lg rounded font-medium">Update Profile</span>
            </Link>
          </div>
          <div className=" px-2">
            <Link
              className=" "
              href="/profile/mypost"
            >
              <span className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-lg rounded font-medium">My Post</span>
            </Link>
          </div>
          <div className=" px-2">
            <Link
              className=" "
              href="/post/create"
            >
              <span className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-lg rounded font-medium">Create Post</span>
            </Link>
          </div>
          <div className=" px-2">
            <Link
              className=" "
              href="/profile/follow"
            >
              <span className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-lg rounded font-medium">Follow</span>
            </Link>
          </div>
          <div className=" px-2">
            <Link
              className=" "
              href="/profile/payment"
            >
              <span className=" bg-blue-500 text-white hover:bg-blue-600 px-3 py-2 text-lg rounded font-medium">Subscribe</span>
            </Link>
          </div>

        </div>
</div>
)
};

export default ProfileSidebar;