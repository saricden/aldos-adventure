import Phaser from 'phaser';

// Scenes
import TitleMenu from './scenes/TitleMenu';
import Game from './scenes/Game';

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFAAFF,
    // pixelArt: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {y: 200}
      }
    },
    scene: [ TitleMenu, Game ]
};

var game = new Phaser.Game(config);
