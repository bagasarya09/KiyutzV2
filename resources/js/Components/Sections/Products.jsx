import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/Context/CartContext';

const PER_PAGE = 4;
const ALL = 'Semua';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(Number(value) || 0);

const imageUrl = (image) =>
  image ? `/storage/${image}` : 'https://placehold.co/300x220';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = formatRupiah(product.price);
  const image = imageUrl(product.image);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0px_0px_4px_rgba(0,0,0,0.25)]">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          loading="lazy"
          decoding="async"
          alt={product.name}
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-sans text-sm font-semibold text-white shadow-md">
          {price}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-sans text-2xl font-semibold text-[#2A2E53]">{product.name}</h3>
        <p className="flex-1 font-['Questrial'] text-xs leading-[18px] text-secondary">
          {product.description}
        </p>
        <button
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: Number(product.price),   // 👈 FIX: angka bersih (bukan "1000000.00")
              image,
            })
          }
          className="mt-auto w-full rounded-full bg-accent px-4 py-2.5 font-['Questrial'] text-sm text-white transition hover:opacity-90"
        >
          Tambah Keranjang
        </button>
      </div>
    </div>
  );
}

export default function Products({ products = [], categories = [] }) {
  // Kategori yang benar-benar punya produk
  const categoryNames = useMemo(() => {
    const withProducts = new Set(products.map((p) => p.category?.name).filter(Boolean));
    const ordered = categories
      .map((c) => c.name)
      .filter((name) => withProducts.has(name));
    return ordered.length ? ordered : [...withProducts];
  }, [products, categories]);

  // Tab final: "Semua" di depan, lalu kategori lainnya
  const tabs = useMemo(
    () => (categoryNames.length ? [ALL, ...categoryNames] : []),
    [categoryNames]
  );

  const [activeCat, setActiveCat] = useState(ALL);
  const [page, setPage] = useState(0);
  const currentCat = activeCat ?? ALL;

  // Kalau "Semua" → tampilkan semua produk, selain itu difilter per kategori
  const filtered = useMemo(
    () =>
      currentCat === ALL
        ? products
        : products.filter((p) => p.category?.name === currentCat),
    [products, currentCat]
  );

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

      {tabs.length === 0 ? (
        <p className="font-['Questrial'] text-sm text-secondary">
          Belum ada produk untuk ditampilkan.
        </p>
      ) : (
        <>
          {/* Tabs + Arrows */}
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-wrap items-center gap-2.5">
              {tabs.map((cat) => (
                <button
                  key={cat}
                  onClick={() => changeCat(cat)}
                  className={`w-[166px] rounded-full px-4 py-2.5 text-center font-['Questrial'] text-[15px] transition ${
                    currentCat === cat
                      ? 'bg-accent text-white shadow-[0px_5px_8px_rgba(0,0,0,0.20)]'
                      : 'bg-base text-[#B268A7] shadow-[0px_1px_4px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setPage(page - 1)} disabled={!canPrev} className={arrowBase} aria-label="Sebelumnya">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setPage(page + 1)} disabled={!canNext} className={arrowBase} aria-label="Berikutnya">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Kartu Produk */}
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCat}-${page}`}
                initial={gridInit}
                animate={gridShow}
                exit={gridExit}
                transition={gridTrans}
                className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
}