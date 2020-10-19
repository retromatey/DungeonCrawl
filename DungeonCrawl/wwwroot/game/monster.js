import { Entity } from "./entity.js";
import {Dungeon} from "./dungeon.js";

class Monster extends Entity {
    
    get totalMovementPoints() { return this._totalMovementPoints; }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} totalMovementPoints
     */
    constructor(x, y, totalMovementPoints) {
        super();

        this._x = x;
        this._y = y;
        this._totalMovementPoints = totalMovementPoints;
        this._movementPoints = this.totalMovementPoints;
        this._tile = 5;

        this._moving = false;
    }

    /**
     * @override
     * @return {boolean}
     */
    over() {
        return this.movementPoints === 0 && this.moving === false;
    }

    /**
     * @override
     * @return {undefined}
     */
    refresh() {
        this.movementPoints = this.totalMovementPoints;
    }
    
    /**
     * @override
     * @return {undefined}
     */
    turn(tweenManager, dungeon, player) {
        const oldX = this.x,
              oldY = this.y,
              convertedLevel = dungeon.rawTileMap.map(m => m.map(n => n === Dungeon.wall ? 1 : 0)); // 0 is a walkable area, 1 is a blocked area
        
        if (this.movementPoints > 0 && this.moving === false) {
            const pX     = player.x,
                  pY     = player.y,
                  grid   = new PF.Grid(convertedLevel),
                  finder = new PF.AStarFinder(),
                  path   = finder.findPath(oldX, oldY, pX, pY, grid);
            
            this.movementPoints -= 1;
            
            if (path.length > 2) {
                // dungeon.moveEntityTo(this, path[1][0], path[1][1]);
                const onComplete = () => {
                    this.moving = false;
                    this.x = path[1][0];
                    this.y = path[1][1];
                };

                this.moving = true;
                dungeon.moveSprite(tweenManager, this.sprite, path[1][0], path[1][1], onComplete);
            }
        }
    }
}

export { Monster }