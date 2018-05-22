class Game extends Phaser.Scene {
  constructor() {
      super('gameScene');

      this.blobGuy = null;
      this.hpText = null;
      this.keys = {
        W: false,
        S: false,
        A: false,
        D: false
      };
  }

  preload() {
    this.load.spritesheet('blob', 'img/temp/blob-guy.png', {
      frameWidth: 80,
      frameHeight: 110,
      endFrame: 13
    });
    // this.load.image('platform', 'img/temp/platform.png');
    this.load.image('IslandTileset', 'img/temp/island-tileset.png', 50, 50);
    this.load.tilemapTiledJSON('level1', 'maps/level1.json');
  }

  create() {
    // Create animations
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('blob', {
        start: 0,
        end: 1,
        first: 0
      }),
      frameRate: 5
    });

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('blob', {
        start: 2,
        end: 9,
        first: 2
      }),
      frameRate: 24
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('blob', {
        start: 10,
        end: 11,
        first: 10
      }),
      frameRate: 12
    });

    this.anims.create({
      key: 'fall',
      frames: this.anims.generateFrameNumbers('blob', {
        start: 12,
        end: 13,
        first: 12
      }),
      frameRate: 12
    });

    // Add some platforms
    // const platforms = this.physics.add.staticGroup();

    // platforms.create(window.innerWidth, window.innerHeight/2, 'platform');
    // platforms.create(200, window.innerHeight-50, 'platform');

    // Add a map for the blob to explore
    const map = this.make.tilemap({ key: 'level1' });
    const groundTiles = map.addTilesetImage('IslandTileset');

    map.createDynamicLayer('non-blocking', groundTiles, 0, 0);
    const groundLayer = map.createDynamicLayer('blocking', groundTiles, 0, 0);

    groundLayer.setCollisionBetween(1, 30);

    // Configure sprites
    this.blobGuy = this.physics.add.sprite(150, 150, 'blob');
    this.blobGuy.setBounce(0);
    // this.blobGuy.setCollideWorldBounds(true);
    this.blobGuy.vx = 0;
    this.blobGuy.vy = 0;
    this.blobGuy.setScale(0.65);

    // Add HP text
    this.hpText = this.add.text(5, 5, 'HP: 5', {
      fontFamily: 'Sans-Serif',
      fontSize: 18,
      color: '#FFCCCC',
      backgroundColor: '#000000',
      padding: 5,
    }).setScrollFactor(0);


    // Camera
    this.cameras.main.startFollow(this.blobGuy);
    this.cameras.main.setBackgroundColor('#AAF');
    this.cameras.main.setRoundPixels(true); // seems to fix the tilemap from bleeding

    // Add collisions
    // this.physics.add.collider(this.blobGuy, platforms);
    this.physics.add.collider(this.blobGuy, groundLayer);

    // Add key events
    this.keys.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  update() {
    // Key input & movement
    if (this.keys.A.isDown) {
      this.blobGuy.setVelocityX(-160);
      this.blobGuy.setFlipX(true);
    }
    else if (this.keys.D.isDown) {
      this.blobGuy.setVelocityX(160);
      this.blobGuy.setFlipX(false);
    }
    else {
      this.blobGuy.setVelocityX(0);
    }

    if (this.keys.W.isDown && this.blobGuy.body.blocked.down) {
      this.blobGuy.setVelocityY(-210);
    }

    // Animations
    if (this.blobGuy.body.blocked.down) {
      if (this.blobGuy.body.velocity.x > 0) {
        this.blobGuy.anims.play('run', true);
      }
      else if (this.blobGuy.body.velocity.x < 0) {
        this.blobGuy.anims.play('run', true);
      }
      else {
        this.blobGuy.anims.play('idle', true);
      }
    }
    else {
      if (this.blobGuy.body.velocity.y < 0) {
        this.blobGuy.anims.play('jump', true);
      }
      else {
        this.blobGuy.anims.play('fall', true);
      }
    }
  }

}

export default Game;