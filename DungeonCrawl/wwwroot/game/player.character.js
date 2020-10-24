import { Entity } from "./entity.js";

class PlayerCharacter extends Entity {

    /** @return {Phaser.Types.Input.Keyboard.CursorKeys} */
    get cursorKeys() { return this._cursorKeys; }

    /**
     * @param {Phaser.Types.Input.Keyboard.CursorKeys} cursorKeys
     * @param {number} x
     * @param {number} y
     */
    constructor(cursorKeys, x, y) {
        super();

        this._x = x;
        this._y = y;
        this._movementPoints = 1;
        this._tile = 4;

        this._name = 'The Player';
        this._actionPoints = 1;
        this._healthPoints = 15;

        this._moving = false;
        this._cursorKeys = cursorKeys; 
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
        this.movementPoints = 1;
    }

    /**
     * @override
     * @return {undefined}
     */
    turn(tweenManager, dungeon, player, entities, turnManager) {
        let newX  = this.x,
            newY  = this.y,
            moved = false;

        if (this.movementPoints > 0 && this.moving === false) {
            
            if (this.cursorKeys.left.isDown) {
                newX -= 1;
                moved = true;
            }

            if (this.cursorKeys.right.isDown) {
                newX += 1;
                moved = true;
            }

            if (this.cursorKeys.up.isDown) {
                newY -= 1;
                moved = true;
            }

            if (this.cursorKeys.down.isDown) {
                newY += 1;
                moved = true;
            }

            if (moved) {
                this.movementPoints -= 1;
                
                if (dungeon.isWalkableTile(newX, newY, entities)) {
                    const onComplete = () => {
                        this.moving = false;
                        this.x = newX;
                        this.y = newY;
                    };
                    
                    this.moving = true;
                    dungeon.moveSprite(tweenManager, this.sprite, newX, newY, onComplete);
                }
            }
        }
    }

    /**
     * @override
     * @return {number}
     */
    attack() {
        return 1;
    }

    /**
     * @override
     * @return {undefined}
     */
    onDestroy() {
        alert('YOU DIED!!!');
        location.reload();
    }
}

export { PlayerCharacter }