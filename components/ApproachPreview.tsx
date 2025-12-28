import Link from 'next/link';

export default function ApproachPreview() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                            We are not for <span className="text-neutral-600">everyone.</span>
                        </h2>
                        <div className="space-y-6 text-base md:text-lg text-neutral-400 font-normal">
                            <p>
                                Wecra is not a typical social media agency or a freelancer collective.
                                We are a strategic partner for brands that demand excellence.
                            </p>
                            <p>
                                We work with ambitious startups, growing enterprises, and visionaries
                                who value precision over volume.
                            </p>
                        </div>
                        <div className="mt-10">
                            <Link
                                href="/approach"
                                className="text-white border-b border-accent pb-1 hover:text-accent transition-colors text-sm"
                            >
                                Read Our Approach
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square bg-white/5 rounded-2xl p-10 flex flex-col justify-center border border-white/10">
                            <div className="text-4xl md:text-6xl font-bold text-white/10 mb-3">
                                01.
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Discovery</h3>
                            <p className="text-neutral-500 mb-6 text-sm">Deep dive into your brand's core values.</p>

                            <div className="text-4xl md:text-6xl font-bold text-white/10 mb-3">
                                02.
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Strategy</h3>
                            <p className="text-neutral-500 mb-6 text-sm">Crafting the roadmap to success.</p>

                            <div className="text-4xl md:text-6xl font-bold text-white/10 mb-3">
                                03.
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">Execution</h3>
                            <p className="text-neutral-500 text-sm">Pixel-perfect implementation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
