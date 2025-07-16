"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Autocomplete } from "./autocomplete"

interface CharacterInputProps {
  speakerNumber: number
  options: string[]
  onGuess: (speakerNumber: number, characterName: string) => void
  disabled?: boolean
  guessedCharacter?: string
  revealedCharacter?: string
}

export function CharacterInput({
  speakerNumber,
  options,
  onGuess,
  disabled = false,
  guessedCharacter,
  revealedCharacter,
}: CharacterInputProps) {
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onGuess(speakerNumber, value)
      setValue("")
    }
  }

  // Show correctly guessed character
  if (disabled && guessedCharacter) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-sm">
        <div className="font-medium text-slate-700 dark:text-slate-200">Speaker {speakerNumber}:</div>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
          <Check className="h-5 w-5" />
          {guessedCharacter}
        </div>
      </div>
    )
  }

  // Show revealed character
  if (disabled && revealedCharacter) {
    return (
      <div className="flex items-center gap-3 p-3 border rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 shadow-sm">
        <div className="font-medium text-slate-700 dark:text-slate-200">Speaker {speakerNumber}:</div>
        <div className="text-amber-600 dark:text-amber-400 font-medium">{revealedCharacter}</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <div className="shrink-0 flex items-center px-3 font-medium text-slate-700 dark:text-slate-200 text-base">
        Speaker {speakerNumber}:
      </div>
      <div className="flex-1">
        <Autocomplete
          options={options}
          value={value}
          onChange={setValue}
          inputRef={inputRef}
          placeholder={`Guess Speaker ${speakerNumber}...`}
          disabled={disabled}
        />
      </div>
      <Button type="submit" disabled={disabled || !value.trim()} size="default" className="px-4">
        Guess
      </Button>
    </form>
  )
}
