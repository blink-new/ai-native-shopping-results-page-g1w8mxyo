import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Search, Sparkles, Mic } from 'lucide-react'

interface PersistentSearchBarProps {
  initialQuery: string
  onSearch: (query: string) => void
}

export function PersistentSearchBar({ initialQuery, onSearch }: PersistentSearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-5 h-5 text-green-500" />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask for anything... 'organic baby formula' or 'best yoga mats under $50'"
              className="pl-12 pr-12 py-3 text-base border-green-200 focus:border-green-400 focus:ring-green-400 rounded-xl"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        <div className="flex items-center justify-center mt-3">
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Powered by AI • Ask in natural language
          </p>
        </div>
      </div>
    </div>
  )
}