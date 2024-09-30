import * as PIXI from 'pixi.js';
import * as initialConfig from '../config/initialGameConfig.json';

class GameApplication {
    constructor() {
        if (GameApplication.instance) {
            return GameApplication.instance;
        }

        this.app = new PIXI.Application({...initialConfig.app});

        globalThis.__PIXI_APP__ = this.app;

        document.body.appendChild(this.app.view);
        GameApplication.instance = this;
    }

    getApp() {
        return this.app;
    }
}

export const gameApp = new GameApplication();