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
}


function preload() {
  // preload tilemap and tileset
  _map.preload();

  // preload sprite
  _bub.preload();
}

function create() {
  // set references
  _keyboardInput = _game.input.keyboard;

  // start physics engine
  _game.physics.startSystem(Phaser.Physics.ARCADE);

  // init map
  _map.init();

  // init sprite
  _bub.init();
  _game.physics.enable(_bub.getSprite(), Phaser.Physics.ARCADE);
  _bub.setPhysics();

  // set physics engine's gravity.
  _game.physics.arcade.gravity.y = GRAVITY;
}

function update() {
  // update collision
  _game.physics.arcade.collide(
    _bub.getSprite(),
    _map.getTilesLayer()
  );

  // update player sprite
  _bub.update(
    _keyboardInput.isDown(Phaser.Keyboard.LEFT),
    _keyboardInput.isDown(Phaser.Keyboard.RIGHT),
    _keyboardInput.isDown(Phaser.Keyboard.X)
  );
}
