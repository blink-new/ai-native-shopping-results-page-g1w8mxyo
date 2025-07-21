import React from 'react'
import { ProductCard } from './ProductCard'
import { ScrollArea } from './ui/scroll-area'

interface Product {
  id: number
  name: string
  brand: string
  image: string
  bestFor: string
  price: string
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
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Recommended Products
      </h2>
      
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isComparisonMode={isComparisonMode}
          />
        ))}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4">
            {products.map((product) => (
              <div key={product.id} className="w-80 flex-shrink-0">
                <ProductCard 
                  product={product} 
                  isComparisonMode={isComparisonMode}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}