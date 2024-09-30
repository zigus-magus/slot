import * as PIXI from 'pixi.js';

export class SceneText extends PIXI.Text {
    constructor() {
        super('', new PIXI.TextStyle({}));
    }

    init(config) {
        this.style = new PIXI.TextStyle(config.style);
        this.position = new PIXI.Point(config.position.x, config.position.y);
        this.anchor = new PIXI.ObservablePoint(() => {});
        this.anchor.set(config?.anchor?.x || 0, config?.anchor?.y || 0);
        this.text = config.text;
    }

    setText(newText) {
        this.text = newText;
    }
}