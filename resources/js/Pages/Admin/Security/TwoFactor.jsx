import { useForm, router, usePage } from '@inertiajs/react';
import { ShieldCheck, ShieldOff, QrCode } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function TwoFactor({ enabled, qrCode, secret }) {
  const { props } = usePage();
  const status = props.flash?.status;
  const confirmForm = useForm({ code: '' });

  const startEnable = () => router.post(route('admin.two-factor.enable'), {}, { preserveScroll: true });

  const disable = () => {
    if (confirm('Nonaktifkan 2FA? Login tidak lagi meminta kode.')) {
      router.delete(route('admin.two-factor.disable'), { preserveScroll: true });
    }
  };

  const confirm2fa = (e) => {
    e.preventDefault();
    confirmForm.post(route('admin.two-factor.confirm'), {
      preserveScroll: true,
      onSuccess: () => confirmForm.reset('code'),
    });
  };

  return (
    <section className="min-h-screen bg-[#F8F9FE] p-4 text-[#0B1F33] lg:p-6">
      <div className="mx-auto w-full max-w-[700px] space-y-6">
        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#B268A7]/10 px-3 py-1 text-xs font-semibold text-[#B268A7]">
            <ShieldCheck size={13} /> Keamanan
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">Two-Factor Authentication</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#6C7095]">
            Tambahkan lapisan keamanan kedua dengan kode dari aplikasi authenticator (Google Authenticator / Authy).
          </p>
        </div>

        <div className="rounded-2xl border border-[#F2F2F2] bg-white p-5 shadow-[0_14px_40px_rgba(11,31,51,0.04)] lg:p-6">
          {status && (
            <p className="mb-4 rounded-xl bg-[#16A34A]/10 px-4 py-2 text-sm font-medium text-[#16A34A]">{status}</p>
          )}

          {/* STATE 1: sudah aktif */}
         {enabled && (
        <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 rounded-xl bg-[#16A34A]/10 px-4 py-2 text-sm font-semibold text-[#16A34A]">
            <ShieldCheck size={18} /> 2FA sedang AKTIF
            </div>
            <p className="text-sm text-[#6C7095]">Setiap login akan meminta kode 6 digit.</p>

            <div className="flex flex-wrap gap-3">
            {/* 👇 Tombol daftar ulang */}
            <button
                onClick={() => {
                if (confirm('Daftar ulang 2FA? QR lama akan tidak berlaku.')) {
                    router.post(route('admin.two-factor.enable'), {}, { preserveScroll: true });
                }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
                <QrCode size={16} /> Daftar Ulang
            </button>

            <button
                onClick={disable}
                className="inline-flex items-center gap-2 rounded-xl bg-[#DC2626] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
                <ShieldOff size={16} /> Nonaktifkan 2FA
            </button>
            </div>
        </div>
        )}

          {/* STATE 2: ada QR, tinggal scan + konfirmasi */}
          {!enabled && qrCode && (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[#6C7095]">
                1. Scan QR di bawah pakai <b>Google Authenticator / Authy</b>.<br />
                2. Masukkan 6 digit yang muncul untuk mengaktifkan.
              </p>
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#F2F2F2] bg-[#F8F9FE] p-5">
                <img src={qrCode} alt="QR Code 2FA" className="h-48 w-48" />
                <p className="text-xs text-[#6C7095]">Atau masukkan kode manual:</p>
                <code className="rounded-lg bg-white px-3 py-1 text-sm font-semibold tracking-wider">{secret}</code>
              </div>

              <form onSubmit={confirm2fa} className="flex flex-col gap-2">
                <label className="text-sm font-medium">Kode dari aplikasi</label>
                <input
                  type="text"
                  inputMode="numeric"
                  autoFocus
                  maxLength={6}
                  placeholder="123456"
                  value={confirmForm.data.code}
                  onChange={(e) => confirmForm.setData('code', e.target.value.replace(/\D/g, ''))}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-center text-lg tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#0B1F33]/10 ${
                    confirmForm.errors.code ? 'border-[#DC2626]' : 'border-[#F2F2F2]'
                  }`}
                />
                {confirmForm.errors.code && <span className="text-xs text-[#DC2626]">{confirmForm.errors.code}</span>}
                <button
                  type="submit"
                  disabled={confirmForm.processing}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                >
                  Aktifkan 2FA
                </button>
              </form>
            </div>
          )}

          {/* STATE 3: belum aktif & belum ada secret */}
          {!enabled && !qrCode && (
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-[#6C7095]/10 px-4 py-2 text-sm font-semibold text-[#6C7095]">
                <ShieldOff size={18} /> 2FA belum aktif
              </div>
              <button
                onClick={startEnable}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F33] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                <QrCode size={16} /> Aktifkan 2FA
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

TwoFactor.layout = (page) => <AdminLayout>{page}</AdminLayout>;