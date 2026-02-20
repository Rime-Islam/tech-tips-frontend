import Link from 'next/link';
import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="glass border-t border-white/10 py-12 mt-20">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo & Info */}
                    <div className="flex flex-col items-center md:items-start space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                <span className="text-white font-black text-sm">T</span>
                            </div>
                            <span className="text-lg font-black font-outfit tracking-tighter">
                                Tech<span className="text-primary">Tips</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
                            Elevating tech discourse through premium insights and community-driven knowledge.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4">
                        {[
                            { icon: FaGithub, href: "#" },
                            { icon: FaTwitter, href: "#" },
                            { icon: FaLinkedin, href: "#" },
                            { icon: FaInstagram, href: "#" }
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
                            >
                                <social.icon />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                        © 2026 TechTips Inc. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/20">
                        <span>Built with</span>
                        <span className="text-primary/40 leading-none">❤</span>
                        <span>by the TechTips Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
