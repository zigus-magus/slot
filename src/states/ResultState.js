import {BaseState} from "./BaseState";
import {States} from "../constants/States";
import {gsap} from "gsap";

export class ResultState extends BaseState {
    constructor(controller) {
        super(controller);
    }

    async onEnter() {
        await super.onEnter();

        if (this.gameController.model.win > 0) {
            this.showWinSplash();
            console.log('Congratulations! You won:', this.gameController.model.win);
        } else {
            console.log('No win this time, try again');
        }

        this.gameController.updateUI();
        this.changeState(States.Idle);
    }

    showWinSplash() {
        const splash = this.gameController.view.winSplash;

        splash.scale.set(0.5, 0.5);
        splash.alpha = 0;
        splash.text = this.gameController.model.win;

        gsap.timeline()
            .to(splash.scale, { x: 1, y: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
            .to(splash, { alpha: 1, duration: 0.5 }, 0)
            .to(splash, { alpha: 0, duration: 0.5, delay: 1, onComplete: () => {
                    splash.scale.set(0.5, 0.5);
                    splash.text = '';
                }});
    }

    onExit() {
        super.onExit();

    }
}