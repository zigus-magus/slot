import {BaseState} from "./BaseState";
import {States} from "../constants/States";

export class IdleState extends BaseState {
    constructor(controller) {
        super(controller);
    }

    onEnter() {
        super.onEnter();

        this.checkSpinAvailability();
        this.setButtonHanlers();
        this.enableButtons();
    }

    checkSpinAvailability() {
        if (this.gameController.balance > 0) return;

        this.showErrorPopup('Balance is empty', 'Restart game for balance refill', () => {
            localStorage.clear();
            window.location.reload();
        });
    }

    enableButtons() {
        this.gameController.view.enableButton('spinButton');
        this.gameController.view.enableButton('minusButton');
        this.gameController.view.enableButton('plusButton');
        this.gameController.view.enableButton('maxBetButton');
    }

    setButtonHanlers() {
        this.gameController.view.setButtonHandler('spinButton',
            () => this.spinButtonHandler());
        this.gameController.view.setButtonHandler('minusButton',
            () => this.gameController.decreaseBet());
        this.gameController.view.setButtonHandler('plusButton',
            () => this.gameController.increaseBet());
        this.gameController.view.setButtonHandler('maxBetButton',
            () => this.gameController.setMaxBet());
    }

    spinButtonHandler() {
        if (this.gameController.isSpinAvailable) {
            this.gameController.view.disableButton('spinButton');
            this.gameController.view.removeButtonHandler('spinButton');
            this.changeState(States.Spin);
        } else {
            this.showErrorPopup('Error', 'Not enough balance');
        }
    }

    disableButtons() {
        this.gameController.view.disableButton('minusButton');
        this.gameController.view.disableButton('plusButton');
        this.gameController.view.disableButton('maxBetButton');
    }

    onExit() {
        super.onExit();

        this.gameController.view.removeAllButtonHandlers();
        this.disableButtons();
        this.gameController.resetWin();
    }

    onUpdate(delta) {

    }
}