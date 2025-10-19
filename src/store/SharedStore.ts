type Listener = () => void;

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  products: Product[];
}

class SharedStore {
  private state: StoreState = {
    cart: [],
    products: []
  };

  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  getState(): StoreState {
    return this.state;
  }

  setProducts(products: Product[]) {
    this.state = {
      ...this.state,
      products
    };
    this.notify();
  }

  addToCart(product: Product) {
    const existingItem = this.state.cart.find(item => item.id === product.id);

    if (existingItem) {
      this.state = {
        ...this.state,
        cart: this.state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      this.state = {
        ...this.state,
        cart: [...this.state.cart, { ...product, quantity: 1 }]
      };
    }
    this.notify();
  }

  removeFromCart(productId: number) {
    this.state = {
      ...this.state,
      cart: this.state.cart.filter(item => item.id !== productId)
    };
    this.notify();
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.state = {
      ...this.state,
      cart: this.state.cart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    };
    this.notify();
  }

  clearCart() {
    this.state = {
      ...this.state,
      cart: []
    };
    this.notify();
  }

  getCartTotal(): number {
    return this.state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  getCartItemsCount(): number {
    return this.state.cart.reduce((count, item) => count + item.quantity, 0);
  }
}

export const sharedStore = new SharedStore();
export type { Product, CartItem, StoreState };
