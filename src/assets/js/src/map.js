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

    // create layers, assign them an index
    _tilesLayer = _map.createLayer(0);
    _collisionLayer = _map.createLayer(1);
    _collisionLayer.alpha = 0;

    // set basic collision
    _map.setCollisionByExclusion([0]);
    
    // manually set directional collision
    var i = 0, j = 0, collisionTile, targetTile, collisions;
    for(i = 0; i < 23; i++) {
      for(j = 0; j < 40; j++) {
        collisionTile = _collisionLayer.layer.data[i][j];
        targetTile = _tilesLayer.layer.data[i][j];
        if(collisionTile.index > 0) {
          // set collision blocks
          if(collisionTile.properties.collisions === 'true') {
            targetTile.collideDown = true;
            targetTile.collideLeft = true;
            targetTile.collideRight = true;
            targetTile.collideUp = true;
          // set directional collision
          } else {
            collisions = collisionTile.properties.collisions.split(',');
            targetTile.collideDown = collisions[0] === 'false';
            targetTile.collideRight = collisions[1] === 'false';
            targetTile.collideUp = collisions[2] === 'false';
            targetTile.collideLeft = collisions[3] === 'false';
          }
        }
      }
    }

    _tilesLayer.resizeWorld();
    _collisionLayer.resizeWorld();
  }


  function getTilesLayer() {
    return _tilesLayer;
  }


  return _class;
}