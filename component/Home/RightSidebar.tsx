import Link from "next/link";



const RightSidebar = () => {

    return (
        <div className="">
            <div className="text-lg font-semibold px-4">Who To Follow</div>

            <div className=" px-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  <img
                    className="object-cover h-10 rounded-full"
                    src="https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"
                    alt="Avatar"
                  />
                  <Link
                    href="#"
                    className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                    tabIndex={0}
                    role="link"
                  >
                    Rime Islam
                  </Link>
                </div>
              
              </div>
            </div>
            
        </div>
    )
}
export default RightSidebar;