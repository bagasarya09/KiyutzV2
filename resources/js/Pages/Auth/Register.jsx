import { useForm, Link } from '@inertiajs/react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthInput from '@/Components/UI/AuthInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register', { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <AuthLayout
            title="Register"
            badge="Join Kiyutz"
            heading="Create Account"
            subtitle="Buat akun baru untuk mulai mengelola dashboard admin."
        >
            <form className="mt-8 space-y-5" onSubmit={submit}>
                <AuthInput
                    icon={User} name="name" label="Name" placeholder="Nama lengkap"
                    autoComplete="name" autoFocus required
                    value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name}
                />
                <AuthInput
                    icon={Mail} type="email" name="email" label="Email" placeholder="admin@kiyutz.com"
                    autoComplete="username" required
                    value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email}
                />
                <AuthInput
                    icon={Lock} isPassword name="password" label="Password" placeholder="Masukkan password"
                    autoComplete="new-password" required
                    value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password}
                />
                <AuthInput
                    icon={Lock} isPassword name="password_confirmation" label="Confirm Password" placeholder="Ulangi password"
                    autoComplete="new-password" required
                    value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation}
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Create Account'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>

                <p className="text-center text-sm text-[#6C7095]">
                    Sudah punya akun?{' '}
                    <Link href="/login" className="font-semibold text-[#B268A7] transition hover:opacity-80">
                        Log In
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}