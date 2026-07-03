import { Link, usePage } from '@inertiajs/react';

export default function Landing() {
    // Breeze otomatis membagikan data user yang login lewat prop "auth"
    const { auth } = usePage().props;

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-base font-sans text-primary">
            <div className="relative mx-auto w-full max-w-[1440px] min-h-[3447px]">

                {/* --- Blur Circle #1 --- */}
                <div className="pointer-events-none absolute h-[673px] w-[673px] rounded-full bg-accent opacity-[0.32] blur-[300px] top-[943px] left-[-371px]" />

                {/* --- Header / Navbar --- */}
                <header className="relative z-20 flex items-center justify-between px-10 py-6">
                    {/* Logo / Brand */}
                    <div className="text-h4 font-bold text-primary">Kiyutz</div>

                    {/* Tombol Auth */}
                    <nav className="flex items-center gap-3">
                        {auth?.user ? (
                            // Kalau sudah login → tampilkan Dashboard
                            <Link
                                href="/dashboard"
                                className="rounded-full bg-primary px-6 py-2 text-body font-semibold text-white transition hover:opacity-90"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            // Kalau belum login → tampilkan Login & Register
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-full px-6 py-2 text-body font-semibold text-primary transition hover:text-accent"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-full bg-accent px-6 py-2 text-body font-semibold text-white transition hover:opacity-90"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* --- Konten --- */}
                <main className="relative z-10 px-10">
                    {/* Section berikutnya ditempel di sini */}
                </main>

            </div>
        </div>
    );
}