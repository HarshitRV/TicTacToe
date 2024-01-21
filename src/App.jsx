/**
 * React imports
 */
import { useState } from "react";
/**
 * Component imports
 */
import Player from "./components/Player";
import Board from "./components/Board";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
/**
 * Utils imports
 */
import { symbols, checkWin } from "./utils";

function App() {
	const [gameTurns, setGameTurns] = useState([]);
	const [winner, setWinner] = useState({ result: null });
	const [playerInfo, setPlayerInfo] = useState({
		[symbols.PLAYER_1]: "Player 1",
		[symbols.PLAYER_2]: "Player 2",
	});

	let activePlayer = symbols.PLAYER_1;
	if (gameTurns.length > 0 && gameTurns[0].player === symbols.PLAYER_1)
		activePlayer = symbols.PLAYER_2;

	const handleSetPlayerInfo = (playerSymbol, playerName) => {
		setPlayerInfo((prevPlayerInfo) => {
			return { ...prevPlayerInfo, [playerSymbol]: playerName };
		});
	};

	const checkWhoWon = (gameTurns) => {
		const boardValues = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];

		for (const turn of gameTurns) {
			const { square, player } = turn;
			const { row, col } = square;
			boardValues[row][col] = player;
		}

		const winner = checkWin(boardValues);

		if (winner.result) setWinner(winner);
	};

	const handleRematch = () => {
		setGameTurns([]);
		setWinner({ result: null });
	};

	const handleSetActivePlayer = (row, col) => {
		setGameTurns((prevGameTurn) => {
			let currentPlayer = symbols.PLAYER_1;

			if (
				prevGameTurn.length > 0 &&
				prevGameTurn[0].player === symbols.PLAYER_1
			)
				currentPlayer = symbols.PLAYER_2;

			const updatedGameTurns = [
				{ square: { row, col }, player: currentPlayer },
				...gameTurns,
			];

			checkWhoWon(updatedGameTurns);

			return updatedGameTurns;
		});
	};

	return (
		<main>
			<div id="game-container">
				<ol
					id="players"
					className="highlight-player">
					<Player
						isActive={activePlayer === symbols.PLAYER_1}
						name={playerInfo[symbols.PLAYER_1]}
						symbol={symbols.PLAYER_1}
						handleSetPlayerInfo={handleSetPlayerInfo}
					/>
					<Player
						isActive={activePlayer === symbols.PLAYER_2}
						name={playerInfo[symbols.PLAYER_2]}
						symbol={symbols.PLAYER_2}
						handleSetPlayerInfo={handleSetPlayerInfo}
					/>
				</ol>
				{winner.result && (
					<GameOver
						winner={winner}
						handleRematch={handleRematch}
						playerInfo={playerInfo}
					/>
				)}
				<Board
					gameTurns={gameTurns}
					onSelectSquare={handleSetActivePlayer}
				/>
			</div>
			<div>
				<Log turns={gameTurns} />
			</div>
		</main>
	);
}

export default App;
