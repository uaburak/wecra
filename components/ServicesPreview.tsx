"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import Container from './ui/Container';

const services = [
    {
        number: "01",
        title: "web design",
        description: "We craft immersive digital experiences that convert visitors into loyal customers. Through intuitive layouts and striking visuals, we ensure every interaction feels meaningful and intentional.",
        link: "/services/web-design"
    },
    {
        number: "02",
        title: "branding",
        description: "Your brand is more than a logo; it's a story waiting to be told. We build comprehensive visual identities that command attention, resonate with your audience, and stand the test of time.",
        link: "/services/branding"
    },
    {
        number: "03",
        title: "development",
        description: "We build robust, scalable digital products using cutting-edge technologies. From complex web applications to seamless e-commerce platforms, our code is as clean as our designs.",
        link: "/services/development"
    }
];

export default function ServicesPreview() {
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
                        Our <span className="text-[#FFE000]">services</span>
                    </motion.h2>

                    {/* Navigation Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Link
                            href="/services"
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, margin: "-100px" }}
                            transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full"
                        >
                            <Link href={service.link} className="block h-full group">
                                <div className="border border-white/10 rounded-2xl p-6 h-full hover:border-white/20 transition-all duration-300 bg-black relative flex flex-col min-h-[300px]">

                                    {/* Top Row: Number & Arrow Button */}
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="text-[#FFE000] text-xs font-bold pt-2">
                                            {service.number}
                                        </div>

                                        {/* Circular Arrow Button - Top Right - Compact */}
                                        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FFE000] group-hover:border-[#FFE000] transition-all duration-300">
                                            <svg
                                                className="text-white group-hover:text-black transition-colors duration-300"
                                                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Title - Compact */}
                                    <h3 className="text-[20px] font-normal text-white mb-4 group-hover:text-[#FFE000] transition-colors duration-300 leading-tight">
                                        {service.title}
                                    </h3>

                                    {/* Description - Standard Flow, Longer Text */}
                                    <p className="text-neutral-500 text-xs leading-relaxed line-clamp-4">
                                        {service.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
