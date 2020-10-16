class Dungeon {
    
    /** @return {Phaser.Tilemaps.DynamicTilemapLayer} */
    get map() { return this._map; }
    
    /** @return {number[][]} */
    get rawTileMap() { return this._rawTileMap; }
    
    /** @return {number[][]} */
    get tileMapData() { return this._tileMapData; }

    /** @return {number} */
    get tileWidth() { return 16; }

    /** @return {number} */
    get tileHeight() { return 16; }
    
    /** @return {number} */
    static get floor() { return 1; }
    
    /** @return {number} */
    static get wall() { return 0; }

    /**
     * @param {number[][]} tileMapData
     */
    constructor(tileMapData) {
        this._rawTileMap = tileMapData;
        this._tileMapData = this.convertTileMap(tileMapData);
    }

    /**
     * @param {Phaser.GameObjects.GameObjectCreator} gameObjectCreator
     * @param {string} spriteSheetKey
     */
    create(gameObjectCreator, spriteSheetKey) {
        const tileMap = gameObjectCreator.tilemap({
            key: spriteSheetKey,
            data: this.tileMapData,
            tileWidth: this.tileWidth,
            tileHeight: this.tileHeight,
        });
        const tileSet = tileMap.addTilesetImage(spriteSheetKey, spriteSheetKey, this.tileWidth, this.tileHeight, 1, 1);

        this._map = tileMap.createDynamicLayer(0, tileSet, 0, 0);
    }

    /**
     * @param {number[][]} tileMapData
     */
    convertTileMap(tileMapData) {
        const result = [];
        
        for (const row of tileMapData) {
            const convertedRow = [];
            
            for (const tile of row) {
                
                switch (tile) {
                    case 0:
                        convertedRow.push(Dungeon.wall);
                        break;
                    case 1:
                        convertedRow.push(Dungeon.floor);
                        break;
                    default:
                        convertedRow.push(Dungeon.floor);
                        break;
                }
            }
            
            result.push(convertedRow);
        }
        
        return result;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Phaser.GameObjects.GameObjectFactory} gameObjectFactory
     * @param {string} spriteSheetKey
     * @param {number} tile
     */
    initSprite(x, y, gameObjectFactory, spriteSheetKey, tile) {
        const worldX = this.map.tileToWorldX(x),
              worldY = this.map.tileToWorldY(y);
        
        const sprite = gameObjectFactory.sprite(worldX, worldY, spriteSheetKey, tile);
        sprite.setOrigin(0);
        
        return sprite;
    }

    /**
     * @param {Phaser.Tweens.TweenManager} tweenManager
     * @param {Phaser.GameObjects.Sprite} sprite
     * @param {number} x
     * @param {number} y
     * @param {function} onComplete
     */
    moveSprite(tweenManager, sprite, x, y, onComplete) {
        tweenManager.add({
            targets: sprite,
            onComplete: onComplete,
            x: this.map.tileToWorldX(x),
            y: this.map.tileToWorldY(y),
            ease: 'Power2',
            duration: 200
        });
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {boolean}
     */
    isWalkableTile(x, y) {
        return this.rawTileMap[y][x] !== Dungeon.wall;
    }
}

export { Dungeon }