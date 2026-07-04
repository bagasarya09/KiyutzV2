import { Link, useForm } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <AuthLayout
            title="Email Verification"
            badge="Verify Email"
            heading="Verifikasi Email"
            subtitle="Terima kasih sudah mendaftar! Silakan verifikasi email Anda lewat link yang kami kirim. Belum menerima? Kami bisa kirim ulang."
        >
            {status === 'verification-link-sent' && (
                <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                    Link verifikasi baru sudah dikirim ke email Anda.
                </div>
            )}
            <form className="mt-8 space-y-4" onSubmit={submit}>
                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="block w-full text-center text-sm font-medium text-[#6C7095] transition hover:text-[#0B1F33]"
                >
                    Log Out
                </Link>
            </form>
        </AuthLayout>
    );
}