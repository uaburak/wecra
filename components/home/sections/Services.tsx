"use client";
import TextScrollingEffect from "@/components/global/TextScrollingEffect";

export default function Services() {
    const services = [
        {
            id: "01",
            name: "Branding",
            description: "We build identities that command attention. From logos to comprehensive design systems.",
            tags: ["Strategy", "Visual Identity", "Guidelines"]
        },
        {
            id: "02",
            name: "Experience",
            description: "User-centric design that feels as good as it looks. UI/UX that drives conversion.",
            tags: ["Web Design", "Mobile Apps", "Prototyping"]
        },
        {
            id: "03",
            name: "Engineering",
            description: "Robust, scalable code. We bring designs to life with pixel-perfect precision.",
            tags: ["Development", "Creative Coding", "WebGL"]
        },
        {
            id: "04",
            name: "Content",
            description: "Storytelling that resonates. Motion graphics and 3D art that elevate the narrative.",
            tags: ["Motion", "3D", "Art Direction"]
        }
    ];

    return (
        <section className="w-full px-4 md:px-12 py-32 bg-[#050505] relative z-10">
            <div className="w-full max-w-[1400px] mx-auto">
                <TextScrollingEffect>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

                        {/* Sticky Title Area */}
                        <div className="h-fit lg:sticky lg:top-32">
                            <h2 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-8">
                                Our <br />
                                <span className="text-[#FACC15]">Expertise.</span>
                            </h2>
                            <p className="text-neutral-400 text-lg max-w-sm leading-relaxed">
                                We cover the entire digital spectrum. From abstract concepts to shipped products.
                            </p>
                        </div>

                        {/* Services List / Stack */}
                        <div className="flex flex-col gap-8">
                            {services.map((service, i) => (
                                <div
                                    key={i}
                                    className="group sticky top-32 bg-[#111] border border-white/5 p-8 md:p-12 rounded-[24px] hover:border-[#FACC15]/30 transition-colors duration-500"
                                    style={{ top: `${150 + (i * 20)}px` }} // Staggered sticky effect
                                >
                                    <div className="flex justify-between items-start mb-8">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white">{service.name}</h3>
                                        <span className="text-xl font-mono text-neutral-600">/{service.id}</span>
                                    </div>
                                    <p className="text-neutral-400 text-lg mb-8 max-w-md group-hover:text-neutral-200 transition-colors">
                                        {service.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {service.tags.map((tag, t) => (
                                            <span key={t} className="px-3 py-1 border border-white/10 rounded-full text-xs text-neutral-500 uppercase tracking-wider group-hover:border-[#FACC15]/50 group-hover:text-[#FACC15] transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </TextScrollingEffect>
            </div>
        </section>
    );
}
