import * as PIXI from 'pixi.js';
import gsap from 'gsap';

export class Reel extends PIXI.Container {
    SPEED = 0.025;

    constructor() {
        super();
        this.symbols = [];
        this.symbolSlots = [];
        this.slotHeight = 132;
        this.spinning = false;
        this.finalConfig = [];
        this.currentConfig = [];
        this.symbolsCount = 0;
    }

    init(reelId, elementsPool, startConfig, symbolsCount) {
        this.reelId = reelId;
        this.elementsPool = elementsPool;
        this.symbolsCount = symbolsCount;

        this.currentConfig = [this.getRandomFakeSymbol(), ...startConfig];
        this.currentConfig.forEach((id, index) => {
            const symbol = elementsPool[id].clone();
            symbol.text = id;
            symbol.y = (index - 1) * this.slotHeight;
            this.symbols.push(symbol);
            this.symbolSlots.push({ symbol, y: symbol.y });
            this.addChild(symbol);
        });
    }

    moveSymbols() {
        this.symbols.forEach(symbol => {
            const newY = symbol.y + this.slotHeight;

            this.tween = gsap.to(symbol, {
                y: newY,
                duration: this.SPEED,
                ease: "none",
                onUpdate: () => {
                    if (symbol.y >= (this.symbols.length - 1) * this.slotHeight) {
                        symbol.y -= this.symbols.length * this.slotHeight;

                        const newFakeSymbol = this.getRandomFakeSymbol();
                        symbol.sprite.texture = this.elementsPool[newFakeSymbol].sprite.texture;
                        symbol.name = this.elementsPool[newFakeSymbol].name;
                    }
                }
            });
        });
    }

    stopRolling() {
        this.spinning = false;
        gsap.killTweensOf(this.tween);
        this.sortSymbols();
        this.replaceTextures();
        this.finalizePositions();
        setTimeout(() => this.sortSymbols(), 0);
    }

    finalizePositions() {
        this.symbols.forEach((symbol, index) => {
            symbol.y = (index - 3) * this.slotHeight;
        });
    }

    replaceTextures() {
        for (let i = 0; i < 3; i++) {
            const symbol = this.symbols[i];
            const finalSymbolId = this.finalConfig[i];

            if (this.elementsPool[finalSymbolId]) {
                symbol.sprite.texture = this.elementsPool[finalSymbolId].sprite.texture;
                symbol.name = finalSymbolId;
            }
        }
    }

    sortSymbols() {
        this.symbols.sort((a, b) => a.y - b.y);
    }

    updateFinalSymbols(finalSymbolIds) {
        this.finalConfig = finalSymbolIds;
    }

    startRolling() {
        this.spinning = true;

        this.spinAnimation = () => {
            if (!this.spinning) return;

            this.moveSymbols();
            gsap.delayedCall(this.SPEED, this.spinAnimation);
        };

        this.spinAnimation();
    }

    getRandomFakeSymbol() {
        return Math.floor(Math.random() * this.symbolsCount);
    }
}