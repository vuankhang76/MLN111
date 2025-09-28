"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là AI assistant chuyên về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác-Lênin. Bạn có câu hỏi gì về chủ đề này không?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const knowledgeBase = {
    "định nghĩa giai cấp": `Theo V.I. Lênin, giai cấp là những tập đoàn người to lớn, khác nhau về địa vị của họ trong một hệ thống sản xuất xã hội nhất định trong lịch sử, về quan hệ của họ đối với những tư liệu sản xuất, về vai trò của họ trong tổ chức lao động xã hội, và do đó khác nhau về cách thức hưởng thụ phần của cải xã hội.`,
    
    "đấu tranh giai cấp": `Đấu tranh giai cấp là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đổi lập nhau trong một phương thức sản xuất xã hội nhất định. Đây là động lực trực tiếp, quan trọng của lịch sử trong xã hội có giai cấp.`,
    
    "nguồn gốc giai cấp": `Nguyên nhân sâu xa của sự xuất hiện giai cấp là sự phát triển của lực lượng sản xuất làm cho năng suất lao động tăng lên, xuất hiện "của dư". Nguyên nhân trực tiếp là sự xuất hiện chế độ tư hữu về tư liệu sản xuất.`,
    
    "ba hình thức đấu tranh": `Giai cấp vô sản có ba hình thức đấu tranh cơ bản:
1. Đấu tranh kinh tế: Bảo vệ lợi ích hằng ngày của công nhân
2. Đấu tranh chính trị: Hình thức cao nhất, mục tiêu giành chính quyền
3. Đấu tranh tư tưởng: Đập tan hệ tư tưởng tư sản, vũ trang tư tưởng Mác-Lênin`,
    
    "việt nam": `Ở Việt Nam hiện nay, đấu tranh giai cấp diễn ra trong thời kỳ quá độ lên chủ nghĩa xã hội với hai nhiệm vụ chiến lược: Xây dựng thành công chủ nghĩa xã hội và bảo vệ vững chắc Tổ quốc xã hội chủ nghĩa.`,
    
    "vai trò": `Đấu tranh giai cấp là động lực trực tiếp của lịch sử, thúc đẩy sự phát triển xã hội từ hình thái kinh tế-xã hội thấp lên cao hơn. Cuộc đấu tranh của giai cấp vô sản là cuối cùng trong lịch sử, nhằm xóa bỏ mọi giai cấp.`
  }

  // Fallback response nếu API fail
  const generateFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase().trim()
    
    // Tìm kiếm trong knowledge base trước
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (lowerInput.includes(key) || lowerInput.includes(key.replace(/\s+/g, ""))) {
        return value
      }
    }
    
    // Trả lời mặc định
    return `Tôi hiểu bạn đang quan tâm đến lý thuyết giai cấp. Hiện tại AI đang gặp sự cố kỹ thuật, nhưng tôi có thể hỗ trợ với kiến thức cơ bản về:

• Định nghĩa giai cấp và nguồn gốc xuất hiện
• Các hình thức đấu tranh giai cấp (kinh tế, chính trị, tư tưởng)  
• Vai trò của đấu tranh giai cấp trong lịch sử
• Giai cấp vô sản và sứ mệnh cách mạng
• Ứng dụng lý thuyết trong thực tiễn Việt Nam

Hãy hỏi cụ thể hơn để tôi có thể hỗ trợ bạn!`
  }

  // API call to get AI response
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: userMessage }
          ]
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data.message || generateFallbackResponse(userMessage)
    } catch (error) {
      console.error('AI API Error:', error)
      return generateFallbackResponse(userMessage)
    }
  }

  // Legacy response system for compatibility
  const getLegacyResponse = (userInput: string): string => {
    const input = userInput.toLowerCase().trim()
    
    // Tìm kiếm exact keywords trong knowledge base
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (input.includes(key) || key.split(' ').some(word => input.includes(word))) {
        return value
      }
    }
    
    // Câu hỏi về Marx và Lenin
    if (input.match(/(mác|marx|lenin|lênin|nhà kinh điển|tư tưởng gia)/)) {
      return "C. Mác và V.I. Lênin là những nhà kinh điển đã xây dựng lý luận khoa học về giai cấp và đấu tranh giai cấp. Theo C. Mác: 'Lịch sử tất cả các xã hội tồn tại từ trước đến ngày nay chỉ là lịch sử đấu tranh giai cấp.' V.I. Lênin đã phát triển thêm lý luận này và ứng dụng vào thực tiễn cách mạng."
    }
    
    // Câu hỏi về giai cấp vô sản
    if (input.match(/(vô sản|công nhân|người lao động|proletariat|giai cấp công nhân)/)) {
      return "Giai cấp vô sản là giai cấp cách mạng cuối cùng trong lịch sử, có sứ mệnh xóa bỏ mọi giai cấp và xây dựng xã hội cộng sản. Đây là giai cấp không có tư liệu sản xuất, chỉ có sức lao động. Họ bị giai cấp tư sản bóc lột thông qua việc chiếm đoạt giá trị thặng dư."
    }
    
    // Câu hỏi về giai cấp tư sản
    if (input.match(/(tư sản|bourgeoisie|chủ nhân|ông chủ|nhà tư bản)/)) {
      return "Giai cấp tư sản là giai cấp sở hữu tư liệu sản xuất, bóc lột sức lao động của giai cấp vô sản thông qua việc chiếm đoạt giá trị thặng dư. Họ là giai cấp thống trị trong xã hội tư bản chủ nghĩa, có lợi ích đối lập không thể điều hòa với giai cấp vô sản."
    }
    
    // Câu hỏi về chủ nghĩa xã hội
    if (input.match(/(chủ nghĩa xã hội|socialism|xã hội chủ nghĩa|cnxh)/)) {
      return "Chủ nghĩa xã hội là giai đoạn đầu của hình thái kinh tế-xã hội cộng sản chủ nghĩa, trong đó giai cấp vô sản đã giành được chính quyền và tiến hành xây dựng xã hội mới. Đây là thời kỳ quá độ từ chủ nghĩa tư bản lên chủ nghĩa cộng sản."
    }
    
    // Câu hỏi về cách mạng
    if (input.match(/(cách mạng|revolution|cuộc cách mạng|thay đổi)/)) {
      return "Cách mạng vô sản là cuộc cách mạng của giai cấp vô sản nhằm lật đổ chế độ tư bản chủ nghĩa, giành chính quyền và xây dựng chế độ xã hội chủ nghĩa. Đây là hình thức cao nhất của đấu tranh giai cấp, sử dụng bạo lực cách mạng để phá vỡ bộ máy nhà nước cũ."
    }
    
    // Câu hỏi về lịch sử
    if (input.match(/(lịch sử|history|quá khứ|thời gian|phát triển)/)) {
      return "Lịch sử loài người trong xã hội có giai cấp chính là lịch sử đấu tranh giai cấp. Mỗi hình thái kinh tế-xã hội đều có những mâu thuẫn giai cấp đặc trưng, và sự giải quyết những mâu thuẫn này thông qua đấu tranh giai cấp đã thúc đẩy xã hội phát triển từ thấp lên cao."
    }
    
    // Câu hỏi chung về tương lai
    if (input.match(/(tương lai|future|mai sau|ngày mai|sắp tới)/)) {
      return "Tương lai của nhân loại là xã hội cộng sản - một xã hội không có giai cấp, không có áp bức, bóc lột. Để đạt được điều này, giai cấp vô sản cần tiến hành đấu tranh giai cấp kiên quyết, xây dựng thành công chủ nghĩa xã hội như bước đệm tiến lên chủ nghĩa cộng sản."
    }
    
    // Câu hỏi về thực tiễn
    if (input.match(/(thực tiễn|thực tế|áp dụng|ứng dụng|trong đời sống)/)) {
      return "Trong thực tiễn, lý thuyết về giai cấp và đấu tranh giai cấp giúp chúng ta hiểu rõ bản chất của xã hội, nhận biết các mâu thuẫn xã hội và tìm ra con đường giải quyết. Điều này đặc biệt quan trọng trong việc xây dựng đường lối, chính sách phù hợp cho từng giai đoạn phát triển."
    }
    
    // Câu hỏi chào hỏi hoặc không rõ ràng
    if (input.match(/(xin chào|hello|chào|hỏi gì|giúp gì|hỗ trợ)/)) {
      return "Xin chào! Tôi là AI assistant chuyên về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác-Lênin. Tôi có thể giúp bạn tìm hiểu về:\n\n• Định nghĩa và nguồn gốc của giai cấp\n• Đấu tranh giai cấp và ba hình thức đấu tranh\n• Giai cấp vô sản và tư sản\n• Tình hình đấu tranh giai cấp ở Việt Nam\n• Vai trò của đấu tranh giai cấp trong lịch sử\n• Các khái niệm khác trong lý thuyết Mác-Lênin\n\nBạn muốn tìm hiểu về vấn đề gì?"
    }
    
    // Trả lời mặc định cho các câu hỏi không match
    return `Tôi hiểu bạn đang quan tâm đến một khía cạnh của lý thuyết giai cấp. Theo quan điểm Mác-Lênin, mọi hiện tượng xã hội đều cần được phân tích dựa trên cơ sở giai cấp và đấu tranh giai cấp.

**Có thể bạn muốn tìm hiểu về:**
• Định nghĩa giai cấp và nguồn gốc xuất hiện
• Các hình thức đấu tranh giai cấp (kinh tế, chính trị, tư tưởng)  
• Vai trò của đấu tranh giai cấp trong lịch sử
• Đặc điểm đấu tranh giai cấp ở Việt Nam hiện nay
• Mối quan hệ giữa các giai cấp khác nhau

Bạn có thể đặt câu hỏi cụ thể hơn để tôi có thể hỗ trợ tốt nhất. Ví dụ: "Giai cấp là gì?", "Ba hình thức đấu tranh là gì?", "Đấu tranh giai cấp ở Việt Nam như thế nào?"`
    
    if (input.includes('tư sản') || input.includes('tư bản')) {
      return "Giai cấp tư sản là giai cấp thống trị trong xã hội tư bản chủ nghĩa, sở hữu tư liệu sản xuất và bóc lột giai cấp vô sản thông qua việc chiếm đoạt giá trị thặng dư."
    }
    
    // Câu trả lời mặc định
    return "Tôi hiểu bạn đang quan tâm về lý thuyết giai cấp. Bạn có thể hỏi tôi về: định nghĩa giai cấp, đấu tranh giai cấp, nguồn gốc của giai cấp, ba hình thức đấu tranh của giai cấp vô sản, vai trò của đấu tranh giai cấp, hoặc tình hình ở Việt Nam hiện nay."
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsLoading(true)

    try {
      // Get AI response (with built-in delay)
      const response = await getAIResponse(userInput)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, tôi gặp sự cố khi xử lý câu hỏi của bạn. Vui lòng thử lại sau. Bạn có thể thử hỏi về: định nghĩa giai cấp, đấu tranh giai cấp, ba hình thức đấu tranh, hoặc tình hình ở Việt Nam.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="h-[calc(100vh-240px)] sm:h-[600px] flex flex-col shadow-lg border-2 overflow-hidden">
      <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="truncate">Trợ lý AI</span>
            <span className="text-xs sm:text-sm font-normal text-muted-foreground truncate">Giai cấp và đấu tranh giai cấp</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0 overflow-hidden">
        <ScrollArea className="flex-1 px-3 sm:px-6 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-3 sm:space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${message.role === "user" ? "justify-end" : "justify-start"} min-w-0`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/30">
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] min-w-0 rounded-lg px-3 sm:px-4 py-2 ${
                    message.role === "user" 
                      ? "bg-gradient-to-br from-primary to-primary text-primary-foreground ml-auto" 
                      : "bg-gradient-to-br from-muted to-muted/70 border"
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
                    {message.content}
                  </p>
                  <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {message.role === "user" && (
                  <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-accent/20 to-accent/30">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 sm:gap-3 justify-start min-w-0">
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mt-1 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/30">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gradient-to-br from-muted to-muted/70 border rounded-lg px-3 sm:px-4 py-2 min-w-0">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">Đang suy nghĩ...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Input Area - Responsive */}
        <div className="border-t bg-background/50 p-3 sm:p-4 flex-shrink-0">
          <div className="flex gap-2 sm:gap-3 min-w-0">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Hỏi về lý thuyết giai cấp..."
              disabled={isLoading}
              className="flex-1 text-xs sm:text-sm min-w-0"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="sm"
              className="px-3 sm:px-4 hover:scale-105 transition-transform flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
          </div>
          
          {/* Quick suggestions */}
          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2 overflow-hidden">
            {["Giai cấp là gì?", "Ba hình thức đấu tranh", "Việt Nam hiện nay"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                className="text-xs px-2 py-1 h-auto hover:scale-105 transition-transform flex-shrink-0"
                onClick={() => setInput(suggestion)}
                disabled={isLoading}
              >
                {suggestion}
              </Button>
            ))}
          </div>
          
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 text-center truncate">
            Nhấn Enter để gửi • AI hỗ trợ 24/7
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
