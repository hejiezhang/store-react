import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center w-full h-12 rounded-full border border-gray-200 hover:shadow-lg focus-within:shadow-lg px-5">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow ml-3 outline-none text-gray-700"
            placeholder="Search products..."
          />
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded hover:border hover:border-gray-300"
          >
            Search Products
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded hover:border hover:border-gray-300"
          >
            Browse All
          </button>
        </div>
      </form>
    </div>
  );
}
