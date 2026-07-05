import { motion } from 'framer-motion';

const viewport = { once: true, amount: 0.2 };

// Foto besar: fade + geser dari kiri
const photoHidden = { opacity: 0, x: -40 };
const photoShow = { opacity: 1, x: 0 };
const photoTransition = { duration: 0.7, ease: 'easeOut' };

// Foto kecil: pop (scale)
const smallHidden = { opacity: 0, scale: 0.8 };
const smallShow = { opacity: 1, scale: 1 };
const smallTransition = { duration: 0.5, delay: 0.3, ease: 'easeOut' };

// Teks: stagger
const textContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const textItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AboutUs() {
    return (
        <section
            id="about"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:gap-16"
        >
            {/* ===== Cluster Foto ===== */}
            <motion.div
                className="relative shrink-0 pb-16 pr-12"
                initial={photoHidden}
                whileInView={photoShow}
                viewport={viewport}
                transition={photoTransition}
            >
                {/* Foto besar */}
                <div className="flex h-[438px] w-[326px] max-w-full items-center justify-center overflow-hidden rounded-lg bg-accent/10 p-5">
                    <img
                        src="https://placehold.co/286x398"
                        alt="Tentang Kiyutz"
                        className="h-full w-full rounded object-cover"
                    />
                </div>

                {/* Foto kecil (overlap kanan-bawah) */}
                <motion.div
                    className="absolute bottom-0 right-0 rounded-lg bg-accent/10 p-[19px] shadow-sm"
                    initial={smallHidden}
                    whileInView={smallShow}
                    viewport={viewport}
                    transition={smallTransition}
                >
                    <img
                        src="https://placehold.co/169x228"
                        alt="Tentang Kiyutz"
                        className="h-[228px] w-[169px] rounded object-cover"
                    />
                </motion.div>
            </motion.div>

            {/* ===== Teks (stagger) ===== */}
            <motion.div
                className="flex w-full max-w-[715px] flex-col items-start gap-6"
                variants={textContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
            >
                <motion.h2
                    variants={textItem}
                    className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#0B1F33]"
                >
                    Tentang Kami
                </motion.h2>

                <motion.div
                    variants={textItem}
                    className="space-y-4 font-['Questrial'] text-sm leading-[28px] text-[#2A2E53]"
                >
                    <p>
                        Kiyutz hadir dengan komitmen untuk menghadirkan makanan ringan berkualitas yang
                        dapat dinikmati oleh semua kalangan. Kami percaya bahwa setiap camilan bukan hanya
                        sekadar makanan ringan, tetapi juga bagian dari momen kebersamaan, kenyamanan, dan
                        kebahagiaan dalam keseharian.
                    </p>
                    <p>
                        Dengan menggunakan bahan pilihan dan menjaga kualitas di setiap proses, kami
                        berusaha menghadirkan cita rasa terbaik yang mampu memberikan pengalaman menikmati
                        camilan yang berkesan. Bagi kami, kepuasan pelanggan selalu menjadi prioritas utama
                        dalam setiap produk yang kami hadirkan.
                    </p>
                </motion.div>

                <motion.blockquote variants={textItem} className="font-['Questrial'] leading-6 text-accent">
                    “Kami percaya bahwa camilan terbaik bukan hanya tentang rasa, tetapi juga tentang momen
                    dan kebahagiaan yang tercipta dalam setiap gigitan.”
                </motion.blockquote>

                <motion.p variants={textItem} className="font-['Questrial'] text-sm text-accent">
                    — Founder of Kiyutz
                </motion.p>
            </motion.div>
        </section>
    );
}