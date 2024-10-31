import Image from "next/image";
import Link from "next/link";

const page = () => {
    return (
        <div className="text-center min-h-screen flex justify-center items-center">
            <div>
                <div className="text-2xl uppercase font-bold">404!! Page not found</div>
                     <div className="mt-12">
                            <Image 
                            className="w-full"
                            src="https://i.ibb.co.com/64tGs8G/Screenshot-2024-10-31-155344-removebg-preview.png"
                            alt="not found page error"
                            width={450} 
                            height={200} 
                            priority
                            />
                </div>

                <div className="mt-8">
                    <Link href="/"><button type="button" className="mx-2 text-lg font-bold bg-blue-500 px-4 py-2 dark:bg-blue-400 rounded-md text-white">Home Page</button></Link>
                </div>
            </div>
        </div>
    )
};

export default page;