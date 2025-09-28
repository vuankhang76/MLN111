"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Sword, Factory, Hammer } from "lucide-react"

interface TimelineEvent {
  period: string
  title: string
  description: string
  classes: string[]
  icon: React.ReactNode
  color: string
}

const timelineEvents: TimelineEvent[] = [
  {
    period: "Thời nguyên thủy",
    title: "Xã hội cộng sản nguyên thủy",
    description: "Chưa có giai cấp. Làm chung, hưởng chung. Lực lượng sản xuất thấp, năng suất lao động kém.",
    classes: ["Không có giai cấp"],
    icon: <Users className="w-5 h-5" />,
    color: "bg-green-100 border-green-300",
  },
  {
    period: "3-5 nghìn năm trước",
    title: "Xã hội chiếm hữu nô lệ",
    description:
      "Xã hội có giai cấp đầu tiên. Xuất hiện 'của dư', phân công lao động phát triển, chế độ tư hữu hình thành.",
    classes: ["Chủ nô (thống trị)", "Nô lệ (bị trị)"],
    icon: <Sword className="w-5 h-5" />,
    color: "bg-red-100 border-red-300",
  },
  {
    period: "Trung cổ",
    title: "Xã hội phong kiến",
    description: "Dựa trên sở hữu đất đai. Nông nghiệp là ngành sản xuất chủ yếu. Quan hệ phong kiến thống trị.",
    classes: ["Địa chủ (thống trị)", "Nông dân (bị trị)", "Thủ công nghiệp"],
    icon: <Users className="w-5 h-5" />,
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    period: "Thế kỷ 16-18",
    title: "Xã hội tư bản chủ nghĩa",
    description:
      "Cách mạng công nghiệp. Sở hữu tư nhân về tư liệu sản xuất. Đấu tranh giai cấp gay gắt giữa tư sản và vô sản.",
    classes: ["Tư sản (thống trị)", "Vô sản (bị trị)", "Tiểu tư sản"],
    icon: <Factory className="w-5 h-5" />,
    color: "bg-blue-100 border-blue-300",
  },
  {
    period: "Thế kỷ 19-20",
    title: "Thời kỳ quá độ lên CNXH",
    description:
      "Giai cấp vô sản giành chính quyền. Xây dựng chủ nghĩa xã hội. Đấu tranh 'ai thắng ai' giữa hai con đường.",
    classes: ["Công nhân (lãnh đạo)", "Nông dân", "Trí thức"],
    icon: <Hammer className="w-5 h-5" />,
    color: "bg-purple-100 border-purple-300",
  },
  {
    period: "Tương lai",
    title: "Xã hội cộng sản chủ nghĩa",
    description:
      "Xóa bỏ hoàn toàn giai cấp và áp bức bóc lột. 'Từ mỗi người theo khả năng, cho mỗi người theo nhu cầu'.",
    classes: ["Không có giai cấp"],
    icon: <Users className="w-5 h-5" />,
    color: "bg-emerald-100 border-emerald-300",
  },
]

export default function Timeline() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Timeline Lịch sử Giai cấp</CardTitle>
          <p className="text-muted-foreground">
            Sự phát triển của các hình thái kinh tế-xã hội và giai cấp qua lịch sử
          </p>
        </CardHeader>
      </Card>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-300 via-red-300 via-yellow-300 via-blue-300 via-purple-300 to-emerald-300"></div>

        <div className="space-y-8">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Timeline dot */}
              <div
                className={`relative z-10 w-16 h-16 rounded-full ${event.color} flex items-center justify-center border-4 bg-white shadow-lg`}
              >
                {event.icon}
              </div>

              {/* Content */}
              <Card className="flex-1 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {event.period}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-pretty">{event.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Cấu trúc giai cấp:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.classes.map((className, classIndex) => (
                        <Badge
                          key={classIndex}
                          variant={
                            className.includes("thống trị") || className.includes("lãnh đạo")
                              ? "default"
                              : className.includes("bị trị")
                                ? "destructive"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {className}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
