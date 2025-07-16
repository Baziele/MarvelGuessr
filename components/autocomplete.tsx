"use client"

import type React from "react"

import { useState, useEffect, useRef, type KeyboardEvent } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AutocompleteProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  inputRef?: React.RefObject<HTMLInputElement>
}

export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Type to search...",
  disabled = false,
  inputRef,
}: AutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const localInputRef = useRef<HTMLInputElement>(null)

  // Use the provided inputRef or fall back to local ref
  const actualInputRef = inputRef || localInputRef

  useEffect(() => {
    if (value.trim() === "") {
      setFilteredOptions([])
      return
    }

    const filtered = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()))
    setFilteredOptions(filtered.slice(0, 5)) // Limit to 5 suggestions
    setHighlightedIndex(0) // Reset highlighted index when options change
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
    setIsOpen(true)
  }

  const handleOptionClick = (option: string) => {
    onChange(option)
    setIsOpen(false)
    actualInputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Handle Tab key to select the first suggestion
    if (e.key === "Tab" && isOpen && filteredOptions.length > 0) {
      e.preventDefault()
      onChange(filteredOptions[highlightedIndex])
      setIsOpen(false)
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev))
    }

    if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    }

    // Handle Enter key to select highlighted option
    if (e.key === "Enter" && isOpen && filteredOptions.length > 0) {
      e.preventDefault()
      onChange(filteredOptions[highlightedIndex])
      setIsOpen(false)
    }

    // Handle Escape key to close dropdown
    if (e.key === "Escape") {
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        ref={actualInputRef}
        className="w-full py-5 text-base"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md bg-white dark:bg-slate-700 shadow-lg border border-slate-200 dark:border-slate-600">
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "px-4 py-3 text-base cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600",
                "border-b border-slate-200 dark:border-slate-600 last:border-0",
                index === highlightedIndex && "bg-slate-100 dark:bg-slate-600",
              )}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
