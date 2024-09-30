import {ErrorPopup} from "../components/ErrorPopup";

export class BaseState {
    constructor(controller) {
        this.gameController = controller;
    }


    changeState(newState) {
        this.gameController.stateMachine.changeState(newState);
    }

    onEnter() {
        console.log(`%cEntered state: %c${this.constructor.name}`, 'color: green; font-weight: bold;', 'color: lime;');
    }

    onExit() {
        console.log(`%cExited state: %c${this.constructor.name}`, 'color: red; font-weight: bold;', 'color: orange;');
    }

    onUpdate(delta) {

    }

    showErrorPopup(headerText, messageText) {
        const errorPopup = new ErrorPopup('Not enough balance', 'Please reduce your bet or refill your balance');
        this.gameController.view.addElement('errorPopup', errorPopup);
    }

    async imitateResponseTime(minDelay = 300, maxDelay = 600) {
        const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
        return new Promise(resolve => setTimeout(resolve, delay));
    }
}