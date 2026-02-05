"use client";
import TextScrollingEffect from "@/components/global/TextScrollingEffect";

export default function About() {
    return (
        <section className="w-full px-4 md:px-12 py-32 relative z-10 bg-[#080808]">
            <div className="w-full max-w-[1400px] mx-auto">
                <TextScrollingEffect>
                    <div className="flex flex-col gap-32 md:gap-48">

                        {/* Block 01 - Asymmetric Right */}
                        <div className="flex flex-col md:flex-row justify-end items-start gap-8 md:gap-16">
                            <span className="text-[120px] md:text-[200px] font-bold leading-[0.8] text-white/5 font-mono select-none">01</span>
                            <div className="max-w-xl pt-8 relative">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                    We don't follow trends. <br />
                                    <span className="text-[#FACC15]">We set the pace.</span>
                                </h2>
                                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                                    In a world of noise, we choose clarity. We strip away the unnecessary to reveal the essential.
                                    Our approach is not about decoration; it's about <span className="text-white font-normal">fundamental impact</span>.
                                </p>
                            </div>
                        </div>

                        {/* Block 02 - Asymmetric Left */}
                        <div className="flex flex-col md:flex-row justify-start items-start gap-8 md:gap-16">
                            <span className="text-[120px] md:text-[200px] font-bold leading-[0.8] text-white/5 font-mono select-none order-1 md:order-2">02</span>
                            <div className="max-w-xl pt-8 md:text-right order-2 md:order-1">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                    Strategic Chaos. <br />
                                    <span className="text-neutral-500">Calculated Precision.</span>
                                </h2>
                                <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed">
                                    We embrace the unpredictable nature of creativity but tether it with rigorous strategy.
                                    Every pixel serves a purpose. Every animation tells a story.
                                </p>
                            </div>
                        </div>

                    </div>
                </TextScrollingEffect>
            </div>
        </section>
    );
}
