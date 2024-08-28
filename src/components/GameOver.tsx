import React from "react";

interface GameOverProps {
  winner: string | null;
  draw: boolean;
  handleRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ winner, draw, handleRestart }) => {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>Winner: {winner}</p>}
      {draw && <p>"It's a draw!"</p>}
      <p>
        <button onClick={handleRestart}>Restart Game</button>
      </p>
    </div>
  );
};

export default GameOver;
