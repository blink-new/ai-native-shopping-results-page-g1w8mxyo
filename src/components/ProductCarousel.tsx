import React from 'react'
import { ProductCard } from './ProductCard'

interface Product {
  id: number
  name: string
  brand: string
  image: string
  bestFor: string
  price: string
  priceValue: number
  features: string[]
  certifications: string[]
  rating: number
  reviews: number
}

interface ProductCarouselProps {
  products: Product[]
  isComparisonMode: boolean
}

export function ProductCarousel({ products, isComparisonMode }: ProductCarouselProps) {
  return (
    <div className="space-y-6">
      {/* Comparison Mode Header */}
      {isComparisonMode && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              🔍 Comparison Mode Active
            </h2>
            <p className="text-gray-600 mb-4">
              Analyzing differences across all 3 products to help you make the best choice
            </p>
            
            {/* Comparison Legend */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Best Value/Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span>Unique Features</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Highest Price/Lowest Rating</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Mid-Range</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className={`transition-all duration-500 ${
        isComparisonMode 
          ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' 
          : 'flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory'
      }`}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className={`transition-all duration-300 ${
              isComparisonMode 
                ? 'w-full' 
                : 'flex-shrink-0 w-80 snap-center'
            }`}
          >
            <ProductCard 
              product={product} 
              isComparisonMode={isComparisonMode}
              allProducts={products}
            />
          </div>
        ))}
      </div>

      {/* Comparison Summary */}
      {isComparisonMode && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">📊 Quick Comparison Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product, index) => {
              const maxPrice = Math.max(...products.map(p => p.priceValue))
              const minPrice = Math.min(...products.map(p => p.priceValue))
              const maxRating = Math.max(...products.map(p => p.rating))
              
              const isLowestPrice = product.priceValue === minPrice
              const isHighestRating = product.rating === maxRating
              
              return (
                <div key={product.id} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Product #{product.id}: {product.brand}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span className={isLowestPrice ? 'text-green-600 font-medium' : ''}>
                        {product.price}
                        {isLowestPrice && ' 🏆'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <span className={isHighestRating ? 'text-green-600 font-medium' : ''}>
                        {product.rating}/5
                        {isHighestRating && ' ⭐'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Features:</span>
                      <span>{product.features.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Certifications:</span>
                      <span>{product.certifications.length}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Mobile scroll hint */}
      {!isComparisonMode && (
        <div className="lg:hidden text-center">
          <p className="text-sm text-gray-500">
            ← Swipe to see all products →
          </p>
        </div>
      )}
    </div>
  )
}