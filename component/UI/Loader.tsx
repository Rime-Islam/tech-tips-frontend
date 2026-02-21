"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary"
                />
                
                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border-4 border-secondary/20 border-b-secondary"
                />

                {/* Center Core */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-[30px] bg-primary rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                />
            </div>
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
            >
                <h3 className="text-xl font-black font-outfit tracking-tighter">
                    Tech<span className="text-primary">Tips</span>
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-60 mt-1">
                    Loading Excellence...
                </p>
            </motion.div>
        </div>
    );
};

export default Loader;