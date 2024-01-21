/**
 * Object shape
 * [
 *  [null, null, null],
 *  [null, null, null],
 *  [null, null, null],
 * ]
 */
export const initialBoardValues = Array(3)
	.fill(null)
	.map(() => Array(3).fill(null));

/**
 * Symbol constants for the players.
 */
export const symbols = {
	PLAYER_1: "X",
	PLAYER_2: "O",
};

/**
 * Checks if a player has won the game.
 *
 * @param {Array} board - The game board.
 * @returns {string|null} The winning player ('X' or 'O'), or null if no player has won yet.
 */
export function checkWin(board) {
	// Check rows
	for (let i = 0; i < 3; i++) {
		if (
			board[i][0] &&
			board[i][0] === board[i][1] &&
			board[i][0] === board[i][2]
		) {
			return {
				result: "WON",
				symbol: board[i][0],
			};
		}
	}

	// Check columns
	for (let i = 0; i < 3; i++) {
		if (
			board[0][i] &&
			board[0][i] === board[1][i] &&
			board[0][i] === board[2][i]
		) {
			return {
				result: "WON",
				symbol: board[0][i],
			};
		}
	}

	// Check diagonals
	if (
		board[0][0] &&
		board[0][0] === board[1][1] &&
		board[0][0] === board[2][2]
	) {
		return {
			result: "WON",
			symbol: board[0][0],
		};
	}
	if (
		board[0][2] &&
		board[0][2] === board[1][1] &&
		board[0][2] === board[2][0]
	) {
		return {
			result: "WON",
			symbol: board[0][2],
		};
	}

	// Check for draw
	if (board.flat().every((cell) => cell !== null)) {
		return { result: "DRAW" };
	}

	// No winner
	return { result: null };
}
