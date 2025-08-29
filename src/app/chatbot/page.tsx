"use client"

import AiChatbot from '@/components/AiChatbot'
import { Card } from "@/components/ui/card"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="mt-2 text-gray-600">
            Get instant help with platform navigation, campaign creation, and more
          </p>
        </div>

        {/* Chatbot Interface فقط */}
        <Card className="h-[600px]">
          <AiChatbot />
        </Card>
      </div>
    </div>
  )
}
