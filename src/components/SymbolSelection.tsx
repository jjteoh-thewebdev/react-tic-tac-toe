"use client"

import { useState } from "react"
import { AIMode, PlayerSymbol } from "../types/types"

interface SymbolSelectionProps {
  onSelectSymbol: (symbol: PlayerSymbol) => void
  onSelectDifficulty: (difficulty: AIMode) => void
}

export default function SymbolSelection({ onSelectDifficulty, onSelectSymbol }: SymbolSelectionProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<AIMode>("easy")

  const handleDifficultyChange = (difficulty: AIMode) => {
    setSelectedDifficulty(difficulty)
    onSelectDifficulty(difficulty)
  }

  const onSelectPlayer = (symbol: PlayerSymbol) => {
    // Ensure difficulty is set before proceeding to game
    onSelectDifficulty(selectedDifficulty)
    onSelectSymbol(symbol)
  }
  
  const difficultyOptions: AIMode[] = ["easy", "medium", "hard"]

  return (
    <div>
      <div className="flex flex-col gap-4 w-full max-w-xs mb-4">
        <h3 className="font-semibold">Difficulty:</h3>
        <ul className="items-center w-full text-sm font-medium sm:flex cursor-pointer">
          {difficultyOptions.map((difficulty) => (
            <li key={difficulty} className="w-full">
              <div className="flex items-center ps-3">
                <input 
                  id={`difficulty-${difficulty}`}
                  type="radio" 
                  value={difficulty}
                  name="difficulty" 
                  className="w-4 h-4 focus:ring-blue-500"
                  checked={selectedDifficulty === difficulty}
                  onChange={() => handleDifficultyChange(difficulty)}
                />
                <label 
                  htmlFor={`difficulty-${difficulty}`} 
                  className="w-full py-3 ms-2 text-sm font-medium"
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold">Symbol:</h3>
        <p className="mb-4 text-gray-600 text-sm">(X always goes first)</p>
        <div className="flex gap-4 mt-2">
          <button
            onClick={() => onSelectPlayer("X")}
            className="w-20 h-20 flex items-center justify-center text-4xl font-bold bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          >
            X
          </button>
          <button
            onClick={() => onSelectPlayer("O")}
            className="w-20 h-20 flex items-center justify-center text-4xl font-bold bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            O
          </button>
        </div>
      </div>
    </div>
  )
}

