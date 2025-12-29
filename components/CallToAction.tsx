"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CallToAction() {
    return (
        <section className="py-40 bg-black relative overflow-hidden">
            {/* Large Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFE000]/10 rounded-full blur-[150px] -z-10" />

            <div className="w-full max-w-[800px] mx-auto px-6">
                <div className="text-center">
                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[56px] md:text-[72px] font-normal leading-[1.1] text-white mb-8"
                    >
                        let's build<br />
                        something <span className="text-[#FFE000] font-semibold">legendary</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-neutral-400 text-base leading-relaxed mb-14 max-w-lg mx-auto"
                    >
                        we're selective with our partners. if you're ready to create something exceptional, let's talk.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.4, duration: 0.7, type: "spring", stiffness: 150 }}
                    >
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-4 text-black bg-[#FFE000] hover:bg-white px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-[#FFE000]/20"
                        >
                            <span className="text-base font-semibold lowercase">start your project</span>
                            <svg className="group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </motion.div>

                    {/* Small Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-neutral-600 text-xs mt-8"
                    >
                        typically responds within 24 hours
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
