import Link from 'next/link';

const services = [
    {
        title: "Branding",
        description: "We build identities that command attention. From logos to comprehensive brand guidelines, we define who you are.",
        link: "/services/branding"
    },
    {
        title: "Web Design",
        description: "Digital experiences that convert. We craft high-performance, visually stunning websites tailored to your brand.",
        link: "/services/web-design"
    },
    {
        title: "SEO & Strategy",
        description: "Visibility with precision. We optimized your digital presence to reach the right audience, globally.",
        link: "/services/seo"
    }
];

export default function ServicesPreview() {
    return (
        <section className="py-24 bg-neutral-900/50">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Our Expertise</h2>
                        <p className="text-neutral-400 text-base md:text-lg">
                            We don't do everything. We do a few things exceptionally well.
                        </p>
                    </div>
                    <Link href="/services" className="hidden md:inline-block text-accent hover:text-white transition-colors mt-6 md:mt-0 font-medium text-sm">
                        View All Services →
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group p-8 border border-white/10 rounded-2xl hover:border-accent/50 hover:bg-white/5 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{service.title}</h3>
                            <p className="text-neutral-400 mb-8 leading-relaxed">
                                {service.description}
                            </p>
                            <Link href={service.link} className="text-sm font-semibold text-white/50 group-hover:text-white transition-colors">
                                Learn More
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <Link href="/services" className="text-accent hover:text-white transition-colors font-medium">
                        View All Services →
                    </Link>
                </div>
            </div>
        </section>
    );
}
