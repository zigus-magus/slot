import * as PIXI from 'pixi.js';

export class GameView {
    constructor(app) {
        this.app = app;
        this.elements = {};
        this.eventHandlers = {};
        this.reelSet = null;
    }

    addElement(name, element) {
        if (element && element instanceof PIXI.DisplayObject) {
            this.elements[name] = element;
            this.app.stage.addChild(element);
            return element;
        } else {
            console.error(`Element ${name} is invalid or not a PixiJS DisplayObject`);
            return null;
        }
    }

    removeElement(name) {
        const element = this.elements[name];
        if (element && element instanceof PIXI.DisplayObject) {
            this.app.stage.removeChild(element);
            delete this.elements[name];
        } else {
            console.warn(`Element ${name} does not exist or is not a PixiJS DisplayObject`);
        }
    }

    get winSplashLabel() {
        return this.getElement('winSplashLabel');
    }

    updateWin(win) {
        const winText = this.getElement('winLabel');
        if (winText) {
            winText.setText(win);
        }
    }

    updateBet(bet) {
        const betText = this.getElement('betLabel');
        if (betText) {
            betText.setText(bet);
        }
    }

    updateBalance(balance) {
        const balanceText = this.getElement('balanceLabel');
        if (balanceText) {
            balanceText.setText(balance);
        }
    }

    getElement(name) {
        if (!this.elements[name]) {
            console.warn(`Element ${name} not found`);
            return null;
        }

        return this.elements[name];
    }

    enableButton(name) {
        const buttonContainer = this.getElement(name);
        const button = buttonContainer ? buttonContainer.children[0] : null;
        if (button) {
            button.eventMode = 'dynamic';
            button.alpha = 1;
        } else {
            console.warn(`Button ${name} not found or invalid`);
        }
    }

    disableButton(name) {
        const buttonContainer = this.getElement(name);
        const button = buttonContainer ? buttonContainer.children[0] : null;
        if (button) {
            button.eventMode = 'none';
            button.alpha = 0.5;
        } else {
            console.warn(`Button ${name} not found or invalid`);
        }
    }

    setButtonHandler(name, callback, event = 'pointerdown') {
        const buttonContainer = this.getElement(name);
        const button = buttonContainer ? buttonContainer.children[0] : null;
        if (button) {
            button.on(event, callback);
            if (!this.eventHandlers[name]) {
                this.eventHandlers[name] = [];
            }
            this.eventHandlers[name].push({ event, callback });
        } else {
            console.warn(`Button ${name} not found or invalid`);
        }
    }

    removeButtonHandler(name, callback, event = 'pointerdown') {
        const buttonContainer = this.getElement(name);
        const button = buttonContainer ? buttonContainer.children[0] : null;

        if (button && this.eventHandlers[name]) {
            const storedHandler = this.eventHandlers[name];
            const handlerToRemove = callback || storedHandler.callback;

            button.off(event, handlerToRemove);
            delete this.eventHandlers[name];
        } else {
            console.warn(`Button "${name}" not found or invalid, or no handler set`);
        }
    }


    removeAllButtonHandlers() {
        for (const name in this.eventHandlers) {
            this.removeButtonHandler(name);
        }

        this.eventHandlers = {};
    }
}