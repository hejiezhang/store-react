import { useEffect, useState } from 'react';
import type { Product } from '../types';
import { productService } from '../services/product.service';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-8 flex-grow">
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Welcome to Store</h1>
          <p className="text-xl text-gray-600 mb-8">Discover amazing products at great prices</p>
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
        </div>

        <div className="py-16 bg-white rounded-lg shadow-sm px-8 mt-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <h3 className="text-sm text-gray-700">
                    <a href={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="w-full bg-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex space-x-6">
              <a href="/about" className="hover:text-gray-900">About</a>
              <a href="/contact" className="hover:text-gray-900">Contact</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy</a>
              <a href="/terms" className="hover:text-gray-900">Terms</a>
            </div>
            <div>© {new Date().getFullYear()} Store. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
