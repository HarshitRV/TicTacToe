/**
 * Utils imports
 */
import { checkWin, initialBoardValues } from "../utils";

/**
 * Board component represents the game board.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.gameTurns - An array of game turns. Each turn is an object with 'square' and 'player' properties.
 * @param {Function} props.onSelectSquare - A function to be called when a square is selected. It receives the row and column index as arguments.
 * @returns {JSX.Element} An ordered list representing the game board.
 */
export default function Board({ gameTurns, onSelectSquare }) {
	let boardValues = [...initialBoardValues.map((row) => [...row])];

	for (const turn of gameTurns) {
		const { square, player } = turn;
		const { row, col } = square;
		boardValues[row][col] = player;
	}

	return (
		<ol id="game-board">
			{boardValues.map((row, rowIndex) => {
				return (
					<li key={rowIndex}>
						<ol>
							{row.map((playerSymbol, colIndex) => {
								return (
									<button
										disabled={playerSymbol !== null}
										key={colIndex}
										className="square"
										onClick={() => onSelectSquare(rowIndex, colIndex)}>
										{playerSymbol}
									</button>
								);
							})}
						</ol>
					</li>
				);
			})}
		</ol>
	);
}
