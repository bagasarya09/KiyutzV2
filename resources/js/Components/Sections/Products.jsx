import { Link } from '@inertiajs/react';

const products = [
    {
        name: 'Biji Ketapang',
        desc: 'Ini biji ketapang enak banget lho ayo di beli anjay hehe ryan kesepian nichhh...',
        price: 'Rp 5.000,00',
        image: 'https://placehold.co/125x166',
    },
    {
        name: 'Keripik Bawang',
        desc: 'Ini biji ketapang enak banget lho ayo di beli anjay hehe ryan kesepian nichhh...',
        price: 'Rp 5.000,00',
        image: 'https://placehold.co/125x166',
    },
    {
        name: 'Keripik Malay',
        desc: 'Ini biji ketapang enak banget lho ayo di beli anjay hehe ryan kesepian nichhh...',
        price: 'Rp 5.000,00',
        image: 'https://placehold.co/125x166',
    },
];

function ProductCard({ name, desc, price, image }) {
    return (
        <div className="flex items-center gap-6 rounded-lg bg-white p-6 shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
            {/* Gambar */}
            <div className="h-[142px] w-[125px] shrink-0 overflow-hidden rounded">
                <img src={image} alt={name} className="h-full w-full object-cover" />
            </div>
            {/* Teks */}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <h3 className="font-sans text-2xl font-semibold leading-[33.6px] text-[#2A2E53]">
                        {name}
                    </h3>
                    <p className="font-['Questrial'] text-xs leading-[18px] text-secondary">{desc}</p>
                </div>
                <p className="font-sans text-2xl font-semibold leading-[33.6px] text-accent">{price}</p>
            </div>
        </div>
    );
}

export default function Products() {
    return (
        <section
            id="product"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-14 px-6 py-16"
        >
            {/* Heading */}
            <div className="flex max-w-[896px] flex-col items-center gap-3 text-center">
                <h2 className="font-sans text-[32px] font-semibold leading-[41.6px] text-[#2A2E53]">
                    Temukan Produk Favorit
                </h2>
                <p className="font-['Questrial'] text-sm leading-[21px] text-secondary">
                    Dari rasa gurih hingga manis, semua pilihan tersedia untuk menemani setiap suasana.
                </p>
            </div>

            {/* Kartu Produk */}
            <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                    <ProductCard key={p.name} {...p} />
                ))}
            </div>

            {/* Tombol */}
            <Link
                href="/produk"
                className="w-[350px] max-w-full rounded bg-accent px-5 py-2.5 text-center font-['Questrial'] text-base text-white shadow-[0px_1px_4px_rgba(0,0,0,0.05)] transition hover:opacity-90"
            >
                Lihat Seluruh Produk
            </Link>
        </section>
    );
}