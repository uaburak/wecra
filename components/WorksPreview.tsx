"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Container from './ui/Container';

const projects = [
    {
        title: "digital transformation",
        category: "web design · development",
        image: "/desktop-threejs.jpg",
        year: "2024"
    },
    {
        title: "brand evolution",
        category: "branding · strategy",
        image: "/desktop-threejs.jpg",
        year: "2024"
    }
];

export default function WorksPreview() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-32 bg-black">
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
                        Selected <span className="text-[#FFE000]">works</span>
                    </motion.h2>

                    {/* Navigation Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
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
                    We specialize in crafting digital experiences that not only look stunning but also drive tangible results.
                    From strategic rebranding to complex web applications, our portfolio showcases our commitment to excellence.
                </motion.p>

                {/* Projects */}
                <div className="space-y-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Link
                                href="/works"
                                className="group block"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/9] bg-neutral-900 rounded-2xl overflow-hidden mb-8">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />

                                    {/* Info Overlay (visible on hover) */}
                                    <div className={`absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-[#FFE000] text-xs font-semibold mb-2 uppercase tracking-wider">
                                                    {project.category}
                                                </p>
                                                <h3 className="text-3xl font-normal text-white">
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <div className="w-12 h-12 rounded-full bg-[#FFE000] flex items-center justify-center text-black">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                                    <polyline points="7 7 17 7 17 17"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Below (Always Visible) */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-8 group-hover:border-[#FFE000]/50 transition-colors duration-500">
                                    <div>
                                        <h3 className="text-2xl font-normal text-white mb-2 group-hover:text-[#FFE000] transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-neutral-500 text-sm">
                                            {project.category}
                                        </p>
                                    </div>
                                    <div className="text-neutral-600 text-sm">
                                        {project.year}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
