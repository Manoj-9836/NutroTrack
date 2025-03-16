import React from 'react';
import { Search } from 'lucide-react';

interface FoodSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchFood: (query: string) => void;
  loading: boolean;
}

const FoodSearch: React.FC<FoodSearchProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  searchFood,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchFood(searchQuery);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search for Food</h2>
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a food item (e.g., apple, banana)..."
            className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-md transition-colors flex items-center"
        >
          {loading ? (
            <span className="animate-pulse">Searching...</span>
          ) : (
            <>
              <Search size={18} className="mr-2" />
              Find calories
            </>
          )}
        </button>
      </form>
      <p className="text-sm text-gray-500 mt-2">
        Simply enter food names like "apple", "banana", or "pizza" - no need to specify quantities
      </p>
    </div>
  );
};

export default FoodSearch;