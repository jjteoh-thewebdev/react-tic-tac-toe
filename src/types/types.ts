export type GameModeType = null | "single" | "multi"
export type PlayerSymbol = "X" | "O"
export type GameStatus = "initial" | "playing" | "win" | "draw"
export type Board = (PlayerSymbol | null)[]
export type AIMode = "easy" | "medium" | "hard"