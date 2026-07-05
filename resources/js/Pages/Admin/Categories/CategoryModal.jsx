import { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

const labelClass = 'text-sm font-medium text-primary';
const inputClass =
  'w-full rounded-md border bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10';
const errorClass = 'text-xs text-danger';

export default function CategoryModal({ open, initialData, onClose }) {
  const isEdit = Boolean(initialData);

  const { data, setData, post, put, processing, errors, reset, clearErrors } =
    useForm({
      name: '',
      description: '',
      status: 'aktif',
    });

  // Isi ulang form saat modal dibuka
  useEffect(() => {
    if (open) {
      clearErrors();
      if (initialData) {
        setData({
          name: initialData.name ?? '',
          description: initialData.description ?? '',
          status: initialData.status ?? 'aktif',
        });
      } else {
        reset();
      }
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = { preserveScroll: true, onSuccess: onClose };

    if (isEdit) {
      put(route('admin.categories.update', initialData.id), options);
    } else {
      post(route('admin.categories.store'), options);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary/45 p-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-[480px] overflow-hidden rounded-lg bg-white shadow-modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-tertiary p-6">
          <h5 className="text-xl font-semibold text-primary">
            {isEdit ? 'Edit Kategori' : 'Tambah Kategori'}
          </h5>
          <button onClick={onClose} className="text-secondary" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {/* Nama Kategori */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="name">Nama Kategori</label>
            <input
              id="name"
              type="text"
              className={`${inputClass} ${errors.name ? 'border-danger' : 'border-tertiary'}`}
              placeholder="Contoh: Minuman"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <span className={errorClass}>{errors.name}</span>}
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="description">Deskripsi (opsional)</label>
            <textarea
              id="description"
              rows={3}
              className={`${inputClass} ${errors.description ? 'border-danger' : 'border-tertiary'}`}
              placeholder="Deskripsi singkat kategori..."
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            {errors.description && <span className={errorClass}>{errors.description}</span>}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Status</label>
            <div className="flex gap-2">
              {['aktif', 'inaktif'].map((s) => {
                const selected = data.status === s;
                return (
                  <label
                    key={s}
                    className={`flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-md border px-3 py-2.5 text-sm font-medium ${
                      selected ? 'border-accent bg-accent/10 text-primary' : 'border-tertiary text-secondary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={selected}
                      onChange={(e) => setData('status', e.target.value)}
                      className="accent-accent"
                    />
                    {s === 'aktif' ? 'Aktif' : 'Inaktif'}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-tertiary px-5 py-3 text-base font-semibold text-primary transition hover:brightness-95"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={processing}
              className="rounded-md bg-primary px-5 py-3 text-base font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {isEdit ? 'Simpan Perubahan' : 'Simpan Kategori'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}