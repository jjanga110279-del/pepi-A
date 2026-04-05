import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 'p1',
      name: '시그니처 울 트라우저',
      price: 425000,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop',
      color: 'Charcoal',
      size: 'M',
      quantity: 1
    },
    {
      id: 'p2',
      name: '오버사이즈 코튼 셔츠',
      price: 89000,
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c717658?q=80&w=200&auto=format&fit=crop',
      color: 'White',
      size: 'L',
      quantity: 1
    }
  ]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.color === product.color && item.size === product.size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.color === product.color && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id, color, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.color === color && item.size === size)));
  };

  const updateQuantity = (id, color, size, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.color === color && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalCount,
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
