import { Entity } from "./entity.js";
import { Dungeon } from "./dungeon.js";

class PlayerCharacter extends Entity {
    
    /** @return {number} */
    get movementPoints() { return this._movementPoints; }
    /** @param {number} value */
    set movementPoints(value) { this._movementPoints = value; }

    /** @return {number} */
    get x() { return this._x; }
    /** @param {number} value */
    set x(value) { this._x = value; }

    /** @return {number} */
    get y() { return this._y; }
    /** @param {number} value */
    set y(value) { this._y = value; }
    
    /** @return {Phaser.Tilemaps.DynamicTilemapLayer} */
    get map() { return this._map; }

    /** @return {Phaser.Types.Input.Keyboard.CursorKeys} */
    get cursorKeys() { return this._cursorKeys; }
    
    /** @return {number} */
    get sprite() { return 4; }

    /**
     * @param {Phaser.Tilemaps.DynamicTilemapLayer} map
     * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursorKeys
     * @param {number} x
     * @param {number} y
     */
    constructor(map, cursorKeys, x, y) {
        super();
        
        this._map = map;
        this._cursorKeys = cursorKeys; // dungeon.scene.input.keyboard.createCursorKeys();
        this._x = x;
        this._y = y;          
        this._movementPoints = 1;
        this.map.putTileAt(this.sprite, this.x, this.y);
    }

    /**
     * @override
     * @return {boolean} 
     */
    over() {
        return this.movementPoints === 0;
    }

    /**
     * @override
     * @return {undefined} 
     */
    refresh() {
        this.movementPoints = 1;
    }

    /**
     * @override
     * @return {undefined}
     */
    turn() {
        const oldX = this.x,
              oldY = this.y; 
        
        let moved = false;

        if (this.movementPoints > 0) {
            
            if (this.cursorKeys.left.isDown) {
                this.x -= 1;
                moved = true;
            }

            if (this.cursorKeys.right.isDown) {
                this.x += 1;
                moved = true;
            }

            if (this.cursorKeys.up.isDown) {
                this.y -= 1;
                moved = true;
            }

            if (this.cursorKeys.down.isDown) {
                this.y += 1;
                moved = true;
            }

            this.movementPoints = moved 
                                ? this.movementPoints - 1 
                                : this.movementPoints;
        }

        // wall collision check
        const tileAtDestination = this.map.getTileAt(this.x, this.y);
        
        if (tileAtDestination.index === Dungeon.wall) {
            this.x = oldX;
            this.y = oldY;
        }

        // tile movement code
        if (this.x !== oldX || this.y !== oldY) {
            this.map.putTileAt(this.sprite, this.x, this.y)
            this.map.putTileAt(Dungeon.floor, oldX, oldY)
        }
    }
}

export { PlayerCharacter }