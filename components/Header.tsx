"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "home", path: "/" },
    { name: "services", path: "/services" },
    { name: "works", path: "/works" },
    { name: "about", path: "/about" },
    { name: "contact", path: "/contact" },
] as const;

type NavPath = (typeof navItems)[number]["path"];

export default function Header() {
    const pathname = usePathname();

    const navPaths = useMemo(() => new Set(navItems.map((i) => i.path)), []);
    const normalizedPath = (navPaths.has(pathname as NavPath) ? pathname : null) as NavPath | null;

    const [hoveredPath, setHoveredPath] = useState<NavPath | null>(null);
    const activeItem = hoveredPath ?? normalizedPath;

    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const [isInitial, setIsInitial] = useState(true);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafRef = useRef<number | null>(null);

    const navRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
    const navContainerRef = useRef<HTMLElement | null>(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const clearHoverTimeout = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const cancelRaf = useCallback(() => {
        if (rafRef.current != null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }, []);

    const measureAndSetPill = useCallback(
        (target: NavPath | null) => {
            cancelRaf();

            rafRef.current = requestAnimationFrame(() => {
                if (!target) {
                    setPillStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
                    return;
                }

                const el = navRefs.current[target];
                if (!el) {
                    setPillStyle((prev) => (prev.opacity === 0 ? prev : { ...prev, opacity: 0 }));
                    return;
                }

                const nextLeft = el.offsetLeft;
                const nextWidth = el.offsetWidth;

                setPillStyle((prev) => {
                    // Aynı değer geldiyse gereksiz render basmayalım.
                    if (prev.left === nextLeft && prev.width === nextWidth && prev.opacity === 1) return prev;
                    return { left: nextLeft, width: nextWidth, opacity: 1 };
                });

                if (isInitial) {
                    // Animasyon mantığını bozmadan initial flag’i kapat
                    setTimeout(() => setIsInitial(false), 50);
                }
            });
        },
        [cancelRaf, isInitial]
    );

    const handleMouseEnter = useCallback(
        (path: NavPath) => {
            clearHoverTimeout();
            setHoveredPath(path);
        },
        [clearHoverTimeout]
    );

    const handleMouseLeave = useCallback(() => {
        clearHoverTimeout();
        timeoutRef.current = setTimeout(() => setHoveredPath(null), 300);
    }, [clearHoverTimeout]);

    // Aktif target değiştikçe pill ölç
    useLayoutEffect(() => {
        measureAndSetPill(activeItem ?? null);
        return () => cancelRaf();
    }, [activeItem, measureAndSetPill, cancelRaf]);

    // Resize/Font/layout değişimlerinde yeniden ölç (window.resize yerine)
    useEffect(() => {
        if (!navContainerRef.current) return;

        const ro = new ResizeObserver(() => {
            // Ölçüm için aynı fonksiyonu kullan
            measureAndSetPill(activeItem ?? null);
        });

        ro.observe(navContainerRef.current);

        return () => ro.disconnect();
    }, [activeItem, measureAndSetPill]);

    // Hover timeout cleanup
    useEffect(() => {
        return () => {
            clearHoverTimeout();
            cancelRaf();
        };
    }, [clearHoverTimeout, cancelRaf]);

    // Mobile menü açıkken scroll kilidi kaldırıldı (kullanıcı isteği)
    /*
    useEffect(() => {
        const prev = document.body.style.overflow;
        if (isMobileMenuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";

        return () => {
            document.body.style.overflow = prev;
        };
    }, [isMobileMenuOpen]);
    */

    // Route değiştiğinde menüyü kapat (Sayfa geçişlerinde animasyonlu kapanış için)
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4">
            <motion.header
                layout
                initial={false}
                animate={{ height: isMobileMenuOpen ? "auto" : "48px" }}
                transition={{ type: "spring", stiffness: 180, damping: 25 }}
                className="bg-[#050505]/80 backdrop-blur-md border border-white/10 w-full max-w-[800px] shadow-2xl shadow-black/50 overflow-hidden relative rounded-[24px]"
            >
                <div className="h-12 flex items-center justify-between px-4 md:px-6 -translate-y-[1px]">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="relative w-20 h-5 shrink-0"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
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
                        ref={navContainerRef}
                        className="hidden md:flex items-center relative"
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Sliding Pill Background - Persistent Logic */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 h-8 rounded-full -z-0 bg-white/10"
                            animate={{
                                left: pillStyle.left,
                                width: pillStyle.width,
                                opacity: pillStyle.opacity,
                            }}
                            initial={false}
                            transition={{
                                type: isInitial ? "tween" : "spring",
                                duration: isInitial ? 0 : undefined,
                                stiffness: 160,
                                damping: 20,
                                mass: 1,
                            }}
                        />

                        {navItems.map((item) => {
                            const isTarget = activeItem === item.path;
                            const textColor = isTarget ? "text-white" : "text-neutral-400";

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    ref={(el) => {
                                        navRefs.current[item.path] = el;
                                    }}
                                    className={`relative px-5 py-2 text-[13px] font-medium transition-colors z-10 ${textColor}`}
                                    onMouseEnter={() => handleMouseEnter(item.path)}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button - Toggle */}
                    <button
                        className="md:hidden text-white/70 hover:text-white transition-colors z-50 relative p-4 -mr-3 block"
                        onClick={() => setIsMobileMenuOpen((v) => !v)}
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
                                    open: { d: "M 6 6 L 18 18" },
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            />
                            <motion.path
                                variants={{
                                    closed: { d: "M 4 15 L 20 15" },
                                    open: { d: "M 6 18 L 18 6" },
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
                            className="px-4 pb-4 md:hidden"
                        >

                            <nav className="flex items-center justify-between w-full">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.path;
                                    return (
                                        <Link
                                            key={item.path}
                                            href={item.path}
                                            // onClick kaldırıldı, useEffect ile yönetiliyor
                                            className={`text-[13px] font-medium transition-colors relative py-1.5 px-3 rounded-full ${isActive ? "text-white bg-white/10" : "text-neutral-400 hover:text-white"
                                                }`}
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
