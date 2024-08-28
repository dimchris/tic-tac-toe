import React from "react";
import { Turn } from "../App";

interface LogProps {
  turns: Turn[];
}

const Log: React.FC<LogProps> = ({ turns }) => {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li>
          {turn.player} selected {turn.square.row}, {turn.square.col}{" "}
        </li>
      ))}
    </ol>
  );
};

export default Log;
