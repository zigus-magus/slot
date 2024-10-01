import * as PIXI from 'pixi.js';
import { initialGameConfig } from '../config/config';

class GameApplication {
    constructor() {
        if (GameApplication.instance) {
            return GameApplication.instance;
        }

        this.app = new PIXI.Application({...initialGameConfig.app});

        globalThis.__PIXI_APP__ = this.app;

        document.body.appendChild(this.app.view);
        GameApplication.instance = this;
    }

    getApp() {
        return this.app;
    }
}

export const gameApp = new GameApplication();