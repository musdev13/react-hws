import type { CellValue } from "../types";

interface CellProps {
  value: CellValue;
  onCellClick: () => void;
  isWinner: boolean;
}

export function Cell({ value, onCellClick, isWinner }: CellProps) {
  const cellClass = `cell ${value === "X" ? "x-mark" : value === "O" ? "o-mark" : ""} ${isWinner ? "winner" : ""}`;

  return (
    <div className={cellClass} onClick={onCellClick}>
      {value}
    </div>
  );
}
