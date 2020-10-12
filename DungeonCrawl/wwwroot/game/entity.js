
class Entity {
    
    constructor() { }

    /**
     * @abstract
     * @return {undefined}
     */
    turn() {
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