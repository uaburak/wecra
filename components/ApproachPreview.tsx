"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './ui/Container';

const principles = [
    {
        number: "01",
        title: "discovery",
        description: "we start by understanding your vision, goals, and challenges. deep research and strategic thinking form the foundation."
    },
    {
        number: "02",
        title: "strategy",
        description: "every decision is intentional. we craft a roadmap that aligns design, technology, and business objectives."
    },
    {
        number: "03",
        title: "execution",
        description: "obsessive attention to detail. we build, test, and refine until every pixel serves its purpose."
    },
    {
        number: "04",
        title: "growth",
        description: "launch is just the beginning. we optimize, iterate, and scale your digital presence continuously."
    }
];

export default function ApproachPreview() {
    return (
        <section className="py-32 bg-black relative">
            <Container>
                {/* Header Row */}
                <div className="flex items-start justify-between mb-2">
                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="text-[32px] md:text-[40px] font-normal leading-tight text-white"
                    >
                        Our <span className="text-[#FFE000]">approach</span>
                    </motion.h2>

                    {/* Navigation Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link
                            href="/approach"
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
                    </motion.div>
                </div>

                {/* Description - Full Width Justified */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-neutral-400 text-sm mb-12 w-full text-justify leading-relaxed"
                >
                    Our proven process transforms ambitious visions into digital reality through a distinctive methodology.
                    We combine strategic insight with rigorous execution to deliver exceptional outcomes for every partner.
                </motion.p>

                {/* Timeline */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFE000]/20 via-[#FFE000]/10 to-transparent hidden md:block" />

                    {/* Steps */}
                    <div className="space-y-16">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: false, margin: "-100px" }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="relative flex items-start gap-8 md:gap-12"
                            >
                                {/* Number Circle */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full bg-[#FFE000] flex items-center justify-center shadow-[0_0_15px_rgba(255,224,0,0.2)]">
                                        <span className="text-black font-semibold text-sm">
                                            {principle.number}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-2">
                                    <h3 className="text-2xl font-normal text-white mb-3 capitalize">
                                        {principle.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed max-w-lg">
                                        {principle.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
