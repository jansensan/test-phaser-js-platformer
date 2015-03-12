function ZenChan(game) {
  // constants
  var SPRITE_NAME = 'zen chan',
      SPRITESHEET_PATH = 'assets/images/sprites/zen-chan-spritesheet.png',
      VELOCITY = 64,
      DRAG = 480,
      JUMP_IMPULSE = -272,
      PAUSE_DURATION = 800;
      AWARENESS_DURATION = 5200;
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
      _pauseTimer = null,
      _awarenessTimer = null,
      _isWalking = false,
      _isJumping = false,
      _didJump = false,
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
  }

  function update() {
    lookForPlayerHorizontally();

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

  function lookForPlayerHorizontally() {
    if(_sprite.body.velocity.x === 0 && !_isJumping && !_isFalling) {
      setDirectionRelativeToPlayer();
      startAwarenessTimer();
    }
  }

  function lookForPlayerVertically() {
    var willJump = false;

    // zen chan has been wandering around without collision for a while
    // check if player is higher, jump if so
    if(_player.body.y < _sprite.body.y) {
      willJump = true;
      _sprite.body.velocity.x = 0;
      jump();
    }

    return willJump;
  }

  function startAwarenessTimer() {
    clearAwarenessTimer();
    _awarenessTimer = setTimeout(onAwarenessTimedOut, AWARENESS_DURATION);
  }

  function clearAwarenessTimer() {
    clearTimeout(_awarenessTimer);
    _awarenessTimer = null;
  }

  function startPauseTimer() {
    clearPauseTimer();
    _pauseTimer = setTimeout(onPauseTimedOut, PAUSE_DURATION);
  }

  function clearPauseTimer() {
    clearTimeout(_pauseTimer);
    _pauseTimer = null;
  }

  function jump() {
    // if body is not in air
    // and if player is not holding jump key
    if(_sprite.body.onFloor()) {
      // apply impulse
      _sprite.body.velocity.y = JUMP_IMPULSE;
      _didJump = true;
    }
  }


  // event handlers
  function onCollidedWithFloor() {
    if(_didJump) {
      _didJump = false;
      startPauseTimer();

    } else {
      setDirectionRelativeToPlayer();
      _velocity = VELOCITY;
    }
  }

  function onAwarenessTimedOut() {
    clearAwarenessTimer();
    lookForPlayerVertically();
  }

  function onPauseTimedOut() {
    clearPauseTimer();
    var willJump = lookForPlayerVertically();
    if(!willJump) {
      setDirectionRelativeToPlayer();
      _velocity = VELOCITY;
    }
  }


  // getters
  function getSprite() {
    return _sprite;
  }


  return _class;
}