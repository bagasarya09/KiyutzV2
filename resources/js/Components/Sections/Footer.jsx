import { Mail, Phone, MapPin } from 'lucide-react';
import LogoKiyutz from '../../assets/LogoKiyutz.png';
import SocialIcon from '@/Components/SocialIcon';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Product', href: '#product' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer({ setting, socials = [] }) {
  const contacts = [
    { icon: Mail, text: setting?.contact_email },
    { icon: Phone, text: setting?.contact_phone },
    { icon: MapPin, text: setting?.contact_address },
  ].filter((c) => c.text);

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand + sosmed */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img src={LogoKiyutz} alt="Kiyutz" className="h-12 w-12 rounded-lg bg-white/10 object-contain p-1" />
            <span className="font-sans text-xl font-bold">Kiyutz</span>
          </div>
          <p className="font-['Questrial'] text-sm leading-6 text-white/70">
            {setting?.brand_description || 'Menghadirkan camilan berkualitas dengan cita rasa istimewa untuk menemani setiap momen Anda.'}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {socials.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-accent">
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        </div>

        {/* Navigasi (TETAP) */}
        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-base font-semibold text-accent">Navigasi</h3>
          <ul className="flex flex-col gap-2">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="font-['Questrial'] text-sm text-white/70 transition hover:text-accent">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Kontak dinamis */}
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

        {/* Jam operasional dinamis */}
        <div className="flex flex-col gap-4">
          <h3 className="font-sans text-base font-semibold text-accent">Jam Operasional</h3>
          <p className="whitespace-pre-line font-['Questrial'] text-sm leading-6 text-white/70">
            {setting?.operational_hours || 'Senin – Sabtu\n08.00 – 20.00 WIB'}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-white/60 sm:flex-row">
          <p className="font-['Questrial']">© 2026 Kiyutz. All rights reserved.</p>
          <a href="#" className="font-['Questrial'] transition hover:text-accent">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}