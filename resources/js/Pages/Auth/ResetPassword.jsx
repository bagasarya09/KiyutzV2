import { useForm } from '@inertiajs/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthInput from '@/Components/UI/AuthInput';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/reset-password', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Reset Password"
            badge="Password Recovery"
            heading="Reset Password"
            subtitle="Masukkan password baru untuk akun Anda."
        >
            <form className="mt-8 space-y-5" onSubmit={submit}>
                <AuthInput
                    icon={Mail} type="email" name="email" label="Email" autoComplete="username"
                    value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email}
                />
                <AuthInput
                    icon={Lock} isPassword name="password" label="Password" placeholder="Password baru"
                    autoComplete="new-password" autoFocus
                    value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password}
                />
                <AuthInput
                    icon={Lock} isPassword name="password_confirmation" label="Confirm Password" placeholder="Ulangi password"
                    autoComplete="new-password"
                    value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Reset Password'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>
            </form>
        </AuthLayout>
    );
}