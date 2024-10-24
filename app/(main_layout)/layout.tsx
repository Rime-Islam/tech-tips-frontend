import Footer from "@/component/UI/footer";
import Navber from "@/component/UI/navber";
import { Providers } from "@/lib/Providers";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className="container mx-auto max-w-8xl  px-6 flex-grow">
     <div className="flex flex-col min-h-[100vh]">
     <div className="flex-grow">
     <Navber />
     {children} 
     </div>
       <div className="flex-shrink-0"><Footer /></div>
     </div>
        </main>
        </div>
    );
};

export default layout;