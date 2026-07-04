import { Mail, Phone, MapPin } from 'lucide-react';
import LogoKiyutz from '../../assets/LogoKiyutz.png';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Product', href: '#product' },
    { label: 'Contact', href: '#contact' },
];

const contacts = [
    { icon: Mail, text: 'kiyuts@gmail.com' },
    { icon: Phone, text: '+62123456' },
    { icon: MapPin, text: 'Jl xxxxxx xxxxx xxx xxx' },
];

// === Ikon sosial (SVG inline, pengganti lucide brand icons) ===
function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function FacebookIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
            <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
        </svg>
    );
}

export default function Footer() {
    return (
        <footer className="bg-primary text-white">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <img src={LogoKiyutz} alt="Kiyutz" className="h-12 w-12 rounded-lg bg-white/10 object-contain p-1" />
                        <span className="font-sans text-xl font-bold">Kiyutz</span>
                    </div>
                    <p className="font-['Questrial'] text-sm leading-6 text-white/70">
                        Menghadirkan camilan berkualitas dengan cita rasa istimewa untuk menemani setiap momen Anda.
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                        <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent">
                            <InstagramIcon />
                        </a>
                        <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent">
                            <FacebookIcon />
                        </a>
                    </div>
                </div>

                {/* Navigasi */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-base font-semibold text-accent">Navigasi</h3>
                    <ul className="flex flex-col gap-2">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a href={item.href} className="font-['Questrial'] text-sm text-white/70 transition hover:text-accent">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Kontak */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-base font-semibold text-accent">Kontak</h3>
                    <ul className="flex flex-col gap-3">
                        {contacts.map(({ icon: Icon, text }) => (
                            <li key={text} className="flex items-center gap-3">
                                <Icon size={16} className="shrink-0 text-accent" />
                                <span className="font-['Questrial'] text-sm text-white/70">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Jam Operasional */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-sans text-base font-semibold text-accent">Jam Operasional</h3>
                    <p className="font-['Questrial'] text-sm leading-6 text-white/70">
                        Senin – Sabtu<br />
                        08.00 – 20.00 WIB
                    </p>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row">
                    <p className="font-['Questrial']">© 2026 Kiyutz. All rights reserved.</p>
                    <a href="#" className="font-['Questrial'] transition hover:text-accent">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}