/**
 * Shuffles the array in place.
 * @param {Array<T>} array
 */
function shuffle<T>(array: Array<T>): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
] as const;

const suits = ["Spades", "Diamonds", "Clubs", "Hearts"] as const;

// create union types out of ranks and suits
type Rank = (typeof ranks)[number];

type Suit = (typeof suits)[number];

export class Card {
  constructor(public rank: Rank, public suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  get name() {
    return `${this.rank} of ${this.suit}`;
  }
}

export class Deck {
  cards: Card[];
  constructor() {
    // according to USPCC new deck list
    this.cards = suits.flatMap((suit, i) =>
      i < 2
        ? ranks.map((rank) => new Card(rank, suit))
        : ranks.map((rank) => new Card(rank, suit)).reverse()
    );
  }

  shuffle() {
    shuffle(this.cards);
  }

  draw(amount: number) {
    if (this.cards.length < amount) {
      return [];
    }
    const cards = this.cards.splice(0, amount);
    return cards;
  }
}

export function getCardValueBlackjack(card: Card) {
  switch (card.rank) {
    case "Ace":
      return 11;
    case "King":
      return 10;
    case "Queen":
      return 10;
    case "Jack":
      return 10;
    case "10":
      return 10;
    case "9":
      return 9;
    case "8":
      return 8;
    case "7":
      return 7;
    case "6":
      return 6;
    case "5":
      return 5;
    case "4":
      return 4;
    case "3":
      return 3;
    case "2":
      return 2;
  }
}

export function getCardValue(card: Card) {
  switch (card.rank) {
    case "Ace":
      return 14;
    case "King":
      return 13;
    case "Queen":
      return 12;
    case "Jack":
      return 11;
    case "10":
      return 10;
    case "9":
      return 9;
    case "8":
      return 8;
    case "7":
      return 7;
    case "6":
      return 6;
    case "5":
      return 5;
    case "4":
      return 4;
    case "3":
      return 3;
    case "2":
      return 2;
  }
}
