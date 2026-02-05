"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextScrollingEffect from "@/components/global/TextScrollingEffect";

export default function Works() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorLabelRef = useRef<HTMLDivElement>(null);

    const projects = [
        { title: "Lumina Haus", category: "Real Estate", img: "/hero.jpg", year: "2025" },
        { title: "Vortex Finance", category: "Fintech", img: "/hero.jpg", year: "2024" },
        { title: "Aeon Concept", category: "Culture", img: "/hero.jpg", year: "2024" },
        { title: "Nyla Fragrances", category: "E-Commerce", img: "/hero.jpg", year: "2023" },
        { title: "Onyx Systems", category: "Technology", img: "/hero.jpg", year: "2023" },
    ];

    useGSAP(() => {
        // Simple cursor follower for the "View" label
        const moveCursorLabel = (e: MouseEvent) => {
            if (!cursorLabelRef.current) return;
            gsap.to(cursorLabelRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: "power2.out"
            });
        };
        window.addEventListener("mousemove", moveCursorLabel);
        return () => window.removeEventListener("mousemove", moveCursorLabel);
    }, { scope: containerRef });

    return (
        <section className="w-full relative z-10 py-32 bg-[#050505]" ref={containerRef}>

            {/* Floating Cursor Label */}
            <div
                ref={cursorLabelRef}
                className={`fixed top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${activeProject !== null ? 'opacity-100' : 'opacity-0'}`}
            >
                {/* Floating Image Preview */}
                <div className="w-[300px] h-[200px] relative overflow-hidden rounded-lg shadow-2xl scale-[0.8] animate-pulse">
                    {activeProject !== null && (
                        <Image
                            src={projects[activeProject].img}
                            alt="Project Preview"
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div className="mt-4 bg-[#FACC15] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    View Project
                </div>
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-4 md:px-12">
                <TextScrollingEffect>
                    <div className="flex flex-col">
                        <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-16 pl-2">Selected Works (2023-2025)</h3>

                        <div className="flex flex-col">
                            {projects.map((project, i) => (
                                <Link
                                    href="/works"
                                    key={i}
                                    className="group relative flex flex-col md:flex-row md:items-baseline justify-between py-12 border-t border-white/10 hover:border-white/30 transition-colors duration-300"
                                    onMouseEnter={() => setActiveProject(i)}
                                    onMouseLeave={() => setActiveProject(null)}
                                >
                                    <h2 className="text-4xl md:text-8xl font-bold text-neutral-400 group-hover:text-white group-hover:pl-8 transition-all duration-500 ease-out">
                                        {project.title}
                                    </h2>
                                    <div className="flex items-center gap-12 mt-4 md:mt-0 md:pr-4">
                                        <span className="text-sm font-mono text-neutral-600 uppercase tracking-widest group-hover:text-[#FACC15] transition-colors">{project.category}</span>
                                        <span className="text-sm font-mono text-neutral-700">{project.year}</span>
                                    </div>
                                </Link>
                            ))}
                            {/* Final Border */}
                            <div className="w-full border-t border-white/10"></div>
                        </div>

                        <div className="mt-24 flex justify-center">
                            <Link href="/works" className="text-xl text-neutral-500 hover:text-white border-b border-transparent hover:border-white transition-all duration-300 pb-1">
                                View Full Archive
                            </Link>
                        </div>
                    </div>
                </TextScrollingEffect>
            </div>
        </section>
    );
}
