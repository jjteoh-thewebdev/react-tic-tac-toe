"use client"

import { Board, GameModeType, PlayerSymbol } from "../types/types"

interface GameBoardProps {
  board: Board
  playerTurn: PlayerSymbol
  gameMode: GameModeType
  playerSymbol: PlayerSymbol
  onMove: (index: number) => void
}

export default function GameBoard({ board, playerTurn: currentPlayer, gameMode, playerSymbol, onMove }: GameBoardProps) {

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-medium">
        Current Turn:
        <span className={currentPlayer === "X" ? "text-green-600 font-bold ml-2" : "text-blue-600 font-bold ml-2"}>
          {currentPlayer}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-24 h-24 flex items-center justify-center text-4xl font-bold bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
            onClick={() => onMove(index)}
            disabled={cell !== null || (gameMode === "single" && currentPlayer !== playerSymbol)}
          >
            {cell && <span className={cell === "X" ? "text-green-600" : "text-blue-600"}>{cell}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

