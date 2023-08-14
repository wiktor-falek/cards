import { shuffle } from "./utils";
import { Player as GenericPlayer } from "./general"

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

const suits = [
	"Spades", 
	"Diamonds", 
	"Clubs", 
	"Hearts"
] as const;

// Create union types out of ranks and suits
type Rank = (typeof ranks)[number];
type Suit = (typeof suits)[number];

export class Card {
	#rank: Rank;
	#suit: Suit;
	isVisible: boolean;

	constructor(rank: Rank, suit: Suit, isVisible = true) {
		this.#rank = rank;
		this.#suit = suit;
		this.isVisible = isVisible;
	}

	flip() {
		this.isVisible = !this.isVisible;
	}

	get rank() {
		return this.isVisible ? this.#rank : undefined;
	}

	get suit() {
		return this.isVisible ? this.#suit : undefined;
	}

	get name() {
		return this.isVisible ? `${this.#rank} of ${this.#suit}` : "";
	}
}

export class Deck {
	cards: Card[];

	constructor() {
		// According to USPCC, a new deck should be initialised as follows
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

export class Hand {
	cards: Card[];

	constructor(cards: Card[] = []) {
		this.cards = cards;
	}

	draw(deck: Deck, amount = 1): this {
		this.cards.push(...deck.draw(amount));
		return this;
	}
}

export class Player extends GenericPlayer {
	hand: Hand;

	constructor(name: string) {
		super(name);
		this.hand = new Hand();
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