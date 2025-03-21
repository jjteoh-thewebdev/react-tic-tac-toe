"use client"

import { useState, useEffect } from "react"
import GameMode from "./components/GameMode"
import SymbolSelection from "./components/SymbolSelection"
import GameBoard from "./components/GameBoard"
import EndGameDialog from "./components/EndGameDialog"
import { GameModeType, PlayerSymbol, Board, GameStatus, AIMode } from "./types/types"
import { checkWinner, checkDraw } from "./utils/winningChecker"
import { makeEasyAIMove } from "./utils/aiEasy"
import { makeMediumAIMove } from "./utils/aiMedium"
import { makeHardAIMove } from "./utils/aiHard"

export default function App() {
  const [gameMode, setGameMode] = useState<GameModeType>(null)
  const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>("X")
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState<PlayerSymbol>("X")
  const [gameStatus, setGameStatus] = useState<GameStatus>("initial")
  const [winner, setWinner] = useState<PlayerSymbol | null>(null)
  const [aiMode, setAiMode] = useState<AIMode>("easy")

  // Add effect to handle AI move when game status changes to playing
  useEffect(() => {
    if (gameMode === "single" && playerTurn !== playerSymbol && gameStatus === "playing") {
        setTimeout(() => {
          makeAIMove()
        }, 500) // delay to make it look like real player playing
    }
  }, [gameStatus, gameMode, playerSymbol, playerTurn])

  const resetGame = (status: GameStatus = "playing") => {
    setBoard(Array(9).fill(null))
    setPlayerTurn("X")
    setGameStatus(status)
    setWinner(null)
  }

  const resetToHome = () => {
    resetGame("initial")
    setAiMode("easy")
    setGameMode(null)
  }

  const handleMove = (index: number) => {
    if (board[index] || gameStatus !== "playing") return

    const newBoard = [...board]
    newBoard[index] = playerTurn
    setBoard(newBoard)

    const winner = checkWinner(newBoard)
    if (winner) {
      // we add a delay to make the draw animation look smoother
       setTimeout(() => {
        setGameStatus("win")
        setWinner(winner)
      }, 500)

      return
    }

    if (checkDraw(newBoard)) {
      // we add a delay to make the draw animation look smoother
      setTimeout(() => {
        setGameStatus("draw")
      }, 500);
      return
    }

    const nextPlayer = playerTurn === "X" ? "O" : "X"
    setPlayerTurn(nextPlayer)
  }

  const makeAIMove = () => {
    let aiMoveIndex = 0

    if (aiMode === "easy") {
      aiMoveIndex = makeEasyAIMove(board)
    } else if (aiMode === "medium") {
      aiMoveIndex = makeMediumAIMove(board, playerTurn, playerSymbol)
    } else {
      aiMoveIndex = makeHardAIMove(board, playerSymbol)
    }

    handleMove(aiMoveIndex)
  }

  // Determine what to render based on game state
  const renderGameState = () => {
    if (gameMode === null) {
      return <GameMode onSelectMode={(mode) => {
        if(mode === "multi") {
          setGameStatus("playing")
        }
        setGameMode(mode)
      }} />
    }

    if (gameMode === "single" && gameStatus === "initial") {
      return <SymbolSelection onSelectDifficulty={setAiMode} onSelectSymbol={(selectedSymbol) => {
        setPlayerSymbol(selectedSymbol)
        setGameStatus("playing")
      }} />
    }

    return <GameBoard board={board} playerTurn={playerTurn} gameMode={gameMode} playerSymbol={playerSymbol} onMove={handleMove} />
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>

      {renderGameState()}

      {["win", "draw"].includes(gameStatus) && (
        <EndGameDialog status={gameStatus} winner={winner} onRematch={resetGame} onBackToHome={resetToHome} />
      )}
    </div>
  )
}

