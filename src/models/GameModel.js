export class GameModel {
    #uid;
    #balance;
    #bet;
    #availableBets;
    #reelsConfig;
    #win;

    constructor() {
        this.#uid = null;
        this.#balance = 0;
        this.#bet = 0;
        this.#availableBets = [];
        this.#reelsConfig = [];
        this.#win = 0;
    }

    init(data) {
        this.#uid = data.uid;
        this.#balance = data.balance;
        this.#bet = data.last_bet;
        this.#availableBets = data.bets;
        this.#reelsConfig = data.rolls;
    }

    get uid() {
        return this.#uid;
    }

    set uid(value) {
        this.#uid = value;
    }

    get balance() {
        return this.#balance;
    }

    set balance(value) {
        this.#balance = value;
    }

    get bet() {
        return this.#bet;
    }

    set bet(value) {
        this.#bet = value;
    }

    get availableBets() {
        return this.#availableBets;
    }

    set availableBets(value) {
        this.#availableBets = value;
    }

    get win() {
        return this.#win;
    }

    set win(value) {
        this.#win = value;
    }

    get reelsConfig() {
        return this.#reelsConfig;
    }

    set reelsConfig(value) {
        this.#reelsConfig = value;
    }
}