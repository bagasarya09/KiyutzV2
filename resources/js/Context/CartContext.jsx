import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const saved = localStorage.getItem('cart');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product) => {
        setItems((prev) => {
            const found = prev.find((i) => i.name === product.name);
            if (found) {
                return prev.map((i) =>
                    i.name === product.name ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeItem = (name) => setItems((prev) => prev.filter((i) => i.name !== name));

    const updateQty = (name, qty) =>
        setItems((prev) =>
            qty <= 0
                ? prev.filter((i) => i.name !== name)
                : prev.map((i) => (i.name === name ? { ...i, qty } : i))
        );

    const clearCart = () => setItems([]);
    const totalCount = items.reduce((sum, i) => sum + i.qty, 0);

    const value = { items, addItem, removeItem, updateQty, clearCart, totalCount };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart harus di dalam CartProvider');
    return ctx;
}