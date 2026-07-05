import { useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/Context/CartContext';

// Nomor WA toko: format '62...' (tanpa + dan tanpa 0 di depan)
const WA_NUMBER = '62895327977461';   // 👈 GANTI dengan nomor WA tokomu

// helper harga
function parsePrice(val) {
    if (typeof val === 'number') return val;
    return parseFloat(String(val).replace(/[^\d.]/g, '')) || 0;
}

function formatRupiah(n) {
    return 'Rp ' + n.toLocaleString('id-ID') + ',00';
}

export default function CartSidebar({ open, onClose }) {
    const { items, updateQty, removeItem, clearCart } = useCart();
    const subtotal = items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0);

    const qtyBtn =
        'flex h-6 w-6 items-center justify-center rounded border border-base text-primary transition hover:bg-accent hover:text-white';

    // 🔒 Kunci scroll body + tutup dengan Esc saat drawer terbuka
    useEffect(() => {
        if (!open) return;
        document.body.style.overflow = 'hidden';
        const onKey = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    // 💬 Checkout ke WhatsApp
    const handleCheckout = () => {
        if (items.length === 0) return;

        let msg = `Halo *Kiyutz* 👋\n`;
        msg += `Saya mau memesan produk berikut:\n\n`;

        items.forEach((i, index) => {
            const harga = parsePrice(i.price);
            const lineTotal = harga * i.qty;
            msg += `${index + 1}. *${i.name}*\n`;
            msg += `   ${i.qty} x ${formatRupiah(harga)} = ${formatRupiah(lineTotal)}\n`;
        });

        msg += `\n*Subtotal: ${formatRupiah(subtotal)}*\n\n`;
        msg += `Mohon info ketersediaan & cara pembayarannya ya. Terima kasih! 🙏`;

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        // clearCart(); // opsional: kosongkan keranjang setelah checkout
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
            />

            {/* Drawer */}
            <aside
                className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[380px] flex-col bg-white shadow-xl transition-transform duration-300 ${
                    open ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-base p-5">
                    <h2 className="flex items-center gap-2 font-sans text-lg font-semibold text-primary">
                        <ShoppingCart size={20} className="text-accent" /> Keranjang
                    </h2>
                    <button onClick={onClose} aria-label="Tutup" className="text-secondary transition hover:text-primary">
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-5">
                    {items.length === 0 ? (
                        <p className="mt-10 text-center font-['Questrial'] text-sm text-secondary">
                            Keranjang masih kosong.
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-4">
                            {items.map((item) => (
                                <li key={item.name} className="flex gap-3">
                                    <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded object-cover" />
                                    <div className="flex flex-1 flex-col gap-1">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-sans text-sm font-semibold text-primary">{item.name}</h3>
                                            <button onClick={() => removeItem(item.name)} className="text-secondary transition hover:text-red-500">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        {/* harga diformat + total per item */}
                                        <p className="font-['Questrial'] text-xs text-accent">
                                            {formatRupiah(parsePrice(item.price))}
                                        </p>
                                        <div className="mt-1 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => updateQty(item.name, item.qty - 1)} className={qtyBtn}><Minus size={14} /></button>
                                                <span className="w-6 text-center font-sans text-sm">{item.qty}</span>
                                                <button onClick={() => updateQty(item.name, item.qty + 1)} className={qtyBtn}><Plus size={14} /></button>
                                            </div>
                                            <span className="font-sans text-sm font-semibold text-primary">
                                                {formatRupiah(parsePrice(item.price) * item.qty)}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-base p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <span className="font-['Questrial'] text-sm text-secondary">Subtotal</span>
                            <span className="font-sans text-lg font-semibold text-accent">{formatRupiah(subtotal)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full rounded-full bg-accent px-4 py-2.5 font-['Questrial'] text-sm text-white transition hover:opacity-90"
                        >
                            Checkout via WhatsApp
                        </button>
                        <button onClick={clearCart} className="mt-2 w-full rounded-full px-4 py-2 font-['Questrial'] text-xs text-secondary transition hover:text-red-500">
                            Kosongkan Keranjang
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}