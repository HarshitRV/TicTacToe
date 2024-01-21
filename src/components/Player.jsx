import { useState } from "react";

/**
 * Represents a player in the game.
 *
 * @param {Object} props - The player's properties.
 * @param {string} props.name - The name of the player.
 * @param {string} props.symbol - The symbol representing the player.
 * @param {boolean} props.isActive - Indicates whether the player is active or not.
 * @returns {JSX.Element} The Player component.
 */
export default function Player({
	name,
	symbol,
	isActive,
	handleSetPlayerInfo,
}) {
	const [playerName, setPlayerName] = useState(name);
	const [isEditing, setIsEditing] = useState(false);

	const handleSetEditing = () => {
		if (isEditing) {
			handleSetPlayerInfo(symbol, playerName);
		}

		setIsEditing((isEditing) => !isEditing);
	};

	const handleNameChange = (e) => {
		setPlayerName(e.target.value);
	};

	return (
		<li className={isActive ? "active" : null}>
			<span className="player">
				{isEditing ? (
					<input
						type="text"
						defaultValue={playerName}
						className="player-name"
						onChange={handleNameChange}
						required
					/>
				) : (
					<span className={`player-name`}>{playerName}</span>
				)}
				<span className="player-symbol">{symbol}</span>
			</span>
			<button onClick={handleSetEditing}>{isEditing ? "Save" : "Edit"}</button>
		</li>
	);
}
