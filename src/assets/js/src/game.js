// constants
var TILE_SIZE = 16,
    NUM_COLUMNS = 40,
    NUM_ROWS = 23,
    GAME_WIDTH = NUM_COLUMNS * TILE_SIZE, // 640
    GAME_HEIGHT = NUM_ROWS * TILE_SIZE; // 368

// vars
var _game = null,
    _bub = null;


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

  // add sprite
  _bub = new Bub(_game);
}


function preload() {
  _bub.preload();
}

function create() {
  // start physics engine
  _game.physics.startSystem(Phaser.Physics.ARCADE);

  // init sprite
  _bub.init();
  _game.physics.enable(_bub.getSprite(), Phaser.Physics.ARCADE);
  _bub.setPhysics();

  // set physics engine's gravity.
  _game.physics.arcade.gravity.y = 512;
}

function update() {
  _bub.update(
    _game.input.keyboard.isDown(Phaser.Keyboard.LEFT),
    _game.input.keyboard.isDown(Phaser.Keyboard.RIGHT),
    _game.input.keyboard.isDown(Phaser.Keyboard.X)
  );
}