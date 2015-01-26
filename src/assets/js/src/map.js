function Map(game) {
  // constants
  var MAP_NAME = 'Level 01',
      Tilesets = {
        TILES: 'Bubble Bobble Tileset',
        COLLISION: 'Collision Tileset'
      },
      AssetsPaths = {
        TILEMAP: 'assets/tilemaps/level-01.json',
        TILES: 'assets/images/tilesets/tileset.png',
        COLLISION: 'assets/images/tilesets/collision.png'
      };


  // vars
  var _game = game, // game reference

      // map objects
      _map = null,
      _mainTileset = null,
      _collisionTileset = null,
      _tilesLayer = null,
      _collisionLayer = null;


  // public api
  var _class = {};
  _class.preload = preload;
  _class.init = init;
  _class.getTilesLayer = getTilesLayer;


  // private methods
  function preload() {
    _game.load.tilemap(
      MAP_NAME,
      AssetsPaths.TILEMAP,
      null,
      Phaser.Tilemap.TILED_JSON
    );
    _game.load.image(Tilesets.TILES, AssetsPaths.TILES);
    _game.load.image(Tilesets.COLLISION, AssetsPaths.COLLISION);
  }


  function init() {
    // create a map with the map name given in tile editor
    _map = _game.add.tilemap(MAP_NAME);

    // add tileset image with name given in tile editor 
    _map.addTilesetImage(Tilesets.TILES);
    _map.addTilesetImage(Tilesets.COLLISION);

    // set collision
    _map.setCollisionByExclusion([0]);

    // create layers, assign them an index
    _tilesLayer = _map.createLayer(0);
    _collisionLayer = _map.createLayer(1);

    _tilesLayer.resizeWorld();
    // _tilesLayer.debug = true;
    _collisionLayer.resizeWorld();
    // _collisionLayer.debug = true;
  }


  function getTilesLayer() {
    return _tilesLayer;
    // return _collisionLayer;
  }


  return _class;
}