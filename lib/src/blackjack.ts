import { Card as PlayingCard, Deck as PlayingCardDeck, Hand as PlayingCardHand, Player as PlayingCardPlayer } from "./playing_cards"

export type GameState = "READY" | "PLAYER" | "DEALER" | "FINISHED";

export class Hand extends PlayingCardHand {
	getScore(threshold = 21): number {
		let totalScore = this.cards.reduce((acc, card) => {
			return acc + getCardValue(card);
		}, 0);

		let aces = this.cards.filter((card) => card.rank === "Ace").length;
		while (totalScore > threshold && aces) {
			totalScore -= 10;
			aces--;
		}

		return totalScore;
	}
}

export class Player extends PlayingCardPlayer {
	hand: Hand;

	constructor(public name: string) {
		super(name);
		this.hand = new Hand();
	}

	get isBust() {
		return this.hand.getScore() > 21;
	}
}

export class Game {
	deck: PlayingCardDeck;
	dealer: Hand;
	players: Player[];
	state: GameState;
	#currentPlayer: number = 0;

	constructor() {
		this.deck = new PlayingCardDeck();
		this.dealer = new Hand();
		this.players = [];
		this.state = "READY";
	}
	
	start() {
		if (this.state !== "READY" && this.state !== "FINISHED") return;
	
		this.deck.shuffle();
		this.dealer.draw(this.deck, 2);
		this.dealer.cards[1].flip();
		for (const player of this.players) {
			player.hand.draw(this.deck, 2);
		}
	
		this.state = "PLAYER";
		return 
	}

	get currentPlayer() {
		return this.players[this.#currentPlayer];
	}
	
	addPlayer(name: string) {
		this.players.push(new Player(name));
	}

	hit() {
		this.currentPlayer.hand.draw(this.deck, 1);

		if (this.currentPlayer.isBust || this.currentPlayer.hand.getScore() == 21) {
			this.nextPlayer();
		}
	}

	hold() {
		this.nextPlayer();
	}

	nextPlayer() {
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

	isInProgress(): boolean {
		if (this.state == "PLAYER" || this.state == "DEALER") {
			return true;
		}

		return false;
	}

	isFinished(): boolean {
		 return this.state == "FINISHED";
	}

	isReadyToStart(): boolean {
		return this.state == "READY";
   }
}

export function getCardValue(card: PlayingCard) {
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
		default:
			return 0;
	}
}