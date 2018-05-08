class Game extends Phaser.Scene {

    constructor() {
        super('gameScene');
    }

    create() {
        console.log("Create scene B!!");
        // this.scene.start('sceneC');
    }

}

export default Game;