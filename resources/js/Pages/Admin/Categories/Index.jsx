import { useMemo, useState } from 'react';
import { router } from '@inertiajs/react';
import {
  CheckCircle2, Plus, Tags, XCircle, Search, Pencil, Trash2,
} from 'lucide-react';
import CategoryModal from './CategoryModal';   // ⬅️ modal LAMA, tidak diubah
import AdminLayout from '@/Layouts/AdminLayout';

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric',
      })
    : '—';

export default function Index({ categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All'); // All | aktif | inaktif

  // ===== Stat cards =====
  const stats = [
    {
      label: 'Total Category',
      value: String(categories.length),
      description: 'Semua kategori product',
      icon: Tags,
      accent: 'bg-[#B268A7]/10 text-[#B268A7]',
    },
    {
      label: 'Active Category',
      value: String(categories.filter((c) => c.status === 'aktif').length),
      description: 'Kategori yang sedang aktif',
      icon: CheckCircle2,
      accent: 'bg-[#16A34A]/10 text-[#16A34A]',
    },
    {
      label: 'Inactive Category',
      value: String(categories.filter((c) => c.status === 'inaktif').length),
      description: 'Kategori yang tidak aktif',
      icon: XCircle,
      accent: 'bg-[#6C7095]/10 text-[#6C7095]',
    },
  ];

  // ===== Filter + search =====
  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === 'All' || c.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [categories, search, filterStatus]);

  // ===== Modal handlers (pakai API modal lama) =====
  const openAdd = () => { setEditing(null); setIsModalOpen(true); };
  const openEdit = (category) => { setEditing(category); setIsModalOpen(true); };

  const handleDelete = (category) => {
    if (confirm(`Hapus kategori "${category.name}"?`)) {
      router.delete(`/admin/categories/${category.id}`, { preserveScroll: true });
    }
  };

  const filterOptions = [
    { key: 'All', label: 'Semua' },
    { key: 'aktif', label: 'Aktif' },
    { key: 'inaktif', label: 'Inaktif' },
  ];

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[1280px] space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-5 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div>
            <div className="mb-3 inline-flex rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
              Category Management
            </div>
            <h1 className="text-2xl font-bold leading-tight text-[#0B1F33] md:text-3xl">
              Category
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6C7095]">
              Kelola kategori product Kiyutz dengan mudah.
            </p>
          </div>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.16)] transition hover:opacity-90 sm:w-fit"
          >
            <Plus size={18} /> Tambah Category
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#6C7095]">{item.label}</p>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}>
                    <Icon size={20} />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold text-[#0B1F33]">{item.value}</p>
                <p className="mt-1 text-xs text-[#6C7095]">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Category Table */}
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#0B1F33]">Category List</h2>
              <p className="mt-1 text-sm leading-relaxed text-[#6C7095]">
                Daftar category yang tersedia di dashboard Kiyutz.
              </p>
            </div>

            {/* Toolbar: search + filter */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C7095]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari kategori..."
                  className="w-full rounded-xl border border-[#F2F2F2] bg-[#F8F9FE] py-2.5 pl-9 pr-4 text-sm text-[#0B1F33] placeholder:text-[#6C7095] focus:border-[#0B1F33] focus:outline-none sm:w-64"
                />
              </div>
              <div className="flex rounded-xl border border-[#F2F2F2] bg-[#F8F9FE] p-1">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setFilterStatus(opt.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      filterStatus === opt.key
                        ? 'bg-white text-[#0B1F33] shadow-sm'
                        : 'text-[#6C7095] hover:text-[#0B1F33]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#F2F2F2] text-[#6C7095]">
                <tr>
                  <th className="px-4 py-3 font-medium">Nama Kategori</th>
                  <th className="px-4 py-3 font-medium">Deskripsi</th>
                  <th className="px-4 py-3 font-medium">Jumlah Produk</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Dibuat</th>
                  <th className="px-4 py-3 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center">
                      <Tags className="mx-auto mb-3 text-[#6C7095]" size={32} />
                      <p className="font-semibold text-[#0B1F33]">Tidak ada kategori</p>
                      <p className="text-[#6C7095]">
                        Coba ubah pencarian/filter, atau klik "Tambah Category".
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((c) => (
                    <tr key={c.id} className="border-b border-[#F2F2F2] last:border-0">
                      <td className="px-4 py-4 font-semibold text-[#0B1F33]">{c.name}</td>
                      <td className="px-4 py-4 text-[#6C7095]">
                        <span className="line-clamp-1">{c.description || '—'}</span>
                      </td>
                      <td className="px-4 py-4 text-[#6C7095]">{c.products_count} produk</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                            c.status === 'aktif'
                              ? 'bg-[#16A34A]/10 text-[#16A34A]'
                              : 'bg-[#6C7095]/10 text-[#6C7095]'
                          }`}
                        >
                          {c.status === 'aktif' ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <XCircle size={13} />
                          )}
                          {c.status === 'aktif' ? 'Aktif' : 'Inaktif'}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[#6C7095]">{formatDate(c.created_at)}</td>
                      <td className="px-4 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEdit(c)}
                            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[#0B1F33] transition hover:bg-[#F8F9FE]"
                          >
                            <Pencil size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(c)}
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

      {/* Modal LAMA — tidak diubah */}
      <CategoryModal
        open={isModalOpen}
        initialData={editing}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;