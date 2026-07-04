export default function AboutUs() {
    return (
        <section
            id="about"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:gap-16"
        >
            {/* ===== Cluster Foto ===== */}
            <div className="relative shrink-0 pb-16 pr-12">
                {/* Foto besar */}
                <div className="flex h-[438px] w-[326px] max-w-full items-center justify-center overflow-hidden rounded-lg bg-accent/10 p-5">
                    <img
                        src="https://placehold.co/286x398"
                        alt="Tentang Kiyutz"
                        className="h-full w-full rounded object-cover"
                    />
                </div>

                {/* Foto kecil (overlap kanan-bawah) */}
                <div className="absolute bottom-0 right-0 rounded-lg bg-accent/10 p-[19px] shadow-sm">
                    <img
                        src="https://placehold.co/169x228"
                        alt="Tentang Kiyutz"
                        className="h-[228px] w-[169px] rounded object-cover"
                    />
                </div>
            </div>

            {/* ===== Teks ===== */}
            <div className="flex w-full max-w-[715px] flex-col items-start gap-6">
                <h2 className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#0B1F33]">
                    Tentang Kami
                </h2>

                <div className="space-y-4 font-['Questrial'] text-sm leading-[28px] text-[#2A2E53]">
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
                </div>

                <blockquote className="font-['Questrial'] leading-6 text-accent">
                    “Kami percaya bahwa camilan terbaik bukan hanya tentang rasa, tetapi juga tentang momen
                    dan kebahagiaan yang tercipta dalam setiap gigitan.”
                </blockquote>
                <p className="font-['Questrial'] text-sm text-accent">— Founder of Kiyutz</p>
            </div>
        </section>
    );
}