export default function Hero() {
    return (
        <section id="home" className="relative  flex flex-col items-center gap-6 px-6 pt-10 text-center sm:gap-8 sm:pt-16">
            {/* Judul + Subjudul */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
                <h1 className="max-w-[1200px] leading-tight">
                    <span className="font-['Cormorant'] text-5xl font-bold italic text-accent sm:text-7xl lg:text-[90px]">
                        Kiyutz
                    </span>
                    <span className="font-sans text-3xl font-semibold text-accent sm:text-5xl lg:text-[64px]">, </span>
                    <span className="font-sans text-3xl font-semibold text-[#2A2E53] sm:text-5xl lg:text-[64px]">
                        Menghadirkan Cita Rasa Istimewa di Setiap Momen
                    </span>
                </h1>
                <p className="max-w-[610px] font-['Questrial'] text-sm leading-6 text-secondary sm:text-secondary">
                    Menghadirkan pengalaman menikmati makanan ringan dengan cita rasa istimewa,
                    kualitas terbaik, dan kenikmatan yang selalu berkesan.
                </p>
            </div>

            {/* Tombol */}
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
                <a
                    href="#product"
                    className="w-full rounded bg-accent px-5 py-2.5 font-['Questrial'] text-base shadow-lg transition hover:opacity-90 sm:w-auto"
                >
                    Lihat Produk
                </a>
                <a
                    href="#about"
                    className="w-full  rounded bg-base px-5 py-2.5 font-['Questrial'] text-accent shadow-lg transition hover:opacity-90 sm:w-auto"
                >
                    Tentang Kami
                </a>
            </div>
        </section>
    );
}