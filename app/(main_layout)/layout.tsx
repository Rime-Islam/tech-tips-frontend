import Footer from "@/component/UI/footer";
import Navbar from "@/component/UI/navber";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen">
            <Navbar />
            <main className="pt-[10vh]">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default layout;
