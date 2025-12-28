import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-[#FACC15] text-black py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

                    {/* Brand & Logo */}
                    <div className="space-y-6 max-w-sm">
                        <Link href="/" className="block relative w-32 h-8">
                            <Image
                                src="/logo.svg"
                                alt="Wecra Logo"
                                fill
                                className="object-contain object-left invert"
                                priority
                            />
                        </Link>
                        <p className="text-lg md:text-xl font-medium leading-relaxed tracking-tight">
                            Elevating brands through precision, strategy, and aesthetics.
                        </p>
                    </div>

                    {/* Minimal Navigation */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 text-sm font-semibold tracking-wide uppercase">
                        {/* Menu */}
                        <div className="flex flex-col space-y-4">
                            <span className="opacity-50 text-xs mb-1">Menu</span>
                            <Link href="/services" className="hover:opacity-60 transition-opacity">Services</Link>
                            <Link href="/works" className="hover:opacity-60 transition-opacity">Works</Link>
                            <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
                        </div>

                        {/* Social / Contact */}
                        <div className="flex flex-col space-y-4">
                            <span className="opacity-50 text-xs mb-1">Contact</span>
                            <a href="mailto:hello@wecra.net" className="hover:opacity-60 transition-opacity">Email</a>
                            <Link href="/contact" className="hover:opacity-60 transition-opacity">Start Project</Link>
                        </div>

                        {/* Social */}
                        <div className="flex flex-col space-y-4">
                            <span className="opacity-50 text-xs mb-1">Social</span>
                            <a href="#" className="hover:opacity-60 transition-opacity">Instagram</a>
                            <a href="#" className="hover:opacity-60 transition-opacity">LinkedIn</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-xs font-medium opacity-60">
                    <p>&copy; {new Date().getFullYear()} Wecra Digital Agency.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:opacity-100 transition-opacity">Privacy</Link>
                        <Link href="/terms" className="hover:opacity-100 transition-opacity">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
