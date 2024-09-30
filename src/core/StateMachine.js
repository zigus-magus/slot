import {States} from "../constants/States";
import {InitState} from "../states/InitState";
import {IdleState} from "../states/IdleState";
import {SpinState} from "../states/SpinState";
import {ResultState} from "../states/ResultState";

export class StateMachine {
    constructor(controller, initialState) {
        this.states = {
            [States.Init]: new InitState(controller),
            [States.Idle]: new IdleState(controller),
            [States.Spin]: new SpinState(controller),
            [States.Result]: new ResultState(controller)
        };

        this.currentState = null;

        this.changeState(initialState);
    }

    changeState(newState) {
        const state = this.states[newState];

        if (!state) {
            console.error(`State ${newState} does not exist!`);
            return;
        }

        if (this.currentState === state) {
            console.warn(`State ${newState} is already active!`);
            return;
        }

        if (this.currentState) {
            this.currentState.onExit();
        }

        this.currentState = state;
        this.currentState.onEnter();
    }

    update(delta) {
        if (this.currentState && this.currentState.onUpdate) {
            this.currentState.onUpdate(delta);
        }
    }
}