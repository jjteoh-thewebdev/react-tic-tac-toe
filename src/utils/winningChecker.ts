import { Board, PlayerSymbol } from "../types/types"

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]  // Diagonals
]


/**
 * Logic:
 * We use a brute force approach to check all possible winning lines
 * In Tic-Tac-Toe, there are 8 winning lines
 * We iterate over all winning lines and check if all 3 cells have the same symbol
 * If there is a winning line, we return the symbol of the winner
 * 
 * @param board 
 * @returns 
 */
export const checkWinner = (board: Board): PlayerSymbol | null => {
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as PlayerSymbol
    }
  }
  return null
}

/**
 * Logic:
 * If all cells are filled, the game is a draw
 * @param board 
 * @returns 
 */
export const checkDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null)
}
