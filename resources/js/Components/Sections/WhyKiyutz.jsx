import { motion } from 'framer-motion';
import { Award, Heart, Users, Wallet } from 'lucide-react';

const features = [
    { icon: Award, title: 'Lezat dan Berkualitas', desc: 'Rasa yang terbaik, kualitas terjaga.' },
    { icon: Heart, title: 'Dibuat dengan Sepenuh Hati', desc: 'Diproses dengan dedikasi dalam setiap gigitan.' },
    { icon: Users, title: 'Cocok untuk Semua Momen', desc: 'Teman sempurna di setiap suasana.' },
    { icon: Wallet, title: 'Harga Ramah di Kantong', desc: 'Nikmati kualitas premium dengan harga bersahabat.' },
];

// === Variabel animasi (dipisah agar tanpa kurung kurawal ganda di JSX) ===
const headingHidden = { opacity: 0, y: 20 };
const headingShow = { opacity: 1, y: 0 };
const headingTransition = { duration: 0.6, ease: 'easeOut' };
const viewport = { once: true, amount: 0.2 };

const gridContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const cardItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const cardHover = { y: -6, boxShadow: '0px 12px 24px rgba(0,0,0,0.10)' };

export default function WhyKiyutz() {
    return (
        <section
            id="keunggulan"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-14 px-6 py-16"
        >
            {/* Heading */}
            <motion.div
                className="flex max-w-[896px] flex-col items-center gap-3 text-center"
                initial={headingHidden}
                whileInView={headingShow}
                viewport={viewport}
                transition={headingTransition}
            >
                <h2 className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#0B1F33]">
                    Kenapa Harus Kiyutz?
                </h2>
                <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">
                    Bagi kami, camilan bukan hanya soal rasa, tetapi juga tentang menciptakan momen
                    yang menyenangkan bersama orang-orang terdekat.
                </p>
            </motion.div>

            {/* Kartu Fitur (stagger) */}
            <motion.div
                className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                variants={gridContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                {features.map(({ icon: Icon, title, desc }) => (
                    <motion.div
                        key={title}
                        variants={cardItem}
                        whileHover={cardHover}
                        className="flex flex-col items-start gap-3 rounded-lg bg-white p-5 shadow-[0px_0px_2px_rgba(0,0,0,0.25)]"
                    >
                        {/* Ikon */}
                        <div className="flex h-[49px] w-[49px] items-center justify-center rounded bg-accent/10">
                            <Icon size={26} className="text-accent" />
                        </div>
                        {/* Judul */}
                        <h3 className="font-sans text-xl font-semibold text-black">{title}</h3>
                        {/* Deskripsi */}
                        <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">{desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}