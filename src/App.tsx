import { useState } from "react";
import GameBoard from "./components/GameBoard/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

const deriveActivePlayer = (prevTurns: Turn[]) => {
  return prevTurns.length > 0 && prevTurns[0].player === "X" ? "O" : "X";
};

// Suggested code may be subject to a license. Learn more: ~LicenseLog:257100060.
export const calculateWinner = (turns: Turn[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let squares = Array(9).fill(null);
  turns.forEach((turn) => {
    squares[turn.square.row * 3 + turn.square.col] = turn.player;
  });
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export interface Square {
  row: number;
  col: number;
}

export interface Turn {
  player: string;
  square: Square;
}

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);

  const winner = calculateWinner(gameTurns);
  const draw = gameTurns.length == 9 && !winner;

  const handleSelectSquare = (rowIndex: number, colIndex: number) => {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      return [
        {
          player: currentPlayer,
          square: { row: rowIndex, col: colIndex },
        },
        ...prevTurns,
      ];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player1"
            symbol="X"
            isActive={deriveActivePlayer(gameTurns) === "X"}
          />
          <Player
            initialName="Player2"
            symbol="O"
            isActive={deriveActivePlayer(gameTurns) === "O"}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} draw={draw} handleRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        <Log turns={gameTurns} />
      </div>
    </main>
  );
}

export default App;
