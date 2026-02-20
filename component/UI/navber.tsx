"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { HiOutlinePencilAlt, HiOutlineHome, HiOutlineInformationCircle, HiOutlineMail, HiOutlineUserGroup, HiOutlineMenuAlt3, HiOutlineX, HiOutlineLogout } from "react-icons/hi";
import { IoMoon, IoSunny } from "react-icons/io5";
import { logout, useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
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

    const handleLogout = () => {
        dispatch(logout());
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
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
                scrolled ? 'py-3' : 'py-5'
            }`}
        >
            <div className="container mx-auto px-4">
                <div className={`glass rounded-2xl border border-white/10 px-6 py-2 flex items-center justify-between transition-all duration-300 ${
                    scrolled ? 'shadow-lg bg-white/80 dark:bg-slate-900/80' : 'bg-white/40 dark:bg-slate-900/40'
                }`}>
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
                                className="px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-all duration-300"
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
                            className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center text-xl hover:bg-secondary transition-colors"
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
                                            className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary transition-all"
                                            src={user?.profilePicture || "https://i.ibb.co/544PSXp/blank-profile-picture-973460-960-720.webp"}
                                            alt="Profile"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900" />
                                    </div>
                                </motion.button>

                                <AnimatePresence>
                                    {isMenuOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-56 glass rounded-2xl border border-white/10 shadow-2xl z-20 overflow-hidden"
                                            >
                                                <div className="p-4 border-b border-white/10 bg-primary/5">
                                                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Signed in as</p>
                                                    <p className="font-bold truncate">{user?.name || authUser?.email}</p>
                                                </div>
                                                <div className="p-2">
                                                    <Link
                                                        href="/profile"
                                                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        Profile Overview
                                                    </Link>
                                                    {authUser?.role === 'admin' && (
                                                        <Link
                                                            href="/dashboard"
                                                            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
                                                            onClick={() => setIsMenuOpen(false)}
                                                        >
                                                            Admin Dashboard
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <HiOutlineLogout className="text-lg" />
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
