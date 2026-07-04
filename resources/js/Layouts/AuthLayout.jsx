import { Head } from '@inertiajs/react';
import { Package, Tags, BarChart3, Sparkles, CheckCircle2 } from 'lucide-react';
import LogoKiyutz from '../assets/LogoKiyutz.png';
import bgLogin from '../assets/bgLogin.png';

export default function AuthLayout({ title, badge, heading, subtitle, children }) {
    const bgStyle = {
        backgroundImage: `url(${bgLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <main className="relative min-h-screen overflow-hidden p-4 font-sans text-[#0B1F33] lg:p-6" style={bgStyle}>
            {title && <Head title={title} />}

            <section className="mx-auto grid min-h-[calc(100vh-32px)] w-full max-w-[1280px] overflow-hidden rounded-[24px] border border-[#F2F2F2] bg-white shadow-[0_24px_70px_rgba(11,31,51,0.08)] lg:min-h-[calc(100vh-48px)] lg:grid-cols-[0.95fr_1.05fr]">
                {/* ===== Left ===== */}
                <div className="flex min-h-full flex-col px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-[#F8F9FE]">
                            <img src={LogoKiyutz} alt="Kiyutz Logo" className="h-9 w-9 object-contain" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-none text-[#0B1F33]">Kiyutz</h1>
                            <p className="mt-1 text-xs font-medium text-[#6C7095]">Admin Panel</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 items-center justify-center py-10">
                        <div className="w-full max-w-[420px]">
                            <div className="text-center">
                                {badge && (
                                    <div className="mx-auto mb-5 inline-flex rounded-full bg-[#B268A7]/10 px-4 py-2 text-xs font-semibold text-[#B268A7]">
                                        {badge}
                                    </div>
                                )}
                                <h2 className="text-3xl font-bold leading-tight text-[#0B1F33] md:text-4xl">{heading}</h2>
                                {subtitle && <p className="mt-3 text-sm leading-relaxed text-[#6C7095]">{subtitle}</p>}
                            </div>

                            {children}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-3 text-xs text-[#6C7095] sm:flex-row sm:items-center sm:justify-between">
                        <p>Copyright © 2026 Kiyutz.</p>
                        <a href="#" className="transition hover:text-[#0B1F33]">Privacy Policy</a>
                    </div>
                </div>

                {/* ===== Right Visual ===== */}
                <div className="relative hidden min-h-full overflow-hidden bg-[#0B1F33] p-8 lg:block">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(178,104,167,0.55),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(248,249,254,0.16),transparent_35%)]" />
                    <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border border-white/10" />
                    <div className="absolute -bottom-20 left-16 h-80 w-80 rounded-full border border-white/10" />
                    <div className="absolute right-16 top-1/2 h-36 w-36 rounded-[32px] border border-white/10" />
                    <div className="relative z-10 flex h-full flex-col justify-center">
                        <div className="max-w-[560px]">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                                <Sparkles size={15} />
                                Kiyutz Admin Dashboard
                            </div>
                            <h2 className="text-2xl font-bold leading-tight text-white xl:text-5xl">
                                Kelola produk dan kategori Anda dengan mudah.
                            </h2>
                            <p className="mt-5 max-w-[460px] text-sm leading-relaxed text-white/70">
                                Kelola data product, category, status product, dan insight dashboard dalam satu tampilan yang clean dan mudah digunakan.
                            </p>
                        </div>

                        <div className="mt-10 w-full max-w-[620px] rounded-[24px] border border-white/15 bg-white/12 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur">
                            <div className="rounded-[20px] bg-white p-5">
                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-semibold text-[#B268A7]">Dashboard Preview</p>
                                        <h3 className="mt-1 text-xl font-bold text-[#0B1F33]">Product Overview</h3>
                                    </div>
                                    <div className="rounded-full bg-[#F8F9FE] px-3 py-1 text-xs font-semibold text-[#6C7095]">Weekly</div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <PreviewCard icon={Package} label="Products" value="63" tone="primary" />
                                    <PreviewCard icon={Tags} label="Categories" value="8" tone="accent" />
                                    <PreviewCard icon={CheckCircle2} label="Active" value="58" tone="success" />
                                </div>
                                <div className="mt-5 rounded-2xl border border-[#F2F2F2] p-4">
                                    <div className="mb-4 flex items-center justify-between">
                                        <p className="text-sm font-bold text-[#0B1F33]">Product by Category</p>
                                        <BarChart3 size={18} className="text-[#B268A7]" />
                                    </div>
                                    <PreviewProgress label="Biji ketapang" value="80%" />
                                    <PreviewProgress label="Kripik Malay" value="65%" />
                                    <PreviewProgress label="Kripik Bawang" value="45%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

function PreviewCard({ icon: Icon, label, value, tone }) {
    const toneClass = {
        primary: 'bg-[#0B1F33] text-white',
        accent: 'bg-[#B268A7] text-white',
        success: 'bg-emerald-50 text-emerald-600',
    };
    return (
        <div className="rounded-2xl border border-[#F2F2F2] bg-[#F8F9FE] p-4">
            <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${toneClass[tone]}`}>
                <Icon size={18} />
            </div>
            <p className="text-xs font-medium text-[#6C7095]">{label}</p>
            <p className="mt-1 text-2xl font-bold text-[#0B1F33]">{value}</p>
        </div>
    );
}

function PreviewProgress({ label, value }) {
    const barStyle = { width: value };
    return (
        <div className="mb-4 last:mb-0">
            <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold text-[#0B1F33]">{label}</p>
                <p className="text-xs font-semibold text-[#6C7095]">{value}</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#F2F2F2]">
                <div className="h-full rounded-full bg-[#B268A7]" style={barStyle} />
            </div>
        </div>
    );
}