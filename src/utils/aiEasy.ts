import { Board } from "../types/types"

/**
 * Logic:
 * Get all empty cells, randomly select one of them
 * @param board 
 * @returns 
 */
export const makeEasyAIMove = (board: Board): number => {
  const emptyCells = board.map((cell, index) => (cell === null ? index : -1)).filter((index) => index !== -1)

  if (emptyCells.length === 0) throw new Error("No empty cells")

  const randomIndex = Math.floor(Math.random() * emptyCells.length)
  return emptyCells[randomIndex]
}
