import {BaseState} from "./BaseState";
import {States} from "../constants/States";
import {NetworkController} from "../network/NetworkController";

export class SpinState extends BaseState {
    constructor(controller) {
        super(controller);
    }

    async onEnter() {
        await super.onEnter();

        this.gameController.startRolling();
        await this.makeSpinRequest();
        await this.imitateResponseTime(1000, 1500);
        this.gameController.updateFinalSymbols();
        this.gameController.stopRolling();

        this.changeState(States.Result);
    }

    async makeSpinRequest() {
        const data = await NetworkController.spin(this.gameController.model.uid, this.gameController.model.bet);
        if (data) {
            this.gameController.updateData(data);
        }
    }

    onExit() {
        super.onExit();
    }

    onUpdate(delta) {

    }
}