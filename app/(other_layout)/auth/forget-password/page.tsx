import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="  mt-[15vh]">
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
            <form>
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            
              <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Continue
              </button>
              <div className="mt-6 text-center">
                <Link href="/auth/register"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
              <p className="mt-6 text-gray-500 dark:text-gray-400">
                By clicking “Continue” above, you acknowledge that you will received an 
                email to reset password...
              </p>
            </form>
          </div>
        </div>
      </section>
    );
};

export default page;