import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface StatsDisplayProps {
  stats: {
    totalCorrect: number
    totalIncorrect: number
    easyCorrect: number
    mediumCorrect: number
    hardCorrect: number
    hintsUsed: number
    revealsUsed?: number
  }
  score: number
  attempts: number
}

export function StatsDisplay({ stats, score, attempts }: StatsDisplayProps) {
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">{score}</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Total Correct</div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-700 dark:text-green-300">{accuracy}%</div>
            <div className="text-sm text-green-600 dark:text-green-400">Accuracy</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-lg mb-2 text-slate-800 dark:text-slate-200">Difficulty Breakdown</h3>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">Easy Quotes</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{stats.easyCorrect} correct</span>
          </div>
          <Progress value={stats.easyCorrect} max={10} className="h-3 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">Medium Quotes</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{stats.mediumCorrect} correct</span>
          </div>
          <Progress value={stats.mediumCorrect} max={10} className="h-3 bg-slate-200 dark:bg-slate-700" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">Hard Quotes</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">{stats.hardCorrect} correct</span>
          </div>
          <Progress value={stats.hardCorrect} max={10} className="h-3 bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Game Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Hints Used</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{stats.hintsUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Reveals Used</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{stats.revealsUsed || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2 text-slate-800 dark:text-slate-200">Attempts</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Attempts</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{attempts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Incorrect Guesses</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{stats.totalIncorrect}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
