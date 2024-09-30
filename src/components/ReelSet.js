import { SceneObject } from './SceneObject';
import { Reel } from './Reel';
import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class ReelSet extends SceneObject {
    init(config) {
        super.init(config);

        this.reels = [];
        this.elementsPool = {};
        this.reelsConfig = [];

        this.createReelsMask();
    }

    createReelsMask() {
        const mask = new PIXI.Graphics();
        const { x, y, width, height, fill } = this.config.mask;
        mask.beginFill(fill);
        mask.drawRect(x, y, width, height);
        mask.endFill();

        this.addChild(mask);
        this.mask = mask;
    }

    addElementToPool(name, element) {
        this.elementsPool[name] = element;
    }

    createReels() {
        const reelSetConfig = this.config.extra;
        const { symbolsCount, columns, reelWidth } = reelSetConfig;

        for (let i = 0; i < columns; i++) {
            const reel = new Reel();
            reel.init(i, this.elementsPool, this.reelsConfig[i], symbolsCount, this.config.elements);
            reel.x = i * reelWidth;
            this.addChild(reel);
            this.reels.push(reel);

            if (i < columns - 1) {
                const separator = this.elementsPool['separator'].clone();
                separator.x = separator.x + reel.x + 150;
                this.addChild(separator);
            }
        }
    }

    updateReelsConfig(reels) {
        this.reelsConfig = reels;
    }

    startRolling() {
        this.reels.forEach((reel, index) => {
            const delay = index * 0.1;
            gsap.delayedCall(delay, () => reel.startRolling());
        });
    }

    stopRolling() {
        this.reels.forEach((reel, index) => {
            const delay = index * 0.1;
            gsap.delayedCall(delay, () => reel.stopRolling());
        });
    }

    updateFinalSymbols(symbols) {
        this.reels.forEach((reel, index) => {
            reel.updateFinalSymbols(symbols[index]);
        });
    }
}