import * as PIXI from 'pixi.js';

export class ErrorPopup extends PIXI.Container {
    background = null;

    constructor(headerText, messageText, closeHandler) {
        super();
        this.createBackground(this.config.background);
        this.createTextElement({ ...this.config.header, text: headerText || this.config.header.text });
        this.createTextElement({ ...this.config.message, text: messageText || this.config.message.text });
        this.createButton(this.config.button, closeHandler);
    }

    createBackground(config) {
        const background = new PIXI.Graphics();
        background.beginFill(config.color, config.alpha);
        background.drawRect(config.position.x, config.position.y, config.width, config.height);
        background.endFill();
        this.addChild(background);
    }

    createTextElement(config) {
        const text = new PIXI.Text(config.text, new PIXI.TextStyle(config.style));
        text.anchor.set(0.5);
        text.position.set(config.position.x, config.position.y);
        this.addChild(text);
    }

    createButton(config, handler) {
        const button = new PIXI.Text(config.text, new PIXI.TextStyle(config.style));
        button.anchor.set(0.5);
        button.position.set(config.position.x, config.position.y);
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', handler || config.handler);
        this.addChild(button);
    }

    close() {
        this.parent.removeChild(this);
    }

    clearAndReload() {
        localStorage.clear();
        window.location.reload();
    }

    get config() {
        return {
            background: {
                color: 0x000000,
                alpha: 0.9,
                position: { x: 0, y: 0 },
                anchor: { x: 0.5, y: 0.5 },
                width: 860,
                height: 620
            },
            header: {
                text: 'Error',
                style: {
                    fontSize: 24,
                    fill: 0xFFFFFF,
                    align: 'center'
                },
                position: { x: 430, y: 140 }
            },
            message: {
                text: 'An error has occurred',
                style: {
                    fontSize: 18,
                    fill: 0xFFFFFF,
                    align: 'center',
                    wordWrap: true,
                    wordWrapWidth: 360
                },
                position: {x: 430, y: 300}
            },
            button: {
                text: 'Restart',
                style: {
                    fontSize: 18,
                    fill: 0xFFFFFF,
                    align: 'center'
                },
                position: { x: 430, y: 450 },
                handler: this.close.bind(this)
            }
        }
    }
}