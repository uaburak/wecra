import Link from 'next/link';

export default function CallToAction() {
    return (
        <section className="py-32 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    Ready to elevate<br />
                    <span className="text-neutral-600">your brand?</span>
                </h2>
                <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
                    We are selective with our partners. If you are ready for a transformation, let's talk.
                </p>
                <Link
                    href="/contact"
                    className="inline-block px-10 py-4 bg-white text-black font-bold rounded-full text-base hover:bg-accent transition-colors duration-300 shadow-xl shadow-white/5"
                >
                    Start Your Project
                </Link>
            </div>
        </section>
    );
}
