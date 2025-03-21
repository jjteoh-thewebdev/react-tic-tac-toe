"use client"

import { GameStatus, PlayerSymbol } from "../types/types"

interface EndGameDialogProps {
  status: GameStatus
  winner: PlayerSymbol | null
  onRematch: () => void
  onBackToHome: () => void
}

export default function EndGameDialog({ status, winner, onRematch, onBackToHome }: EndGameDialogProps) {
  return (
    <div className="fixed inset-0 bg-gray-500/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{status === "win" ? `${winner} Wins!` : "Game Draw!"}</h2>

        {status === "win" && (
          <p className="mb-6">
            Congratulations to player
            <span className={winner === "X" ? "text-green-600 font-bold mx-1" : "text-blue-600 font-bold mx-1"}>
              {winner}
            </span>
            for winning the game!
          </p>
        )}

        {status === "draw" && <p className="mb-6">The game ended in a draw. No winner this time!</p>}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {onRematch()}}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Rematch
          </button>
          <button
            onClick={onBackToHome}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

