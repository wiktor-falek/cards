import { useReducer } from "react";
import { Game as BlackJack } from "../../lib/src/blackjack";
import DealerComponent from "./components/blackjack/Dealer";
import PlayerComponent from "./components/blackjack/Player";
import ActionsComponent from "./components/blackjack/Actions";

const game = new BlackJack();
game.addPlayer("Viktor");
game.addPlayer("Youssef");
game.addPlayer("Paul");
game.start();

function App() {
	const [, forceUpdate] = useReducer((c) => c + 1, 0);

	function handleHit() {
		game.hit(); // this mutates the game state, but does not trigger a rerender
		forceUpdate();
	}

	function handleHold() {
		game.hold();
		forceUpdate();
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="flex flex-col gap-32">
				<DealerComponent hand={game.dealer} key="dealer" />

				<div className="flex gap-2">
					{game.players.map((player, i) => (
						<PlayerComponent player={player} key={i} />
					))}
				</div>

				<ActionsComponent game={game} hitHandler={handleHit} holdHandler={handleHold} key="actions" />
			</div>
		</div>
	);
}

export default App;