export class GameController {
    #model;
    #view;
    #sceneBuilder;
    #assetsLoader;
    #stateMachine;

    constructor(model, view, sceneBuilder, assetsLoader) {
        this.#model = model;
        this.#view = view;
        this.#sceneBuilder = sceneBuilder;
        this.#assetsLoader = assetsLoader;
        this.#stateMachine = null;
    }

    setStateMachine(stateMachine) {
        this.#stateMachine = stateMachine;
    }

    startRolling() {
        this.view.reelSet.startRolling();
    }

    stopRolling() {
        this.view.reelSet.stopRolling();
    }

    updateReelsConfig() {
        this.view.reelSet.updateReelsConfig(this.model.reelSetConfig);
    }

    updateFinalSymbols() {
        this.view.reelSet.updateFinalSymbols(this.model.reelSetConfig);
    }

    createReels() {
        this.view.reelSet.createReels();
    }

    updateData(data) {
        if (data.uid !== undefined) {
            this.model.uid = data.uid || 123;
        }
        if (data.balance !== undefined) {
            this.model.balance = data.balance || 0;
        }
        if (data.last_bet !== undefined) {
            this.model.bet = data.last_bet || 0;
        }
        if (data.bets !== undefined) {
            this.model.availableBets = data.bets || [1, 2, 3, 4];
        }
        if (data.rolls !== undefined) {
            this.model.reelSetConfig = data.rolls;
        }
        if (data.win !== undefined) {
            this.model.win = data.win || 0;
        }
    }

    resetWin() {
        this.model.win = 0;
        this.updateWin();
    }

    updateUI() {
        this.updateBalance();
        this.updateBet();
        this.updateWin();
    }

    increaseBet() {
        if (this.currentBetIndex < this.model.availableBets.length - 1) {
            this.model.bet = this.model.availableBets[this.currentBetIndex + 1];
            this.updateBet();
        }
    }

    decreaseBet() {
        if (this.currentBetIndex > 0) {
            this.model.bet = this.model.availableBets[this.currentBetIndex - 1];
            this.updateBet();
        }
    }

    setMaxBet() {
        this.model.bet = this.model.availableBets[this.model.availableBets.length - 1];
        this.updateBet();
    }

    updateWin() {
        this.view.updateWin(this.model.win);
    }

    updateBet() {
        this.view.updateBet(this.model.bet);
    }

    updateBalance() {
        this.view.updateBalance(this.model.balance);
    }

    get isSpinAvailable() {
        return this.model.balance >= this.model.bet;
    }

    get currentBetIndex() {
        return this.model.availableBets.indexOf(this.model.bet);
    }

    get model() {
        return this.#model;
    }

    get view() {
        return this.#view;
    }

    get sceneBuilder() {
        return this.#sceneBuilder;
    }

    get assetsLoader() {
        return this.#assetsLoader;
    }

    get stateMachine() {
        return this.#stateMachine;
    }

    get balance() {
        return this.model.balance;
    }
}