function Map(game) {
  // constants
  var MAP_NAME = 'Level 01',
      Tilesets = {
        TILES: 'Bubble Bobble Tileset',
        COLLISION: 'COLLISION'
      };


  // vars
  var _game = game, // game reference

      // map objects
      _map = null,
      _tilesLayer = null,
      _collisionLayer = null;


  // public api
  var _class = {};
  _class.preload = preload;
  _class.init = init;
  _class.getTilesLayer = getTilesLayer;


  // private methods
  function preload() {
    // preload tilemap and tileset
    _game.load.tilemap(MAP_NAME, 'assets/tilemaps/level-01.json', null, Phaser.Tilemap.TILED_JSON);
    _game.load.image(Tilesets.TILES, 'assets/images/tilesets/tileset.png');
    // _game.load.image(Tilesets.COLLISION, 'assets/images/tilesets/collision.png');
  }


  function init() {
    // create a map with the map name given in tile editor
    _map = _game.add.tilemap(MAP_NAME);

    // add tileset image with name given in tile editor 
    _map.addTilesetImage(Tilesets.TILES);

    // set collision
    _map.setCollisionByExclusion([0]);

    // create layer with map name given in tile editor
    _tilesLayer = _map.createLayer(MAP_NAME);

    _tilesLayer.resizeWorld();
    // _tilesLayer.debug = true;
  }


  function getTilesLayer() {
    return _tilesLayer;
  }


  return _class;
}