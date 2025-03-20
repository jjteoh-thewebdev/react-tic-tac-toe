"use client"

import { GameModeType } from "../types/types"

interface GameModeProps {
  onSelectMode: (mode: GameModeType) => void
}

export default function GameMode({ onSelectMode }: GameModeProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-6">Select Game Mode</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => onSelectMode("single")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Single Player
        </button>
        <button
          onClick={() => onSelectMode("multi")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Multiplayer
        </button>
      </div>
    </div>
  )
}

