import { motion } from 'framer-motion';
import { BadgeCheck, ShieldCheck, Leaf } from 'lucide-react';

const certs = [
    { icon: BadgeCheck, title: 'Bersertifikat Halal', desc: 'Terjamin kehalalannya, aman & nyaman dikonsumsi semua kalangan.' },
    { icon: ShieldCheck, title: 'Terdaftar BPOM', desc: 'Memenuhi standar keamanan pangan yang berlaku.' },
    { icon: Leaf, title: 'Bahan Berkualitas', desc: 'Diproduksi dengan bahan pilihan terbaik.' },
];

const viewport = { once: true, amount: 0.2 };
const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Certifications() {
    return (
        <section
            id="sertifikasi"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-12 px-6 py-16"
        >
            {/* Heading */}
            <motion.div
                className="flex max-w-[720px] flex-col items-center gap-3 text-center"
                initial={item.hidden}
                whileInView={item.visible}
                viewport={viewport}
            >
                <h2 className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#0B1F33]">
                    Produk Kami Bersertifikat Halal
                </h2>
                <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">
                    Setiap produk Kiyutz telah melewati proses yang terjamin, sehingga Anda bisa menikmatinya
                    dengan tenang dan penuh percaya.
                </p>
            </motion.div>

            {/* Badge Sertifikasi */}
            <motion.div
                className="grid w-full grid-cols-1 gap-8 sm:grid-cols-3"
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                {certs.map(({ icon: Icon, title, desc }) => (
                    <motion.div
                        key={title}
                        variants={item}
                        className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center shadow-[0px_0px_4px_rgba(0,0,0,0.15)]"
                    >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                            <Icon size={32} className="text-accent" />
                        </div>
                        <h3 className="font-sans text-lg font-semibold text-[#2A2E53]">{title}</h3>
                        <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">{desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}