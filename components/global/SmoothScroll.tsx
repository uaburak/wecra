"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isTestPage = pathname?.startsWith('/burak-test');

    useEffect(() => {
        // Disable Smooth Scroll on Admin Panel and Test Page
        if (isAdmin || isTestPage) return;

        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // 2. Sync Lenis scroll with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // 3. Add Lenis to GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // lenis requires time in ms
        });

        // 4. Disable GSAP internal lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
        };
    }, [isAdmin, isTestPage]); // Re-run if path changes (e.g. entering/exiting admin)

    return <>{children}</>;
}
