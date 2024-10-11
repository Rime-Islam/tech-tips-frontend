"use client"
import React from 'react';
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Loader from '@/component/UI/Loader';
import { useResetPasswordMutation } from '@/redux/app/feature/api/auth/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios'

interface IPassword {
  newPassword: string;
  confirmPassword: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const page = ({ params }: { params: { id: string, token: string } }) => {
  const route = useRouter();
  const { id, token } = params;


  const { register, handleSubmit, formState: { errors } } = useForm<IPassword>();
  const [ resetPassword, { isLoading} ] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<IPassword> = async(data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords should match with each other')
      return;
    }
    try {
      const password = data.newPassword;
      const res = await resetPassword({  id, token, password }).unwrap();
   console.log(res)
      if (res?.success) {
        toast.success(res?.message);

        route.push("/")
      }
    } catch ( error: any ) {
      toast.error(error?.data?.message)
    }
};
  
    return (
        <div className='flex justify-center mt-[15vh]'> <section className="bg-white  w-full max-w-xl rounded shadow-xl py-12 dark:bg-gray-900">
        <div className="  ">
          <div className="flex justify-center mx-auto">
          <img
              className="w-28 "
              src="https://i.ibb.co.com/FBBRt37/Google-Photos-Logo-2015.png"
              alt="logo"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
            welcome Back
          </h1>
       
          <div className="w-full max-w-md mx-auto mt-6 md:mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          id="newPassword"
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="New Password"
          {...register("newPassword", { required: "New Password is required" })}
                required
                />
                {errors.newPassword && (
                  <p className="text-red-600">{errors.newPassword.message}</p>
                )}
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
        <input
          type="password"
          id="confirmPassword"
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
          {...register("confirmPassword", { required: "Confirm Password is required" })}
          required
          />
          {errors.confirmPassword && (
            <p className="text-red-600">{errors.confirmPassword.message}</p>
          )}
      </div>
            
              <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                 {isLoading ? <Loader /> : "Reset Password" }
              </button>
            </form>
          </div>
        </div>
      </section></div>
    );
};

export default page;