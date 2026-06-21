export type Player = "X" | "O";
export type CellValue = Player | null;
export type BoardState = CellValue[];
export interface WinResult{
    winner: Player,
    combination: number[]
}
export interface GameStats {
  xWins: number;
  oWins: number;
  draws: number;
}