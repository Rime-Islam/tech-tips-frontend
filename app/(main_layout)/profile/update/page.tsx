"use client"
import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { useGetSingleUserQuery, useUpdateUserMutation } from "@/redux/app/feature/api/user/useApi";
import { useAppSelector } from "@/redux/app/hook";
import { IUser } from "@/types/types";
import { uploadImage } from "@/utils/imageDB";
import { motion } from "framer-motion";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";



const Page = () => {
  
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const use = useAppSelector(useCurrentUser);
    const id = use?._id;

    const [file, setFile] = useState<string>('');
    const [updateUser] = useUpdateUserMutation();
    const {data} = useGetSingleUserQuery(id);
    const user = data?.data;
 
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            const imageUrl = await uploadImage(selectedFile);
            if (imageUrl) {
              setFile(imageUrl)
            } 
        }
      };

      const onSubmit: SubmitHandler<IUser> = async(data) => {
        const userData = {
            profilePicture: file , name: data.name, phone: data.phone, address: data.address, bio: data.bio
        }
      
        try {
          const res = await updateUser({ userId: user?._id, userData }).unwrap();
       
          if (res?.success) {
            toast.success(res?.message);
          }
        } catch ( error: any ) {
          toast.error(error?.data?.message)
        }
  };

      // frammer motion animation 
      const variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            },
        },
    };
    
    const item1 = {
        hidden: {
            opacity: 0,
            x: 40,
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 2,
            },
        },
    };

    return (
        <motion.div
        variants={variants}
        initial="hidden"
        animate="show" >
            <motion.div
variants={item1} className="bg-white dark:bg-gray-800 border-4 rounded-lg shadow relative m-10">
  <div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold hover:text-blue-500">Update Profile</h3>
   
  </div>
  <div className="p-6 space-y-6">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="name"
            className="text-sm font-medium dark:text-white text-gray-900 block mb-2"
          >
            Enter Your Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={user?.name}
            {...register("name")}
            className="shadow-sm dark:text-white bg-gray-50 dark:bg-gray-600 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          />
        </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="email"
            className="text-sm font-medium dark:text-white text-gray-900 block mb-2"
          >
            Enter Your Email
          </label>
          <input
            type="text"
            {...register("email")}
            id="email"
            readOnly
            defaultValue={user?.email}
            className="shadow-sm dark:text-white bg-gray-50 dark:bg-gray-600 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="phone"
            className="text-sm font-medium dark:text-white text-gray-900 block mb-2"
          >
            Enter Your Phone Number
          </label>
          <input
            type="number"
            {...register("phone")}
            defaultValue={user?.phone}
            id="phone"
            className="shadow-sm dark:text-white bg-gray-50 dark:bg-gray-600 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="address"
            className="text-sm font-medium dark:text-white text-gray-900 block mb-2"
          >
            Enter Your Address
          </label>
          <input
            type="text"
            defaultValue={user?.address}
            {...register("address")}
            id="address"
      
            className="shadow-sm dark:text-white bg-gray-50 dark:bg-gray-600 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="bio"
            className="text-sm dark:text-white font-medium text-gray-900 block mb-2"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows={6}
            defaultValue={user?.bio}
            className="bg-gray-50 border border-gray-300 dark:text-white dark:bg-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
            placeholder="About your Self..."
            {...register("bio")}
          />
        </div>

        <div className='col-span-6 mb-5 sm:col-span-3'>
  <label
    htmlFor="file-upload"
    className="flex flex-col items-center w-full max-w-5xl py-10 p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-8 h-8 text-gray-500 dark:text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
      />
    </svg>
    <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
    Upload Your Profile Image
    </h2>
    <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
      Upload your file SVG, PNG, JPG or GIF.{" "}
    </p>
    <input id="file-upload" type="file" onChange={handleFileChange}  className="hidden" />
  </label>
</div>
      </div>
      <div className="p-6 border-t border-gray-200 rounded-b">
    <motion.button
  initial={{ opacity: 0.6 }}
  whileHover={{
    scale: 1.1,
    transition: { duration: 0.5 },
  }}
  whileTap={{ scale: 1.2 }}
  whileInView={{ opacity: 1 }}
      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      type="submit"
    >
      Save all
    </motion.button>
  </div>
    </form>
  </div>

</motion.div>

        </motion.div>
    )
}

export default Page;