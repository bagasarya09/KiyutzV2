
// Nomor WA toko: format '62...' (tanpa + dan tanpa 0 di depan)
// contoh: 081234567890 → 6281234567890
const WA_NUMBER = '628895327977461';   // 👈 GANTI dengan nomormu

export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
  }).format(Number(n) || 0);

export function getSubtotal(items) {
  return items.reduce((sum, i) => sum + (Number(i.price) || 0) * i.qty, 0);
}

export function buildWhatsAppCheckout(items) {
  const subtotal = getSubtotal(items);

  let msg = `Halo *Kiyutz*\n`;
  msg += `Saya mau memesan produk berikut:\n\n`;

  items.forEach((i, index) => {
    const lineTotal = (Number(i.price) || 0) * i.qty;
    msg += `${index + 1}. *${i.name}*\n`;
    msg += `   ${i.qty} x ${rupiah(i.price)} = ${rupiah(lineTotal)}\n`;
  });

  msg += `\n*Subtotal: ${rupiah(subtotal)}*\n\n`;
  msg += `Mohon info ketersediaan & cara pembayarannya ya. Terima kasih! 🙏`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}