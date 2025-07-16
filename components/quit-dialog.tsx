"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface QuitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function QuitDialog({ open, onOpenChange, onConfirm }: QuitDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Quit Current Session?</AlertDialogTitle>
          <AlertDialogDescription>
            Your current game progress will be lost. You'll return to the start screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Quit Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
