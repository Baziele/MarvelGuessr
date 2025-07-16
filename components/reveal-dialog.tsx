"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { QuoteWithSpeakers } from "@/lib/types"
import { AlertCircle } from "lucide-react"

interface RevealDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  quote: QuoteWithSpeakers | null
  onProceed: () => void
}

export function RevealDialog({ open, onOpenChange, quote, onProceed }: RevealDialogProps) {
  if (!quote) return null

  const speakerMap = new Map<number, string>()
  quote.lines.forEach((line) => {
    speakerMap.set(line.speakerNumber, line.character)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Reveal Answer
          </DialogTitle>
          <DialogDescription>The correct characters for this quote are:</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <ul className="space-y-2">
            {Array.from(speakerMap.entries())
              .sort((a, b) => a[0] - b[0])
              .map(([speakerNum, character]) => (
                <li key={speakerNum} className="flex items-center gap-2 bg-slate-800 rounded-md p-3">
                  <div className="text-amber-400 font-medium">Speaker {speakerNum}:</div>
                  <div className="text-white font-medium">{character}</div>
                </li>
              ))}
          </ul>

          <div className="mt-4 text-sm text-muted-foreground">
            From "{quote.movie}" ({quote.year})
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onProceed}>Next Quote</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
