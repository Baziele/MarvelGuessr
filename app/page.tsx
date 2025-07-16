"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Film,
    User,
    Award,
    RefreshCw,
    HelpCircle,
    Check,
    BarChart3,
    EyeIcon,
    XCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { marvelQuotes } from "@/lib/marvel-quotes";
import { CharacterInput } from "@/components/character-input";
import type { Difficulty, QuoteWithSpeakers } from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { StatsDisplay } from "@/components/stats-display";
import { DynamicBackground } from "@/components/dynamic-background";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

export default function Home() {
    const { toast } = useToast();
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [guessedCharacters, setGuessedCharacters] = useState<
        Record<number, string>
    >({});
    const [revealedCharacters, setRevealedCharacters] = useState<
        Record<number, string>
    >({});
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showMovie, setShowMovie] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [quoteList, setQuoteList] = useState<QuoteWithSpeakers[]>([]);
    const [allCharacters, setAllCharacters] = useState<string[]>([]);
    const [difficulty, setDifficulty] = useState<Difficulty>("medium");
    const [statsOpen, setStatsOpen] = useState(false);
    const [quitOpen, setQuitOpen] = useState(false);
    const [gameStats, setGameStats] = useState({
        totalCorrect: 0,
        totalIncorrect: 0,
        easyCorrect: 0,
        mediumCorrect: 0,
        hardCorrect: 0,
        hintsUsed: 0,
        revealsUsed: 0,
    });
    const [isLastQuote, setIsLastQuote] = useState(false);

    // Prepare quotes with speaker numbers
    useEffect(() => {
        // Extract all unique character names for autocomplete
        const characters = new Set<string>();
        marvelQuotes.forEach((quote) => {
            quote.characters.forEach((char) => characters.add(char));
        });
        setAllCharacters(Array.from(characters));
    }, []);

    // Filter quotes by difficulty when difficulty changes
    useEffect(() => {
        if (gameStarted) {
            prepareQuotes();
        }
    }, [difficulty, gameStarted]);

    // Check if current quote is the last one
    useEffect(() => {
        setIsLastQuote(currentQuoteIndex === quoteList.length - 1);
    }, [currentQuoteIndex, quoteList.length]);

    const prepareQuotes = () => {
        // Filter quotes by difficulty
        const filteredQuotes = marvelQuotes.filter(
            (quote) => quote.difficulty === difficulty
        );

        // Shuffle quotes
        const shuffled = [...filteredQuotes].sort(() => Math.random() - 0.5);

        // Prepare quotes with speaker numbers
        const quotesWithSpeakers = shuffled.map((quote) => {
            // Create a map of unique speakers
            const speakerMap = new Map<string, number>();

            // Process each line to assign speaker numbers
            const processedLines = quote.lines.map((line) => {
                if (!speakerMap.has(line.character)) {
                    speakerMap.set(line.character, speakerMap.size + 1);
                }

                return {
                    ...line,
                    speakerNumber: speakerMap.get(line.character) || 0,
                };
            });

            return {
                ...quote,
                lines: processedLines,
                speakerCount: speakerMap.size,
            };
        });

        setQuoteList(quotesWithSpeakers);
    };

    const currentQuote = quoteList[currentQuoteIndex];

    const handleGuess = (speakerNumber: number, characterName: string) => {
        if (!characterName.trim()) return;

        setAttempts(attempts + 1);

        // Find the character for this speaker number
        const correctCharacter = currentQuote?.lines.find(
            (line) => line.speakerNumber === speakerNumber
        )?.character;

        // Check if the guess is correct (case insensitive)
        const isCorrect =
            correctCharacter?.toLowerCase() === characterName.toLowerCase();

        if (isCorrect) {
            // Add to guessed characters
            setGuessedCharacters({
                ...guessedCharacters,
                [speakerNumber]: characterName,
            });

            setScore(score + 1);
            setGameStats({
                ...gameStats,
                totalCorrect: gameStats.totalCorrect + 1,
                ...(difficulty === "easy"
                    ? { easyCorrect: gameStats.easyCorrect + 1 }
                    : {}),
                ...(difficulty === "medium"
                    ? { mediumCorrect: gameStats.mediumCorrect + 1 }
                    : {}),
                ...(difficulty === "hard"
                    ? { hardCorrect: gameStats.hardCorrect + 1 }
                    : {}),
            });

            toast({
                title: "Correct!",
                description: `Speaker ${speakerNumber} is ${characterName}!`,
                variant: "default",
            });
        } else {
            setGameStats({
                ...gameStats,
                totalIncorrect: gameStats.totalIncorrect + 1,
            });

            toast({
                title: "Incorrect",
                description: `${characterName} is not Speaker ${speakerNumber} in this quote`,
                variant: "destructive",
            });
        }
    };

    const revealAnswers = () => {
        // Create a map of speaker numbers to character names
        const speakerCharacterMap: Record<number, string> = {};

        currentQuote?.lines.forEach((line) => {
            if (!speakerCharacterMap[line.speakerNumber]) {
                speakerCharacterMap[line.speakerNumber] = line.character;
            }
        });

        setRevealedCharacters(speakerCharacterMap);

        setGameStats({
            ...gameStats,
            revealsUsed: gameStats.revealsUsed + 1,
        });

        toast({
            title: "Answers Revealed",
            description: "The correct characters have been revealed",
        });
    };

    const revealMovie = () => {
        setShowMovie(true);
        setGameStats({
            ...gameStats,
            hintsUsed: gameStats.hintsUsed + 1,
        });

        toast({
            title: "Hint revealed",
            description: `This quote is from "${currentQuote?.movie}"`,
        });
    };

    const nextQuote = () => {
        if (currentQuoteIndex < quoteList.length - 1) {
            setCurrentQuoteIndex(currentQuoteIndex + 1);
            setGuessedCharacters({});
            setRevealedCharacters({});
            setShowMovie(false);
        } else {
            // End of quotes
            toast({
                title: "Game completed!",
                description: `Your final score: ${score}/${getTotalPossibleScore()}`,
            });
            setStatsOpen(true);
        }
    };

    const resetGame = () => {
        setScore(0);
        setAttempts(0);
        setCurrentQuoteIndex(0);
        setGuessedCharacters({});
        setRevealedCharacters({});
        setShowMovie(false);

        prepareQuotes();

        toast({
            title: "Game reset",
            description: "Good luck!",
        });
    };

    const quitGame = () => {
        setGameStarted(false);
        setQuitOpen(false);
        resetGame();
    };

    const startGame = (selectedDifficulty: Difficulty) => {
        setDifficulty(selectedDifficulty);
        setGameStarted(true);
    };

    const getTotalPossibleScore = () => {
        return quoteList.reduce((total, quote) => {
            // Count unique speakers
            const uniqueSpeakers = new Set();
            quote.lines.forEach((line) => uniqueSpeakers.add(line.character));
            return total + uniqueSpeakers.size;
        }, 0);
    };

    const allCharactersGuessed =
        currentQuote &&
        (Object.keys(guessedCharacters).length === currentQuote.speakerCount ||
            Object.keys(revealedCharacters).length > 0);

    const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    const progress =
        quoteList.length > 0 ? (currentQuoteIndex / quoteList.length) * 100 : 0;
    const quoteProgress = currentQuote
        ? (Object.keys(guessedCharacters).length / currentQuote.speakerCount) *
          100
        : 0;

    if (!gameStarted) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                <DynamicBackground />

                <div className="w-full max-w-4xl mx-auto mb-8">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-blue-600 mb-2">
                            MarvelGuessr
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            Test your knowledge of the Marvel Cinematic Universe
                            by identifying which characters spoke these famous
                            quotes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="relative h-64 md:h-full rounded-xl overflow-hidden shadow-lg">
                            <Image
                                src="/images/marvel-heroes.png"
                                alt="Marvel Heroes"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <h2 className="text-white text-2xl font-bold">
                                    Iconic Characters
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                                How To Play
                            </h2>
                            <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        1
                                    </span>
                                    <span>
                                        Read the movie quotes from the Marvel
                                        Cinematic Universe
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        2
                                    </span>
                                    <span>
                                        Guess which character spoke each line
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        3
                                    </span>
                                    <span>
                                        Use hints if you get stuck, but they'll
                                        affect your score
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        4
                                    </span>
                                    <span>
                                        Track your progress and compete for the
                                        highest score
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Card className="w-full shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader className="text-center pb-2">
                            <CardTitle className="text-3xl font-bold flex items-center justify-center gap-2 text-slate-800 dark:text-slate-100">
                                <Film className="h-7 w-7 text-red-600" />
                                Start Your Quiz
                            </CardTitle>
                            <CardDescription className="text-lg">
                                Choose your difficulty level to begin
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            <div className="grid grid-cols-3 gap-4">
                                <DifficultyCard
                                    title="Easy"
                                    description="Iconic and memorable quotes that most Marvel fans will recognize"
                                    icon="/images/easy-icon.png"
                                    onClick={() => startGame("easy")}
                                />
                                <DifficultyCard
                                    title="Medium"
                                    description="Less obvious quotes that require good knowledge of the MCU"
                                    icon="/images/medium-icon.png"
                                    onClick={() => startGame("medium")}
                                />
                                <DifficultyCard
                                    title="Hard"
                                    description="Obscure and challenging quotes for true Marvel experts"
                                    icon="/images/hard-icon.png"
                                    onClick={() => startGame("hard")}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <DynamicBackground />

            <Card className="w-full max-w-3xl shadow-lg border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
                            <User className="h-5 w-5 text-red-600" />
                            MarvelGuessr
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuitOpen(true)}
                                title="Quit Game"
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 px-3 py-1 text-base"
                            >
                                <Award className="h-4 w-4 text-amber-500" />
                                Score: {score}
                            </Badge>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setStatsOpen(true)}
                                title="View Stats"
                            >
                                <BarChart3 className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={resetGame}
                                title="Reset Game"
                            >
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <CardDescription className="text-base">
                            Quote {currentQuoteIndex + 1} of {quoteList.length}{" "}
                            •{" "}
                            {difficulty.charAt(0).toUpperCase() +
                                difficulty.slice(1)}{" "}
                            difficulty
                        </CardDescription>
                        <CardDescription className="text-base">
                            Characters guessed:{" "}
                            {Object.keys(guessedCharacters).length}/
                            {currentQuote?.speakerCount}
                        </CardDescription>
                    </div>
                    <div className="space-y-1">
                        <Progress value={progress} className="h-2" />
                        <Progress
                            value={quoteProgress}
                            className="h-2 bg-muted"
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    {currentQuote && (
                        <div className="space-y-5">
                            <div className="bg-slate-100 dark:bg-slate-700/50 p-6 rounded-lg shadow-inner">
                                {currentQuote.lines.map((line, index) => (
                                    <div key={index} className="mb-4 last:mb-0">
                                        <div className="flex items-start gap-3">
                                            <Badge
                                                variant="outline"
                                                className="mt-1 shrink-0 px-3 py-1 bg-slate-200/50 dark:bg-slate-600/50"
                                            >
                                                Speaker {line.speakerNumber}
                                            </Badge>
                                            <blockquote className="text-xl italic font-medium text-slate-700 dark:text-slate-200">
                                                {line.text}
                                            </blockquote>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-sm text-muted-foreground flex justify-between">
                                {showMovie && (
                                    <span className="text-base font-medium text-slate-700 dark:text-slate-300">
                                        Movie: {currentQuote.movie} (
                                        {currentQuote.year})
                                    </span>
                                )}
                                {!showMovie && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={revealMovie}
                                        className="text-slate-600 dark:text-slate-400 flex items-center gap-1"
                                    >
                                        <HelpCircle className="h-4 w-4" />
                                        Reveal Movie
                                    </Button>
                                )}

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={revealAnswers}
                                    className="text-slate-600 dark:text-slate-400 flex items-center gap-1"
                                    disabled={
                                        Object.keys(revealedCharacters).length >
                                        0
                                    }
                                >
                                    <EyeIcon className="h-4 w-4" />
                                    Reveal Answer
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(guessedCharacters).map(
                                        ([speakerNum, character]) => (
                                            <Badge
                                                key={speakerNum}
                                                variant="secondary"
                                                className="flex items-center gap-1 px-3 py-1 text-base"
                                            >
                                                <Check className="h-4 w-4 text-green-500" />
                                                Speaker {speakerNum}:{" "}
                                                {character}
                                            </Badge>
                                        )
                                    )}
                                </div>

                                {/* Get unique speaker numbers from the current quote */}
                                {currentQuote.lines
                                    .reduce((speakers, line) => {
                                        if (
                                            !speakers.includes(
                                                line.speakerNumber
                                            )
                                        ) {
                                            speakers.push(line.speakerNumber);
                                        }
                                        return speakers;
                                    }, [] as number[])
                                    .sort((a, b) => a - b)
                                    .map((speakerNumber) => (
                                        <CharacterInput
                                            key={speakerNumber}
                                            speakerNumber={speakerNumber}
                                            options={allCharacters}
                                            onGuess={handleGuess}
                                            disabled={
                                                !!guessedCharacters[
                                                    speakerNumber
                                                ] ||
                                                !!revealedCharacters[
                                                    speakerNumber
                                                ]
                                            }
                                            guessedCharacter={
                                                guessedCharacters[speakerNumber]
                                            }
                                            revealedCharacter={
                                                revealedCharacters[
                                                    speakerNumber
                                                ]
                                            }
                                        />
                                    ))}

                                <div className="pt-4">
                                    {allCharactersGuessed && (
                                        <Button
                                            type="button"
                                            onClick={
                                                isLastQuote
                                                    ? resetGame
                                                    : nextQuote
                                            }
                                            className="w-full py-6 text-lg"
                                            variant={
                                                isLastQuote
                                                    ? "default"
                                                    : "default"
                                            }
                                        >
                                            {isLastQuote
                                                ? "New Game"
                                                : "Next Quote"}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-between text-base text-slate-600 dark:text-slate-400 pt-2">
                    <div>Attempts: {attempts}</div>
                    <div>Accuracy: {accuracy}%</div>
                </CardFooter>
            </Card>

            <Dialog open={statsOpen} onOpenChange={setStatsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Your Stats
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Here's how you're doing in the Marvel Quote Quiz
                        </DialogDescription>
                    </DialogHeader>
                    <StatsDisplay
                        stats={{ ...gameStats }}
                        score={score}
                        attempts={attempts}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setStatsOpen(false)}
                        >
                            Close
                        </Button>
                        <Button onClick={resetGame}>New Game</Button>
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog open={quitOpen} onOpenChange={setQuitOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Quit Current Session?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your current game progress will be lost. You'll
                            return to the start screen.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={quitGame}>
                            Quit Game
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </main>
    );
}

interface DifficultyCardProps {
    title: string;
    description: string;
    icon: string;
    onClick: () => void;
}

function DifficultyCard({
    title,
    description,
    icon,
    onClick,
}: DifficultyCardProps) {
    return (
        <div
            className="bg-slate-50 dark:bg-slate-700 rounded-xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 flex flex-col items-center text-center"
            onClick={onClick}
        >
            <div className="w-16 h-16 mb-3 relative">
                <Image
                    src={icon || "/placeholder.svg"}
                    alt={`${title} difficulty`}
                    width={64}
                    height={64}
                    className="object-contain"
                />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">
                {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
                {description}
            </p>
        </div>
    );
}
