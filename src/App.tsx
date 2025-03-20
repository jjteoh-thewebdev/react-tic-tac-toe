"use client"

import { useState, useEffect } from "react"
import GameMode from "./components/GameMode"
import SymbolSelection from "./components/SymbolSelection"
import GameBoard from "./components/GameBoard"
import EndGameDialog from "./components/EndGameDialog"
import { GameModeType, PlayerSymbol, Board, GameStatus, AIMode } from "./types/types"

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]  // Diagonals
];

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
        makeAIMove()
    }
  }, [gameStatus, gameMode, playerSymbol, playerTurn])

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setPlayerTurn("X")
    setGameStatus("playing")
    setWinner(null)
  }

  const resetToHome = () => {
    setBoard(Array(9).fill(null))
    setGameStatus("initial")
    setPlayerTurn("X")
    setWinner(null)
    setAiMode("easy")
    setGameMode(null)
  }

  const checkWinner = (board: Board): PlayerSymbol | null => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as PlayerSymbol
      }
    }
    return null
  }

  const checkDraw = (board: Board): boolean => {
    return board.every((square) => square !== null)
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
    console.log(`nextPlayer`, nextPlayer)
    setPlayerTurn(nextPlayer)

    // AI move for single player mode
    // if (gameMode === "single" && nextPlayer !== playerSymbol) {
    //   setTimeout(() => {
    //     makeAIMove()
    //   }, 5000)
    // }
  }

  const makeEasyAIMove = (): number => {
    // Simple AI: find first empty square
    const emptyCells = board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)

    if (emptyCells.length === 0) throw new Error("No empty cells")

    // Choose a random empty cell
    const randomIndex = Math.floor(Math.random() * emptyCells.length)

    return emptyCells[randomIndex]
  }

  const getPossibleWinningMove = (player: PlayerSymbol): number | null => {
    for (let [a, b, c] of winningLines) {
      const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === player).length === 2 && values.includes(null)) {
      return [a, b, c].find(index => board[index] === null) || null;
    }
    }
    return null;
  };

  const makeMediumAIMove = (): number => {
      const availableMoves = board.map((cell, index) => (cell === null ? index : -1)).filter(index => index !== -1);
    
      // 1. AI wins in one move
      const winningMove = getPossibleWinningMove(playerTurn);
      if (winningMove !== null) return winningMove;
    
      // 2. Block opponent from winning
      const blockingMove = getPossibleWinningMove(playerSymbol);
      if (blockingMove !== null) return blockingMove;
    
      // 3. Play center if available
      if (board[4] === null) return 4;
    
      // 4. Play a corner if available
      const corners = [0, 2, 6, 8].filter(index => availableMoves.includes(index));
      if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];
    
      // 5. Play a random edge if available
      const edges = [1, 3, 5, 7].filter(index => availableMoves.includes(index));
      return edges.length > 0 ? edges[Math.floor(Math.random() * edges.length)] : availableMoves[0];
  }

  // Minimax Algorithm with Alpha-Beta Pruning
  const minimax = (board: Board, depth: number, isMaximizing: boolean, aiPlayer: PlayerSymbol, humanPlayer: PlayerSymbol, alpha: number, beta: number): number => {
    const winner = checkWinner(board);
    if (winner === aiPlayer) return 10 - depth; // AI wins
    if (winner === humanPlayer) return depth - 10; // Human wins
    if (checkDraw(board)) return 0; // Draw

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = aiPlayer;
          let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta);
          board[i] = null; // Undo move
          bestScore = Math.max(bestScore, score);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break; // Prune
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = humanPlayer;
          let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta);
          board[i] = null; // Undo move
          bestScore = Math.min(bestScore, score);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break; // Prune
        }
      }
      return bestScore;
    }
  };

  // Find the best move using Minimax
  const makeHardAIMove = (): number => {
    let bestMove = -1;
    let bestScore = -Infinity;

    const humanPlayer = playerSymbol;
    const aiPlayer = playerSymbol === "X" ? "O" : "X";

    // First, check if we can win in one move
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = aiPlayer;
        if (checkWinner(board) === aiPlayer) {
          board[i] = null;
          return i;
        }
        board[i] = null;
      }
    }

    // Then, check if we need to block opponent's winning move
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = humanPlayer;
        if (checkWinner(board) === humanPlayer) {
          board[i] = null;
          return i;
        }
        board[i] = null;
      }
    }

    // If no immediate win or block, use minimax to find the best move
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = aiPlayer;
        let score = minimax(board, 0, false, aiPlayer, humanPlayer, -Infinity, Infinity);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const makeAIMove = () => {
    let aiMoveIndex = 0

    if(aiMode === "easy") {
      aiMoveIndex = makeEasyAIMove()
    } else if (aiMode === "medium") {
      aiMoveIndex = makeMediumAIMove()
    } else {
      aiMoveIndex = makeHardAIMove()
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

    return <GameBoard board={board} playerTurn={playerTurn} playerMode={gameMode} playerSymbol={playerSymbol} onMove={handleMove} />
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

