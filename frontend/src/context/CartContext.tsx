import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  total: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);

      const updatedCart = existingItem
        ? prevCart.map((c) =>
            c.bookId === item.bookId
              ? {
                  ...c,
                  quantity: c.quantity + item.quantity,
                  subtotal: (c.quantity + item.quantity) * c.price,
                }
              : c
          )
        : [...prevCart, item];

      setTotal(updatedCart.reduce((sum, i) => sum + i.subtotal, 0));
      return updatedCart;
    });
  };

  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
  };

  const clearCart = () => {
    setCart(() => []);
    setTotal(() => 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
