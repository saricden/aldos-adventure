class Game extends Phaser.Scene {
  constructor() {
      super('gameScene');

      this.blobGuy = null;
      this.hpText = null;
      this.jordan1 = null;
      this.jordan2 = null;
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
    this.load.image('jordan1', 'img/temp/jordan-guy1.png');
    this.load.image('jordan2', 'img/temp/jordan-guy2.png');
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

    // Configure MC
    this.blobGuy = this.physics.add.sprite(150, 150, 'blob');
    this.blobGuy.setBounce(0);
    this.blobGuy.vx = 0;
    this.blobGuy.vy = 0;
    this.blobGuy.setScale(0.65);

    // Add Jordan's beautiful sprites
    this.jordan1 = this.physics.add.sprite(500, 50, 'jordan1');
    this.jordan1.setScale(0.15);
    this.jordan2 = this.physics.add.sprite(750, 150, 'jordan2');
    this.jordan2.setScale(0.15);

    // Add collisions
    this.physics.add.collider(this.blobGuy, groundLayer);
    this.physics.add.collider(this.jordan1, groundLayer);
    this.physics.add.collider(this.jordan2, groundLayer);

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
    this.lBtn = this.add.image(0, window.innerHeight, 'btn-left').setScrollFactor(0);
    this.lBtn.setOrigin(0, 1);
    this.lBtn.setInteractive();

    this.rBtn = this.add.image(80, window.innerHeight, 'btn-right').setScrollFactor(0);
    this.rBtn.setOrigin(0, 1);
    this.rBtn.setInteractive();

    // Jump btn
    this.jBtn = this.add.image(window.innerWidth-80, window.innerHeight, 'btn-up').setScrollFactor(0);
    this.jBtn.setOrigin(1, 1);
    this.jBtn.setInteractive();

    const aBtn = this.add.image(window.innerWidth, window.innerHeight, 'btn-atk').setScrollFactor(0);
    aBtn.setOrigin(1, 1);


    // Camera
    this.cameras.main.startFollow(this.blobGuy);
    this.cameras.main.setBackgroundColor('#AAF');
    this.cameras.main.setRoundPixels(true); // seems to fix the tilemap from bleeding

    // Add key events
    this.keys.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Enable a second touch screen pointer
    this.input.addPointer();
  }

  update() {
    const {pointer1, pointer2} = this.input;
    const {lBtn, rBtn, jBtn, keys, blobGuy, jordan1, jordan2} = this;
    let {btns} = this;

    // Handle multi-touch btn input
    if (pointer1.isDown || pointer2.isDown) {
      if (lBtn.getBounds().contains(pointer1.x, pointer1.y) || lBtn.getBounds().contains(pointer2.x, pointer2.y)) {
        btns.L = true;
        btns.R = false;
      }
      else if (rBtn.getBounds().contains(pointer1.x, pointer1.y) || rBtn.getBounds().contains(pointer2.x, pointer2.y)) {
        btns.R = true;
        btns.L = false;
      }
      else if (jBtn.getBounds().contains(pointer1.x, pointer1.y) || jBtn.getBounds().contains(pointer2.x, pointer2.y)) {
        btns.J = true;
      }
      else {
        btns.R = false;
        btns.L = false;
      }
    }

    // Key input & movement
    if (keys.A.isDown || btns.L) {
      blobGuy.setVelocityX(-160);
      blobGuy.setFlipX(true);
    }
    else if (keys.D.isDown || btns.R) {
      blobGuy.setVelocityX(160);
      blobGuy.setFlipX(false);
    }
    else {
      blobGuy.setVelocityX(0);
    }

    if (blobGuy.body.blocked.down && (keys.W.isDown || btns.J)) {
      blobGuy.setVelocityY(-210);
    }

    // Animations
    if (blobGuy.body.blocked.down) {
      if (blobGuy.body.velocity.x > 0) {
        blobGuy.anims.play('run', true);
      }
      else if (blobGuy.body.velocity.x < 0) {
        blobGuy.anims.play('run', true);
      }
      else {
        blobGuy.anims.play('idle', true);
      }
    }
    else {
      if (blobGuy.body.velocity.y < 0) {
        blobGuy.anims.play('jump', true);
      }
      else {
        blobGuy.anims.play('fall', true);
      }
    }
    
    // Jordan's dudes
    if (blobGuy.x > jordan1.x)
      jordan1.setFlipX(false);
    else
      jordan1.setFlipX(true);

    if (blobGuy.x > jordan2.x)
      jordan2.setFlipX(false);
    else
      jordan2.setFlipX(true);
  }
}

export default Game;