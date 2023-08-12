import { useReducer } from "react";
import { Deck, Card, getCardValueBlackjack } from "../../lib/src/index";
import CardComponent from "./components/card/Card";

class Hand {
  cards: Card[];

  constructor(cards: Card[] = []) {
    this.cards = cards;
  }

  draw(deck: Deck, amount = 1): this {
    this.cards.push(...deck.draw(amount));

    return this;
  }

  getScore(threshold = 21): number {
    let totalScore = this.cards.reduce((acc, card) => {
      return acc + getCardValueBlackjack(card);
    }, 0);
    let aces = this.cards.filter((card) => card.rank === "Ace").length;
    while (totalScore > threshold && aces) {
      totalScore -= 10;
      aces--;
    }
    return totalScore;
  }
}

class Player {
  hand: Hand;
  constructor(public name: string) {
    this.name = name;
    this.hand = new Hand();
  }

  get isBust() {
    return this.hand.getScore() > 21;
  }

  draw(deck: Deck, amount = 1) {
    this.hand.draw(deck, amount);
  }
}

class Game {
  deck: Deck;
  dealer: Hand;
  players: Player[];
  #currentPlayer: number = 0;

  state: "NOT STARTED" | "DEALER" | "PLAYER";
  constructor() {
    this.deck = new Deck();
    this.players = [];
    this.dealer = new Hand();
    this.state = "NOT STARTED";
  }

  start() {
    if (this.state !== "NOT STARTED") return;

    this.deck.shuffle();
    this.dealer.draw(this.deck, 2);
    this.dealer.cards[1].flip();
    for (const player of this.players) {
      player.draw(this.deck, 2);
    }

    this.state = "PLAYER";
  }

  get currentPlayer() {
    return this.players[this.#currentPlayer];
  }

  addPlayer(name: string) {
    this.players.push(new Player(name));
  }

  hit() {
    this.currentPlayer.draw(this.deck, 1);
    if (this.currentPlayer.isBust || this.currentPlayer.hand.getScore() == 21) {
      this.incrementCurrentPlayer();
    }
  }

  hold() {
    this.incrementCurrentPlayer();
  }

  // TODO bounds check
  incrementCurrentPlayer() {
    if (this.#currentPlayer < this.players.length - 1) {
      this.#currentPlayer++;
    } else {
      this.state = "DEALER";
      this.dealer.cards[1].flip();
      this.dealerTurn();
    }
  }

  dealerTurn() {
    while (this.dealer.getScore(17) < 21) {
      if (this.dealer.getScore(17) < 17) {
        this.dealer.draw(this.deck, 1);
      } else {
        break;
      }
    }
  }
}

const game = new Game();
game.addPlayer("Viktor");
game.addPlayer("Youssef");
game.addPlayer("Paul");
game.start();

function App() {
  const [, forceUpdate] = useReducer((c) => c + 1, 0);

  function handleHit() {
    console.log("hit");
    game.hit(); // this mutates the game state, but does not trigger a rerender
    console.log(game.currentPlayer.hand.cards); // the player hand array length increased by one
    forceUpdate();
  }

  function handleHold() {
    console.log("hold");
    game.hold();
    forceUpdate();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-32 border-red-400 border-1">
        <div className="flex gap-2" id="dealer-hand">
          <h2>Dealer</h2>
          <h3>Score: {game.dealer.getScore()}</h3>
          {game.dealer.cards.map((card) => (
            <CardComponent card={card} key={card.name} />
          ))}
        </div>

        <div className="flex gap-2" id="player-hand">
          {game.players.map((player, i) => (
            <div className="flex gap-2" key={i}>
              <h2 className={`${player.isBust ? "text-red-400" : ""}`}>
                {player.name}
              </h2>
              <h3 className={`${player.isBust ? "text-red-400" : ""}`}>
                Score: {player.hand.getScore()}
              </h3>
              {player.hand.cards.map((card) => (
                <CardComponent card={card} key={card.name} />
              ))}
            </div>
          ))}
        </div>

        <div className="flex gap-4 mx-auto">
          <p>Current Player: {game.currentPlayer.name}</p>
          <button
            className="w-32 py-2 px-8 border-2 border-white"
            onClick={handleHold}
          >
            Hold
          </button>
          <button
            className="w-32 py-2 px-8 border-2 border-white"
            onClick={handleHit}
          >
            Hit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
