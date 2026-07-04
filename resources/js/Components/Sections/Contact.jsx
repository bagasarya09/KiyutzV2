import { useForm } from '@inertiajs/react';
import { Mail, Phone, MapPin } from 'lucide-react';
import bgLogin from '../../assets/bgLogin.png';

function InfoCard({ icon: Icon, title, value }) {
    return (
        <div className="flex flex-col items-start gap-3 rounded-lg bg-white p-5 shadow-sm">
            <div className="flex h-[49px] w-[49px] items-center justify-center rounded bg-accent/10">
                <Icon size={24} className="text-accent" />
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="font-sans text-xl font-semibold text-accent">{title}</h3>
                <p className="font-['Questrial'] text-sm text-secondary">{value}</p>
            </div>
        </div>
    );
}

export default function Contact() {
    const { data, setData, post, processing, reset } = useForm({
        name: '',
        email: '',
        message: '',
    });
    const bgFormStyle = {
    backgroundImage: `url(${bgLogin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
};

    const submit = (e) => {
        e.preventDefault();
        post('/contact', { onSuccess: () => reset() });
    };

    const inputClass =
        'h-[60px] rounded border-0 bg-white px-6 font-sans text-base text-primary outline-none placeholder:text-accent/70 focus:ring-2 focus:ring-accent/40';

    return (
        <section
            id="contact"
            className="mx-auto flex w-full max-w-[1200px] scroll-mt-24 flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-10"
        >
            {/* ===== Kiri: Info ===== */}
            <div className="flex w-full flex-col gap-14 lg:max-w-[471px]">
                <div className="flex flex-col gap-3">
                    <h2 className="font-sans text-5xl font-bold leading-tight text-[#2A2E53]">
                        Hubungi Kami
                    </h2>
                    <p className="max-w-[384px] font-['Questrial'] text-sm leading-[21px] text-secondary">
                        Punya pertanyaan, ingin memesan, atau tertarik bekerja sama? Tim Kiyutz siap
                        membantu Anda.
                    </p>
                </div>

                <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <InfoCard icon={Mail} title="Email Us" value="kiyuts@gmail.com" />
                        <InfoCard icon={Phone} title="Call Us" value="+62123456" />
                    </div>
                    <InfoCard icon={MapPin} title="Our Location" value="Jl xxxxxx xxxxx xxx xxx" />
                </div>
            </div>

            {/* ===== Kanan: Form ===== */}
            <form
                onSubmit={submit}
                style={bgFormStyle}
                className="flex w-full flex-1 flex-col gap-4 rounded-lg p-6 sm:p-12"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClass}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={inputClass}
                    />
                </div>
                <textarea
                    placeholder="Message"
                    rows={8}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className="min-h-[296px] flex-1 resize-none rounded border-0 bg-white px-6 py-5 font-sans text-base text-primary outline-none placeholder:text-accent/70 focus:ring-2 focus:ring-accent/40"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-accent px-5 py-2.5 font-['Questrial'] text-base text-white shadow-[0px_1px_4px_rgba(0,0,0,0.05)] transition hover:opacity-90 disabled:opacity-60"
                >
                    {processing ? 'Mengirim...' : 'Submit'}
                </button>
            </form>
        </section>
    );
}