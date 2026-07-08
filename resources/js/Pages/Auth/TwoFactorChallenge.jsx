import { useForm, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function TwoFactorChallenge() {
  const { data, setData, post, processing, errors } = useForm({ code: '' });

  const submit = (e) => {
    e.preventDefault();
    post(route('two-factor.login'));
  };

  return (
    <GuestLayout>
      <Head title="Verifikasi 2FA" />
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B268A7]/10 text-[#B268A7]">
          <ShieldCheck size={24} />
        </span>
        <h1 className="text-xl font-bold text-[#0B1F33]">Verifikasi Dua Langkah</h1>
        <p className="text-sm text-[#6C7095]">Masukkan 6 digit kode dari aplikasi authenticator-mu.</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          type="text"
          inputMode="numeric"
          autoFocus
          maxLength={6}
          placeholder="123456"
          value={data.code}
          onChange={(e) => setData('code', e.target.value.replace(/\D/g, ''))}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#0B1F33]/10 ${
            errors.code ? 'border-[#DC2626]' : 'border-[#F2F2F2]'
          }`}
        />
        {errors.code && <span className="text-xs text-[#DC2626]">{errors.code}</span>}
        <button
          type="submit"
          disabled={processing}
          className="mt-2 inline-flex items-center justify-center rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          Verifikasi
        </button>
      </form>
    </GuestLayout>
  );
}