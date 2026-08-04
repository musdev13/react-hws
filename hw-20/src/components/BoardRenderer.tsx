import React from "react";
import { type CellValue } from "../types";

interface BoardRendererProps {
  items: CellValue[];
  renderItem: (value: CellValue, index: number) => React.ReactNode;
}

export const BoardRenderer: React.FC<BoardRendererProps> = ({
  items,
  renderItem,
}) => {
  return (
    <div className="board">
      {items.map((cell, index) => renderItem(cell, index))}
    </div>
  );
};