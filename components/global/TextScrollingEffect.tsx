"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SplitText Polyfill for basic Line splitting.
 * Replicates the basic API of GSAP SplitText for "lines".
 */
class SplitText {
    lines: HTMLElement[] = [];

    static create(element: HTMLElement, options: { type?: string, linesClass?: string, autoSplit?: boolean, onSplit?: (instance: any) => void }) {
        const instance = new SplitText(element, options);
        if (options.onSplit) {
            options.onSplit(instance);
        }
        return instance;
    }

    constructor(element: HTMLElement, options: { linesClass?: string }) {
        if (!element) return;
        this.splitLines(element, options.linesClass || "line-reveal");
    }

    splitLines(element: HTMLElement, linesClass: string) {
        const text = element.innerText;
        const words = text.split(" ");

        // 1. Wrap words in temporary spans to measure positions
        element.innerHTML = words.map(word => `<span style="display:inline-block;">${word}</span>`).join(" ");

        const children = Array.from(element.children) as HTMLElement[];
        const linesMap: Map<number, HTMLElement[]> = new Map();

        // 2. Group by Offset Top (Lines)
        children.forEach(span => {
            const top = span.offsetTop;
            if (!linesMap.has(top)) {
                linesMap.set(top, []);
            }
            linesMap.get(top)?.push(span);
        });

        // 3. Clear and rebuild with Line Wrappers
        element.innerHTML = "";
        this.lines = [];

        linesMap.forEach((spans) => {
            const lineDiv = document.createElement("div");
            lineDiv.className = linesClass;
            lineDiv.style.overflow = "hidden";
            lineDiv.style.display = "block";

            // Reconstruct the line text with spaces
            lineDiv.innerText = spans.map(s => s.innerText).join(" ");

            element.appendChild(lineDiv);
            this.lines.push(lineDiv);
        });
    }
}

/**
 * TextScrollingEffect - Scroll-based reveal animation
 * Works for both Text (lines split) and Blocks (fade up).
 */
export default function TextScrollingEffect({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        // 1. Text Animation (Priority: High)
        // Restores the original "Split Line" effect for all typography
        const textElements = containerRef.current.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6, p, li, blockquote, span");
        textElements.forEach((text) => {
            // Skip if inside a visual container that is already animating? 
            // Actually, layering animations (Container Fade + Text Slide) usually looks premium.
            // We just ensure the text doesn't wait too long.

            SplitText.create(text, {
                type: "lines",
                linesClass: "line-reveal",
                autoSplit: true,
                onSplit: (instance) => {
                    gsap.from(instance.lines, {
                        yPercent: 120,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: text,
                            start: "top 95%", // Trigger early so it's visible
                            end: "top 60%",
                            scrub: 1
                        }
                    });
                }
            });
        });

        // 2. Block Animations (Images & Visual Containers)
        // We look for Images OR Divs that have visual styling (bg, border, shadow)
        const visualBlocks = containerRef.current.querySelectorAll<HTMLElement>("img, div");

        visualBlocks.forEach((block) => {
            const isImg = block.tagName.toLowerCase() === "img";

            // Simple heuristic to detect "Visual Cards" vs "Layout Wrappers"
            // If it has a background, border, or shadow, it's likely a card.
            const hasVisual = block.className.includes("bg-") ||
                block.className.includes("border-") ||
                block.className.includes("shadow-") ||
                block.className.includes("rounded-");

            if (isImg || (block.tagName.toLowerCase() === "div" && hasVisual)) {
                gsap.from(block, {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    }
                });
            }
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
