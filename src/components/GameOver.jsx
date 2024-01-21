export default function GameOver({ winner, handleRematch, playerInfo }) {
	return (
		<div id="game-over">
			<h2>Game Over</h2>
			{winner.result === "DRAW" && <p>It's a draw!</p>}
			{winner.result !== "DRAW" && <p>{playerInfo[winner.symbol]} won !</p>}
			<p>
				<button onClick={handleRematch}>Rematch</button>
			</p>
		</div>
	);
}
