
import { MockBackendController } from './MockBackendController.js';

export class NetworkController {
    static initGame(uid) {
        return MockBackendController.handleInit(uid);
    }

    static spin(uid, bet) {
        return MockBackendController.handleSpin(uid, bet);
    }
}