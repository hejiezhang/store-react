import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { productService } from '../services/product.service';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getProducts();
        setProducts(response.content);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex justify-between items-center mb-12 border-b pb-6">
          <h1 className="text-3xl font-semibold text-gray-900">All Products</h1>
          <div className="flex items-center space-x-6">
            <select className="rounded-lg border-gray-300 py-2 px-4 text-base focus:ring-blue-500 focus:border-blue-500 bg-gray-50">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
            <select className="rounded-lg border-gray-300 py-2 px-4 text-base focus:ring-blue-500 focus:border-blue-500 bg-gray-50">
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                <a href={`/products/${product.id}`} className="hover:underline">
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                <button
                  className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  onClick={() => window.location.href = `/products/${product.id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            Previous
          </button>
          <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">
            1
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            2
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            3
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
