import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Star, Shield, DollarSign, Award, CheckCircle, XCircle } from 'lucide-react'

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

interface ComparisonTableProps {
  products: Product[]
  isVisible: boolean
}

export function ComparisonTable({ products, isVisible }: ComparisonTableProps) {
  if (!isVisible) return null

  const maxPrice = Math.max(...products.map(p => p.priceValue))
  const minPrice = Math.min(...products.map(p => p.priceValue))
  const maxRating = Math.max(...products.map(p => p.rating))

  // Get all unique features across products
  const allFeatures = Array.from(new Set(products.flatMap(p => p.features)))
  const allCertifications = Array.from(new Set(products.flatMap(p => p.certifications)))

  return (
    <Card className="w-full animate-in slide-in-from-top-4 duration-500">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          Detailed Side-by-Side Comparison
        </CardTitle>
        <p className="text-sm text-gray-600">
          Compare all features, certifications, and key attributes across products
        </p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-4 font-medium text-gray-900 min-w-[200px]">
                  Attribute
                </th>
                {products.map((product) => (
                  <th key={product.id} className="text-center p-4 min-w-[250px]">
                    <div className="space-y-2">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg mx-auto"
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-900">{product.brand}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{product.name}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody>
              {/* Price Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Price
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="space-y-1">
                      <span className={`text-lg font-bold ${
                        product.priceValue === minPrice ? 'text-green-600' :
                        product.priceValue === maxPrice ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {product.price}
                      </span>
                      {product.priceValue === minPrice && (
                        <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                          Best Value
                        </Badge>
                      )}
                      {product.priceValue === maxPrice && (
                        <Badge className="bg-red-100 text-red-800 border-red-300 text-xs">
                          Most Expensive
                        </Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Rating & Reviews
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className={`font-medium ${
                          product.rating === maxRating ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {product.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {product.reviews.toLocaleString()} reviews
                      </p>
                      {product.rating === maxRating && (
                        <Badge className="bg-green-100 text-green-800 border-green-300 text-xs">
                          Highest Rated
                        </Badge>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Best For Row */}
              <tr className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900">
                  Best For
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {product.bestFor}
                    </p>
                  </td>
                ))}
              </tr>

              {/* Certifications Section */}
              <tr className="border-b bg-green-50">
                <td colSpan={products.length + 1} className="p-3">
                  <h4 className="font-medium text-green-900 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Certifications & Trust Badges
                  </h4>
                </td>
              </tr>
              
              {allCertifications.map((certification) => (
                <tr key={certification} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-700 pl-8">
                    {certification}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {product.certifications.includes(certification) ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Features Section */}
              <tr className="border-b bg-blue-50">
                <td colSpan={products.length + 1} className="p-3">
                  <h4 className="font-medium text-blue-900">
                    Key Features
                  </h4>
                </td>
              </tr>
              
              {allFeatures.map((feature) => (
                <tr key={feature} className="border-b hover:bg-gray-50">
                  <td className="p-4 text-sm text-gray-700 pl-8">
                    {feature}
                  </td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {product.features.includes(feature) ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}