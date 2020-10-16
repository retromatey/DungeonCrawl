class TurnManager {
        
    /** @return {Set.<Entity>} */
    get entities() { return this._entities; }
    
    /** @return {number} */
    get currentEntityIndex() { return this._currentEntityIndex; }
    /** @param {number} value */
    set currentEntityIndex(value) { this._currentEntityIndex = value; }
    
    constructor() {
        this._entities = new Set();
        this._currentEntityIndex = 0;
    }

    /**
     * @param {Entity} entity
     */
    addEntity(entity) {
        this.entities.add(entity);
    }

    /**
     * @param {Entity} entity
     */
    removeEntity(entity) {
        this.entities.remove(entity);
    }

    /** @return {boolean} */
    over() {
        return [...this.entities].every(m => m.over());
    }
    
    refresh() {
        this.entities.forEach(m => m.refresh());
        this.currentEntityIndex = 0;
    }

    /**
     * @param {Phaser.Tweens.TweenManager} tweenManager
     * @param {Dungeon} dungeon
     */
    turn(tweenManager, dungeon) {
        
        if (this.entities.size > 0) {
            const entities      = [...this.entities],
                  currentEntity = entities[this.currentEntityIndex];
            
            if (currentEntity.over() === false) {
                currentEntity.turn(tweenManager, dungeon);
                
            } else {
                this.currentEntityIndex += 1;
            }
        }
    }
}

export { TurnManager }