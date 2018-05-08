import Phaser from 'phaser';

class TitleMenu extends Phaser.Scene {

    constructor() {
        super('titleMenuScene');
    }

    preload() {
        // this.load.image('face', 'assets/pics/bw-face.png');
        // this.load.image('arrow', 'assets/sprites/longarrow.png');
        console.log("Preload scene A");
    }

    create() {
        console.log("Create scene A, starting B...");
        this.scene.start('gameScene');
    }
}

export default TitleMenu;