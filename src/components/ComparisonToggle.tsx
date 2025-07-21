import React from 'react'
import { Button } from './ui/button'
import { Switch } from './ui/switch'
import { BarChart3, Eye } from 'lucide-react'

interface ComparisonToggleProps {
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
}

export function ComparisonToggle({ isEnabled, onToggle }: ComparisonToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-gray-900">Comparison Mode</h3>
          <p className="text-sm text-gray-600">
            Highlight key differences across all products
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={isEnabled ? "default" : "outline"}
          size="sm"
          onClick={() => onToggle(!isEnabled)}
          className={isEnabled ? "bg-blue-600 hover:bg-blue-700" : ""}
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
  )
}