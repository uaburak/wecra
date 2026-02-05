"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const MotionImage = motion(Image);

interface MobileProps {
    src: string;
}

export default function Mobile({ src }: MobileProps) {
    return (
        <motion.div
            className="relative mx-auto w-full max-w-[400px] cursor-pointer"
            initial="initial"
            whileHover="hover"
            animate="initial"
            variants={{
                initial: { y: 0 },
                hover: { y: -32 }
            }}
            transition={{
                type: "spring",
                stiffness: 80,
                damping: 20
            }}
        >
            {/* Device Frame (SVG) - z-index 20 ensures it stays on top */}
            <div className="relative z-20 pointer-events-none">
                <Image
                    src="/mobile.svg"
                    alt="Mobile Frame"
                    width={440}
                    height={906}
                    className="w-full h-auto"
                    priority
                />
            </div>

            {/* Screen Content - Absolute positioned behind the frame */}
            <div className="absolute inset-0 z-10 m-[4px] rounded-[2.5rem] overflow-hidden bg-black">
                <MotionImage
                    src={src}
                    alt="Mobile Preview"
                    fill
                    className="object-cover"
                    variants={{
                        initial: { objectPosition: "center 0%" },
                        hover: { objectPosition: "center 100%" }
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 80,
                        damping: 20,
                        mass: 1
                    }}
                />
            </div>
        </motion.div>
    );
}
