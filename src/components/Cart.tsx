import React from 'react';
import { MenuItem } from '../data/menuData';
import { X } from 'lucide-react';

interface CartProps {
  items: { item: MenuItem; quantity: number }[];
  onRemove: (itemId: string) => void;
  onQuantityChange: (itemId: string, newQuantity: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onQuantityChange }) => {
  const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(({ item, quantity }) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value, 10))}
                    className="w-16 px-2 py-1 border rounded text-center"
                  />
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-emerald-600">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-emerald-500 text-white py-3 rounded-md hover:bg-emerald-600 transition-colors">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};