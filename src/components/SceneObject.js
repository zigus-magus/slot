import * as PIXI from 'pixi.js';

export class SceneObject extends PIXI.Container {
    init(config, texture) {
        this.name = config.name;
        this.config = config;

        if (texture) {
            this.sprite = new PIXI.Sprite(texture);
            this.addChild(this.sprite);
        }

        if (config.position) {
            this.setPosition(config.position);
        }
        if (config.anchor) {
            this.setAnchor(config.anchor);
        }
    }

    setPosition(position) {
        this.x = position.x || 0;
        this.y = position.y || 0;
    }

    setAnchor(anchor) {
        if (this.children.length > 0) {
            this.children.forEach(child => {
                child.anchor.set(anchor.x, anchor.y);
            });
        }
    }
}