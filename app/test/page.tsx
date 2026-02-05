"use client";
import Mobile from "@/components/global/device/Mobile";
import Desktop from "@/components/global/device/Desktop";

export default function TestPage() {
    return (
        <main className="min-h-[3000px] pt-24 px-4 pb-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Device Component Test</h1>

            <div className="w-full grid grid-cols-2 gap-8 h-[400px]">
                {/* Left: Mobile */}
                <div className="w-full h-full">
                    <Mobile src="/mobile-ref.jpg" />
                </div>

                {/* Right: Desktop */}
                <div className="w-full h-full">
                    <Desktop src="https://placehold.co/800x600/black/white.png" />
                </div>
            </div>
        </main>
    );
}
