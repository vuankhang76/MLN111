"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TheoryModalProps {
  isOpen: boolean
  onClose: () => void
  section: {
    id: string
    title: string
    icon: React.ReactNode
    summary: string
    content: string
  } | null
}

export function TheoryModal({ isOpen, onClose, section }: TheoryModalProps) {
  if (!section) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">{section.icon}</div>
            <div>
              <DialogTitle className="text-2xl">{section.title}</DialogTitle>
              <DialogDescription className="text-base mt-1">{section.summary}</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            <div className="prose prose-sm max-w-none">
              {section.content.split("\n\n").map((paragraph, index) => (
                <div key={index} className="mb-4">
                  {paragraph.split("\n").map((line, lineIndex) => {
                    if (line.startsWith("•")) {
                      return (
                        <div key={lineIndex} className="flex items-start gap-2 ml-4 mb-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm leading-relaxed">{line.substring(1).trim()}</span>
                        </div>
                      )
                    } else if (line.includes(":") && line.length < 50) {
                      return (
                        <h4 key={lineIndex} className="font-semibold text-primary mb-2 mt-4">
                          {line}
                        </h4>
                      )
                    } else {
                      return (
                        <p key={lineIndex} className="text-sm leading-relaxed mb-2">
                          {line}
                        </p>
                      )
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
