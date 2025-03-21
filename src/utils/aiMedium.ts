import { Board, PlayerSymbol } from "../types/types"

const getPossibleWinningMove = (board: Board, player: PlayerSymbol): number | null => {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ]

  for (let [a, b, c] of winningLines) {
    const values = [board[a], board[b], board[c]]

    // return the index of empty cell if there are two connected cells with same symbol
    if (values.filter(v => v === player).length === 2 && values.includes(null)) {
      return [a, b, c].find(index => board[index] === null) || null
    }
  }
  return null
}


/**
 * Logic:
 * Check if there is an immediate winning move for AI, if yes return that move
 * Check if there is an immediate winning move for human, if yes return that move(to block human from winning)
 * Check if center is empty, if yes return center (center is always cosider the best move)
 * Check if corners are empty, if yes return random corner (corners are considered better than edges but no)
 * Prioritization as follows:
 * 1. Winning move
 * 2. Blocking move
 * 3. Center
 * 4. Corners
 * 5. Edges
 * 
 * @param board 
 * @param aiPlayer 
 * @param humanPlayer 
 * @returns 
 */
export const makeMediumAIMove = (board: Board, aiPlayer: PlayerSymbol, humanPlayer: PlayerSymbol): number => {
  const availableMoves = board.map((cell, index) => (cell === null ? index : -1)).filter(index => index !== -1)

  const winningMove = getPossibleWinningMove(board, aiPlayer)
  if (winningMove !== null) return winningMove

  const blockingMove = getPossibleWinningMove(board, humanPlayer)
  if (blockingMove !== null) return blockingMove

  if (board[4] === null) return 4

  const corners = [0, 2, 6, 8].filter(index => availableMoves.includes(index))
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)]

  const edges = [1, 3, 5, 7].filter(index => availableMoves.includes(index))
  return edges.length > 0 ? edges[Math.floor(Math.random() * edges.length)] : availableMoves[0]
}
