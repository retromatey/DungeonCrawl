class TurnManager {
    
    /** @return {number} */
    static get interval() { return 150; }
    
    /** @return {Set.<Entity>} */
    get entities() { return this._entities; }
    
    /** @return {number} */
    get lastCall() { return this._lastCall; }
    /** @param {number} value */
    set lastCall(value) { this._lastCall = value; }
    
    constructor() {
        this._entities = new Set();
        this._lastCall = Date.now();
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
    }
    
    turn() {
        const now   = Date.now(),
              limit = this.lastCall + TurnManager.interval;
        
        if (now > limit) {
            
            for (const entity of this.entities) {
                
                if (entity.over() === false) {
                    entity.turn();
                    break;
                }                
            }
            
            this.lastCall = Date.now();
        }
    }
}

export { TurnManager }