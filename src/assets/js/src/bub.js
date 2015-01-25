function Bub(game) {
  // constants
  var SPRITE_NAME = 'bub',
      SPRITE_PATH = 'assets/images/sprites/bub-still.png',
      SPRITESHEET_PATH = 'assets/images/sprites/bub-spritesheet.png',
      VELOCITY = 96,
      DRAG = 480,
      JUMP_IMPULSE = -272;
  var Animation = {
    IDLE: 'idle',
    WALKING: 'walking',
    JUMPING: 'jumping',
    FALLING: 'falling'
  };

  // vars
  var _game = game,
      _sprite = null,
      _isIdle = false,
      _isWalking = false,
      _isJumping = false,
      _isFalling = false,
      _isJumpKeyHeld = false;


  // public api
  var _class = {};
      _class.preload = preload;
      _class.init = init;
      _class.setPhysics = setPhysics;
      _class.update = update;
      _class.getSprite = getSprite;


  // private methods
  function preload() {
    _game.load.spritesheet(SPRITE_NAME, SPRITESHEET_PATH, 24, 24, 9);
  }

  function init() {
    _sprite = _game.add.sprite(_game.world.centerX, _game.world.centerY, SPRITE_NAME);

    // add anims
    _sprite.animations.add(Animation.IDLE, [0]);
    _sprite.animations.add(Animation.WALKING, [0, 1, 2, 3, 4, 5], 12, true);
    _sprite.animations.add(Animation.JUMPING, [6]);
    _sprite.animations.add(Animation.FALLING, [7, 8], 8, true);

    // set anchor
    _sprite.anchor.setTo(0.5, 1);
  }

  function setPhysics() {
    _sprite.body.collideWorldBounds = true;
    _sprite.body.drag.x = DRAG;
    _sprite.body.setSize(16, 16, 0, 0);
  }

  function update(isLeftDown, isRightDown, isJumpDown) {
    // handle left/right movements
    if(isLeftDown) {
      _sprite.body.velocity.x = -VELOCITY;
      _sprite.scale.x = -1;
      if(_sprite.body.onFloor()) {
        setWalkingState(true);
      }

    } else if(isRightDown) {
      _sprite.body.velocity.x = VELOCITY;
      _sprite.scale.x = 1;
      if(_sprite.body.onFloor()) {
        setWalkingState(true);
      }

    } else {
      _sprite.animations.play(Animation.IDLE);
      _sprite.animations.stop();
      setWalkingState(false);
    }

    // handle jumps
    if(isJumpDown) {
      jump();
      _isJumpKeyHeld = true;
    } else {
      _isJumpKeyHeld = false;
    }

    // get direction
    if(_sprite.body.velocity.y < 0) {
      setJumpingState(true);

    } else if(_sprite.body.velocity.y > 0) {
      setJumpingState(false);

    } else {
      _isJumping = false;
      _isFalling = false;
    }

    // anim
    setAnim();
  }

  function jump() {
    // if body is not in air
    // and if player is not holding jump key
    if(_sprite.body.onFloor() && !_isJumpKeyHeld) {
      // apply impulse
      _sprite.body.velocity.y = JUMP_IMPULSE;
    }
  }

  function setWalkingState(value) {
    _isIdle = !value;
    _isWalking = value;
  }

  function setJumpingState(value) {
    _isJumping = value;
    _isFalling = !value;
  }

  function setAnim() {
    if(_isJumping) {
      _sprite.animations.play(Animation.JUMPING);

    } else if (_isFalling) {
      _sprite.animations.play(Animation.FALLING);
    
    } else if(_isWalking) {
      _sprite.animations.play(Animation.WALKING);

    } else {
      _sprite.animations.play(Animation.IDLE);
    }
  }


  // getters
  function getSprite() {
    return _sprite;
  }


  return _class;
}
