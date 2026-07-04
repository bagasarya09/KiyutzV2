import { useForm, Link } from '@inertiajs/react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthInput from '@/Components/UI/AuthInput';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', { onFinish: () => reset('password') });
    };

    return (
        <AuthLayout
            title="Log in"
            badge="Welcome to Kiyutz"
            heading="Welcome Back"
            subtitle="Masukkan email dan password untuk mengakses dashboard admin."
        >
            {status && (
                <div className="mt-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={submit}>
                <AuthInput
                    icon={Mail} type="email" name="email" label="Email"
                    placeholder="admin@kiyutz.com" autoComplete="username" autoFocus
                    value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email}
                />
                <AuthInput
                    icon={Lock} isPassword name="password" label="Password"
                    placeholder="Masukkan password" autoComplete="current-password"
                    value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password}
                />

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-[#6C7095]">
                        <input
                            type="checkbox" name="remember" checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 rounded border-[#F2F2F2] text-[#0B1F33] focus:ring-[#0B1F33]"
                        />
                        Remember me
                    </label>
                    {canResetPassword && (
                        <Link href="/forgot-password" className="text-sm font-medium text-[#B268A7] transition hover:opacity-80">
                            Forgot password?
                        </Link>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Log In'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>

                <p className="text-center text-sm text-[#6C7095]">
                    Belum punya akun?{' '}
                    <Link href="/register" className="font-semibold text-[#B268A7] transition hover:opacity-80">
                        Register
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}