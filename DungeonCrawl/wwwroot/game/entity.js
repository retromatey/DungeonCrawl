
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
    get movementPoints() { return this._movementPoints; }
    /** @param {number} value */
    set movementPoints(value) { this._movementPoints = value; }

    /** @return {number} */
    get actionPoints() { return this._actionPoints; }
    /** @param {number} value */
    set actionPoints(value) { this._actionPoints = value; }

    /** @return {number} */
    get healthPoints() { return this._healthPoints; }
    /** @param {number} value */
    set healthPoints(value) { this._healthPoints = value; }

    /** @return {number} */
    get tweens() { return this._tweens; }
    /** @param {number} value */
    set tweens(value) { this._tweens = value; }

    /** @return {number} */
    get tile() { return this._tile; }

    /** @return {string} */
    get name() { return this._name; }
    
    constructor() {
        this._tweens = 0;
    }

    /**
     * @abstract
     * @param {Phaser.Tweens.TweenManager} tweenManager
     * @param {Dungeon} dungeon
     * @param {PlayerCharacter} player
     * @param {Entity[]} entities
     * @param {TurnManager} turnManager
     * @return {undefined}
     */
    turn(tweenManager, dungeon, player, entities, turnManager) {
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

    /**
     * @abstract
     * @return {number}
     */
    attack() {
        throw new Error('Entity.attack method not implemented');
    }
    
    /**
     * @abstract
     * @return {undefined}
     */
    onDestroy() {
        throw new Error('Entity.onDestroy method not implemented');
    }
}

export { Entity }