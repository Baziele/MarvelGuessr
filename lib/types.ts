export type Difficulty = "easy" | "medium" | "hard"

export interface MarvelQuote {
  movie: string
  year: number
  lines: {
    text: string
    character: string
  }[]
  characters: string[]
  difficulty: Difficulty
}

export interface QuoteWithSpeakers extends MarvelQuote {
  lines: {
    text: string
    character: string
    speakerNumber: number
  }[]
  speakerCount: number
}
