"use client"
import Loader from "@/component/UI/Loader";
import { useGetAllUserQuery, useUpdateUserMutation } from "@/redux/app/feature/api/user/useApi";
import { IUser } from "@/types/types";
import { toast } from "sonner";
import Swal from "sweetalert2";

const page = () => {
    const {data, isLoading} = useGetAllUserQuery(undefined);
    const users = data?.data;
    const [updateUser] = useUpdateUserMutation();

    const handleRole = async (userId: string, role: "admin" | "user") => {
        const userData =  { role: role} ;
       try {
        const res = await updateUser({ userId, userData }).unwrap();
        if (res?.success) {
            toast.success(res?.message);
          }
        } catch ( error: any ) {
          toast.error(error?.data?.message)
        }
    };

    const handleBlock = async (userId: string, status: "block" | "unblock") => {
        const userData =  { status: status} ;
       try {
        const res = await updateUser({ userId, userData }).unwrap();
       console.log(res)
        if (res?.success) {
            toast.success(res?.message);
          }
        } catch ( error: any ) {
          toast.error(error?.data?.message)
        }
    };

    const handleDelete = async (userId: string) => {
        const userData =  { isDelete: true} ;
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
                const res = await updateUser({ userId, userData }).unwrap();
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
    

    if (isLoading) {return <Loader />};
    return (
        <>
                 <div className="text-2xl mt-5 text-center font-semibold mb-4 text-[#70AABD] md:mb-8">User Management</div>
                 <div className="flex justify-center">
        <div className="flex mt-5 gap-5 md:gap-8 ">
            {/* all added users  */}
            <div>
            <table className="min-w-full divide-y divide-gray-200">
  <thead data-aos="fade-right"
     data-aos-duration="2000">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
        Index
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
        Name
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
     Email
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
     Payment
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Delete Account
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Role
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Status
      </th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
      Actions
      </th>
    </tr>
  </thead>
  <tbody data-aos="fade-left"
     data-aos-duration="2000" className="bg-white dark:bg-gray-700 text-black dark:text-white divide-y divide-gray-200">
      {
    users ? ( users?.length && users?.map((user: IUser, index: number) => (
      <tr key={user._id}>
              <td className="px-6 py-4 ">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user?.name} </td>
            <td className="px-6 py-4 whitespace-nowrap">{user?.email} </td>
            <td className="px-6 py-4 whitespace-nowrap">{user?.transactionId ? <span className="text-green-600 font-semibold">Paid</span> :  <span className="text-red-600 font-semibold">Unpaid</span>} </td>
            <td className="px-6 py-4 whitespace-nowrap">
           {
            user?.isDelete ? ( <span className="text-red-500 font-semibold">Deleted</span>) : (
                <button onClick={() => handleDelete(user?._id)} className="py-1.5 px-3 bg-red-500 rounded text-white">Delete</button>
            )
           }
                 </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {
                user?.role === "admin" ? ( <span className="font-semibold text-gray-800 dark:text-green-600">Admin</span>) : ( <span className="font-semibold text-amber-600">User</span> )
                }
                </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {
                user?.status === "block" ? (
                    <button onClick={() => handleBlock(user?._id, "unblock")} className="py-1.5 px-3 bg-blue-600 rounded text-white">Activate</button>
                ) : (
                    <button onClick={() => handleBlock(user?._id, "block")} className="py-1.5 px-3 bg-[#70AABD] rounded text-white">Block</button>
                )
                }
                </td>
            <td className="px-6 py-4 whitespace-nowrap">
            {
                user?.role === "admin" ? (
                    <button onClick={() => handleRole(user?._id, "user")} className="py-1.5 px-3 bg-amber-500 rounded text-white">Make User</button>
                ) : (
                    <button onClick={() => handleRole(user?._id, "admin")} className="py-1.5 px-3 bg-purple-500 rounded text-white">Make Admin</button>
                )
                }
            </td>
      </tr>
           ))) : ( <tr><td> No User Found</td></tr>)
      }
  </tbody>
</table>
            </div>
        </div>
         <div>
      </div>
        </div>
        </>
    )
};

export default page;