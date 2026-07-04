import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoKiyutz from '../../assets/LogoKiyutz.png';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Product', href: '#product' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 w-full bg-base/90 px-16 py-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <img src={LogoKiyutz} alt="Kiyutz" className="h-[60px] w-16 object-contain" />

                {/* Menu Desktop */}
                <nav className="hidden items-center gap-10 md:flex">
                    {navLinks.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="font-['Questrial'] text-base font-normal leading-6 text-primary transition hover:text-accent"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Hamburger (mobile) */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-[#2A2E53] transition hover:bg-[#B268A7]/10 md:hidden"
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Menu Mobile → ABSOLUTE, tidak menggeser konten */}
            {open && (
                <nav className="absolute left-6 right-6 top-full z-30 mt-2 flex flex-col gap-1 rounded-xl border border-base bg-white p-2 shadow-lg md:hidden">
                    {navLinks.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-4 py-3 font-['Questrial'] text-base text-primary transition hover:bg-primary/10 hover:text-accent"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}