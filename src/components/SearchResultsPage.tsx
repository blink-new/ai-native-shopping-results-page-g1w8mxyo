import React, { useState } from 'react'
import { ProductCarousel } from './ProductCarousel'
import { AIFollowUpQuestions } from './AIFollowUpQuestions'
import { PersistentSearchBar } from './PersistentSearchBar'
import { ComparisonToggle } from './ComparisonToggle'
import { ComparisonTable } from './ComparisonTable'
import { Badge } from './ui/badge'

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Seventh Generation Free & Clear Laundry Detergent",
    brand: "Seventh Generation",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    bestFor: "Sensitive skin and babies with zero fragrances or dyes",
    price: "$12.99",
    priceValue: 12.99,
    features: ["Plant-based formula", "Hypoallergenic", "EPA Safer Choice", "Cruelty-free"],
    certifications: ["EWG Verified", "USDA BioPreferred"],
    rating: 4.6,
    reviews: 2847
  },
  {
    id: 2,
    name: "Ecover Zero Laundry Detergent",
    brand: "Ecover",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop",
    bestFor: "Eco-conscious families seeking powerful cleaning without compromise",
    price: "$9.99",
    priceValue: 9.99,
    features: ["Zero fragrance", "Plant & mineral based", "Biodegradable", "Concentrated formula"],
    certifications: ["Cradle to Cradle Certified", "Leaping Bunny"],
    rating: 4.4,
    reviews: 1923
  },
  {
    id: 3,
    name: "Molly's Suds Original Laundry Powder",
    brand: "Molly's Suds",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400&h=400&fit=crop",
    bestFor: "Natural cleaning with minimal ingredients for maximum transparency",
    price: "$15.99",
    priceValue: 15.99,
    features: ["5 simple ingredients", "Unscented", "No optical brighteners", "Made in USA"],
    certifications: ["EWG Verified", "Made Safe"],
    rating: 4.7,
    reviews: 1456
  }
]

const mockFollowUpQuestions = [
  "Prefer fragrance-free?",
  "Want refills or bulk options?",
  "Looking for EWG-verified only?",
  "Need baby-safe formulas?",
  "Interested in powder vs liquid?",
  "Want subscription delivery?"
]

export function SearchResultsPage() {
  const [searchQuery, setSearchQuery] = useState("best non-toxic laundry detergent for sensitive skin")
  const [isComparisonMode, setIsComparisonMode] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would trigger a new search
  }

  const handleFollowUpClick = (question: string) => {
    // In a real app, this would refine the search
    setSearchQuery(prev => `${prev} ${question.toLowerCase().replace('?', '')}`)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Search Results</h1>
            <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
              3 products found
            </Badge>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border">
            <p className="text-sm text-gray-600 mb-1">Your search:</p>
            <p className="text-lg font-medium text-gray-900">"{searchQuery}"</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Carousel */}
        <div className="mb-12">
          <ProductCarousel 
            products={mockProducts} 
            isComparisonMode={isComparisonMode}
          />
        </div>

        {/* AI Follow-up Questions */}
        <div className="mb-8">
          <AIFollowUpQuestions 
            questions={mockFollowUpQuestions}
            onQuestionClick={handleFollowUpClick}
          />
        </div>

        {/* Comparison Toggle */}
        <div className="mb-8">
          <ComparisonToggle 
            isEnabled={isComparisonMode}
            onToggle={setIsComparisonMode}
          />
        </div>

        {/* Detailed Comparison Table */}
        {isComparisonMode && (
          <div className="mb-8">
            <ComparisonTable 
              products={mockProducts}
              isVisible={isComparisonMode}
            />
          </div>
        )}
      </div>

      {/* Persistent Search Bar */}
      <PersistentSearchBar 
        initialQuery={searchQuery}
        onSearch={handleSearch}
      />
    </div>
  )
}