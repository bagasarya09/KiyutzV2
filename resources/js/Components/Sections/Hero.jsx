import { FadeGroup, FadeItem } from '@/Components/UI/Fade';

export default function Hero() {
    return (
        <section id="home" className="relative flex min-h-[650px] flex-col items-center justify-center gap-6 px-6 text-center">
            <FadeGroup className="flex flex-col items-center gap-6">
                <FadeItem>
                    <h1 className="max-w-[1200px] leading-tight">
                        <span className="font-['Cormorant'] text-5xl font-bold italic text-accent sm:text-7xl lg:text-[90px]">Kiyutz</span>
                        <span className="font-sans text-3xl font-semibold text-accent sm:text-5xl lg:text-[64px]">, </span>
                        <span className="font-sans text-3xl font-semibold text-[#2A2E53] sm:text-5xl lg:text-[64px]">Menghadirkan Cita Rasa Istimewa di Setiap Momen</span>
                    </h1>
                </FadeItem>

                <FadeItem>
                    <p className="max-w-[610px] font-['Questrial'] text-sm leading-6 text-secondary">
                        Menghadirkan pengalaman menikmati makanan ringan dengan cita rasa istimewa, kualitas terbaik, dan kenikmatan yang selalu berkesan.
                    </p>
                </FadeItem>

                <FadeItem>
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
                        <a href="#product" className="rounded bg-accent px-5 py-2.5 font-['Questrial'] text-base text-white shadow-lg transition hover:opacity-90">Lihat Produk</a>
                        <a href="#about" className="rounded bg-base px-5 py-2.5 font-['Questrial'] text-accent shadow-lg transition hover:opacity-90">Tentang Kami</a>
                    </div>
                </FadeItem>
            </FadeGroup>
        </section>
    );
}