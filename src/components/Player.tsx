import React, { useState } from "react";

interface PlayerProps {
  initialName: string;
  symbol: string;
  isActive: boolean;
}

const Player: React.FC<PlayerProps> = ({ initialName, symbol, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  let editedName = playerName;

  const handleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
    setPlayerName(editedName);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    (editedName = event.target.value);

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && (
          <input
            onChange={handleNameChange}
            type="text"
            required
            defaultValue={playerName}
          />
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
