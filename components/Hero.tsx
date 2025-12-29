"use client";

import Link from 'next/link';
import HeroAnimation from './HeroAnimation';
import { motion } from 'framer-motion';
import Container from './ui/Container';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-end pb-12 md:pb-12 px-6 md:px-0 overflow-hidden bg-black -mt-20">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <HeroAnimation />
            </div>

            {/* Dark Gradient from bottom to ensure text readability */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none" />

            {/* Content Layer - Aligned to Header (800px) */}
            <Container className="relative z-20 flex flex-col md:flex-row justify-between items-start pb-4 gap-8 md:gap-0">

                {/* Left: Main Headline */}
                <div className="shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[48px] leading-tight text-white font-normal">
                            Turn your vision<br />
                            into a <span className="text-[#FFE000] font-semibold">digital legacy.</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Right: Description & Button */}
                <div className="flex flex-col justify-end items-start gap-6 pb-3 self-stretch">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <Link
                            href="/works"
                            className="group flex items-center gap-4 text-white hover:text-[#FFE000] transition-colors"
                        >
                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FFE000] group-hover:bg-[#FFE000] group-hover:text-black transition-all duration-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                    <polyline points="7 7 17 7 17 17"></polyline>
                                </svg>
                            </span>
                            <span className="text-lg font-medium lowercase tracking-tight">view works</span>
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-neutral-400 text-sm leading-relaxed max-w-[300px]"
                    >
                        We partner with visionaries to create industry-defining digital products.
                    </motion.p>
                </div>
            </Container>
        </section>
    );
}
