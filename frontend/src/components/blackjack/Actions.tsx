import { Game as GameClass } from "../../../../lib/src/blackjack";

type Props = {
	game: GameClass;
	holdHandler: () => void;
	hitHandler: () => void;
};

export default function Actions({ game, holdHandler, hitHandler }: Props) {
	
	if (game.isInProgress()) {
		return (
			<div className="flex gap-4 mx-auto">
				<p>Current Player: {game.currentPlayer.name}</p>
				<button
					className="w-32 py-2 px-8 border-2 border-white"
					onClick={holdHandler}
				>
					Hold
				</button>
				<button
					className="w-32 py-2 px-8 border-2 border-white"
					onClick={hitHandler}
				>
					Hit
				</button>
			</div>
		);
	} else if (game.isFinished()) {
		return (
			<div>The game has ended!</div>
		);
	} else if (game.isReadyToStart()) {
		return (
			<div>The game is ready to begin!</div>
		);
	}
}