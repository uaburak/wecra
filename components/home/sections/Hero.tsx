"use client";
import Link from "next/link";
import Mobile from "@/components/global/device/Mobile";

export default function Hero() {
    return (
        <section className="w-full flex justify-center py-6">
            <div className="w-full bg-[#FACC15] rounded-[24px] grid grid-cols-1 md:grid-cols-2 overflow-hidden ">

                {/* Left Column: Text Content */}
                <div className="flex flex-col justify-center items-start p-10 md:p-14 gap-6">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight tracking-tight">
                        wecra digital.
                    </h1>

                    <p className="text-base md:text-lg font-medium text-black max-w-sm">
                        Strategy, design, and development for the bold. We craft digital experiences that matter.
                    </p>

                    <Link
                        href="/contact"
                        className="inline-block bg-black text-[#FACC15] px-8 py-3 rounded-full text-sm font-bold hover:opacity-80 transition-opacity"
                    >
                        Start a Project
                    </Link>
                </div>

                {/* Right Column: Hero Visual */}
                <div className="relative w-full h-full max-h-[350px] min-h-[200px] md:min-h-auto flex items-center justify-center overflow-hidden">
                    {/* Mobile Component Container */}
                    <div className="w-[60%] md:w-full max-w-[250px] relative z-10 translate-y-[30%]">
                        <Mobile src="/mobile-ref.jpg" />
                    </div>
                </div>

            </div>
        </section>
    );
}
