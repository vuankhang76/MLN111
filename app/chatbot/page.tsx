"use client"

import Chatbot from "@/components/chatbot"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MessageCircle, Bot } from "lucide-react"
import Link from "next/link"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Về trang chủ</span>
                <span className="xs:hidden">Về</span>
              </Button>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-3 h-3 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="font-bold text-sm sm:text-base">AI Chatbot</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Lý thuyết Giai cấp</p>
              </div>
            </div>
            <div className="w-16 sm:w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Chatbot Content */}
      <main className="py-4 sm:py-8 px-2 sm:px-4">
        <div className="container mx-auto max-w-4xl">
          <Chatbot />
        </div>
      </main>
    </div>
  )
}
