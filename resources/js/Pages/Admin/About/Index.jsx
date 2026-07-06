import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Store, Save, ImagePlus } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

const labelClass = 'text-sm font-medium text-[#0B1F33]';
const inputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0B1F33] placeholder:text-[#6C7095] focus:border-[#0B1F33] focus:outline-none focus:ring-2 focus:ring-[#0B1F33]/10';
const errorClass = 'text-xs text-[#DC2626]';

export default function Index({ about }) {
  // dua ref & dua preview untuk dua gambar
  const bigInputRef = useRef(null);
  const smallInputRef = useRef(null);
  const [preview, setPreview] = useState(about?.image ? `/storage/${about.image}` : '');
  const [preview2, setPreview2] = useState(about?.image2 ? `/storage/${about.image2}` : '');

  const { data, setData, post, processing, errors, transform, recentlySuccessful } = useForm({
    title: about?.title ?? '',
    description: about?.description ?? '',
    quote: about?.quote ?? '',
    founder: about?.founder ?? '',
    image: null,   // foto besar
    image2: null,  // foto kecil
  });

  // handler upload — dipakai dua-duanya
  const handleImage = (e, field, setPrev) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setData(field, file);
    setPrev(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    transform((data) => ({ ...data, _method: 'put' })); // spoof PUT (upload file)
    post(route('admin.about.update'), {
      forceFormData: true,
      preserveScroll: true,
    });
  };

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[900px] space-y-6">
        {/* HEADER */}
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
            <Store size={13} /> Profil Toko
          </div>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl">About Us</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6C7095]">
            Kelola profil & informasi "Tentang Kami" yang tampil di landing page Kiyutz.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6"
        >
          {/* ===== Dua Gambar ===== */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Foto besar */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Foto Besar (utama)</label>
              <div className="flex items-center gap-4">
                {preview ? (
                  <img src={preview} alt="Preview foto besar" className="h-28 w-24 rounded-xl border border-[#F2F2F2] object-cover" />
                ) : (
                  <div className="flex h-28 w-24 items-center justify-center rounded-xl border border-dashed border-[#F2F2F2] bg-[#F8F9FE] text-center text-xs text-[#6C7095]">
                    Belum ada
                  </div>
                )}
                <input ref={bigInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e, 'image', setPreview)} />
                <button
                  type="button"
                  onClick={() => bigInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F2F2F2] px-4 py-2.5 text-sm font-semibold text-[#0B1F33] transition hover:brightness-95"
                >
                  <ImagePlus size={16} /> {preview ? 'Ganti' : 'Unggah'}
                </button>
              </div>
              {errors.image && <span className={errorClass}>{errors.image}</span>}
            </div>

            {/* Foto kecil */}
            <div className="flex flex-col gap-2">
              <label className={labelClass}>Foto Kecil (overlap)</label>
              <div className="flex items-center gap-4">
                {preview2 ? (
                  <img src={preview2} alt="Preview foto kecil" className="h-28 w-24 rounded-xl border border-[#F2F2F2] object-cover" />
                ) : (
                  <div className="flex h-28 w-24 items-center justify-center rounded-xl border border-dashed border-[#F2F2F2] bg-[#F8F9FE] text-center text-xs text-[#6C7095]">
                    Belum ada
                  </div>
                )}
                <input ref={smallInputRef} type="file" accept="image/*" hidden onChange={(e) => handleImage(e, 'image2', setPreview2)} />
                <button
                  type="button"
                  onClick={() => smallInputRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F2F2F2] px-4 py-2.5 text-sm font-semibold text-[#0B1F33] transition hover:brightness-95"
                >
                  <ImagePlus size={16} /> {preview2 ? 'Ganti' : 'Unggah'}
                </button>
              </div>
              {errors.image2 && <span className={errorClass}>{errors.image2}</span>}
            </div>
          </div>

          {/* Judul */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="title">Judul</label>
            <input
              id="title"
              type="text"
              className={`${inputClass} ${errors.title ? 'border-[#DC2626]' : 'border-[#F2F2F2]'}`}
              placeholder="Tentang Kami"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
            />
            {errors.title && <span className={errorClass}>{errors.title}</span>}
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              rows={6}
              className={`${inputClass} ${errors.description ? 'border-[#DC2626]' : 'border-[#F2F2F2]'}`}
              placeholder={"Paragraf 1...\n\nParagraf 2..."}
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
            />
            <span className="text-xs text-[#6C7095]">Tekan Enter untuk memisahkan paragraf.</span>
            {errors.description && <span className={errorClass}>{errors.description}</span>}
          </div>

          {/* Quote */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="quote">Kutipan (Quote)</label>
            <textarea
              id="quote"
              rows={3}
              className={`${inputClass} ${errors.quote ? 'border-[#DC2626]' : 'border-[#F2F2F2]'}`}
              placeholder="“Kami percaya bahwa camilan terbaik...”"
              value={data.quote}
              onChange={(e) => setData('quote', e.target.value)}
            />
            {errors.quote && <span className={errorClass}>{errors.quote}</span>}
          </div>

          {/* Founder */}
          <div className="flex flex-col gap-1">
            <label className={labelClass} htmlFor="founder">Founder</label>
            <input
              id="founder"
              type="text"
              className={`${inputClass} ${errors.founder ? 'border-[#DC2626]' : 'border-[#F2F2F2]'}`}
              placeholder="— Founder of Kiyutz"
              value={data.founder}
              onChange={(e) => setData('founder', e.target.value)}
            />
            {errors.founder && <span className={errorClass}>{errors.founder}</span>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {recentlySuccessful && (
              <span className="text-sm font-medium text-[#16A34A]">Tersimpan ✓</span>
            )}
            <button
              type="submit"
              disabled={processing}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F33] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.16)] transition hover:opacity-90 disabled:opacity-60"
            >
              <Save size={16} /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;