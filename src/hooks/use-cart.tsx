"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Plant } from '@/lib/plants';
import { useToast } from "@/hooks/use-toast"

export type CartItem = {
  plant: Plant;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem('verdantVistaCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('verdantVistaCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const addToCart = (plant: Plant) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.plant.id === plant.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.plant.id === plant.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { plant, quantity: 1 }];
    });
    toast({
      title: "Added to Cart",
      description: `${plant.name} is now in your cart.`,
    })
  };

  const removeFromCart = (plantId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.plant.id !== plantId));
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.plant.id === plantId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.plant.price * item.quantity, 0);
  const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
