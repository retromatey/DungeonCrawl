class GameScene extends Phaser.Scene {

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

    constructor() {
        super();
    }

    preload() {
        this.load.spritesheet({
            key: 'tilemap',
            url: './game/img/tilemap.png',
            frameConfig: {
                frameWidth: 16,
                frameHeight: 16,
                margin: 1,      // space around the edge of the frames
                spacing: 1,     // spacing between each frame in the image
            }
        });
    }

    create() {
        const tilemapData = [
            [ 0, 0, 0, 0, 0, 0, 0 ],
            [ 0, 1, 1, 1, 1, 2, 0 ],
            [ 0, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 1, 1, 1, 1 ],
            [ 0, 1, 1, 1, 1, 1, 0 ],
            [ 0, 1, 1, 3, 1, 1, 0 ],
            [ 0, 0, 0, 0, 0, 0, 0 ],
        ];

        const tilemap = this.make.tilemap({
            key: 'tilemap',
            data: tilemapData,
            tileWidth: 16,
            tileHeight: 16,
        });
        const tileset = tilemap.addTilesetImage('tilemap', 'tilemap', 16, 16, 1, 1);
        const ground = tilemap.createStaticLayer(0, tileset, 0, 0);
    }

    update() {
    }
}

GameScene.main();