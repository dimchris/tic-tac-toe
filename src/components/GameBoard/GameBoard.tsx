import React, { useState } from "react";
import _ from "lodash";
import { Turn } from "../../App";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
interface GameBoardProps {
  onSelectSquare: (row: number, col: number) => void;
  turns: Turn[];
}

const GameBoard: React.FC<GameBoardProps> = ({ onSelectSquare, turns }) => {
  const gameBoard: (string | null)[][] = _.cloneDeep(initialGameBoard);
  turns.forEach((turn) => {
    let player = turn.player;
    let { row, col } = turn.square;
    gameBoard[row][col] = player;
  });

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, cellIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
