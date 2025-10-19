import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useSharedStore } from '../hooks/useSharedStore';

export default function CartRemote() {
  const { state, removeFromCart, updateQuantity, clearCart, getCartTotal } = useSharedStore();

  if (state.cart.length === 0) {
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
          onClick={clearCart}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <Trash2 size={20} />
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {state.cart.map(item => (
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
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors duration-200"
              >
                <Minus size={20} />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
              onClick={() => removeFromCart(item.id)}
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
