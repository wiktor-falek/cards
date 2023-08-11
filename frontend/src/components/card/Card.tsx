import { Card as CardClass } from "../../../../lib/src";

type Props = {
  card: CardClass | undefined;
};

export default function Card({ card }: Props) {
  return (
    <div className="w-48 h-64 border-2 flex items-center justify-center">
      <p className="px-4">{card?.name}</p>
    </div>
  );
}
