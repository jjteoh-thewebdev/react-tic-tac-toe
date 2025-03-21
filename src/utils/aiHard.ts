import { Board, PlayerSymbol } from "../types/types"
import { checkWinner, checkDraw } from "./winningChecker"

/**
 * Logic:
 * We are using minimax algorithm to calculate the best move for AI
 * Minimax is a tree-based, backtracking algorithm that is used in decision-making and game theory
 * It is used to find the optimal move for a player(maximizer), assuming that the opponent(minimizer) is also playing optimally
 * The algorithm traverses the game tree recursively, maintaining the heuristic value for minimizer and maximizer
 * The drawback of minimax is that it is slow as it needs to traverse all possible nodes(e.g. player that start the game has 9 possible moves) 
 * Complexity: O(b^m), where b is the branching factor and m is the maximum depth of the tree
 * 
 * To optimize the algorithm we use alpha-beta pruning
 * alpha-beta pruning is an optimization technique used to reduce the number of nodes that are evaluated by the minimax algorithm in a game tree
 * It stops evaluating a move when at least one possibility has been found that proves the move to be worse than a previously examined move
 * Reduced complexity to O(b^(m/2))
 * 
 * Further readings:
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/
 * https://www.geeksforgeeks.org/introduction-to-evaluation-function-of-minimax-algorithm-in-game-theory/
 * https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-4-alpha-beta-pruning/
 * @param board 
 * @param depth 
 * @param isMaximizing 
 * @param aiPlayer 
 * @param humanPlayer 
 * @param alpha 
 * @param beta 
 * @returns 
 */
const minimax = (board: Board, depth: number, isMaximizing: boolean, aiPlayer: PlayerSymbol, humanPlayer: PlayerSymbol, alpha: number, beta: number): number => {
  const winner = checkWinner(board)
  if (winner === aiPlayer) return 10 - depth
  if (winner === humanPlayer) return depth - 10
  if (checkDraw(board)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = aiPlayer
        let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta)
        board[i] = null
        bestScore = Math.max(bestScore, score)
        alpha = Math.max(alpha, bestScore)
        if (beta <= alpha) break
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = humanPlayer
        let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta)
        board[i] = null
        bestScore = Math.min(bestScore, score)
        beta = Math.min(beta, bestScore)
        if (beta <= alpha) break
      }
    }
    return bestScore
  }
}

export const makeHardAIMove = (board: Board, humanPlayer: PlayerSymbol): number => {
  let bestMove = -1
  let bestScore = -Infinity

  const aiPlayer = humanPlayer === "X" ? "O" : "X"

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = aiPlayer
      let score = minimax(board, 0, false, aiPlayer, humanPlayer, -Infinity, Infinity)
      board[i] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }
  return bestMove
}
