import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Wireless Keyboard',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'USB-C Hub',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Laptop Stand',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Webcam HD',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop'
  }
];

interface ProductsAppProps {
  onAddToCart?: (product: Product) => void;
  products?: Product[];
}

export default function ProductsApp({ onAddToCart, products = mockProducts }: ProductsAppProps) {
  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Products Catalog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
