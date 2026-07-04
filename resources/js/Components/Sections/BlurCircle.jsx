export default function BlurCircle({ className = '' }) {
    // style dipisah jadi variabel (menghindari inline double-brace)
    const blurStyle = {
        background:
            'radial-gradient(ellipse 46.34% 46.34% at 50% 50%, var(--Primary, #2A2E53) 0%, #DF0DC0 100%)',
        opacity: 0.32,
        borderRadius: 9999,
        filter: 'blur(150px)',
    };

    return (
        <div className={`pointer-events-none absolute ${className}`}>
            <div className="h-full w-full" style={blurStyle} />
        </div>
    );
}