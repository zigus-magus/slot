import { gameApp } from './core/GameApplication';
import { GameView } from './views/GameView';
import { AssetsLoader } from './utils/AssetsLoader';
import { SceneBuilder } from './scenes/SceneBuilder';
import { GameController } from './controllers/GameController';
import { GameModel } from "./models/GameModel";
import {States} from "./constants/States";
import {StateMachine} from "./core/StateMachine";
import { initialGameConfig } from "./config/Config";

const game = gameApp.getApp();
const model = new GameModel();
const view = new GameView(game);
const assetsLoader = new AssetsLoader();
const sceneBuilder = new SceneBuilder( model, view, assetsLoader );
const controller = new GameController( model, view, sceneBuilder, assetsLoader);
const stateMachine = new StateMachine(controller, States.Init);

controller.setStateMachine(stateMachine);
controller.updateData(initialGameConfig);

game.ticker.add((delta) => stateMachine.update(delta));
