const galleryImages = [
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
    'https://placehold.co/235x109', 'https://placehold.co/235x109',
];

function EdgeBlur({ side = 'left' }) {
    const blurStyle = { filter: 'blur(20.25px)' };
    const position = side === 'left' ? 'left-0' : 'right-0 -scale-x-100';

    return (
        <div
            className={`pointer-events-none absolute inset-y-0 z-10 w-40 ${position}`}
            style={blurStyle}
        >
            <svg viewBox="0 0 100 400" preserveAspectRatio="none" className="h-full w-full">
                <defs>
                    <linearGradient id={`edgeGrad-${side}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2A2E53" />
                        <stop offset="50%" stopColor="#C972BC" />
                        <stop offset="100%" stopColor="#F6C3EF" />
                    </linearGradient>
                </defs>
                <path d="M0,0 L100,0 Q40,200 100,400 L0,400 Z" fill={`url(#edgeGrad-${side})`} />
            </svg>
        </div>
    );
}

export default function Gallery({ images = galleryImages }) {
    return (
         <section id="gallery" className="relative z-10 hidden w-full py-16 md:block">
            <div className="relative w-full overflow-hidden">
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                    {images.map((src, i) => (
                        <div key={i} className="overflow-hidden rounded-[4px]">
                            <img
                                src={src}
                                alt=""
                                loading="lazy"
                                className="aspect-[235/109] w-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                <EdgeBlur side="left" />
                <EdgeBlur side="right" />
            </div>
        </section>
    );
}