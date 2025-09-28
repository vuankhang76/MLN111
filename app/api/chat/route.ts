import { NextRequest, NextResponse } from 'next/server'

// Enhanced System Prompt - AI Chuyên gia tối ưu
const SYSTEM_PROMPT = `Bạn là một AI siêu chuyên gia hàng đầu về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác-Lênin. Bạn sở hữu kiến thức uyên bác và khả năng phân tích vượt trội về:

🎯 KIẾN THỨC CỐT LÕI:
1. Định nghĩa giai cấp theo V.I. Lênin - phân tích sâu sắc và toàn diện
2. Nguồn gốc xuất hiện giai cấp - từ góc độ lịch sử và triết học
3. Đấu tranh giai cấp và ba hình thức đấu tranh (kinh tế, chính trị, tư tưởng)
4. Giai cấp vô sản và sứ mệnh lịch sử cách mạng
5. Giai cấp tư sản và bản chất bóc lột trong chủ nghĩa tư bản
6. Tình hình đấu tranh giai cấp ở Việt Nam - quá khứ, hiện tại, tương lai
7. Ứng dụng lý thuyết trong thực tiễn xã hội đương đại

💡 NĂNG LỰC VƯỢT TRỘI:
- Phân tích đa chiều với tư duy biện chứng
- Kết nối lý thuyết với thực tiễn một cách sáng tạo
- Giải thích phức tạp thành đơn giản mà vẫn chính xác
- Cung cấp ví dụ cụ thể, sinh động từ lịch sử và hiện tại
- Trả lời theo cấu trúc logic, có hệ thống
- Sử dụng tiếng Việt chuẩn mực, khoa học nhưng dễ hiểu

🔥 PHONG CÁCH TRUYỀN ĐẠT:
- Tự tin, chắc chắn nhưng không áp đặt
- Khuyến khích tư duy phản biện
- Đưa ra góc nhìn đa chiều khi phù hợp
- Liên hệ với bối cảnh Việt Nam và thế giới

Hãy thể hiện sự am hiểu sâu sắc và khả năng truyền đạt xuất sắc trong mọi câu trả lời!`

// Chọn AI provider (có thể thay đổi)
const AI_PROVIDER = 'gemini' as 'openai' | 'gemini' | 'anthropic' | 'cohere' | 'fallback'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      )
    }

    let response: string

    try {
      switch (AI_PROVIDER) {
        case 'openai':
          response = await callOpenAI(messages)
          break
        case 'gemini':
          response = await callGemini(messages)
          break
        case 'anthropic':
          response = await callAnthropic(messages)
          break
        case 'cohere':
          response = await callCohere(messages)
          break
        default:
          return NextResponse.json(
            { error: 'Invalid AI provider' },
            { status: 500 }
          )
      }
    } catch (aiError) {
      console.error(`${AI_PROVIDER} API failed:`, aiError)
      
      // Fallback thông minh dựa trên nội dung câu hỏi
      response = generateIntelligentFallback(messages)
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// OpenAI GPT
async function callOpenAI(messages: any[]) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // hoặc gpt-3.5-turbo để rẻ hơn
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// Google Gemini
async function callGemini(messages: any[]) {
  // Lấy tin nhắn cuối cùng từ người dùng
  const lastUserMessage = messages[messages.length - 1];
  const userInput = lastUserMessage.content.toLowerCase();
  
  // Từ khóa mở rộng - AI thông minh hơn trong việc nhận diện
  const classTheoryKeywords = [
    // Từ khóa cốt lõi
    'giai cấp', 'đấu tranh', 'lênin', 'lenin', 'mác', 'marx', 'vô sản', 'tư sản', 
    'bóc lột', 'chủ nghĩa', 'lý thuyết', 'định nghĩa', 'nguồn gốc',
    
    // Hình thức đấu tranh
    'hình thức', 'kinh tế', 'chính trị', 'tư tưởng', 'ý thức hệ',
    
    // Lịch sử và thực tiễn
    'sứ mệnh', 'lịch sử', 'cách mạng', 'tình hình', 'việt nam', 'ứng dụng', 'thực tiễn',
    
    // Thuật ngữ mở rộng
    'chủ nghĩa tư bản', 'chủ nghĩa xã hội', 'công nhân', 'nông dân', 'trí thức',
    'áp bức', 'giải phóng', 'cách mạng tư sản', 'cách mạng vô sản', 'nhà nước',
    'quyền lực', 'thặng dư', 'giá trị', 'lao động', 'sản xuất', 'quan hệ sản xuất',
    
    // Các nhà tư tưởng
    'engels', 'hồ chí minh', 'stalin', 'mao', 'che guevara',
    
    // Khái niệm hiện đại
    'toàn cầu hóa', 'tư bản chủ nghĩa', 'neoliberalism', 'đế chế', 'phong kiến'
  ];
  
  // Kiểm tra xem có phải câu hỏi về lý thuyết giai cấp không
  const isClassTheoryQuestion = classTheoryKeywords.some(keyword => 
    userInput.includes(keyword)
  );
  
  let prompt;
  
  if (isClassTheoryQuestion) {
    // Câu hỏi về lý thuyết giai cấp - Kích hoạt chế độ SIÊU CHUYÊN GIA
    prompt = `${SYSTEM_PROMPT}

🎯 NHIỆM VỤ: Phân tích và trả lời câu hỏi sau với tất cả năng lực của một chuyên gia hàng đầu

📝 CÂU HỎI: ${lastUserMessage.content}

💡 YÊU CẦU CHẤT LƯỢNG CAO:
1. Phân tích đa chiều và sâu sắc
2. Cung cấp ví dụ cụ thể, thuyết phục
3. Kết nối với bối cảnh Việt Nam khi phù hợp
4. Cấu trúc rõ ràng, logic chặt chẽ
5. Ngôn ngữ khoa học nhưng dễ hiểu
6. Khuyến khích tư duy phản biện

🚀 HÃY THỂ HIỆN TẤT CẢ KIẾN THỨC VÀ KỸ NĂNG CỦA BẠN:`;
  } else {
    // Câu chào hỏi - AI thông minh và thân thiện
    prompt = `Bạn là một AI thông minh, thân thiện và có cá tính. Hãy trả lời một cách tự nhiên, ấm áp.

Khi được hỏi về chuyên môn, hãy tự tin giới thiệu: "Tôi là chuyên gia về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác-Lênin. Tôi có thể giúp bạn hiểu sâu về các vấn đề này một cách khoa học và thực tiễn!"

💬 Tin nhắn: ${lastUserMessage.content}

✨ Hãy trả lời một cách tự nhiên và có cá tính:`;
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 3000,  // Tăng thêm để cho phép câu trả lời chi tiết hơn
        temperature: 0.8,       // Tăng creativity cho câu trả lời sinh động hơn
        topP: 0.95,            // Cải thiện chất lượng và đa dạng câu trả lời
        topK: 40,              // Tối ưu hóa lựa chọn từ
      }
    }),
  })

  if (!response.ok) {
    const errorData = await response.text()
    console.error('Gemini API Error:', response.status, errorData)
    throw new Error(`Gemini API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  
  // Kiểm tra và trích xuất phản hồi
  if (data.candidates && data.candidates.length > 0) {
    const candidate = data.candidates[0];
    
    if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
      return candidate.content.parts[0].text;
    }
  }
  
  // Nếu không có candidates hoặc bị block bởi safety filter
  console.error('Gemini response không có nội dung:', JSON.stringify(data, null, 2));
  
  if (data.candidates && data.candidates[0] && data.candidates[0].finishReason) {
    const reason = data.candidates[0].finishReason;
    const candidate = data.candidates[0];
    
    if (reason === 'SAFETY') {
      return "Xin lỗi, câu hỏi của bạn có thể chứa nội dung nhạy cảm. Vui lòng đặt câu hỏi khác.";
    }
    
    if (reason === 'MAX_TOKENS') {
      // Nếu có nội dung một phần, trả về luôn
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0 && candidate.content.parts[0].text) {
        return candidate.content.parts[0].text + "\n\n[Câu trả lời đã bị cắt ngắn do quá dài. Bạn có thể hỏi cụ thể hơn để được trả lời đầy đủ.]";
      }
      return "Câu trả lời quá dài. Bạn có thể hỏi cụ thể hơn hoặc chia nhỏ câu hỏi để tôi có thể trả lời đầy đủ.";
    }
    
    throw new Error(`Gemini request finished with reason: ${reason}`);
  }
  
  throw new Error('Không thể lấy phản hồi từ Gemini API');
}

// Hàm fallback thông minh khi AI API thất bại
function generateIntelligentFallback(messages: any[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  
  // Phân tích nội dung để tạo phản hồi thông minh
  const classTheoryKeywords = [
    'giai cấp', 'đấu tranh', 'lênin', 'mác', 'marx', 'vô sản', 'tư sản', 
    'bóc lột', 'chủ nghĩa', 'lý thuyết', 'định nghĩa', 'cách mạng'
  ];
  
  const isClassTheoryQuery = classTheoryKeywords.some(keyword => 
    lastMessage.includes(keyword)
  );
  
  if (isClassTheoryQuery) {
    return `🎯 **Xin lỗi, hệ thống AI chính đang bảo trì!**

Tuy nhiên, dựa trên câu hỏi của bạn về lý thuyết giai cấp, tôi có thể chia sẻ một số điểm cơ bản:

📚 **Một số khái niệm quan trọng:**
• **Giai cấp theo Lênin**: Những nhóm người khác nhau về địa vị trong hệ thống sản xuất lịch sử
• **Đấu tranh giai cấp**: Động lực chính của sự phát triển lịch sử
• **Ba hình thức đấu tranh**: Kinh tế, chính trị, tư tưởng

🔄 **Hệ thống sẽ sớm hoạt động trở lại để cung cấp câu trả lời chi tiết hơn!**

💡 *Bạn có thể thử lại sau vài phút hoặc đặt câu hỏi cụ thể hơn.*`;
  }
  
  // Phản hồi chung cho các câu hỏi khác
  if (lastMessage.includes('chào') || lastMessage.includes('hello') || lastMessage.includes('hi')) {
    return `👋 **Chào bạn!** 

Tôi là AI chuyên gia về lý thuyết giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác-Lênin. 

🤖 *Hệ thống đang bảo trì nhẹ, nhưng tôi vẫn sẵn sàng trò chuyện!*

💭 **Tôi có thể giúp bạn về:**
• Lý thuyết giai cấp
• Đấu tranh giai cấp  
• Tư tưởng Mác-Lênin
• Ứng dụng trong thực tiễn Việt Nam

Bạn muốn tìm hiểu điều gì? 🎯`;
  }
  
  return `🤖 **Xin lỗi!** Hệ thống AI đang gặp sự cố kỹ thuật.

🔧 **Đang khắc phục:** Các kỹ sư đang làm việc để khôi phục hoạt động.

⏰ **Thời gian dự kiến:** Vài phút tới

💡 **Gợi ý:** Bạn có thể thử lại hoặc đặt câu hỏi về lý thuyết giai cấp - đó là chuyên môn của tôi!

🎯 *Cảm ơn bạn đã kiên nhẫn!*`;
}

// Anthropic Claude
async function callAnthropic(messages: any[]) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: messages,
    }),
  })

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.content[0].text
}

// Cohere
async function callCohere(messages: any[]) {
  const lastMessage = messages[messages.length - 1]
  
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'command',
      prompt: `${SYSTEM_PROMPT}\n\nHuman: ${lastMessage.content}\n\nAssistant:`,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`Cohere API error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.generations[0].text.trim()
}