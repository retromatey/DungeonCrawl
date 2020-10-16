
class Entity {

    /** @return {number} */
    get x() { return this._x; }
    /** @param {number} value */
    set x(value) { this._x = value; }

    /** @return {number} */
    get y() { return this._y; }
    /** @param {number} value */
    set y(value) { this._y = value; }
    
    /** @return {Phaser.GameObjects.Sprite} */
    get sprite() { return this._sprite; }
    /** @param {Phaser.GameObjects.Sprite} value */
    set sprite(value) { this._sprite = value; }
    
    /** @return {boolean} */
    get moving() { return this._moving; }
    /** @param {boolean} value */
    set moving(value) { this._moving = value; }
    
    /** @return {number} */
    get tile() { return this._tile; }
    
    constructor() { }

    /**
     * @abstract
     * @param {Phaser.Tweens.TweenManager} tweenManager
     * @param {Dungeon} dungeon
     * @return {undefined}
     */
    turn(tweenManager, dungeon) {
        throw new Error('Entity.turn method not implemented');
    }

    /**
     * @abstract
     * @return {undefined}
     */
    refresh() {
        throw new Error('Entity.refresh method not implemented');
    }

    /**
     * @abstract
     * @return {boolean}
     */
    over() {
        throw new Error('Entity.over method not implemented');
    }
}

export { Entity }