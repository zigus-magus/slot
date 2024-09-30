import { Assets } from '@pixi/assets';

export class AssetsLoader {
    constructor() {
        this.resources = {};
    }


    async loadAssets(configPath) {
        try {
            const response = await fetch(configPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch asset config from ${configPath}: ${response.statusText}`);
            }

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();

                throw new Error(`Expected JSON but received non-JSON content (content-type: ${contentType})`);
            }

            const config = await response.json();
            const assetPromises = config.resources.map((asset) => {
                return Assets.load({
                    name: asset.assetName,
                    srcs: asset.assetPath,
                });
            });
            const loadedAssets = await Promise.all(assetPromises);
            config.resources.forEach((asset, index) => {
                this.resources[asset.assetName] = loadedAssets[index];
            });

        } catch (error) {
            console.error('Error loading assets:', error.message);
            throw error;
        }
    }


    getTexture(assetName) {
        const asset = this.resources[assetName];
        if (asset) {
            return asset;
        }

        console.error(`Asset ${assetName} not found`);
        return null;
    }
}