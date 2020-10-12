import { GameScene } from "./game.scene.js";

class Program {

    /**
     * @static
     * @param {string[]} args
     * @return {undefined}
     */
    static main(args = []) {
        const game = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'game',
            scene: GameScene,
            backgroundColor: '#000',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {
                        y: 0
                    }
                }
            },
        });
    }
}

export { Program }