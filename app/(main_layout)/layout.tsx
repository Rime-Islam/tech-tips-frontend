import Footer from "@/component/UI/footer";
import Navber from "@/component/UI/navber";
import { Providers } from "@/lib/Providers";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className="bg-gray-100 dark:bg-gray-800 ">
     <div className=" ">
     <div className="min-h-[100vh]">
     <Navber />
     {children} 
     </div>
       {/* <div className="flex-shrink-0"><Footer /></div> */}
     </div>
        </main>
        </div>
    );
};

export default layout;