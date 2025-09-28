"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, MessageCircle, Play, ChevronRight, Clock } from "lucide-react"
import Link from "next/link"
import { TheoryModal } from "@/components/theory-modal"
import Quiz from "@/components/quiz"
import Timeline from "@/components/timeline"

interface Section {
  id: string
  title: string
  icon: React.ReactNode
  summary: string
  content: string
}

export default function HomePage() {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'home' | 'quiz' | 'timeline'>('home')

  const handleTheoryClick = () => {
    // Scroll to theory sections
    const theorySection = document.getElementById("theory-sections")
    if (theorySection) {
      theorySection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleStartLearning = () => {
    // Scroll to quiz section
    setActiveSection('quiz')
    const quizSection = document.getElementById("quiz-section")
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleQuizClick = () => {
    setActiveSection('quiz')
    const quizSection = document.getElementById("quiz-section")
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleTimelineClick = () => {
    setActiveSection('timeline')
    const timelineSection = document.getElementById("timeline-section")
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHomeClick = () => {
    setActiveSection('home')
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleViewDetails = (section: Section) => {
    setSelectedSection(section)
    setIsModalOpen(true)
  }

  const sections = [
    {
      id: "definition",
      title: "Định nghĩa Giai cấp",
      icon: <Users className="w-6 h-6" />,
      summary: "Giai cấp là những tập đoàn người to lớn, khác nhau về địa vị trong hệ thống sản xuất xã hội",
      content: `Theo V.I. Lênin, giai cấp là những tập đoàn người to lớn, khác nhau về địa vị của họ trong một hệ thống sản xuất xã hội nhất định trong lịch sử, về quan hệ của họ đối với những tư liệu sản xuất (thường thì những quan hệ này được pháp luật quy định và thừa nhận), về vai trò của họ trong tổ chức lao động xã hội, và do đó khác nhau về cách thức hưởng thụ phần của cải xã hội ít hay nhiều mà họ được hưởng.

Các đặc trưng cơ bản của giai cấp:
• Giai cấp là những tập đoàn người có địa vị kinh tế - xã hội khác nhau
• Quan hệ sở hữu đối với tư liệu sản xuất là dấu hiệu chủ yếu quy định địa vị giai cấp
• Thực chất của quan hệ giai cấp là tập đoàn người này chiếm đoạt lao động của tập đoàn người khác`,
    },
    {
      id: "origin",
      title: "Nguồn gốc Giai cấp",
      icon: <BookOpen className="w-6 h-6" />,
      summary: "Giai cấp xuất hiện do sự phát triển của lực lượng sản xuất và chế độ tư hữu",
      content: `Trong xã hội cộng sản nguyên thủy, do lực lượng sản xuất chưa phát triển nên chưa có sự phân chia giai cấp. Cuối xã hội nguyên thủy, sự phát triển của lực lượng sản xuất dẫn đến:

• Năng suất lao động tăng lên và xuất hiện "của dư"
• Phân công lao động xã hội phát triển
• Hoạt động trao đổi sản phẩm trở thành thường xuyên
• Chế độ tư hữu về tư liệu sản xuất hình thành

Nguyên nhân sâu xa: Sự phát triển của lực lượng sản xuất tạo khả năng cho tập đoàn người này chiếm đoạt lao động của tập đoàn người khác.
Nguyên nhân trực tiếp: Sự xuất hiện chế độ tư hữu về tư liệu sản xuất.`,
    },
    {
      id: "struggle",
      title: "Đấu tranh Giai cấp",
      icon: <MessageCircle className="w-6 h-6" />,
      summary: "Đấu tranh giai cấp là động lực trực tiếp của lịch sử xã hội",
      content: `Đấu tranh giai cấp là cuộc đấu tranh của các tập đoàn người to lớn có lợi ích căn bản đối lập nhau trong một phương thức sản xuất xã hội nhất định.

Tính tất yếu: Do sự đối lập về lợi ích căn bản không thể điều hòa được giữa các giai cấp.

Thực chất: Cuộc đấu tranh của quần chúng lao động bị áp bức, bóc lột chống lại giai cấp áp bức, bóc lột nhằm lật đổ ách thống trị của chúng.

Vai trò: Động lực trực tiếp, quan trọng của lịch sử. Thông qua đấu tranh giai cấp mà quan hệ sản xuất cũ được xóa bỏ, quan hệ sản xuất mới được xác lập.`,
    },
    {
      id: "proletarian",
      title: "Đấu tranh của Giai cấp Vô sản",
      icon: <Users className="w-6 h-6" />,
      summary: "Ba hình thức đấu tranh cơ bản: kinh tế, chính trị, tư tưởng",
      content: `Giai cấp vô sản có ba hình thức đấu tranh cơ bản:

1. Đấu tranh kinh tế:
• Bảo vệ lợi ích hằng ngày của công nhân (tăng lương, rút ngắn thời gian lao động)
• Hạn chế sự bóc lột của giai cấp tư sản
• Tập hợp lực lượng, giác ngộ quần chúng

2. Đấu tranh chính trị (hình thức cao nhất):
• Đánh đổ ách thống trị của giai cấp tư sản
• Giành chính quyền về tay giai cấp vô sản
• Sử dụng bạo lực cách mạng khi cần thiết

3. Đấu tranh tư tưởng:
• Đập tan hệ tư tưởng của giai cấp tư sản
• Vũ trang tư tưởng cách mạng Mác-Lênin
• Giáo dục quần chúng về đường lối cách mạng`,
    },
    {
      id: "vietnam",
      title: "Đấu tranh Giai cấp ở Việt Nam",
      icon: <Clock className="w-6 h-6" />,
      summary: "Đặc điểm đấu tranh giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội",
      content: `Trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam hiện nay:

Đặc điểm:
• Quá độ gián tiếp từ xã hội thuộc địa, nửa phong kiến lên chủ nghĩa xã hội
• Còn cơ sở kinh tế để nảy sinh giai cấp bóc lột
• Các thế lực phản động thực hiện âm mưu "diễn biến hòa bình"

Nội dung chủ yếu:
• Thực hiện công nghiệp hóa, hiện đại hóa theo định hướng xã hội chủ nghĩa
• Thực hiện công bằng xã hội, chống áp bức, bất công
• Đấu tranh ngăn chặn tư tưởng và hành động tiêu cực
• Bảo vệ độc lập dân tộc, xây dựng chủ nghĩa xã hội

Hai nhiệm vụ chiến lược:
• Xây dựng thành công chủ nghĩa xã hội
• Bảo vệ vững chắc Tổ quốc xã hội chủ nghĩa`,
    },
    {
      id: "structure",
      title: "Kết cấu Xã hội - Giai cấp",
      icon: <BookOpen className="w-6 h-6" />,
      summary: "Tổng thể các giai cấp và mối quan hệ giữa các giai cấp trong xã hội",
      content: `Kết cấu xã hội - giai cấp là tổng thể các giai cấp và mối quan hệ giữa các giai cấp, tồn tại trong một giai đoạn lịch sử nhất định.

Thành phần:
• Hai giai cấp cơ bản: gắn với phương thức sản xuất thống trị
  - Xã hội nô lệ: chủ nô và nô lệ
  - Xã hội phong kiến: địa chủ và nông dân
  - Xã hội tư bản: tư sản và vô sản

• Các giai cấp không cơ bản: gắn với phương thức sản xuất tàn dư hoặc mầm mống

• Các tầng lớp xã hội trung gian: trí thức, nhân sĩ, giới tu hành...

Đặc điểm:
• Luôn có sự vận động và biến đổi không ngừng
• Do trình độ phát triển của phương thức sản xuất quy định
• Có tính đa dạng do chế độ kinh tế và cơ cấu kinh tế quy định`,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-balance">MLN111</h1>
                <p className="text-sm text-muted-foreground">Chủ nghĩa Mác - Lênin</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleHomeClick}
                className={activeSection === 'home' ? 'bg-primary/10 text-primary' : ''}
              >
                Trang chủ
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleTheoryClick}
                className={activeSection === 'home' ? 'bg-primary/10 text-primary' : ''}
              >
                Lý thuyết
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleQuizClick}
                className={activeSection === 'quiz' ? 'bg-success/10 text-success' : ''}
              >
                Quiz
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleTimelineClick}
                className={activeSection === 'timeline' ? 'bg-info/10 text-info' : ''}
              >
                Timeline
              </Button>
              <Link href="/chatbot">
                <Button variant="ghost" size="sm">
                  Chatbot
                </Button>
              </Link>
            </nav>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setActiveSection('home')}>
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance animate-fade-in-up">
              GIAI CẤP VÀ
              <span className="block text-primary my-3">ĐẤU TRANH GIAI CẤP</span>
            </h1>
            <p
              className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Khám phá lý thuyết căn bản của chủ nghĩa Mác - Lênin về giai cấp và đấu tranh giai cấp thông qua nội dung
              tương tác và sinh động
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="text-lg px-8 hover:scale-105 transition-transform"
                onClick={handleTheoryClick}
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu học
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent hover:scale-105 transition-transform"
                onClick={handleQuizClick}
              >
                Làm Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section id="theory-sections" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nội dung chính</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
              Tìm hiểu các khái niệm cơ bản về giai cấp và đấu tranh giai cấp
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <Card
                key={section.id}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
                    {section.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{section.title}</CardTitle>
                  <CardDescription className="text-pretty">{section.summary}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 hover:scale-105 transition-transform bg-transparent"
                    onClick={() => handleViewDetails(section)}
                  >
                    Xem chi tiết
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tính năng tương tác</h2>
            <p className="text-muted-foreground text-lg">Học tập hiệu quả với các công cụ hỗ trợ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  Quiz Kiến thức
                </CardTitle>
                <CardDescription>Kiểm tra hiểu biết với 20 câu hỏi chi tiết</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full hover:scale-105 transition-transform"
                  onClick={handleQuizClick}
                >
                  Bắt đầu Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  Timeline Lịch sử
                </CardTitle>
                <CardDescription>Theo dõi sự phát triển giai cấp qua các thời kỳ</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full bg-transparent hover:scale-105 transition-transform"
                  onClick={handleTimelineClick}
                >
                  Xem Timeline
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  AI Chatbot
                </CardTitle>
                <CardDescription>Đặt câu hỏi và thảo luận với AI về lý thuyết</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/chatbot">
                  <Button variant="outline" className="w-full bg-transparent hover:scale-105 transition-transform">
                    Mở Chatbot
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz-section" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quiz Kiến thức</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kiểm tra hiểu biết của bạn về lý thuyết giai cấp với 20 câu hỏi chi tiết
            </p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline-section" className="py-16 px-4">
        <div className="container mx-auto">
          <Timeline />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">Giai cấp và đấu tranh giai cấp</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Website giáo dục về giai cấp và đấu tranh giai cấp trong chủ nghĩa Mác - Lênin
          </p>
        </div>
      </footer>

      <TheoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} section={selectedSection} />
    </div>
  )
}
