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

const faces = ["Spades", "Diamonds", "Clubs", "Hearts"] as const;

type Rank = (typeof ranks)[number];

type Face = (typeof faces)[number];

class Card {
  constructor(public rank: Rank, public face: Face) {
    this.rank = rank;
    this.face = face;
  }

  get name() {
    return `${this.rank} of ${this.face}`;
  }
}

class Deck {
  cards: Card[];
  constructor() {
    // according to USPCC new deck list
    this.cards = faces.flatMap((face, i) =>
      i < 2
        ? ranks.map((rank) => new Card(rank, face))
        : ranks.map((rank) => new Card(rank, face)).reverse()
    );
  }

  shuffle() {}

  draw() {}
}

function getCardValue(card: Card) {
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
