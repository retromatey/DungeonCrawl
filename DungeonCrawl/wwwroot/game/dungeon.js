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
     * @param {Entity[]} entities
     * @return {boolean}
     */
    isWalkableTile(x, y, entities) {
        
        for (const entity of entities) {
            
            if (entity.x === x && entity.y === y) {
                return false;
            }
        }
        
        return this.rawTileMap[y][x] !== Dungeon.wall;
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {Entity[]} entities
     * @return {undefined|Entity}
     */
    entityAtTile(x, y, entities) {

        for (const entity of entities) {

            if (entity.x === x && entity.y === y) {
                return entity;
            }
        }
        
        return undefined;
    }

    /**
     * @param {Entity} entity1
     * @param {Entity} entity2
     * @return {undefined|number}
     */
    distanceBetweenEntities(entity1, entity2) {
        const convertedLevel = this.rawTileMap.map(m => m.map(n => n === Dungeon.wall ? 1 : 0)), // 0 is a walkable area, 1 is a blocked area
              grid           = new PF.Grid(convertedLevel),
              finder         = new PF.AStarFinder({ allowDiagonal: true }),
              path           = finder.findPath(entity1.x, entity1.y, entity2.x, entity2.y, grid);
        
        if (path.length >= 2) {
            return path.length;
            
        }
        
        return undefined;
    }

    /**
     * @param {Entity} entity
     * @param {TurnManager} turnManager
     */
    removeEntity(entity, turnManager) {
        turnManager.entities.delete(entity);
        entity.sprite.destroy();
        entity.onDestroy();
    }

    /**
     * @param {Entity} attacker
     * @param {Entity} victim
     * @param {Phaser.Tweens.TweenManager} tweenManager
     * @param {TurnManager} turnManager
     */
    attackEntity(attacker, victim, tweenManager, turnManager) {
        attacker.moving = true;
        attacker.tweens = attacker.tweens || 0;
        attacker.tweens += 1;
        
        tweenManager.add({
            targets: attacker.sprite,
            onComplete: () => {
                attacker.sprite.x = this.map.tileToWorldX(attacker.x);
                attacker.sprite.y = this.map.tileToWorldY(attacker.y);
                attacker.moving = false;
                attacker.tweens -= 1;
                
                let damage = attacker.attack();
                victim.healthPoints -= damage;
                console.log(`${attacker.name} does ${damage} damage to ${victim.name} which now has ${victim.healthPoints} life left`);
                
                if (victim.healthPoints <= 0) {
                    this.removeEntity(victim, turnManager);
                }
            },
            x: this.map.tileToWorldX(victim.x),
            y: this.map.tileToWorldY(victim.y),
            ease: 'Power2',
            hold: 20,
            duration: 80,
            delay: attacker.tweens * 200,
            yoyo: true
        })
    }    
}

export { Dungeon }