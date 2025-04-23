import React, { useState, useRef } from 'react';
import { ShoppingBag, Star, Search, X, FileText, Package, CheckCircle, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { featuredImages } from '../data/featured';
import ImageSlider from '../components/ImageSlider';
import TopBar from '../components/TopBar';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<'all' | 'digital' | 'physical'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <TopBar />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with Search and Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1 max-w-3xl relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, brands and categories"
                  className="w-full bg-gray-800 rounded-lg pl-12 pr-10 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4 ml-4">
              <button
                onClick={() => navigate('/shop/cart')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </button>
              <button
                onClick={() => navigate('/shop/orders')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Orders</span>
              </button>
            </div>
          </div>

          <ImageSlider images={featuredImages} />

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600'
                      : 'bg-gray-700'
                  }`}>
                    {category.icon}
                  </div>
                  <span className="text-xs text-center">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setSelectedType('all')}
              className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'all'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <ShoppingBag className="w-6 h-6" />
              <span>All Products</span>
            </button>
            
            <button
              onClick={() => setSelectedType('digital')}
              className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'digital'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <FileText className="w-6 h-6" />
              <span>Digital Products</span>
            </button>
            
            <button
              onClick={() => setSelectedType('physical')}
              className={`p-4 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                selectedType === 'physical'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <Package className="w-6 h-6" />
              <span>Physical Products</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                onClick={() => navigate(`/shop/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 md:p-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center flex-1 min-w-0">
                      <img
                        src={product.seller.avatar}
                        alt={product.seller.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <div className="ml-2 flex items-center space-x-1 truncate">
                        <span className="text-sm text-gray-400 truncate">{product.seller.name}</span>
                        {product.seller.rating >= 4.8 && (
                          <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.type === 'digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {product.type === 'digital' ? 'Digital' : 'Physical'}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <span className="text-lg md:text-2xl font-bold text-green-500">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-xs md:text-sm text-gray-400">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs md:text-sm line-clamp-2">{product.description}</p>
                  {product.type === 'physical' && product.stock !== undefined && (
                    <div className="mt-2 md:mt-4 text-xs md:text-sm">
                      <span className={`${
                        product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <p className="text-gray-400">No products found matching your criteria</p>
            </div>
          )}

          {/* Mobile Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-2 md:hidden">
            <div className="flex items-center justify-around">
              <button 
                onClick={() => navigate('/shop/cart')}
                className="flex flex-col items-center space-y-1 p-2 text-gray-400"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="text-xs">Cart</span>
              </button>
              
              <button 
                onClick={() => navigate('/shop/orders')}
                className="flex flex-col items-center space-y-1 p-2 text-gray-400"
              >
                <ShoppingBag className="w-6 h-6" />
                <span className="text-xs">Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;