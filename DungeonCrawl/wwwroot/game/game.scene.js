import {Dungeon} from "./dungeon.js";
import {PlayerCharacter} from "./player.character.js";
import {tileMapData} from "./tile.map.data.js";
import {TurnManager} from "./turn.manager.js";
import {Monster} from "./monster.js";

class GameScene extends Phaser.Scene {

    /** @return {Dungeon} */
    get dungeon() { return this._dungeon; }
    
    /** @return {PlayerCharacter} */
    get player() { return this._player; }
    
    /** @return {string} */
    get spriteSheetKey() { return 'tileMap'; }
    
    /** @return {TurnManager} */
    get turnManager() { return this._turnManager; }
    
    constructor() {
        super();
    }

    /**
     * @override
     */
    preload() {
        this.load.spritesheet({
            key: this.spriteSheetKey,
            url: './game/img/tileMap.png',
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16,
                margin: 1,      // space around the edge of the frames
                spacing: 1,     // spacing between each frame in the image
            }
        });
    }

    /**
     * @override
     */
    create() {        
        this._turnManager = new TurnManager();
        this._dungeon = this.initDungeon();
        
        this._player = this.initPlayer();
        this.turnManager.addEntity(this.player);

        const monsters = [
            this.initMonster(3, 8, 1),
            this.initMonster(18, 18, 3),
            this.initMonster(18, 2, 2)
        ];
        
        for (const monster of monsters) {
            this.turnManager.addEntity(monster);
        }
    }

    /**
     * @override
     * @param {number} time
     * @param {number} delta
     */
    update(time, delta) {
        
        if (this.turnManager.over()) {
            this.turnManager.refresh();
        }

        this.turnManager.turn(this.tweens, this.dungeon, this.player);
    }

    /** @return {Dungeon} */
    initDungeon() {
        const dungeon = new Dungeon(tileMapData);
        dungeon.create(this.make, this.spriteSheetKey);
        return dungeon;
    }
    
    /** @return {PlayerCharacter} */
    initPlayer() {
        const cursorKeys = this.input.keyboard.createCursorKeys(),
              player     = new PlayerCharacter(cursorKeys, 4, 4);
        
        player.sprite = this.dungeon.initSprite(player.x, player.y, this.add, this.spriteSheetKey, player.tile);
        
        return player;
    }
    
    /** 
     * @param {number} startX
     * @param {number} startY
     * @param {number} totalMovementPoints
     * @return {Monster} 
     */
    initMonster(startX, startY, totalMovementPoints) {
        const monster = new Monster(startX, startY, totalMovementPoints);
        
        monster.sprite = this.dungeon.initSprite(monster.x, monster.y, this.add, this.spriteSheetKey, monster.tile);
        
        return monster;
    }
}

export { GameScene }