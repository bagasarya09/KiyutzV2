import { Award, Heart, Users, Wallet } from 'lucide-react';

const features = [
    { icon: Award, title: 'Lezat dan Berkualitas', desc: 'Rasa yang terbaik, kualitas terjaga.' },
    { icon: Heart, title: 'Dibuat dengan Sepenuh Hati', desc: 'Diproses dengan dedikasi dalam setiap gigitan.' },
    { icon: Users, title: 'Cocok untuk Semua Momen', desc: 'Teman sempurna di setiap suasana.' },
    { icon: Wallet, title: 'Harga Ramah di Kantong', desc: 'Nikmati kualitas premium dengan harga bersahabat.' },
];

export default function WhyKiyutz() {
    return (
        <section
            id="keunggulan"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-14 px-6 py-16"
        >
            {/* Heading */}
            <div className="flex max-w-[896px] flex-col items-center gap-3 text-center">
                <h2 className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#0B1F33]">
                    Kenapa Harus Kiyutz?
                </h2>
                <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">
                    Bagi kami, camilan bukan hanya soal rasa, tetapi juga tentang menciptakan momen
                    yang menyenangkan bersama orang-orang terdekat.
                </p>
            </div>

            {/* Kartu Fitur */}
            <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div
                        key={title}
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
                    </div>
                ))}
            </div>
        </section>
    );
}