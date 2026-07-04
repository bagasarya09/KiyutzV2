import { useForm } from '@inertiajs/react';
import { Lock, ArrowRight } from 'lucide-react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthInput from '@/Components/UI/AuthInput';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/confirm-password', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Confirm Password"
            badge="Secure Area"
            heading="Konfirmasi Password"
            subtitle="Ini area aman. Silakan konfirmasi password Anda sebelum melanjutkan."
        >
            <form className="mt-8 space-y-5" onSubmit={submit}>
                <AuthInput
                    icon={Lock} isPassword name="password" label="Password" placeholder="Masukkan password" autoFocus
                    value={data.password} onChange={(e) => setData('password', e.target.value)} error={errors.password}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F33] px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,31,51,0.18)] transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {processing ? 'Memproses...' : 'Confirm'}
                    <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
                </button>
            </form>
        </AuthLayout>
    );
}