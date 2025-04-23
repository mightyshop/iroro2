import React from 'react';
import { ShoppingBag, Home, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-2 md:hidden">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => navigate('/shop')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Shop</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop/cart')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop/cart' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="text-xs">Cart</span>
          </button>
          
          <button 
            onClick={() => navigate('/shop/orders')}
            className={`flex flex-col items-center space-y-1 p-2 ${
              location.pathname === '/shop/orders' ? 'text-blue-500' : 'text-gray-400'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Orders</span>
          </button>
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="hidden md:flex fixed top-8 right-8 z-50 space-x-4" style={{ position: 'fixed' }}>
        <button 
          onClick={() => navigate('/shop/cart')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            location.pathname === '/shop/cart' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Cart
        </button>
        
        <button 
          onClick={() => navigate('/shop/orders')}
          className={`px-6 py-2 rounded-lg transition-colors ${
            location.pathname === '/shop/orders' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          Orders
        </button>
      </div>
    </>
  );
};

export default BottomNav;