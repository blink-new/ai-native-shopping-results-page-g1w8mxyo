import React from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { BarChart3, Eye, Info } from 'lucide-react'

interface ComparisonToggleProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}

export function ComparisonToggle({ isEnabled, onToggle }: ComparisonToggleProps) {
  return (
    <div className="space-y-4">
      {/* Main Toggle */}
      <div className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
        isEnabled 
          ? 'bg-blue-50 border-blue-200 shadow-md' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors ${
            isEnabled ? 'bg-blue-100' : 'bg-blue-50'
          }`}>
            <BarChart3 className={`w-5 h-5 ${
              isEnabled ? 'text-blue-700' : 'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Comparison Mode</h3>
            <p className="text-sm text-gray-600">
              {isEnabled 
                ? 'Highlighting key differences across products' 
                : 'Compare features side-by-side'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => onToggle(!isEnabled)}
            className={`transition-all duration-200 ${
              isEnabled 
                ? 'bg-blue-600 hover:bg-blue-700 shadow-md' 
                : 'hover:bg-blue-50 hover:border-blue-300'
            }`}
          >
            <Eye className="w-4 h-4 mr-2" />
            {isEnabled ? "Exit Comparison" : "Compare Products"}
          </Button>
          
          <Switch
            checked={isEnabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>

      {/* Comparison Mode Instructions */}
      {isEnabled && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Comparison Mode Active</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p>• <strong>Key features</strong> are highlighted with colored backgrounds</p>
                <p>• <strong>Price differences</strong> show savings compared to highest price</p>
                <p>• <strong>Unique certifications</strong> are marked with special badges</p>
                <p>• <strong>Rating differences</strong> are color-coded for easy comparison</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}