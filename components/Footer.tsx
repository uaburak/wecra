import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full flex justify-center px-4 py-10">
            <footer className="bg-[#FACC15] border border-black/5 w-full max-w-[800px] shadow-2xl shadow-black/20 overflow-hidden relative rounded-[24px]">
                <div className="p-6 flex flex-col items-center justify-center gap-6">

                    {/* Top Row: Brand & Tagline */}
                    {/* Top Row: Brand & Socials */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                        {/* Brand */}
                        <div className="flex flex-col items-center text-center md:items-start md:text-left space-y-3">
                            <Link href="/" className="relative w-28 h-6 block">
                                <Image
                                    src="/logo-black.svg"
                                    alt="Wecra Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </Link>
                            <p className="text-black/80 text-[13px] font-medium max-w-sm">
                                Elevating brands through precision & strategy.
                            </p>
                        </div>

                        {/* Social Icons & Text */}
                        <div className="flex flex-col items-center md:items-end gap-3">
                            <div className="flex items-center gap-3">
                                <a href="#" className="w-10 h-10 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-black text-[#FACC15] hover:bg-white hover:text-black transition-colors">
                                    {/* X (Twitter) */}
                                    <svg className="w-5 h-5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-black text-[#FACC15] hover:bg-white hover:text-black transition-colors">
                                    {/* LinkedIn */}
                                    <svg className="w-5 h-5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-1.998 2.002 2 2 0 0 1 1.998-1.998z" />
                                    </svg>
                                </a>
                                <a href="#" className="w-10 h-10 md:w-6 md:h-6 flex items-center justify-center rounded-full bg-black text-[#FACC15] hover:bg-white hover:text-black transition-colors">
                                    {/* Instagram */}
                                    <svg className="w-5 h-5 md:w-3 md:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </a>
                            </div>
                            <span className="text-black/80 text-[13px] font-medium max-w-sm">Follow our journey</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-black/10" />

                    {/* Bottom Row: Links & Copyright */}
                    <div className="w-full flex flex-col md:flex-row justify-between items-center text-[12px] font-semibold text-black/60 gap-4">
                        <div className="flex space-x-6">
                            <Link href="/services" className="hover:text-black transition-colors">Services</Link>
                            <Link href="/works" className="hover:text-black transition-colors">Works</Link>
                            <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                        </div>

                        <div className="flex space-x-4">
                            <a href="mailto:hello@wecra.net" className="hover:text-black transition-colors">hello@wecra.net</a>
                            <span>© 2026</span>
                        </div>
                    </div>

                </div>
            </footer>
        </div>
    );
}
