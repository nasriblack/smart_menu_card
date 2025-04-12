import React from 'react';
import { MenuCategory as MenuCategoryType, MenuItem } from '../data/menuData';
import { Plus } from 'lucide-react';

interface MenuCategoryProps {
  category: MenuCategoryType;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuCategory: React.FC<MenuCategoryProps> = ({ category, onAddToCart }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <span className="text-lg font-bold text-emerald-600">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => onAddToCart(item)}
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors"
              >
                <Plus size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};