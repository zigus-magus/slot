import {BaseState} from "./BaseState";
import {States} from "../constants/States";
import { sceneConfig } from '../config/config';
import {NetworkController} from "../network/NetworkController";


export class InitState extends BaseState {
    constructor(controller) {
        super(controller);
    }

    async onEnter() {
        super.onEnter();
        await this.loadAssets();
        await this.buildScene();
        await this.makeInitRequest();
        this.gameController.updateReelsConfig();
        this.gameController.createReels();
        this.gameController.updateUI();

        return this.changeState(States.Idle);
    }

    async makeInitRequest() {
        const data = await NetworkController.initGame(this.gameController.model.uid);
        if (data) {
            this.gameController.updateData(data);
            this.gameController.model.reelsetConfig = data.reelsetConfig;
            this.gameController.updateReelsConfig();
        }
    }

    async loadAssets() {
        await this.gameController.assetsLoader.loadAssets('/config/assetsConfig.json')
            .catch((error) => console.error('Failed to load assets:', error));
    }

    async buildScene() {
        try {
            await this.gameController.sceneBuilder.buildScene(sceneConfig);
        } catch (error) {
            console.error('Failed to build scene:', error);
        }
    }

    onExit() {
        super.onExit();
    }
}