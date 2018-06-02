import Phaser from 'phaser';

class TitleMenu extends Phaser.Scene {

    constructor() {
        super('titleMenuScene');
    }

    preload() {
        this.load.image('logo', 'img/temp/amaze-logo.png');
        this.load.image('play-btn', 'img/temp/play-btn.png');
    }

    create() {
        const logo = this.add.image(window.innerWidth/2, window.innerHeight/2-100, 'logo');
        const playBtn = this.add.image(window.innerWidth/2, window.innerHeight/2, 'play-btn');
        
        playBtn.setInteractive();
        playBtn.on('clicked', this.playGame, this);

        this.input.on('gameobjectup', (pointer, gameObject) => {
            gameObject.emit('clicked', gameObject);
        });
    }

    playGame() {
        this.scene.start('gameScene');
    }
}

export default TitleMenu;