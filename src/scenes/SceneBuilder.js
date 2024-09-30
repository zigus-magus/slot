import { SceneButton } from '../components/SceneButton';
import { SceneSprite } from '../components/SceneSprite';
import { SceneText } from '../components/SceneText';
import { ReelSet } from '../components/ReelSet';

export class SceneBuilder {
    constructor(model, view, assetsLoader) {
        this.assetsLoader = assetsLoader;
        this.model = model;
        this.view = view;

        this.builderConfig = {
            Sprite: SceneSprite,
            Button: SceneButton,
            TextField: SceneText,
            ReelSet: ReelSet,
        };
    }

    buildScene(config) {
        if (config.objects.length > 0) {
            config.objects.forEach((objectConfig) => this.addSceneObject(objectConfig));
        } else {
            console.error('No objects to build! Config:', config.objects);
        }
    }

    createSceneObject(config) {
        const ObjectType = this.builderConfig[config.type];
        if (ObjectType) {
            try {
                const texture = config.texture ? this.assetsLoader.getTexture(config.texture) : null;
                const instance = new ObjectType();
                if (instance) {
                    instance.init(config, texture);
                } else {
                    debugger
                }

                if (config.type === 'ReelSet') {
                    this.createReelSetElements(instance, config);

                    this.view.reelSet = instance;
                }

                return instance;
            } catch (error) {
                debugger
                console.error(`Failed to create object: ${config.name}`, error);
            }
        } else {
            debugger
            console.error(`Unknown object type: ${config.type}`);
        }
    }

    addSceneObject(objectConfig) {
        const object = this.createSceneObject(objectConfig);
        if (object) {
            this.view.addElement(objectConfig.name, object);
        }
    }

    createReelSetElements(reelSet, config) {
        config.elements.forEach(elementConfig => {
            const element = this.createSceneObject(elementConfig);
            reelSet.addElementToPool(elementConfig.name, element);
        });
    }
}