import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'yash-dress-point-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addToCart(product, variant = {}) {
    const key = `${product._id}-${variant.size || ''}-${variant.color || ''}`;
    setItems(current => {
      const existing = current.find(item => item.key === key);
      if (existing) {
        return current.map(item => item.key === key
          ? { ...item, quantity: item.quantity + 1 }
          : item);
      }
      return [...current, {
        key,
        productId: product._id,
        name: product.name,
        price: Number(product.price),
        image: product.images?.[0] || '',
        size: variant.size || '',
        color: variant.color || '',
        quantity: 1
      }];
    });
  }

  function updateQuantity(key, quantity) {
    if (quantity < 1) return removeFromCart(key);
    setItems(current => current.map(item =>
      item.key === key ? { ...item, quantity } : item
    ));
  }

  function removeFromCart(key) {
    setItems(current => current.filter(item => item.key !== key));
  }

  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
