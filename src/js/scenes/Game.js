class Game extends Phaser.Scene {
  constructor() {
      super('gameScene');

      this.blobGuy = null;
      this.hpText = null;
      // UI button bools
      this.btns = {
        L: false,
        R: false,
        J: false,
        A: false
      };

      // Keyboard keydown bools
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
    this.load.image('btn-left', 'img/temp/btn-left.png');
    this.load.image('btn-right', 'img/temp/btn-right.png');
    this.load.image('btn-up', 'img/temp/btn-up.png');
    this.load.image('btn-atk', 'img/temp/btn-attack.png');
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

    // Screen UI
    // ------------------------------------
    // Add HP text
    this.hpText = this.add.text(5, 5, 'HP: 5', {
      fontFamily: 'Sans-Serif',
      fontSize: 18,
      color: '#FFCCCC',
      backgroundColor: '#000000',
      padding: 5,
    }).setScrollFactor(0);

    // Add arrow btns
    const lBtn = this.add.image(0, window.innerHeight, 'btn-left').setScrollFactor(0);
    lBtn.setOrigin(0, 1);
    lBtn.setInteractive();

    lBtn.on('pointerover', (pointer) => {
      if (pointer.isDown) {
        this.btns.L = true;
      }
    });
    lBtn.on('pointerdown', () => {
      this.btns.L = true;
    });
    lBtn.on('pointerout', () => {
      this.btns.L = false;
    });

    const rBtn = this.add.image(80, window.innerHeight, 'btn-right').setScrollFactor(0);
    rBtn.setOrigin(0, 1);
    rBtn.setInteractive();

    rBtn.on('pointerover', (pointer) => {
      if (pointer.isDown) {
        this.btns.R = true;
      }
    });
    rBtn.on('pointerdown', () => {
      this.btns.R = true;
    });
    rBtn.on('pointerout', () => {
      this.btns.R = false;
    });

    // Jump btn
    const jBtn = this.add.image(window.innerWidth-80, window.innerHeight, 'btn-up').setScrollFactor(0);
    jBtn.setOrigin(1, 1);
    jBtn.setInteractive();

    jBtn.on('pointerdown', () => {
      this.btns.J = true;
    });

    const aBtn = this.add.image(window.innerWidth, window.innerHeight, 'btn-atk').setScrollFactor(0);
    aBtn.setOrigin(1, 1);

    this.input.on('pointerup', () => {
      this.btns = {
        L: false,
        R: false,
        J: false,
        A: false
      };
    });


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
    if (this.keys.A.isDown || this.btns.L) {
      this.blobGuy.setVelocityX(-160);
      this.blobGuy.setFlipX(true);
    }
    else if (this.keys.D.isDown || this.btns.R) {
      this.blobGuy.setVelocityX(160);
      this.blobGuy.setFlipX(false);
    }
    else {
      this.blobGuy.setVelocityX(0);
    }

    if (this.blobGuy.body.blocked.down && (this.keys.W.isDown || this.btns.J)) {
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