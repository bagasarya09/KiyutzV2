import { useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import {
  Archive, BadgeCheck, Boxes, Package,
  Plus, Pencil, Trash2, Search, XCircle,
} from 'lucide-react';
import ProductModal from './ProductModal';   // ⬅️ modal LAMA, tidak diubah
import AdminLayout from '@/Layouts/AdminLayout';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(value);

export default function Index({ products, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');

  // ===== Modal handlers (API modal lama) =====
  const openAdd = () => { setEditing(null); setIsModalOpen(true); };
  const openEdit = (p) => { setEditing(p); setIsModalOpen(true); };

  const handleDelete = (p) => {
    if (confirm(`Hapus produk "${p.name}"?`)) {
      router.delete(`/admin/products/${p.id}`, { preserveScroll: true });
    }
  };

  // ===== Search =====
  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      (p.category?.name ?? '').toLowerCase().includes(q)
    );
  }, [products, search]);

  // ===== Stats =====
  const totalProduct = products.length;
  const totalCategory = new Set(
    products.map((p) => p.category?.name).filter(Boolean)
  ).size;
  const activeProduct = products.filter((p) => p.status === 'aktif').length;
  const inactiveProduct = products.filter((p) => p.status === 'inaktif').length;

  const cards = [
    { title: 'Total Produk',   value: totalProduct,    subtitle: 'Produk tersedia',        icon: Package,    iconColor: '#B268A7', bgColor: '#B268A7' },
    { title: 'Total Kategori', value: totalCategory,   subtitle: 'Kategori terpakai',      icon: Boxes,      iconColor: '#9333EA', bgColor: '#F3E8FF' },
    { title: 'Produk Aktif',   value: activeProduct,   subtitle: 'Produk yang ditampilkan', icon: BadgeCheck, iconColor: '#16A34A', bgColor: '#DCFCE7' },
    { title: 'Produk Inaktif', value: inactiveProduct, subtitle: 'Produk disembunyikan',   icon: Archive,    iconColor: '#DC2626', bgColor: '#FEE2E2' },
  ];

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[1280px] space-y-6 lg:space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
              Product Management
            </div>
            <h1 className="text-2xl font-bold leading-tight text-[#0B1F33] md:text-3xl">
              Product
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6C7095]">
              Kelola seluruh data produk pada website Kiyutz.
            </p>
          </div>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#6C7095]">{c.title}</p>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${c.bgColor}1A`, color: c.iconColor }}
                  >
                    <Icon size={20} />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold text-[#0B1F33]">{c.value}</p>
                <p className="mt-1 text-xs text-[#6C7095]">{c.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col gap-3 rounded-2xl border border-[#F2F2F2] bg-white p-4 shadow-[0_14px_40px_rgba(11,31,51,0.04)] sm:flex-row sm:items-center sm:justify-between lg:p-5">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C7095]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari produk / kategori..."
              className="w-full rounded-xl border border-[#F2F2F2] bg-[#F8F9FE] py-2.5 pl-9 pr-4 text-sm text-[#0B1F33] placeholder:text-[#6C7095] focus:border-[#0B1F33] focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.16)] transition hover:opacity-90"
          >
            <Plus size={18} /> Tambah Produk
          </button>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#F2F2F2] text-[#6C7095]">
                <tr>
                  <th className="px-4 py-3 font-medium">Produk</th>
                  <th className="px-4 py-3 font-medium">Kategori</th>
                  <th className="px-4 py-3 font-medium">Harga</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-16 text-center">
                      <Package className="mx-auto mb-3 text-[#6C7095]" size={32} />
                      <p className="font-semibold text-[#0B1F33]">Tidak ada produk</p>
                      <p className="text-[#6C7095]">
                        Coba ubah pencarian, atau klik "Tambah Produk".
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id} className="border-b border-[#F2F2F2] last:border-0">
                      {/* Produk: gambar + nama + deskripsi */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image ? `/storage/${p.image}` : 'https://placehold.co/80x80'}
                            alt={p.name}
                            className="h-12 w-12 shrink-0 rounded-lg border border-[#F2F2F2] object-cover"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0B1F33]">{p.name}</p>
                            <p className="line-clamp-1 text-xs text-[#6C7095]">
                              {p.description || '—'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kategori */}
                      <td className="px-4 py-4">
                        <span className="inline-flex rounded-full bg-[#F8F9FE] px-3 py-1 text-xs font-medium text-[#6C7095]">
                          {p.category?.name ?? 'Tanpa kategori'}
                        </span>
                      </td>

                      {/* Harga */}
                      <td className="px-4 py-4 font-semibold text-[#0B1F33]">
                        {formatRupiah(p.price)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            p.status === 'aktif'
                              ? 'bg-[#16A34A]/10 text-[#16A34A]'
                              : 'bg-[#6C7095]/10 text-[#6C7095]'
                          }`}
                        >
                          {p.status === 'aktif' ? <BadgeCheck size={13} /> : <XCircle size={13} />}
                          {p.status === 'aktif' ? 'Aktif' : 'Inaktif'}
                        </span>
                      </td>

                      {/* Aksi */}
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[#0B1F33] transition hover:bg-[#F8F9FE]"
                          >
                            <Pencil size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[#DC2626] transition hover:bg-[#DC2626]/10"
                          >
                            <Trash2 size={16} /> Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL LAMA — tidak diubah */}
      <ProductModal
        open={isModalOpen}
        initialData={editing}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;