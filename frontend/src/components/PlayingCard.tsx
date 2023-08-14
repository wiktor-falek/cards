import { Card as PlayingCardClass } from "../../../lib/src/playing_cards";

type Props = {
	card: PlayingCardClass | undefined;
};

export default function PlayingCard({ card }: Props) {
	return (
	<div className="w-32 h-48 border-2 flex items-center justify-center">
		<p className="px-4">{card?.name}</p>
	</div>
	);
}