"use client"

import { useCurrentUser } from "@/redux/app/feature/api/auth/authSlice";
import { usePaymentMutation } from "@/redux/app/feature/api/post/postApi";
import { useAppSelector } from "@/redux/app/hook";
import { motion } from "framer-motion";
import { HiOutlineCheckCircle, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineSupport, HiOutlineGlobe } from "react-icons/hi";
import { toast } from "sonner";

const Page = () => {
    const user = useAppSelector(useCurrentUser);
    const userId = user?._id;
    const [payment, { isLoading }] = usePaymentMutation();

    const handlePayment = async() => {
        try {
            const res = await payment({userId}).unwrap();
            if(res?.success) {
                window.location.href = res?.data?.payment_url;
            } else {
                toast.error("Failed to initiate payment");
            }
        } catch (error) {
            toast.error("An error occurred during payment");
        }
    }

    const features = [
        { icon: <HiOutlineLightningBolt className="text-amber-500" />, text: "Access to all premium content" },
        { icon: <HiOutlineGlobe className="text-blue-500" />, text: "Global developer community access" },
        { icon: <HiOutlineShieldCheck className="text-emerald-500" />, text: "Verified badge on your profile" },
        { icon: <HiOutlineSupport className="text-purple-500" />, text: "Priority developer support" },
        { icon: <HiOutlineCheckCircle className="text-pink-500" />, text: "Early access to new features" },
        { icon: <HiOutlineCheckCircle className="text-teal-500" />, text: "Ad-free browsing experience" }
    ];

    return (
        <div className="min-h-screen py-20 px-4 relative overflow-hidden">
            {/* background effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700" />

            <div className="container mx-auto max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6 tracking-tight">
                        Elevate Your <span className="text-gradient">Experience</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Join our premium circle to unlock exclusive technical insights, connect with industry leaders, and support the community.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row shadow-primary/5"
                >
                    {/* Benefits Section */}
                    <div className="flex-1 p-8 md:p-12 lg:p-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                <HiOutlineLightningBolt className="text-2xl text-primary" />
                            </div>
                            <h2 className="text-3xl font-black font-outfit">Premium Plan</h2>
                        </div>
                        
                        <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                            Upgrade to our Premium Plan to get full access to everything GrootHub has to offer. Designed for professional developers who want to stay ahead of the curve.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (idx * 0.1) }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                                        {feature.icon}
                                    </div>
                                    <span className="font-medium text-foreground opacity-80">{feature.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="w-full lg:w-96 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-12 flex flex-col justify-center items-center text-center">
                        <div className="mb-8">
                            <span className="text-sm font-black uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full">
                                Best Value
                            </span>
                        </div>
                        
                        <div className="mb-10">
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-7xl font-black font-outfit">$20</span>
                                <span className="text-muted-foreground font-bold">/mo</span>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground font-medium">Billed monthly. Cancel anytime.</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full py-5 bg-primary text-white font-black text-xl rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Subscribe Now"
                            )}
                        </motion.button>
                        
                        <p className="mt-8 text-xs text-muted-foreground opacity-60 flex items-center gap-2 justify-center">
                            <HiOutlineShieldCheck className="text-sm" /> Secure checkout powered by SSL
                        </p>
                    </div>
                </motion.div>

                {/* FAQ/Meta Info */}
                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-sm">
                        Joining more than <span className="text-foreground font-bold font-outfit">1,200+</span> developers world-wide.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;
