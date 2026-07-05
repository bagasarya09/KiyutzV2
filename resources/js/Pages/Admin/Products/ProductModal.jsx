import { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { X } from 'lucide-react';

const labelClass = 'text-sm font-medium text-primary';
const inputClass =
  'w-full rounded-md border bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10';
const errorClass = 'text-xs text-danger';

// Format angka jadi ribuan: 100000 → "100.000"
const formatNumber = (val) => {
  const digits = String(val ?? '').replace(/\D/g, '');
  return digits ? Number(digits).toLocaleString('id-ID') : '';
};

export default function ProductModal({ open, initialData, categories, onClose }) {
  const isEdit = Boolean(initialData);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState('');

  const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm({
    category_id: '',
    name: '',
    description: '',
    price: '',
    image: null,
    status: 'aktif',
  });

  useEffect(() => {
    if (open) {
      clearErrors();
      if (initialData) {
        setData({
          category_id: initialData.category_id ?? '',
          name: initialData.name ?? '',
          description: initialData.description ?? '',
          price: initialData.price != null
            ? String(Math.round(Number(initialData.price)))   // "1000000.00" → "1000000"
            : '',
          image: null, // file baru saja; kosong berarti pakai gambar lama
          status: initialData.status ?? 'aktif',
        });
        setPreview(initialData.image ? `/storage/${initialData.image}` : '');
      } else {
        reset();
        setPreview('');
      }
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData('image', file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      forceFormData: true, // penting untuk upload file
      preserveScroll: true,
      onSuccess: onClose,
    };

    if (isEdit) {
      // sisipkan _method ke DALAM data (spoof PUT) — wajib karena upload file pakai POST
      transform((data) => ({ ...data, _method: 'put' }));
      post(route('admin.products.update', initialData.id), options);
    } else {
      // reset transform biar create tidak ikut membawa _method
      transform((data) => data);
      post(route('admin.products.store'), options);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary/45 p-4"
      onMouseDown={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-lg bg-white shadow-modal"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-tertiary p-6">
          <h5 className="text-xl font-semibold text-primary">
            {isEdit ? 'Edit Produk' : 'Tambah Produk'}
          </h5>
          <button onClick={onClose} className="text-secondary" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          {/* Kategori (dropdown dari DB) */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="category_id">Kategori</label>
            <select
              id="category_id"
              className={`${inputClass} ${errors.category_id ? 'border-danger' : 'border-tertiary'}`}
              value={data.category_id}
              onChange={(e) => setData('category_id', e.target.value)}
            >
              <option value="">Pilih kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            {errors.category_id && <span className={errorClass}>{errors.category_id}</span>}
          </div>

          {/* Nama Produk */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="name">Nama Produk</label>
            <input
              id="name"
              type="text"
              className={`${inputClass} ${errors.name ? 'border-danger' : 'border-tertiary'}`}
              placeholder="Contoh: Kopi Susu Gula Aren"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
            />
            {errors.name && <span className={errorClass}>{errors.name}</span>}
          </div>

          {/* Gambar Produk */}
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Gambar Produk</label>
            <div className="flex items-center gap-4">
              {preview ? (
                <img src={preview} alt="Preview" className="h-24 w-24 rounded-md border border-tertiary object-cover" />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-md border border-tertiary bg-base text-center text-xs text-secondary">
                  Belum ada gambar
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageChange} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md bg-tertiary px-5 py-3 text-base font-semibold text-primary transition hover:brightness-95"
              >
                {preview ? 'Ganti Gambar' : 'Unggah Gambar'}
              </button>
            </div>
            {errors.image && <span className={errorClass}>{errors.image}</span>}
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="description">Deskripsi Produk</label>
            <textarea
              id="description"
              rows={3}
              className={`${inputClass} ${errors.description ? 'border-danger' : 'border-tertiary'}`}
              placeholder="Tuliskan deskripsi produk..."
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            {errors.description && <span className={errorClass}>{errors.description}</span>}
          </div>

          {/* Harga — berformat Rupiah */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="price">Harga (Rp)</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-secondary">
                Rp
              </span>
              <input
                id="price"
                type="text"
                inputMode="numeric"
                className={`${inputClass} pl-10 ${errors.price ? 'border-danger' : 'border-tertiary'}`}
                placeholder="0"
                value={formatNumber(data.price)}                                   // tampil: 100.000
                onChange={(e) => setData('price', e.target.value.replace(/\D/g, ''))} // simpan: 100000
              />
            </div>
            {errors.price && <span className={errorClass}>{errors.price}</span>}
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className={labelClass}>Status Produk</label>
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
              {isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}