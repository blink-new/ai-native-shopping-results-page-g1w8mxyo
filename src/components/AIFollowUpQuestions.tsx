import React from 'react'
import { Button } from './ui/button'
import { MessageCircle, Sparkles } from 'lucide-react'

interface AIFollowUpQuestionsProps {
  questions: string[]
  onQuestionClick: (question: string) => void
}

export function AIFollowUpQuestions({ questions, onQuestionClick }: AIFollowUpQuestionsProps) {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Refine Your Search</h3>
          <p className="text-sm text-gray-600">AI-suggested questions to help you find exactly what you need</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {questions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onQuestionClick(question)}
            className="bg-white hover:bg-green-50 border-green-200 text-gray-700 hover:text-green-700 hover:border-green-300 transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {question}
          </Button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/60 rounded-lg border border-green-100">
        <p className="text-xs text-gray-600 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Click any question to refine your search instantly
        </p>
      </div>
    </div>
  )
}