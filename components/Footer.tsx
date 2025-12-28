import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-neutral-900 border-t border-white/10 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h2 className="text-3xl font-bold tracking-tighter mb-6">
                            WECRA<span className="text-accent">.</span>
                        </h2>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                            Premium digital agency elevating brands through design, strategy, and precision. We craft perfection for the ambitious.
                        </p>
                        <div className="text-sm text-neutral-500">
                            Sarasota, FL (Remote-First)
                        </div>
                    </div>

                    {/* SITEMAP */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">Sitemap</h3>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
                            <li><Link href="/approach" className="hover:text-accent transition-colors">Approach</Link></li>
                            <li><Link href="/works" className="hover:text-accent transition-colors">Works</Link></li>
                            <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">Services</h3>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/services/branding" className="hover:text-accent transition-colors">Branding</Link></li>
                            <li><Link href="/services/web-design" className="hover:text-accent transition-colors">Web Design</Link></li>
                            <li><Link href="/services/seo" className="hover:text-accent transition-colors">SEO & Strategy</Link></li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="font-semibold text-white mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li>
                                <a href="mailto:hello@wecra.net" className="hover:text-accent transition-colors">
                                    hello@wecra.net
                                </a>
                            </li>
                            <li>
                                <a href="tel:+905400100040" className="hover:text-accent transition-colors">
                                    +90 540 010 00 40
                                </a>
                            </li>
                            <li className="pt-4">
                                <Link
                                    href="/contact"
                                    className="inline-block px-6 py-2 border border-white/20 rounded-full hover:border-accent hover:text-accent transition-colors"
                                >
                                    Discuss Project
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} Wecra Digital Agency. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
