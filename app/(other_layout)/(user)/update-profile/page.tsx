


const page = () => {

    return (
        <div>
            <div className="bg-white dark:bg-gray-800 border-4 rounded-lg shadow relative m-10">
  <div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">Update Profile</h3>
   
  </div>
  <div className="p-6 space-y-6">
    <form action="#">
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
            name="name"
            id="name"
            readOnly
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
            name="email"
            id="email"
            readOnly
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
            name="phone"
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
            name="address"
            id="address"
            readOnly
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
            className="bg-gray-50 border border-gray-300 dark:text-white dark:bg-gray-600 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
            placeholder="About your Self..."
            defaultValue={""}
          />
        </div>
      </div>
    </form>
  </div>
  <div className="p-6 border-t border-gray-200 rounded-b">
    <button
      className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      type="submit"
    >
      Save all
    </button>
  </div>
</div>

        </div>
    )
}

export default page;