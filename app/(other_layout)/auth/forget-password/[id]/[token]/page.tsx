import React from 'react';

const page = () => {
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
            <form>
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
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
        />
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
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
        />
      </div>
            
              <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section></div>
    );
};

export default page;