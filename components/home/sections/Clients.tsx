"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TextScrollingEffect from "@/components/global/TextScrollingEffect";

export default function Clients() {
    const trackRef = useRef(null);
    const containerRef = useRef(null);
    const brands = ["Nvidia", "Polestar", "Acne Studios", "Unreal", "Vercel", "Linear", "Shopify", "Aesop", "Stripe", "Ray-Ban"];

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        gsap.to(track, {
            xPercent: -50,
            ease: "none",
            duration: 15, // Faster, more aggressive
            repeat: -1
        });
    }, { scope: containerRef });

    return (
        <section className="w-full py-32 bg-[#050505] overflow-hidden" ref={containerRef}>
            <TextScrollingEffect>
                <div className="flex flex-col items-center gap-12">
                    <p className="text-xs font-mono text-neutral-500 uppercase tracking-[0.3em] pl-4">We work with the best</p>

                    {/* Aggressive Large Marquee */}
                    <div className="w-full relative">
                        <div ref={trackRef} className="flex gap-24 w-max items-center">
                            {[...brands, ...brands, ...brands].map((brand, i) => (
                                <span key={i} className="text-[10vw] font-bold text-[#111] uppercase whitespace-nowrap leading-none select-none hover:text-[#FACC15] transition-colors duration-300 stroke-text">
                                    {brand}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </TextScrollingEffect>

            <style jsx global>{`
                .stroke-text {
                    -webkit-text-stroke: 2px #222;
                    color: transparent;
                }
                .stroke-text:hover {
                    -webkit-text-stroke: 2px #FACC15;
                    color: #FACC15;
                }
            `}</style>
        </section>
    );
}
