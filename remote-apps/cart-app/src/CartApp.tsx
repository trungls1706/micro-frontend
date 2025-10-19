import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartAppProps {
  cart?: CartItem[];
  onRemoveFromCart?: (productId: number) => void;
  onUpdateQuantity?: (productId: number, quantity: number) => void;
  onClearCart?: () => void;
}

export default function CartApp({
  cart = [],
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart
}: CartAppProps) {
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(productId, quantity);
    }
  };

  const handleRemove = (productId: number) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(productId);
    }
  };

  const handleClear = () => {
    if (onClearCart) {
      onClearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-xl text-gray-500">Your cart is empty</p>
          <p className="text-gray-400 mt-2">Add some products to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
        <button
          onClick={handleClear}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Trash2 size={20} />
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-lg text-blue-600 font-bold">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-200"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-200"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="text-right min-w-[100px]">
              <p className="text-xl font-bold text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors duration-200"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-gray-800">Total:</span>
          <span className="text-blue-600">${getCartTotal().toFixed(2)}</span>
        </div>
        <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
