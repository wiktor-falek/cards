console.log(import.meta.env.VITE_URL);
import { Deck, Card, getCardValueBlackjack } from "../../lib/src/index";
import CardComponent from "./components/card/Card";

class Hand {
  cards: Card[];
  constructor(cards: Card[] = []) {
    this.cards = cards;
  }

  draw(deck: Deck, amount: number) {
    this.cards.push(...deck.draw(amount));
  }

  get score(): number {
    let totalScore = this.cards.reduce((acc, card) => {
      return acc + getCardValueBlackjack(card);
    }, 0);
    if (totalScore > 21) {
      const ace = this.cards.find((card) => card.rank === "Ace");
      if (ace) {
        totalScore -= 10;
      }
    }
    return totalScore;
  }
}

const deck = new Deck();
deck.shuffle();

const dealerHand = new Hand();
dealerHand.draw(deck, 2);

const playerHand = new Hand();
playerHand.draw(deck, 2);

function App() {
  return (
    <div>
      <div className="flex flex-col gap-32 border-red-400 border-1">
        <div className="flex gap-2" id="dealer-hand">
          <h2>Dealer</h2>
          <h3>Score: {dealerHand.score}</h3>
          {dealerHand.cards.map((card) => (
            <CardComponent card={card} key={card.name} />
          ))}
        </div>

        <div className="flex gap-2" id="player-hand">
          <h2>Player</h2>
          <h3>Score: {playerHand.score}</h3>
          {playerHand.cards.map((card) => (
            <CardComponent card={card} key={card.name} />
          ))}
        </div>

        <button>Stick</button>
        <button>Hit</button>
      </div>
    </div>
  );
}

export default App;
