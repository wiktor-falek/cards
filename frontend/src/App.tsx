console.log(import.meta.env.VITE_URL);
import { Deck, Card } from "../../lib/src/index";
import CardComponent from "./components/card/Card";

class Hand {
	cards: Card[]
  constructor(cards: Card[] = []) {
    this.cards = cards;
  }

  draw(deck: Deck, amount: number) {
    this.cards.push(...deck.draw(amount));
  }
}

function App() {
  const deck = new Deck();
  deck.shuffle();

  const hand = new Hand();
  hand.draw(deck, 2);

  return (
    <div>
      <button className="px-16 text-white">Click me</button>
      {hand.cards.map(card => <CardComponent card={card} />)}
    </div>
  );
}

export default App;