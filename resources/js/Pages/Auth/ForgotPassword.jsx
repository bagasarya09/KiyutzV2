import { useForm } from '@inertiajs/react';
import { Mail, ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthInput from '@/Components/UI/AuthInput';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    };

    return (
        <AuthLayout
            title="Forgot Password"
            badge="Password Recovery"
            heading="Lupa Password?"
            subtitle="Masukkan email Anda, kami akan mengirim link untuk mereset password."
        >
            {status && (
                <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}
            <form className="mt-8 space-y-5" onSubmit={submit}>
                <AuthInput
                    icon={Mail}
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="admin@kiyutz.com"
                    autoComplete="username"
                    autoFocus
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Mengirim...' : 'Kirim Link Reset'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>
            </form>
        </AuthLayout>
    );
}