import { AdjustmentFilter } from '@pixi/filter-adjustment';
import { SceneObject } from './SceneObject';

export class SceneButton extends SceneObject {
    init(config, texture) {
        super.init(config, texture);

        this.button = this.sprite;
        this.button.eventMode = config.interactive ? 'dynamic' : 'none';
        this.button.buttonMode = true;

        if (this.button.eventMode !== 'dynamic') {
            const adjustmentFilter = new AdjustmentFilter({
                saturation: 0,
                brightness: 0.7
            });
            this.button.filters = [adjustmentFilter];
        }

        if (this.config.interactive) {
            this.button.on('pointerdown', () => {
                this.button.scale.set(0.95);
            });

            this.button.on('pointerup', () => {
                this.button.scale.set(1);
            });

            this.button.on('pointerupoutside', () => {
                this.button.scale.set(1);
            });
        }
    }

    addEventListener(event, callback) {
        this.button.on(event, callback);
    }

    removeEventListener(event, callback) {
        this.button.off(event, callback);
    }
}