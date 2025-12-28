"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { name: 'home', path: '/' },
    { name: 'services', path: '/services' },
    { name: 'works', path: '/works' },
    { name: 'about', path: '/about' },
    { name: 'contact', path: '/contact' },
];

export default function Header() {
    const pathname = usePathname();
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [isInitial, setIsInitial] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

    // Logic: If hovering, target is hovered item. If not, target is active item.
    // If neither (e.g. unknown route), no target.
    const activeItem = hoveredPath || pathname;

    const handleMouseEnter = (path: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setHoveredPath(path);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setHoveredPath(null);
        }, 300);
    };

    useEffect(() => {
        if (activeItem && navRefs.current[activeItem]) {
            const element = navRefs.current[activeItem];
            if (element) {
                setPillStyle({
                    left: element.offsetLeft,
                    width: element.offsetWidth,
                    opacity: 1
                });

                // RESTORED: Turn off 'isInitial' so animations work after first render
                if (isInitial) {
                    setTimeout(() => {
                        setIsInitial(false);
                    }, 50);
                }
            }
        } else {
            setPillStyle(prev => ({ ...prev, opacity: 0 }));
        }
    }, [activeItem, isInitial]);

    // Optimization: Recalculate position on window resize
    useEffect(() => {
        const handleResize = () => {
            if (activeItem && navRefs.current[activeItem]) {
                const element = navRefs.current[activeItem];
                if (element) {
                    setPillStyle({
                        left: element.offsetLeft,
                        width: element.offsetWidth,
                        opacity: 1
                    });
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeItem]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMobileMenuOpen]);

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
            <motion.header
                layout
                initial={false}
                animate={{
                    height: isMobileMenuOpen ? 'auto' : '48px'
                }}
                transition={{ type: "spring", stiffness: 180, damping: 25 }}
                className="bg-[#050505]/80 backdrop-blur-md border border-white/10 w-full max-w-[800px] shadow-2xl shadow-black/50 overflow-hidden relative rounded-[24px]"
            >
                <div className="h-12 flex items-center justify-between px-4 md:px-6 -translate-y-[1px]">
                    {/* Logo */}
                    <Link href="/" className="relative w-20 h-5 shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image
                            src="/logo.svg"
                            alt="Wecra Logo"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav
                        className="hidden md:flex items-center relative"
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Sliding Pill Background - Persistent Logic */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full -z-0 bg-white/10"
                            animate={{
                                left: pillStyle.left,
                                width: pillStyle.width,
                                opacity: pillStyle.opacity
                            }}
                            initial={false}
                            transition={{
                                type: isInitial ? "tween" : "spring",
                                duration: isInitial ? 0 : undefined,
                                stiffness: 160,
                                damping: 20,
                                mass: 1
                            }}
                        />

                        {navItems.map((item) => {
                            const isTarget = activeItem === item.path;
                            const textColor = isTarget ? 'text-white' : 'text-neutral-400';

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    ref={el => { navRefs.current[item.path] = el }}
                                    className={`relative px-5 py-2 text-[13px] font-medium transition-colors z-10 ${textColor}`}
                                    onMouseEnter={() => handleMouseEnter(item.path)}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Mobile Menu Button - Toggle */}
                    <button
                        className="md:hidden text-white/70 hover:text-white transition-colors z-50 relative p-1 block"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            animate={isMobileMenuOpen ? "open" : "closed"}
                        >
                            <motion.path
                                variants={{
                                    closed: { d: "M 4 9 L 20 9" },
                                    open: { d: "M 6 6 L 18 18" }
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                            <motion.path
                                variants={{
                                    closed: { d: "M 4 15 L 20 15" },
                                    open: { d: "M 6 18 L 18 6" }
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                        </motion.svg>
                    </button>
                </div>

                {/* Mobile Menu Content - Expandable Area */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="px-4 pb-6 md:hidden"
                        >
                            <div className="w-full h-px bg-white/10 mb-4" />
                            <nav className="flex items-center justify-between w-full">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            className={`text-[13px] font-medium transition-colors relative py-1.5 px-3 rounded-full ${isActive ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>
        </div>
    );
}
