import { Player as PlayerClass } from "../../../../lib/src/blackjack";
import PlayingCardComponent from "../PlayingCard";

type Props = {
	player: PlayerClass;
};

export default function Player({ player }: Props) {
	return (
		<div className="player flex flex-wrap gap-2 border-1 border-white-2">
			<div className="w-full">
				<h2 className={`${player.isBust ? "text-red-400" : ""}`}>
					{player.name} - Score: {player.hand.getScore()}
				</h2>
			</div>
			{player.hand.cards.map((card) => (
				<PlayingCardComponent card={card} key={card.name} />
			))}
		</div>
	);
}