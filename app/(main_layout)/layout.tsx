import Footer from "@/component/UI/footer";
import Navber from "@/component/UI/navber";
import { Providers } from "@/lib/Providers";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className="bg-gray-100 dark:bg-gray-800 ">
     <div className=" ">
     <div className="min-h-[100vh] ">
    <div className=" max-w-[100vw] mt-[6vh] w-full rounded shadow-xl dark:bg-gray-900">
    <Navber />
    </div>
    <div className="">
    {children} 
    </div>
     </div>
       {/* <div className="flex-shrink-0"><Footer /></div> */}
     </div>
        </main>
        </div>
    );
};

export default layout;