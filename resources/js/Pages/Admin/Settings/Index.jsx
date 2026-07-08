import { useForm, router, usePage } from '@inertiajs/react';
import { Save, Plus, Trash2, Settings as SettingsIcon } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import SocialIcon from '@/Components/SocialIcon';

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'linkedin', label: 'LinkedIn' },
];

const input = 'w-full rounded-xl border border-[#F2F2F2] bg-white px-4 py-3 text-sm text-[#0B1F33] focus:border-[#0B1F33] focus:outline-none focus:ring-2 focus:ring-[#0B1F33]/10';
const label = 'text-sm font-medium text-[#0B1F33]';

export default function Index({ setting, socials }) {
  const { props } = usePage();
  const success = props.flash?.success;

  const form = useForm({
    contact_email: setting?.contact_email ?? '',
    contact_phone: setting?.contact_phone ?? '',
    contact_address: setting?.contact_address ?? '',
    operational_hours: setting?.operational_hours ?? '',
    recipient_email: setting?.recipient_email ?? '',
    brand_description: setting?.brand_description ?? '',
  });

  const social = useForm({ platform: 'instagram', url: '', status: 'aktif', sort_order: 0 });

  const saveSetting = (e) => { e.preventDefault(); form.put(route('admin.settings.update'), { preserveScroll: true }); };
  const addSocial = (e) => { e.preventDefault(); social.post(route('admin.socials.store'), { preserveScroll: true, onSuccess: () => social.reset('url') }); };
  const delSocial = (id) => { if (confirm('Hapus media sosial ini?')) router.delete(route('admin.socials.destroy', id), { preserveScroll: true }); };

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[900px] space-y-6">
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
            <SettingsIcon size={13} /> Pengaturan
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">Kontak & Media Sosial</h1>
          <p className="mt-2 text-sm text-[#6C7095]">Atur info kontak, email tujuan pesan, dan tautan media sosial.</p>
          {success && <p className="mt-3 rounded-xl bg-[#16A34A]/10 px-4 py-2 text-sm font-medium text-[#16A34A]">{success}</p>}
        </div>

        {/* Info kontak */}
        <form onSubmit={saveSetting} className="space-y-4 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <h2 className="text-lg font-bold">Informasi Kontak</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><label className={label}>Email Ditampilkan</label><input className={input} value={form.data.contact_email} onChange={(e) => form.setData('contact_email', e.target.value)} /></div>
            <div><label className={label}>Telepon</label><input className={input} value={form.data.contact_phone} onChange={(e) => form.setData('contact_phone', e.target.value)} /></div>
          </div>
          <div><label className={label}>Alamat</label><input className={input} value={form.data.contact_address} onChange={(e) => form.setData('contact_address', e.target.value)} /></div>
          <div><label className={label}>Jam Operasional</label><textarea rows={2} className={input} value={form.data.operational_hours} onChange={(e) => form.setData('operational_hours', e.target.value)} /></div>
          <div><label className={label}>Deskripsi Footer</label><textarea rows={2} className={input} value={form.data.brand_description} onChange={(e) => form.setData('brand_description', e.target.value)} /></div>

          <div className="rounded-xl bg-[#B268A7]/5 p-4">
            <label className={label}>📩 Email Tujuan Pesan Masuk</label>
            <input type="email" className={`${input} mt-1`} placeholder="owner@kiyutz.com" value={form.data.recipient_email} onChange={(e) => form.setData('recipient_email', e.target.value)} />
            <p className="mt-1 text-xs text-[#6C7095]">Semua pesan dari form Contact dikirim ke email ini.</p>
            {form.errors.recipient_email && <span className="text-xs text-[#DC2626]">{form.errors.recipient_email}</span>}
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={form.processing} className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F33] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
              <Save size={16} /> Simpan
            </button>
          </div>
        </form>

        {/* Media sosial */}
        <div className="space-y-4 rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <h2 className="text-lg font-bold">Media Sosial</h2>
          <div className="space-y-2">
            {socials.length === 0 && <p className="text-sm text-[#6C7095]">Belum ada media sosial.</p>}
            {socials.map((s) => (
              <div key={s.id} className="flex items-center gap-3 rounded-xl border border-[#F2F2F2] p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F33] text-white"><SocialIcon platform={s.platform} /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold capitalize">{s.platform}</p>
                  <p className="truncate text-xs text-[#6C7095]">{s.url}</p>
                </div>
                <button onClick={() => delSocial(s.id)} className="rounded-lg p-2 text-[#DC2626] hover:bg-[#DC2626]/10"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          <form onSubmit={addSocial} className="grid grid-cols-1 gap-3 rounded-xl bg-[#F8F9FE] p-4 sm:grid-cols-[160px_1fr_auto]">
            <select className={input} value={social.data.platform} onChange={(e) => social.setData('platform', e.target.value)}>
              {PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <input className={input} placeholder="https://instagram.com/kiyutz" value={social.data.url} onChange={(e) => social.setData('url', e.target.value)} />
            <button type="submit" disabled={social.processing} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B268A7] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60">
              <Plus size={16} /> Tambah
            </button>
            {social.errors.url && <span className="text-xs text-[#DC2626] sm:col-span-3">{social.errors.url}</span>}
          </form>
        </div>
      </div>
    </section>
  );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;