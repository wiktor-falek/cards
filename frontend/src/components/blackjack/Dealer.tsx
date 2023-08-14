import { Hand as HandClass } from "../../../../lib/src/blackjack";
import PlayingCardComponent from "../PlayingCard";

type Props = {
	hand: HandClass;
};

export default function Dealer({ hand }: Props) {
	return (
		<div className="dealer flex flex-wrap gap-2" id="dealer-hand">
			<div className="w-full">
				<h2>Dealer - Score: {hand.getScore()}</h2>
			</div>
			{hand.cards.map((card) => (
				<PlayingCardComponent card={card} key={card.name} />
			))}
		</div>
	);
}