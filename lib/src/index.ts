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
