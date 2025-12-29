"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// Mevcut logolar ve placeholderlar
const logoData = [
    { name: "356", logo: "/referasnlar/356-logo-light.svg" },
    { name: "Kafurma", logo: "/referasnlar/kafurma_logo.svg" },
    { name: "Seontech", logo: "/referasnlar/seontech.svg" },
];

// Listeyi zenginleştirelim (loop için çoğaltma)
const references = [
    ...logoData, ...logoData, ...logoData, ...logoData, ...logoData, ...logoData
];

export default function ReferencesSection() {
    const baseVelocity = -0.01; // Ultra-slow crawl speed
    const hoverVelocity = 0; // Stop completely on hover

    const [isHovered, setIsHovered] = useState(false);

    // Smooth velocity transition using spring physics
    const velocity = useSpring(baseVelocity, {
        stiffness: 30,
        damping: 15,
        mass: 1
    });

    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Update spring target when hover state changes
    useEffect(() => {
        velocity.set(isHovered ? hoverVelocity : baseVelocity);
    }, [isHovered, velocity]);

    useAnimationFrame((t, delta) => {
        // Use the current value of the spring velocity
        const currentVelocity = velocity.get();

        // Move x
        const moveBy = currentVelocity * (delta / 10);

        let newX = x.get() + moveBy;

        // Wrap logic
        if (newX <= -50) {
            newX = 0;
        }

        x.set(newX);
    });

    return (
        <section className="py-20 bg-black overflow-hidden relative z-30">
            <div className="w-full max-w-[800px] mx-auto px-6 mb-12">
                {/* Header Row - Minimal */}
                <div className="flex items-center justify-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="text-white/40 text-xs font-medium uppercase tracking-[0.2em]"
                    >
                        Selected References
                    </motion.h2>
                </div>
            </div>

            {/* Marquee Container */}
            <div
                className="relative w-full overflow-hidden py-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Dynamic Gradient Masks */}
                {/* Left: Fills space from screen edge to content start (800px center) */}
                <div className="absolute left-0 top-0 bottom-0 z-10 w-24 md:w-[calc(50%-400px)] bg-gradient-to-r from-black via-black/80 to-transparent" />

                {/* Right: Fills space from screen edge to content end */}
                <div className="absolute right-0 top-0 bottom-0 z-10 w-24 md:w-[calc(50%-400px)] bg-gradient-to-l from-black via-black/80 to-transparent" />

                <motion.div
                    className="flex items-center gap-16 md:gap-24 w-max"
                    style={{ x: useTransform(x, v => `${v}%`) }}
                >
                    {/* Render duplication for seamless loop. */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 md:gap-24 shrink-0">
                            {references.map((ref, idx) => (
                                <div key={idx} className="relative w-32 h-12 opacity-50 transition-opacity duration-300">
                                    <Image
                                        src={ref.logo}
                                        alt={ref.name}
                                        fill
                                        className="object-contain"
                                        style={{ filter: 'brightness(0) invert(1)' }}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
