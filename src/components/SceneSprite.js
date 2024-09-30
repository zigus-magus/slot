import * as PIXI from 'pixi.js';
import { SceneObject } from './SceneObject';

export class SceneSprite extends SceneObject {
    init(config, texture) {
        super.init(config, texture);
    }

    clone() {
        const clone = new SceneSprite();
        clone.init(this.config, this.sprite.texture);

        return clone;
    }
}