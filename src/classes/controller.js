/**
*
*	@class Controller
*
*/

var Controller = function(game, player){
	this.game = game;
	this._player = player;

	this.keyboard = null;
	this.mouse = null;

	this.controls = {
		moveUp : Phaser.Keyboard.UP,
		moveDown : Phaser.Keyboard.DOWN,
		moveLeft : Phaser.Keyboard.LEFT,
		moveRight : Phaser.Keyboard.RIGHT,
		
		toggleMenu : Phaser.Keyboard.E,

		miscToggle : Phaser.Keyboard.SPACE
	}

	this.keys = {};
}

Controller.prototype = {
	init : function(){
		this.keyboard = this.game.input.keyboard;
		this.mouse = this.game.input.mouse;

		this.keys.upKey = this.keyboard.addKey(this.controls.moveUp);
		this.keys.downKey = this.keyboard.addKey(this.controls.moveDown);
		this.keys.leftKey = this.keyboard.addKey(this.controls.moveLeft);
		this.keys.rightKey = this.keyboard.addKey(this.controls.moveRight);

		this.menuKey = this.keyboard.addKey(this.controls.toggleMenu);

		this.miscToggle = this.keyboard.addKey(this.controls.miscToggle);
		
		this.setToggleHandlers();
	},

	setToggleHandlers : function(){
		this.menuKey.onDown.add(this._player.toggleMenu, this._player);
	},

	handleInput : function(){
		//Walking
		if(this.keys.upKey.isDown || this.keys.downKey.isDown || this.keys.leftKey.isDown || this.keys.rightKey.isDown){
			if(this.keys.upKey.isDown) 			this._player.moveUp();
			if(this.keys.downKey.isDown)		this._player.moveDown();
			if(this.keys.leftKey.isDown) 		this._player.moveLeft();
			if(this.keys.rightKey.isDown) 		this._player.moveRight();
		}
		else{
			this._player.stopWalking();
		}
	},

	listenForKey : function(){
		this.keyboard.addCallbacks(this, function(){
			this.getKey();
		});
	},

	getKey : function(){
		return this.keyboard.lastKey;
	},

	setKey : function(control){
		this.controls[control] = this.getKey();
		this.keyboard.onDownCallback = null;
	}
}