function ZenChan(game) {
  // constants
  var SPRITE_NAME = 'zen chan',
      SPRITESHEET_PATH = 'assets/images/sprites/zen-chan-spritesheet.png',
      VELOCITY = 64,
      DRAG = 480,
      JUMP_IMPULSE = -272;
  var Animation = {
    WALKING: 'walking',
    JUMPING: 'jumping',
    FALLING: 'falling'
  };


  // vars
  var _game = game,
      _sprite = null,
      _velocity = 0,
      _direction = 1,
      _player = null,
      _isWalking = false,
      _isJumping = false,
      _isFalling = false;


  // public api
  var _class = {};
      // methods
      _class.preload = preload;
      _class.init = init;
      _class.update = update;
      // getters/setters
      _class.setPhysics = setPhysics;
      _class.getSprite = getSprite;


  // private methods
  function preload() {
    _game.load.spritesheet(SPRITE_NAME, SPRITESHEET_PATH, 24, 24, 9);
  }

  function init(player, position) {
    //player reference
    _player = player;

    // create sprite
    _sprite = _game.add.sprite(
      position.x,
      position.y,
      SPRITE_NAME
    );

    // add anims
    _sprite.animations.add(Animation.WALKING, [0, 1, 2, 3], 6, true);
    _sprite.animations.add(Animation.JUMPING, [4, 5, 6, 7], 6, true);
    _sprite.animations.add(Animation.FALLING, [8, 9, 10, 11], 6, true);

    // set anchor
    _sprite.anchor.setTo(0.5, 1);
  }

  function setPhysics() {
    _sprite.body.collideWorldBounds = true;
    _sprite.body.drag.x = DRAG;
    _sprite.body.setSize(16, 16, 0, 0);

    // console.log('_sprite.body.touching: ', _sprite.body.touching);
  }

  function update() {
    if(_sprite.body.velocity.x === 0 && !_isJumping && !_isFalling) {
      setDirectionRelativeToPlayer();
    }

    _sprite.body.velocity.x = _direction * _velocity;
    _sprite.scale.x = _direction;

    // get vertical direction
    if(_sprite.body.velocity.y < 0) {
      _velocity = 0;
      setJumpingState(true);

    } else if(_sprite.body.velocity.y > 0) {
      _velocity = 0;
      setJumpingState(false);

    } else {
      if(_isFalling) {
        onCollidedWithFloor();
      }
      _isJumping = false;
      _isFalling = false;
      _isWalking = true;
    }

    // anim
    setAnim();
  }

  function setJumpingState(value) {
    _isJumping = value;
    _isFalling = !value;
  }

  function setAnim() {
    if(_isFalling) {
      _sprite.animations.play(Animation.FALLING);
    
    } else if(_isWalking) {
      _sprite.animations.play(Animation.WALKING);

    } else {
      _sprite.animations.play(Animation.IDLE);
    }
  }

  function setDirectionRelativeToPlayer() {
    _direction = (_player.body.x < _sprite.body.x) ? -1 : 1;
  }

  function reverseDirection() {
    _direction *= -1;
  }


  // event handlers
  function onCollidedWithFloor() {
    setDirectionRelativeToPlayer();
    _velocity = VELOCITY;
  }


  // getters
  function getSprite() {
    return _sprite;
  }


  return _class;
}