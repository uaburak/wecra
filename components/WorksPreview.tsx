import Link from 'next/link';

export default function WorksPreview() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold">Selected Works</h2>
                    <Link href="/works" className="text-accent hover:text-white transition-colors mt-6 md:mt-0 font-medium hidden md:inline-block">
                        View All Projects →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Project 1 */}
                    <div className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-neutral-800 rounded-2xl overflow-hidden relative mb-6">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-bold text-2xl">
                                Project Image I
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">FinTech Rebrand</h3>
                        <p className="text-neutral-400">Branding, UI/UX Design</p>
                    </div>

                    {/* Project 2 */}
                    <div className="group cursor-pointer md:mt-24">
                        <div className="aspect-[4/3] bg-neutral-800 rounded-2xl overflow-hidden relative mb-6">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500" />
                            {/* Placeholder for image */}
                            <div className="absolute inset-0 flex items-center justify-center text-neutral-600 font-bold text-2xl">
                                Project Image II
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">Luxury Real Estate</h3>
                        <p className="text-neutral-400">Web Design, Development</p>
                    </div>
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link href="/works" className="text-accent hover:text-white transition-colors font-medium">
                        View All Projects →
                    </Link>
                </div>
            </div>
        </section>
    );
}
