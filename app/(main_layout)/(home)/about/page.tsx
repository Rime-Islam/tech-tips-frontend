'use client'
import { motion } from "framer-motion"
import { HiOutlineLightBulb, HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlinePresentationChartBar } from "react-icons/hi";

const AboutPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const features = [
        {
            title: "Expert Insights",
            description: "Deep dives into the latest tech trends and industry-standard best practices.",
            icon: HiOutlineLightBulb,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Global Community",
            description: "Join thousands of developers sharing knowledge and building the future together.",
            icon: HiOutlineUserGroup,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Accessible Learning",
            description: "Complex concepts made simple. Actionable tips for everyone from beginners to experts.",
            icon: HiOutlineGlobeAlt,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "Innovation First",
            description: "We focus on what's next, helping you stay ahead in the rapidly evolving digital landscape.",
            icon: HiOutlinePresentationChartBar,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        }
    ];

    const team = [
        {
            name: "Arthur Melo",
            role: "Design Director",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
        },
        {
            name: "Amelia Anderson",
            role: "Lead Developer",
            image: "https://images.unsplash.com/photo-1531590878845-12627191e687?auto=format&fit=crop&w=150&q=80"
        },
        {
            name: "Olivia Wathan",
            role: "Lead Designer",
            image: "https://images.unsplash.com/photo-1488508872907-592763824245?auto=format&fit=crop&w=150&q=80"
        },
        {
            name: "John Doe",
            role: "Full Stack Developer",
            image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
        }
    ];

    return (
        <div className="min-h-screen bg-transparent pt-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 py-12"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="text-center mb-20 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-black font-outfit mb-6">
                        Empowering Digital <span className="text-gradient">Possibilities</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        At <span className="text-primary font-bold">TechTips</span>, we bridge the gap between complex technology and actionable insights. Our mission is to transform how you learn, build, and innovate.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div variants={itemVariants} className="glass rounded-3xl p-8 md:p-12 border border-white/10 mb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold font-outfit mb-6">Our Mission & Vision</h2>
                            <p className="text-muted-foreground leading-relaxed mb-6 italic">
                                "To empower tech enthusiasts, entrepreneurs, and everyday users with accessible insights that enhance their digital lives."
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                We envision a world where technology is a catalyst for innovation and social change. By fostering a culture of continuous learning and collaboration, we aim to inspire individuals to solve real-world challenges and unlock their full potential.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-primary mb-2">10k+</div>
                                    <div className="text-sm font-bold uppercase tracking-wider opacity-60">Articles</div>
                                </div>
                            </div>
                            <div className="aspect-square rounded-2xl bg-secondary flex items-center justify-center p-8">
                                <div className="text-center">
                                    <div className="text-4xl font-black mb-2">50k+</div>
                                    <div className="text-sm font-bold uppercase tracking-wider opacity-60">Members</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <div key={index} className="glass p-8 rounded-2xl border border-white/10 card-hover">
                            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                                <feature.icon className={`text-2xl ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* Team Section */}
                <motion.div variants={itemVariants} className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">The Creative Minds</h2>
                    <p className="text-muted-foreground">Expert leadership driving innovation every day.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="group relative">
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] glass border border-white/10">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex flex-col justify-end p-6">
                                    <h4 className="text-white text-lg font-bold">{member.name}</h4>
                                    <p className="text-primary-foreground/70 text-sm font-semibold">{member.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutPage;