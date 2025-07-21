import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, ShoppingCart, Shield, Leaf } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  isComparisonMode: boolean
}

export function ProductCard({ product, isComparisonMode }: ProductCardProps) {
  const {
    name,
    brand,
    image,
    bestFor,
    price,
    features,
    certifications,
    rating,
    reviews
  } = product

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${
      isComparisonMode ? 'ring-2 ring-green-200 bg-green-50/30' : ''
    }`}>
      <CardContent className="p-6">
        {/* Product Image */}
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Brand & Name */}
        <div className="mb-3">
          <p className="text-sm font-medium text-green-600 mb-1">{brand}</p>
          <h3 className="font-semibold text-gray-900 leading-tight line-clamp-2">
            {name}
          </h3>
        </div>

        {/* Best For */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 font-medium mb-1">Best for:</p>
          <p className="text-sm text-gray-800 leading-relaxed">{bestFor}</p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews.toLocaleString()} reviews)</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-green-100 text-green-800 border-green-200 text-xs"
                >
                  <Shield className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        <div className={`space-y-2 ${isComparisonMode ? 'bg-white p-3 rounded-lg border' : ''}`}>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Leaf className="w-4 h-4 text-green-600" />
            Key Features:
          </p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
}