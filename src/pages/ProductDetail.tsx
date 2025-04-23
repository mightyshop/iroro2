import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, ArrowLeft, Shield, Truck, RefreshCw, CheckCircle } from 'lucide-react';
import { products } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <button 
            onClick={() => navigate('/shop')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Find related products in the same category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate('/shop')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full rounded-lg"
            />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={product.seller.avatar} 
                alt={product.seller.name} 
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">{product.seller.name}</span>
                {product.seller.rating >= 4.8 && (
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                )}
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{product.rating}</span>
              </div>
              <span className="text-gray-400">({product.reviews} reviews)</span>
              <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                {product.category}
              </span>
            </div>

            <p className="text-gray-300 mb-8">{product.description}</p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mb-8">
              <span className="text-3xl font-bold text-green-500">${product.price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg transition-colors flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Shield className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm">Secure Payment</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm">Fast Delivery</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 text-center">
                <RefreshCw className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer"
                  onClick={() => navigate(`/shop/${relatedProduct.id}`)}
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center flex-1 min-w-0">
                        <img
                          src={relatedProduct.seller.avatar}
                          alt={relatedProduct.seller.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="ml-2 flex items-center space-x-1 truncate">
                          <span className="text-sm text-gray-400 truncate">
                            {relatedProduct.seller.name}
                          </span>
                          {relatedProduct.seller.rating >= 4.8 && (
                            <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        relatedProduct.type === 'digital' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {relatedProduct.type === 'digital' ? 'Digital' : 'Physical'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{relatedProduct.title}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-500">
                        ${relatedProduct.price}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-400">
                          {relatedProduct.rating} ({relatedProduct.reviews})
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {relatedProduct.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;