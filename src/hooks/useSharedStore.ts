import { useState, useEffect } from 'react';
import { sharedStore, StoreState } from '../store/SharedStore';

export function useSharedStore() {
  const [state, setState] = useState<StoreState>(sharedStore.getState());

  useEffect(() => {
    const unsubscribe = sharedStore.subscribe(() => {
      setState(sharedStore.getState());
    });

    return unsubscribe;
  }, []);

  return {
    state,
    addToCart: sharedStore.addToCart.bind(sharedStore),
    removeFromCart: sharedStore.removeFromCart.bind(sharedStore),
    updateQuantity: sharedStore.updateQuantity.bind(sharedStore),
    clearCart: sharedStore.clearCart.bind(sharedStore),
    setProducts: sharedStore.setProducts.bind(sharedStore),
    getCartTotal: sharedStore.getCartTotal.bind(sharedStore),
    getCartItemsCount: sharedStore.getCartItemsCount.bind(sharedStore)
  };
}
