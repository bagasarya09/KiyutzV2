export default function Button({ variant = 'primary', className = '', children, ...props }) {
    const base = 'rounded-full px-6 py-2 text-body font-semibold transition';
    const variants = {
        primary: 'bg-primary text-white hover:opacity-90',
        accent:  'bg-accent text-white hover:opacity-90',
        ghost:   'text-primary hover:text-accent',
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
}