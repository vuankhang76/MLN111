"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Theo V.I. Lênin, giai cấp được định nghĩa dựa trên yếu tố nào chủ yếu?",
    options: [
      "Mức thu nhập và lối sống",
      "Địa vị trong hệ thống sản xuất xã hội",
      "Trình độ học vấn và văn hóa",
      "Nguồn gốc gia đình và dòng họ",
    ],
    correctAnswer: 1,
    explanation:
      "Giai cấp được định nghĩa chủ yếu dựa trên địa vị của họ trong hệ thống sản xuất xã hội, quan hệ với tư liệu sản xuất và vai trò trong tổ chức lao động xã hội.",
    category: "Định nghĩa giai cấp",
  },
  {
    id: 2,
    question: "Nguyên nhân sâu xa của sự xuất hiện giai cấp là gì?",
    options: [
      "Sự phát triển của lực lượng sản xuất và xuất hiện 'của dư'",
      "Chiến tranh và xung đột giữa các bộ lạc",
      "Sự khác biệt về trí tuệ và năng lực cá nhân",
      "Ảnh hưởng của tôn giáo và tín ngưỡng",
    ],
    correctAnswer: 0,
    explanation:
      "Sự phát triển của lực lượng sản xuất làm tăng năng suất lao động, xuất hiện 'của dư', tạo khả năng cho một tập đoàn chiếm đoạt lao động của tập đoàn khác.",
    category: "Nguồn gốc giai cấp",
  },
  {
    id: 3,
    question: "Nguyên nhân trực tiếp dẫn đến sự ra đời của giai cấp là gì?",
    options: [
      "Sự phát triển của khoa học kỹ thuật",
      "Xuất hiện chế độ tư hữu về tư liệu sản xuất",
      "Sự gia tăng dân số",
      "Phát triển thương mại và trao đổi",
    ],
    correctAnswer: 1,
    explanation:
      "Chế độ tư hữu về tư liệu sản xuất là cơ sở trực tiếp của sự hình thành các giai cấp. Chừng nào còn tồn tại chế độ tư hữu thì còn có giai cấp.",
    category: "Nguồn gốc giai cấp",
  },
  {
    id: 4,
    question: "Trong xã hội cộng sản nguyên thủy, tại sao không có giai cấp?",
    options: [
      "Vì mọi người đều có trình độ học vấn như nhau",
      "Vì lực lượng sản xuất chưa phát triển, năng suất lao động thấp",
      "Vì không có chiến tranh",
      "Vì mọi người đều tin vào cùng một tôn giáo",
    ],
    correctAnswer: 1,
    explanation:
      "Do lực lượng sản xuất chưa phát triển, năng suất lao động còn rất thấp kém nên làm chung, hưởng chung trở thành phương thức chủ yếu, không thể có sự phân chia xã hội thành giai cấp.",
    category: "Nguồn gốc giai cấp",
  },
  {
    id: 5,
    question: "Hai giai cấp cơ bản trong xã hội chiếm hữu nô lệ là:",
    options: ["Quý tộc và nông dân", "Chủ nô và nô lệ", "Tư sản và vô sản", "Địa chủ và nông nô"],
    correctAnswer: 1,
    explanation:
      "Trong xã hội chiếm hữu nô lệ, hai giai cấp cơ bản đại diện cho phương thức sản xuất thống trị là chủ nô và nô lệ.",
    category: "Kết cấu xã hội-giai cấp",
  },
  {
    id: 6,
    question: "Hai giai cấp cơ bản trong xã hội phong kiến là:",
    options: ["Chủ nô và nô lệ", "Địa chủ và nông dân", "Tư sản và vô sản", "Công nhân và tư bản"],
    correctAnswer: 1,
    explanation:
      "Trong xã hội phong kiến, hai giai cấp cơ bản là địa chủ (giai cấp thống trị) và nông dân (giai cấp bị trị).",
    category: "Kết cấu xã hội-giai cấp",
  },
  {
    id: 7,
    question: "Trong xã hội tư bản chủ nghĩa, hai giai cấp cơ bản là:",
    options: ["Quý tộc và nông dân", "Chủ nô và nô lệ", "Tư sản và vô sản", "Địa chủ và nông nô"],
    correctAnswer: 2,
    explanation:
      "Trong xã hội tư bản chủ nghĩa, hai giai cấp cơ bản đại diện cho phương thức sản xuất thống trị là giai cấp tư sản và giai cấp vô sản.",
    category: "Kết cấu xã hội-giai cấp",
  },
  {
    id: 8,
    question: "Đấu tranh giai cấp có vai trò gì trong sự phát triển xã hội?",
    options: [
      "Là nguyên nhân gây chia rẽ xã hội",
      "Là động lực trực tiếp của lịch sử",
      "Chỉ có tác dụng phá hoại",
      "Không có ảnh hưởng đáng kể",
    ],
    correctAnswer: 1,
    explanation:
      "Đấu tranh giai cấp là động lực trực tiếp và quan trọng của lịch sử, thúc đẩy sự phát triển của xã hội có giai cấp.",
    category: "Đấu tranh giai cấp",
  },
  {
    id: 9,
    question: "Thực chất của đấu tranh giai cấp là gì?",
    options: [
      "Cuộc đấu tranh giữa các tôn giáo khác nhau",
      "Cuộc đấu tranh của quần chúng lao động chống lại giai cấp áp bức, bóc lột",
      "Cuộc đấu tranh giữa các dân tộc",
      "Cuộc đấu tranh giữa thành thị và nông thôn",
    ],
    correctAnswer: 1,
    explanation:
      "Thực chất của đấu tranh giai cấp là cuộc đấu tranh của quần chúng lao động bị áp bức, bóc lột chống lại giai cấp áp bức, bóc lột nhằm lật đổ ách thống trị của chúng.",
    category: "Đấu tranh giai cấp",
  },
  {
    id: 10,
    question: "Ba hình thức đấu tranh cơ bản của giai cấp vô sản là:",
    options: [
      "Kinh tế, chính trị, tư tưởng",
      "Quân sự, ngoại giao, văn hóa",
      "Giáo dục, y tế, xã hội",
      "Nông nghiệp, công nghiệp, dịch vụ",
    ],
    correctAnswer: 0,
    explanation:
      "Ba hình thức đấu tranh cơ bản của giai cấp vô sản là đấu tranh kinh tế, đấu tranh chính trị và đấu tranh tư tưởng.",
    category: "Đấu tranh giai cấp của vô sản",
  },
  {
    id: 11,
    question: "Hình thức đấu tranh cao nhất của giai cấp vô sản là:",
    options: ["Đấu tranh kinh tế", "Đấu tranh chính trị", "Đấu tranh tư tưởng", "Đấu tranh văn hóa"],
    correctAnswer: 1,
    explanation:
      "Đấu tranh chính trị là hình thức đấu tranh cao nhất của giai cấp vô sản, có ý nghĩa quyết định đến thắng lợi của giai cấp vô sản.",
    category: "Đấu tranh giai cấp của vô sản",
  },
  {
    id: 12,
    question: "Mục tiêu của đấu tranh chính trị của giai cấp vô sản là:",
    options: [
      "Tăng lương cho công nhân",
      "Cải thiện điều kiện làm việc",
      "Đánh đổ ách thống trị của giai cấp tư sản, giành chính quyền",
      "Giảm thời gian lao động",
    ],
    correctAnswer: 2,
    explanation:
      "Mục tiêu của đấu tranh chính trị là đánh đổ ách thống trị của giai cấp tư sản, phản động, giành chính quyền về tay giai cấp vô sản.",
    category: "Đấu tranh giai cấp của vô sản",
  },
  {
    id: 13,
    question: "Đấu tranh tư tưởng của giai cấp vô sản có mục đích:",
    options: [
      "Phát triển khoa học kỹ thuật",
      "Đập tan hệ tư tưởng của giai cấp tư sản, vũ trang tư tưởng Mác-Lênin",
      "Cải thiện giáo dục",
      "Phát triển văn hóa nghệ thuật",
    ],
    correctAnswer: 1,
    explanation:
      "Đấu tranh tư tưởng có mục đích đập tan hệ tư tưởng của giai cấp tư sản, vũ trang cho giai cấp công nhân hệ tư tưởng cách mạng và khoa học - chủ nghĩa Mác-Lênin.",
    category: "Đấu tranh giai cấp của vô sản",
  },
  {
    id: 14,
    question: "Cuộc đấu tranh giai cấp cuối cùng trong lịch sử là:",
    options: [
      "Đấu tranh giữa chủ nô và nô lệ",
      "Đấu tranh giữa địa chủ và nông dân",
      "Đấu tranh giữa giai cấp vô sản và giai cấp tư sản",
      "Đấu tranh giữa công nhân và nông dân",
    ],
    correctAnswer: 2,
    explanation:
      "Cuộc đấu tranh giai cấp của giai cấp vô sản chống giai cấp tư sản là cuộc đấu tranh giai cấp cuối cùng trong lịch sử, nhằm xóa bỏ mọi giai cấp.",
    category: "Đấu tranh giai cấp của vô sản",
  },
  {
    id: 15,
    question: "Trong thời kỳ quá độ lên chủ nghĩa xã hội, hai nhiệm vụ chiến lược của giai cấp vô sản là:",
    options: [
      "Phát triển kinh tế và văn hóa",
      "Bảo vệ thành quả cách mạng và cải tạo xã hội cũ, xây dựng xã hội mới",
      "Giáo dục và y tế",
      "Quốc phòng và an ninh",
    ],
    correctAnswer: 1,
    explanation:
      "Hai nhiệm vụ chiến lược là bảo vệ vững chắc thành quả cách mạng đã giành được và cải tạo xã hội cũ, xây dựng thành công xã hội mới trên tất cả các lĩnh vực.",
    category: "Thời kỳ quá độ",
  },
  {
    id: 16,
    question: "Ở Việt Nam hiện nay, khối liên minh giai cấp gồm:",
    options: ["Công nhân - nông dân", "Công nhân - trí thức", "Công nhân - nông dân - trí thức", "Nông dân - trí thức"],
    correctAnswer: 2,
    explanation:
      "Khối liên minh giai cấp mới công nhân - nông dân - trí thức dưới sự lãnh đạo của Đảng Cộng sản Việt Nam là nền tảng của chế độ xã hội mới.",
    category: "Việt Nam hiện nay",
  },
  {
    id: 17,
    question: "Quan hệ cơ bản và chủ yếu nhất quyết định địa vị giai cấp là:",
    options: [
      "Quan hệ phân phối của cải xã hội",
      "Quan hệ tổ chức quản lý sản xuất",
      "Quan hệ sở hữu đối với tư liệu sản xuất",
      "Quan hệ trao đổi hàng hóa",
    ],
    correctAnswer: 2,
    explanation:
      "Quan hệ đối với tư liệu sản xuất là quan hệ cơ bản và chủ yếu nhất quyết định trực tiếp đến địa vị kinh tế-xã hội của các giai cấp.",
    category: "Định nghĩa giai cấp",
  },
  {
    id: 18,
    question: "Liên minh giai cấp có cơ sở là:",
    options: [
      "Sự thống nhất về ngôn ngữ",
      "Sự thống nhất về lợi ích cơ bản",
      "Sự thống nhất về tôn giáo",
      "Sự thống nhất về địa lý",
    ],
    correctAnswer: 1,
    explanation:
      "Cơ sở của liên minh giai cấp là sự thống nhất về lợi ích cơ bản. Liên minh có tính chiến lược lâu dài khi các giai cấp có lợi ích căn bản thống nhất với nhau.",
    category: "Đấu tranh giai cấp",
  },
  {
    id: 19,
    question: "Xã hội có giai cấp đầu tiên trong lịch sử là:",
    options: ["Xã hội cộng sản nguyên thủy", "Xã hội chiếm hữu nô lệ", "Xã hội phong kiến", "Xã hội tư bản chủ nghĩa"],
    correctAnswer: 1,
    explanation:
      "Xã hội chiếm hữu nô lệ là xã hội có giai cấp đầu tiên trong lịch sử ra đời, xuất hiện khoảng 3-5 nghìn năm trước.",
    category: "Nguồn gốc giai cấp",
  },
  {
    id: 20,
    question: "Theo C. Mác, 'cái mới' mà ông đã làm trong lý luận về giai cấp gồm mấy điểm chính?",
    options: ["2 điểm", "3 điểm", "4 điểm", "5 điểm"],
    correctAnswer: 1,
    explanation:
      "C. Mác khái quát 3 điểm: 1) Sự tồn tại của giai cấp gắn với giai đoạn phát triển lịch sử nhất định của sản xuất, 2) Đấu tranh giai cấp dẫn đến chuyên chính vô sản, 3) Chuyên chính vô sản là bước quá độ tiến tới xóa bỏ mọi giai cấp.",
    category: "Lý luận Mác-Lênin",
  },
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0)
    }, 0)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quizQuestions.length) * 100)

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Kết quả Quiz</CardTitle>
            <CardDescription>Bạn đã hoàn thành bài kiểm tra!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {score}/{quizQuestions.length}
              </div>
              <div className="text-lg text-muted-foreground">Điểm số: {percentage}%</div>
              <Badge
                variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                className="mt-2"
              >
                {percentage >= 80 ? "Xuất sắc" : percentage >= 60 ? "Khá" : "Cần cải thiện"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Chi tiết kết quả:</h3>
              {quizQuestions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer
                return (
                  <Card
                    key={question.id}
                    className={`border-2 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2 text-pretty">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Đáp án đúng:</strong> {question.options[question.correctAnswer]}
                          </p>
                          <p className="text-sm text-muted-foreground text-pretty">{question.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <Button onClick={resetQuiz} className="w-full">
              <RotateCcw className="w-4 h-4 mr-2" />
              Làm lại Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">
              Câu {currentQuestion + 1} / {quizQuestions.length}
            </Badge>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Quiz Lý thuyết Giai cấp</span>
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-xl text-pretty">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                className="justify-start text-left h-auto p-4 text-pretty"
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      selectedAnswers[currentQuestion] === index
                        ? "bg-primary-foreground text-primary border-primary-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Câu trước
            </Button>
            <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === undefined}>
              {currentQuestion === quizQuestions.length - 1 ? "Hoàn thành" : "Câu tiếp"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
