import { useState, lazy, Suspense } from "react";
import { ShoppingCart, Package } from "lucide-react";
import { useSharedStore } from "./hooks/useSharedStore";

// @ts-ignore
const ProductsRemote = lazy(() => import("productsApp/ProductsApp"));
// @ts-ignore
const CartRemote = lazy(() => import("cartApp/CartApp"));

function App() {
  const [activeTab, setActiveTab] = useState<"products" | "cart">("products");
  const { getCartItemsCount } = useSharedStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Micro Frontend Store
            </h1>
            <nav className="flex gap-4">
              <button
                onClick={() => setActiveTab("products")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Package size={20} />
                Products
              </button>
              <button
                onClick={() => setActiveTab("cart")}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 relative ${
                  activeTab === "cart"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <ShoppingCart size={20} />
                Cart
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          {activeTab === "products" && <ProductsRemote />}
          {activeTab === "cart" && <CartRemote />}
        </Suspense>
      </main>
    </div>
  );
}

export default App;
