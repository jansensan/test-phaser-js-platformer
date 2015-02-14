// constants
var TILE_SIZE = 16,
    NUM_COLUMNS = 40,
    NUM_ROWS = 23,
    GAME_WIDTH = NUM_COLUMNS * TILE_SIZE, // 640
    GAME_HEIGHT = NUM_ROWS * TILE_SIZE, // 368
    GRAVITY = 512;

// vars
var _game = null,

    // player class
    _bub = null,

    // enemy class
    _zenChan01 = null,
    _zenChan02 = null,
    _zenChan03 = null,

    // map class
    _map = null,

    // reference for code reduction
    _keyboardInput = null;


// init
init();


// methods
function init() {
  // add game
  _game = new Phaser.Game(
      GAME_WIDTH, GAME_HEIGHT,
      Phaser.CANVAS, 'phaser-js-test',
      {
        preload: preload,
        create: create,
        update: update
      }
    );

  // create map
  _map = new Map(_game);

  // create sprite
  _bub = new Bub(_game);

  // create enemy
  _zenChan01 = new ZenChan(_game);
  _zenChan02 = new ZenChan(_game);
  _zenChan03 = new ZenChan(_game);
}


function preload() {
  // preload tilemap and tileset
  _map.preload();

  // preload sprite
  _bub.preload();

  // preload enemy
  _zenChan01.preload();
  _zenChan02.preload();
  _zenChan03.preload();
}

function create() {
  // set references
  _keyboardInput = _game.input.keyboard;

  // init map
  _map.init();

  // init player
  _bub.init({x:48, y: _game.world.height - 48});

  // init enemies
  _zenChan01.init(
    _bub.getSprite(),
    {x: _game.world.centerX - 24, y: 64}
  );
  _zenChan02.init(
    _bub.getSprite(),
    {x: _game.world.centerX, y: 48}
  );
  _zenChan03.init(
    _bub.getSprite(),
    {x: _game.world.centerX + 24, y: 32}
  );

  // set physics engine
  _game.physics.startSystem(Phaser.Physics.ARCADE);
  _game.physics.enable(_bub.getSprite(), Phaser.Physics.ARCADE);
  _game.physics.enable(_zenChan01.getSprite(), Phaser.Physics.ARCADE);
  _game.physics.enable(_zenChan02.getSprite(), Phaser.Physics.ARCADE);
  _game.physics.enable(_zenChan03.getSprite(), Phaser.Physics.ARCADE);
  _game.physics.arcade.gravity.y = GRAVITY;
  _bub.setPhysics();
  _zenChan01.setPhysics();
  _zenChan02.setPhysics();
  _zenChan03.setPhysics();
}

function update() {
  // player collision with map
  _game.physics.arcade.collide(
    _bub.getSprite(),
    _map.getTilesLayer()
  );

  // player collision with enemies
  if(!_bub.isInvincible()) {
    _game.physics.arcade.collide(
      _bub.getSprite(),
      _zenChan01.getSprite(),
      _bub.onCollidedWithEnemy
    );
    _game.physics.arcade.collide(
      _bub.getSprite(),
      _zenChan02.getSprite(),
      _bub.onCollidedWithEnemy
    );
    _game.physics.arcade.collide(
      _bub.getSprite(),
      _zenChan03.getSprite(),
      _bub.onCollidedWithEnemy
    );
  }

  // enemy collision with map
  _game.physics.arcade.collide(
    _zenChan01.getSprite(),
    _map.getTilesLayer()
  );
  _game.physics.arcade.collide(
    _zenChan02.getSprite(),
    _map.getTilesLayer()
  );
  _game.physics.arcade.collide(
    _zenChan03.getSprite(),
    _map.getTilesLayer()
  );

  // update player sprite
  _bub.update(
    _keyboardInput.isDown(Phaser.Keyboard.LEFT),
    _keyboardInput.isDown(Phaser.Keyboard.RIGHT),
    _keyboardInput.isDown(Phaser.Keyboard.X)
  );

  // update enemy sprites
  _zenChan01.update();
  _zenChan02.update();
  _zenChan03.update();
}
