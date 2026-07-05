import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/Context/CartContext';


const categories = ['Makanan Ringan', 'Makanan Berat', 'Minuman'];

const products = [
    { name: 'Biji Ketapang', category: 'Makanan Ringan', desc: 'Ini biji ketapang enak banget lho ayo di beli hehe...', price: 'Rp 5.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Keripik Bawang', category: 'Makanan Ringan', desc: 'Renyah gurih, cocok teman santai...', price: 'Rp 5.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Keripik Malay', category: 'Makanan Ringan', desc: 'Keripik khas dengan rasa istimewa...', price: 'Rp 5.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Kacang Telur', category: 'Makanan Ringan', desc: 'Gurih manis bikin nagih...', price: 'Rp 6.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Stik Keju', category: 'Makanan Ringan', desc: 'Perpaduan keju yang pas...', price: 'Rp 7.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Makaroni Pedas', category: 'Makanan Ringan', desc: 'Pedasnya bikin ketagihan...', price: 'Rp 5.500,00', image: 'https://placehold.co/300x220' },

    { name: 'Nasi Goreng', category: 'Makanan Berat', desc: 'Nasi goreng spesial...', price: 'Rp 15.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Mie Ayam', category: 'Makanan Berat', desc: 'Mie ayam gurih...', price: 'Rp 13.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Ayam Geprek', category: 'Makanan Berat', desc: 'Pedas nikmat...', price: 'Rp 14.000,00', image: 'https://placehold.co/300x220' },

    { name: 'Thai Tea', category: 'Minuman', desc: 'Segar dan creamy...', price: 'Rp 8.000,00', image: 'https://placehold.co/300x220' },
    { name: 'Es Kopi', category: 'Minuman', desc: 'Kopi susu kekinian...', price: 'Rp 10.000,00', image: 'https://placehold.co/300x220' },
];

const PER_PAGE = 4;

function ProductCard({ name, desc, price, image }) {
    const { addItem } = useCart();
    return (
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
            {/* ...gambar + badge harga... */}
            <div className="relative h-[200px] w-full overflow-hidden">
                <img src={image} alt={name} className="h-full w-full object-cover" />

                {/* Badge Harga */}
                <span className="absolute right-3 top-3 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-sans text-sm font-semibold text-white shadow-md">
                    {price}
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="font-sans text-2xl font-semibold text-[#2A2E53]">{name}</h3>
                <p className="flex-1 font-['Questrial'] text-xs leading-[18px] text-secondary">{desc}</p>
                <button
                    onClick={() => addItem({ name, price, image })}
                    className="mt-auto w-full rounded-full bg-accent px-4 py-2.5 font-['Questrial'] text-sm text-white transition hover:opacity-90"
                >
                    Tambah Keranjang
                </button>
            </div>
        </div>
    );
}

export default function Products() {
    const [activeCat, setActiveCat] = useState(categories[0]);
    const [page, setPage] = useState(0);

    const filtered = products.filter((p) => p.category === activeCat);
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const start = page * PER_PAGE;
    const visible = filtered.slice(start, start + PER_PAGE);

    const canPrev = page > 0;
    const canNext = page < totalPages - 1;

    const changeCat = (cat) => {
        setActiveCat(cat);
        setPage(0);
    };

    const arrowBase =
        'flex h-10 w-10 items-center justify-center rounded-full bg-base text-accent shadow transition hover:bg-accent hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-base disabled:hover:text-accent';

    // animasi grid saat ganti tab/slide
    const gridInit = { opacity: 0, y: 15 };
    const gridShow = { opacity: 1, y: 0 };
    const gridExit = { opacity: 0, y: -15 };
    const gridTrans = { duration: 0.3, ease: 'easeOut' };

    return (
        <section
            id="product"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col items-center gap-10 px-6 py-16"
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

            {/* Tabs + Arrows */}
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                {/* Tabs Kategori */}
                <div className="flex flex-wrap items-center gap-2.5">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => changeCat(cat)}
                            className={`w-[166px] rounded-full px-4 py-2.5 text-center font-['Questrial'] text-[15px] transition ${
                                activeCat === cat
                                    ? 'bg-accent text-white shadow-[0px_5px_8px_rgba(0,0,0,0.20)]'
                                    : 'bg-base text-[#B268A7] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex items-center gap-3">
                    <button onClick={() => setPage(page - 1)} disabled={!canPrev} className={arrowBase} aria-label="Sebelumnya">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={() => setPage(page + 1)} disabled={!canNext} className={arrowBase} aria-label="Berikutnya">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Kartu Produk (dengan fade saat ganti tab/slide) */}
            <div className="w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCat}-${page}`}
                        initial={gridInit}
                        animate={gridShow}
                        exit={gridExit}
                        transition={gridTrans}
                        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {visible.map((p) => (
                            <ProductCard key={p.name} {...p} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}