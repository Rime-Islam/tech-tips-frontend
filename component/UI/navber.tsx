"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { HiOutlinePencilAlt, HiOutlineHome, HiOutlineInformationCircle, HiOutlineMail, HiOutlineUserGroup, HiOutlineMenuAlt3, HiOutlineX, HiOutlineLogout } from "react-icons/hi";
import { IoMoon, IoSunny } from "react-icons/io5";
import { logout as serverLogout } from '@/lib/AuthServices';
import { logout as reduxLogout, useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/app/hook';
import { useGetSingleUserQuery } from '@/redux/app/feature/api/user/useApi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpenBar, setIsOpenBar] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const authUser = useAppSelector(useCurrentUser);
    const id = authUser?._id;
    const dispatch = useAppDispatch();
    const { data: userData } = useGetSingleUserQuery(id, { skip: !id });
    const user = userData?.data;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        dispatch(reduxLogout());
        await serverLogout();
        window.location.reload();
    };

    const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
        } else {
            const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(userPrefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        if (theme) {
            document.documentElement.classList.toggle('dark', theme === 'dark');
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const navLinks = [
        { name: 'Home', href: '/', icon: HiOutlineHome },
        { name: 'About', href: '/about', icon: HiOutlineInformationCircle },
        { name: 'Contact', href: '/contact', icon: HiOutlineMail },
        { name: 'Community', href: '/profile/follow', icon: HiOutlineUserGroup },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-white/10 ${
                scrolled 
                ? 'bg-white dark:bg-slate-900 shadow-xl py-2' 
                : 'bg-white/100 dark:bg-slate-900 py-4'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-xl">T</span>
                        </div>
                        <span className="text-xl font-black font-outfit tracking-tighter hidden sm:block">
                            Tech<span className="text-primary">Tips</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/10 hover:text-primary transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl hover:bg-secondary/80 transition-colors border border-white/5"
                        >
                            {theme === 'dark' ? <IoSunny className="text-yellow-400" /> : <IoMoon className="text-slate-700" />}
                        </motion.button>

                        <div className="h-6 w-px bg-white/10 hidden sm:block mx-1" />

                        {authUser ? (
                            <div className="relative">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-full group"
                                >
                                    <div className="relative">
                                        <img
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all shadow-md"
                                            src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                            alt="Profile"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-800" />
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                                className="absolute right-0 mt-4 w-64 bg-white dark:bg-slate-900 rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
                                            >
                                                {/* User Info Section */}
                                                <div className="p-5 bg-secondary/30 border-b border-white/5">
                                                    <div className="flex items-center gap-3">
                                                        <img
                                                            className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10"
                                                            src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                                            alt="Profile"
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="font-black text-sm truncate">{user?.name || 'Developer'}</p>
                                                            <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">
                                                                {authUser?.role || 'Member'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Navigation Section - Removing horizontal spacing */}
                                                <div className="py-2">
                                                    <Link
                                                        href="/profile"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold hover:bg-primary/5 hover:text-primary transition-all group"
                                                    >
                                                        <HiOutlineUserGroup className="text-lg opacity-50 group-hover:opacity-100" />
                                                        Overview
                                                    </Link>

                                                    <Link
                                                        href="/profile/mypost"
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 px-5 py-3 text-sm font-bold hover:bg-orange-500/5 hover:text-orange-500 transition-all group"
                                                    >
                                                        <HiOutlinePencilAlt className="text-lg opacity-50 group-hover:opacity-100 text-orange-500" />
                                                        My Articles
                                                    </Link>

                                                    {authUser?.role === 'admin' && (
                                                        <Link
                                                            href="/dashboard"
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="flex items-center gap-3 px-5 py-3 text-sm font-bold hover:bg-indigo-500/5 hover:text-indigo-500 transition-all group"
                                                        >
                                                            <HiOutlineMenuAlt3 className="text-lg opacity-50 group-hover:opacity-100 rotate-90 text-indigo-500" />
                                                            Admin Panel
                                                        </Link>
                                                    )}

                                                    <div className="my-1 border-t border-white/5" />

                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 w-full px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-500/5 transition-all group"
                                                    >
                                                        <HiOutlineLogout className="text-lg opacity-50 group-hover:opacity-100" />
                                                        Sign Out
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/auth/login">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                                >
                                    Login
                                </motion.button>
                            </Link>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                            onClick={() => setIsOpenBar(!isOpenBar)}
                        >
                            {isOpenBar ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isOpenBar && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-b border-white/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-8 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-4 text-xl font-bold group"
                                    onClick={() => setIsOpenBar(false)}
                                >
                                    <link.icon className="text-primary group-hover:scale-110 transition-transform" />
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-white/10">
                                <Link
                                    href="/post/create"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-white font-bold"
                                    onClick={() => setIsOpenBar(false)}
                                >
                                    <HiOutlinePencilAlt />
                                    Write an Insight
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
