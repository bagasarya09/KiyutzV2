import { Link } from '@inertiajs/react';
import {
  Package, Tags, BadgeCheck, Archive,
  Plus, Store, ArrowRight,
} from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function Dashboard({ stats = {}, recentProducts = [] }) {
  const cards = [
    { title: 'Total Produk',   value: stats.totalProduct ?? 0,    subtitle: 'Semua produk',        icon: Package,    color: '#B268A7' },
    { title: 'Produk Aktif',   value: stats.activeProduct ?? 0,   subtitle: 'Tampil di landing',   icon: BadgeCheck, color: '#16A34A' },
    { title: 'Produk Inaktif', value: stats.inactiveProduct ?? 0, subtitle: 'Disembunyikan',       icon: Archive,    color: '#DC2626' },
    { title: 'Total Kategori', value: stats.totalCategory ?? 0,   subtitle: 'Kategori terdaftar',  icon: Tags,       color: '#9333EA' },
  ];

  const quickActions = [
    { label: 'Tambah Produk',  href: '/admin/products',   icon: Plus },
    { label: 'Kelola Kategori', href: '/admin/categories', icon: Tags },
    { label: 'Edit Profil Toko', href: '/admin/about',    icon: Store },
  ];

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[1280px] space-y-6 lg:space-y-8">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="mb-3 inline-flex rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
            Dashboard
          </div>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">Selamat datang di Kiyutz Admin 👋</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6C7095]">
            Ringkasan data toko dan akses cepat untuk mengelola konten website.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.title} className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#6C7095]">{c.title}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: `${c.color}1A`, color: c.color }}>
                    <Icon size={20} />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold">{c.value}</p>
                <p className="mt-1 text-xs text-[#6C7095]">{c.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* PRODUK TERBARU */}
          <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:col-span-2 lg:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Produk Terbaru</h2>
              <Link href="/admin/products" className="inline-flex items-center gap-1 text-sm font-semibold text-[#B268A7] hover:underline">
                Lihat semua <ArrowRight size={14} />
              </Link>
            </div>

            {recentProducts.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="mx-auto mb-3 text-[#6C7095]" size={32} />
                <p className="font-semibold">Belum ada produk</p>
                <p className="text-sm text-[#6C7095]">Tambahkan produk pertamamu.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-xl border border-[#F2F2F2] p-3">
                    <img
                      src={p.image ? `/storage/${p.image}` : 'https://placehold.co/80x80'}
                      alt={p.name}
                      className="h-12 w-12 shrink-0 rounded-lg border border-[#F2F2F2] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{p.name}</p>
                      <p className="text-xs text-[#6C7095]">{p.category?.name ?? 'Tanpa kategori'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatRupiah(p.price)}</p>
                      <span className={`text-xs font-semibold ${p.status === 'aktif' ? 'text-[#16A34A]' : 'text-[#6C7095]'}`}>
                        {p.status === 'aktif' ? 'Aktif' : 'Inaktif'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AKSI CEPAT */}
          <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
            <h2 className="mb-4 text-lg font-bold">Aksi Cepat</h2>
            <div className="space-y-3">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={a.href}
                    href={a.href}
                    className="flex items-center gap-3 rounded-xl border border-[#F2F2F2] p-3 transition hover:bg-[#F8F9FE]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B268A7]/10 text-[#B268A7]">
                      <Icon size={18} />
                    </span>
                    <span className="flex-1 font-semibold">{a.label}</span>
                    <ArrowRight size={16} className="text-[#6C7095]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;