import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { useCart } from '@/Context/CartContext';
import { buildWhatsAppCheckout, getSubtotal, rupiah } from '@/utils/checkout';

export default function Cart() {
  const { items, updateQty, removeItem, clearCart } = useCart();
  const subtotal = getSubtotal(items);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Keranjang masih kosong 🛒');
      return;
    }
    const url = buildWhatsAppCheckout(items);
    window.open(url, '_blank');   // buka WhatsApp
    // clearCart();  // opsional: kosongkan keranjang setelah checkout
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <ShoppingCart size={40} className="text-secondary" />
        <p className="font-semibold text-primary">Keranjang masih kosong</p>
        <p className="text-sm text-secondary">Yuk pilih produk favoritmu dulu!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Daftar item */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-lg border border-tertiary bg-white p-3"
          >
            <img
              src={item.image || 'https://placehold.co/80x80'}
              alt={item.name}
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />

            <div className="min-w-0 flex-1">
              <h4 className="truncate font-semibold text-primary">{item.name}</h4>
              <p className="text-sm text-secondary">{rupiah(item.price)}</p>
            </div>

            {/* Kontrol qty */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.name, item.qty - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-tertiary text-primary transition hover:bg-tertiary"
                aria-label="Kurangi"
              >
                <Minus size={14} />
              </button>
              <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
              <button
                onClick={() => updateQty(item.name, item.qty + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-tertiary text-primary transition hover:bg-tertiary"
                aria-label="Tambah"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Total per item */}
            <div className="w-24 text-right text-sm font-bold text-primary">
              {rupiah((Number(item.price) || 0) * item.qty)}
            </div>

            <button
              onClick={() => removeItem(item.name)}
              className="text-danger transition hover:opacity-70"
              aria-label="Hapus"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="flex items-center justify-between border-t border-tertiary pt-4">
        <span className="text-secondary">Subtotal</span>
        <span className="text-xl font-bold text-primary">{rupiah(subtotal)}</span>
      </div>

      {/* Aksi */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleCheckout}
          className="w-full rounded-full bg-accent px-5 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Checkout via WhatsApp
        </button>
        <button
          onClick={clearCart}
          className="w-full rounded-full border border-tertiary px-5 py-2.5 text-sm font-medium text-secondary transition hover:bg-tertiary"
        >
          Kosongkan Keranjang
        </button>
      </div>
    </div>
  );
}