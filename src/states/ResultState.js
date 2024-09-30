import {BaseState} from "./BaseState";
import {States} from "../constants/States";

export class ResultState extends BaseState {
    constructor(controller) {
        super(controller);
    }

    async onEnter() {
        await super.onEnter();

        if (this.gameController.model.win > 0) {
            console.log('Congratulations! You won:', this.gameController.model.win);
        } else {
            console.log('No win this time, try again');
        }

        this.gameController.updateUI();
        this.changeState(States.Idle);
    }

    onExit() {
        super.onExit();

    }
}