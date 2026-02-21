'use client'
import React from 'react';
import { motion } from "framer-motion"
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineChatAlt2 } from "react-icons/hi";

const ContactPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
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

    const contactInfo = [
        {
            icon: HiOutlineMail,
            label: "Email",
            value: "support@techtips.com",
            description: "Our friendly team is here to help.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            icon: HiOutlineChatAlt2,
            label: "Live Chat",
            value: "Start new chat",
            description: "Available Mon-Fri from 9am to 6pm.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            icon: HiOutlineLocationMarker,
            label: "Office",
            value: "100 Smith Street, London",
            description: "Come say hello at our HQ.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            icon: HiOutlinePhone,
            label: "Phone",
            value: "+1 (555) 000-0000",
            description: "Give us a call anytime.",
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        }
    ];

    return (
        <div className="min-h-screen pt-20 pb-12">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-16 max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-black font-outfit mb-4">
                        Let's Start a <span className="text-gradient">Conversation</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Have a question or just want to say hi? We'd love to hear from you. Explore our contact options or send us a message below.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Contact Info & Map */}
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="glass p-6 rounded-2xl border border-white/10 card-hover"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${info.bg} flex items-center justify-center mb-4`}>
                                        <info.icon className={`text-xl ${info.color}`} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{info.label}</h3>
                                    <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                                    <p className="text-primary font-semibold text-sm">{info.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div variants={itemVariants} className="glass rounded-3xl overflow-hidden h-[300px] border border-white/10">
                            <iframe
                                width="100%"
                                height="100%"
                                frameBorder={0}
                                title="map"
                                src="https://maps.google.com/maps?width=100%&height=300&hl=en&q=London&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                                className="opacity-80 grayscale contrast-125"
                            />
                        </motion.div>
                    </div>

                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-12 xl:col-span-7">
                        <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold opacity-70 ml-1">First Name</label>
                                        <input
                                            type="text"
                                            placeholder="John"
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold opacity-70 ml-1">Last Name</label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-70 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold opacity-70 ml-1">Message</label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;