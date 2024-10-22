import Footer from "@/component/UI/footer";
import Navber from "@/component/UI/navber";
import { Providers } from "@/lib/Providers";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div>
               <main className="container mx-auto max-w-8xl  px-6 flex-grow">
       <Navber />
       {children} 
       <Footer />
        </main>
        </div>
    );
};

export default layout;