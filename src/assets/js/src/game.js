// constants
var TILE_SIZE = 16,
    NUM_COLUMNS = 40,
    NUM_ROWS = 23,
    GAME_WIDTH = NUM_COLUMNS * TILE_SIZE, // 640
    GAME_HEIGHT = NUM_ROWS * TILE_SIZE, // 368
    GRAVITY = 512,

    // given in tile editor
    MAP_NAME = 'Level 01',
    TILESET_NAME = 'Bubble Bobble Tileset';

// vars
var _game = null,

    // player class (sprite is in class)
    _bub = null,

    // map objects
    _map = null,
    _layer = null,

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

  // add sprite
  _bub = new Bub(_game);
}


function preload() {
  // preload tilemap and tileset
  _game.load.tilemap(MAP_NAME, 'assets/tilemaps/level-01.json', null, Phaser.Tilemap.TILED_JSON);
  _game.load.image(TILESET_NAME, 'assets/images/tilesets/tileset.png');

  // preload sprite
  _bub.preload();
}

function create() {
  // start physics engine
  _game.physics.startSystem(Phaser.Physics.ARCADE);

  // create a map with the map name given in tile editor
  _map = _game.add.tilemap(MAP_NAME);

  // add tileset image with name given in tile editor 
  _map.addTilesetImage(TILESET_NAME);

  // set collision
  _map.setCollisionByExclusion([0]);

  // create layer with map name given in tile editor
  _layer = _map.createLayer(MAP_NAME);

  _layer.resizeWorld();
  // _layer.debug = true;

   // set references
  _keyboardInput = _game.input.keyboard;

  // init sprite
  _bub.init();
  _game.physics.enable(_bub.getSprite(), Phaser.Physics.ARCADE);
  _bub.setPhysics();

  // set physics engine's gravity.
  _game.physics.arcade.gravity.y = GRAVITY;
}

function update() {
  // update collision
  _game.physics.arcade.collide(_bub.getSprite(), _layer);

  // update player sprite
  _bub.update(
    _keyboardInput.isDown(Phaser.Keyboard.LEFT),
    _keyboardInput.isDown(Phaser.Keyboard.RIGHT),
    _keyboardInput.isDown(Phaser.Keyboard.X)
  );
}
