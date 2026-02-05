"use client";
import Image from "next/image";

interface DesktopProps {
    src: string;
}

export default function Desktop({ src }: DesktopProps) {
    return (
        <div className="relative mx-auto w-full h-full flex flex-col justify-end">
            {/* Screen Frame */}
            <div className="relative rounded-t-xl bg-gray-900 border-[8px] border-b-0 border-gray-900 shadow-xl h-full min-h-[250px] flex flex-col">
                {/* Camera Dot */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-800 rounded-full z-20"></div>

                {/* Screen Content */}
                <div className="relative w-full h-full rounded-t-sm overflow-hidden bg-white flex-grow">
                    <Image
                        src={src}
                        alt="Desktop Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Bottom Bezel with Logo Hint */}
            <div className="h-6 bg-gray-900 w-full flex items-center justify-center border-t border-gray-800">
                <span className="text-[8px] text-gray-600 font-bold tracking-widest">WECRA</span>
            </div>

            {/* Base / Hinge */}
            <div className="relative mx-auto bg-gray-800 rounded-b-lg h-[12px] w-[110%] -ml-[5%] shadow-lg"></div>

            {/* Notch opening (Thumb lift) */}
            <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-700/50 rounded-t-sm"></div>
        </div>
    );
}
