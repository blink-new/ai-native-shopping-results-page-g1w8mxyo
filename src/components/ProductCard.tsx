import React from 'react'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Star, ShoppingCart, Shield, Leaf, TrendingUp, TrendingDown, Minus } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  isComparisonMode: boolean
  allProducts?: Product[]
}

export function ProductCard({ product, isComparisonMode, allProducts = [] }: ProductCardProps) {
  const {
    name,
    brand,
    image,
    bestFor,
    price,
    priceValue,
    features,
    certifications,
    rating,
    reviews
  } = product

  // Comparison logic
  const maxPrice = Math.max(...allProducts.map(p => p.priceValue))
  const minPrice = Math.min(...allProducts.map(p => p.priceValue))
  const maxRating = Math.max(...allProducts.map(p => p.rating))
  const minRating = Math.min(...allProducts.map(p => p.rating))
  
  const savings = maxPrice - priceValue
  const isHighestPrice = priceValue === maxPrice
  const isLowestPrice = priceValue === minPrice
  const isHighestRating = rating === maxRating
  const isLowestRating = rating === minRating

  // Get unique features for this product
  const allFeatures = allProducts.flatMap(p => p.features)
  const uniqueFeatures = features.filter(feature => 
    allProducts.filter(p => p.features.includes(feature)).length === 1
  )

  // Get unique certifications
  const allCertifications = allProducts.flatMap(p => p.certifications)
  const uniqueCertifications = certifications.filter(cert => 
    allProducts.filter(p => p.certifications.includes(cert)).length === 1
  )

  const getRatingColor = () => {
    if (!isComparisonMode) return ''
    if (isHighestRating) return 'bg-green-100 border-green-300'
    if (isLowestRating) return 'bg-red-100 border-red-300'
    return 'bg-yellow-100 border-yellow-300'
  }

  const getPriceColor = () => {
    if (!isComparisonMode) return ''
    if (isLowestPrice) return 'text-green-600'
    if (isHighestPrice) return 'text-red-600'
    return 'text-orange-600'
  }

  return (
    <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
      isComparisonMode 
        ? 'ring-2 ring-blue-200 bg-blue-50/20 shadow-md' 
        : 'hover:shadow-lg'
    }`}>
      <CardContent className="p-6">
        {/* Comparison Mode Header */}
        {isComparisonMode && (
          <div className="mb-4 p-3 bg-white rounded-lg border border-blue-200">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-blue-900">Product #{product.id}</span>
              <div className="flex items-center gap-2">
                {isHighestRating && (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Top Rated
                  </Badge>
                )}
                {isLowestPrice && (
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    Best Value
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

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
        <div className={`flex items-center gap-2 mb-4 p-2 rounded-lg transition-all ${
          isComparisonMode ? getRatingColor() : ''
        }`}>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-gray-500">({reviews.toLocaleString()} reviews)</span>
          {isComparisonMode && (
            <div className="ml-auto flex items-center gap-1 text-xs">
              {isHighestRating && <TrendingUp className="w-3 h-3 text-green-600" />}
              {isLowestRating && <TrendingDown className="w-3 h-3 text-red-600" />}
              {!isHighestRating && !isLowestRating && <Minus className="w-3 h-3 text-orange-600" />}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold transition-colors ${
              isComparisonMode ? getPriceColor() : 'text-gray-900'
            }`}>
              {price}
            </span>
            {isComparisonMode && savings > 0 && !isHighestPrice && (
              <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                Save ${savings.toFixed(2)}
              </Badge>
            )}
          </div>
          {isComparisonMode && (
            <p className="text-xs text-gray-500 mt-1">
              {isLowestPrice && "💰 Best price"}
              {isHighestPrice && "💸 Most expensive"}
              {!isLowestPrice && !isHighestPrice && "💵 Mid-range"}
            </p>
          )}
        </div>

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert, index) => {
                const isUnique = uniqueCertifications.includes(cert)
                return (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className={`text-xs transition-all ${
                      isComparisonMode && isUnique
                        ? 'bg-purple-100 text-purple-800 border-purple-300 ring-2 ring-purple-200'
                        : 'bg-green-100 text-green-800 border-green-200'
                    }`}
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    {cert}
                    {isComparisonMode && isUnique && (
                      <span className="ml-1 text-purple-600">★</span>
                    )}
                  </Badge>
                )
              })}
            </div>
            {isComparisonMode && uniqueCertifications.length > 0 && (
              <p className="text-xs text-purple-600 mt-2 font-medium">
                ★ Unique certification{uniqueCertifications.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
        )}

        {/* Key Features */}
        <div className={`space-y-2 transition-all ${
          isComparisonMode ? 'bg-white p-3 rounded-lg border border-gray-200' : ''
        }`}>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <Leaf className="w-4 h-4 text-green-600" />
            Key Features:
          </p>
          <ul className="space-y-1">
            {features.map((feature, index) => {
              const isUnique = uniqueFeatures.includes(feature)
              return (
                <li 
                  key={index} 
                  className={`text-sm flex items-start gap-2 transition-all ${
                    isComparisonMode && isUnique
                      ? 'text-purple-700 font-medium bg-purple-50 p-2 rounded border border-purple-200'
                      : 'text-gray-600'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                    isComparisonMode && isUnique ? 'bg-purple-500' : 'bg-green-500'
                  }`}></span>
                  {feature}
                  {isComparisonMode && isUnique && (
                    <span className="ml-auto text-purple-600 text-xs font-bold">UNIQUE</span>
                  )}
                </li>
              )
            })}
          </ul>
          {isComparisonMode && uniqueFeatures.length > 0 && (
            <p className="text-xs text-purple-600 mt-2 font-medium">
              {uniqueFeatures.length} unique feature{uniqueFeatures.length > 1 ? 's' : ''} highlighted
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className={`w-full font-medium transition-all ${
          isComparisonMode && isLowestPrice
            ? 'bg-green-600 hover:bg-green-700 text-white ring-2 ring-green-300 shadow-lg'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isComparisonMode && isLowestPrice ? 'Buy Now - Best Value!' : 'Buy Now'}
        </Button>
      </CardFooter>
    </Card>
  )
}