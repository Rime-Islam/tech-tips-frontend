"use client"
import React from 'react';
import { useCurrentUser } from '@/redux/app/feature/api/auth/authSlice';
import { useAppSelector } from '@/redux/app/hook';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    HiOutlineHome, 
    HiOutlineDocumentText, 
    HiOutlineUserGroup, 
    HiOutlineCreditCard,
    HiOutlineChatAlt2,
    HiOutlineUserCircle,
    HiOutlineChartBar,
    HiOutlineSearch,
    HiOutlineCog
} from "react-icons/hi";
import { motion } from 'framer-motion';

const Sidebar = () => {
    const user = useAppSelector(useCurrentUser);
    const pathname = usePathname();

    const menuItems = user?.role === 'admin' ? [
        { name: 'Dashboard', icon: HiOutlineChartBar, href: '/admin/dashboard' },
        { name: 'Search', icon: HiOutlineSearch, href: '/search' },
        { name: 'Insights', icon: HiOutlineChartBar, href: '/insights' },
        { name: 'Docs', icon: HiOutlineDocumentText, href: '/docs' },
        { name: 'Settings', icon: HiOutlineCog, href: '/settings' },
        { name: 'Messages', icon: HiOutlineChatAlt2, href: '/messages', badge: true },
        { name: 'Profile', icon: HiOutlineUserCircle, href: '/profile' },
    ] : [
        { name: 'Home', icon: HiOutlineHome, href: '/' },
        { name: 'Create Post', icon: HiOutlineDocumentText, href: '/post/create' },
        { name: 'My Feed', icon: HiOutlineChartBar, href: '/profile/update' },
        { name: 'Followers', icon: HiOutlineUserGroup, href: '/profile/follow' },
        { name: 'Following', icon: HiOutlineUserGroup, href: '/profile/follow' },
        { name: 'Subscribe', icon: HiOutlineCreditCard, href: '/profile/payment' },
        { name: 'Messages', icon: HiOutlineChatAlt2, href: '/messages', badge: true },
        { name: 'Profile', icon: HiOutlineUserCircle, href: '/profile' },
    ];

    return (
        <div className="w-full">
            <div className="space-y-1">
                {menuItems.map((item, idx) => {
                    const isActive = pathname === item.href;
                    return (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                href={item.href}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                    ${isActive 
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                                        : 'text-muted-foreground hover:bg-white/50 dark:hover:bg-white/5 hover:text-foreground'}
                                `}
                            >
                                <item.icon className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                                <span className="font-medium text-sm">{item.name}</span>
                                {item.badge && (
                                    <span className="ml-auto w-2 h-2 rounded-full bg-primary ring-4 ring-background" />
                                )}
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
            
            {/* Promotion Card */}
            {user?.role !== 'admin' && !user?.premium && (
                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl">
                    <h4 className="font-bold text-sm mb-1">Go Pro!</h4>
                    <p className="text-[11px] opacity-80 mb-3">Get exclusive access to premium tech insights.</p>
                    <Link 
                        href="/profile/payment"
                        className="block w-full py-2 text-center bg-white text-indigo-600 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all"
                    >
                        Upgrade Now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
