"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './ui/Container';

export default function WorksPreview() {
    return (
        <section className="py-32 bg-black">
            <Container>
                <div className="flex items-start justify-between mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-[32px] md:text-[40px] font-normal leading-tight text-white"
                    >
                        Selected <span className="text-[#FFE000]">works</span>
                    </motion.h2>

                    <Link
                        href="/works"
                        className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#FFE000] hover:bg-[#FFE000] transition-all duration-300"
                    >
                        <svg
                            className="text-white group-hover:text-black transition-colors duration-300"
                            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </Link>
                </div>

                <div className="text-neutral-500 text-sm">
                    Works coming soon...
                </div>
            </Container>
        </section>
    );
}
