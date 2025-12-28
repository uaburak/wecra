import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-background z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                    WECRAFT<br />
                    <span className="text-neutral-600">YOUR BRAND</span>
                </h1>

                <p className="max-w-xl mx-auto text-base md:text-lg text-neutral-400 mb-10 font-normal leading-relaxed">
                    Premium digital agency that elevates brands through design, strategy and precision. We verify perfection.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link
                        href="/works"
                        className="px-8 py-3 bg-accent text-black font-semibold rounded-full text-sm hover:bg-white transition-colors duration-300 min-w-[160px]"
                    >
                        View Works
                    </Link>
                    <Link
                        href="/approach"
                        className="px-8 py-3 border border-white/10 rounded-full text-sm hover:border-accent hover:text-accent transition-colors duration-300 min-w-[160px]"
                    >
                        Our Approach
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </section>
    );
}
