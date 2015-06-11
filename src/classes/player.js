/**
*
*	@class Player
*
*/

var Player = function(game){
	this.game = game;

	this.sprite = null;

	this.inputEnabled = true;

	this.walkingAnim = 'walkingAnimation';
	this.frameRate = 10;
	this.walkSpeed = 5;
}

Player.prototype = {
	init : function(x, y){
		//Place sprite
		this.sprite = this.game.add.sprite(x, y, Data.Player.spriteKey);
		this.sprite.anchor.setTo(0.5, 0.5);

		//Enable physics body, set bounding box
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.setSize(this.sprite.width-30, 10, 0, this.sprite.height-65);

		//Give it some identifiers
		this.sprite.type = 'player';
		this.sprite.id = 'player';

		//Allow stuff to happen on the player (mouse input)
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(GFN.performAction, this);

		//Add animations
		this.sprite.animations.add(this.walkingAnim);

		//Set camera follow
		this.game.camera.follow(this.sprite);
	},

	update : function(){
		if(this.inputEnabled) _com.controller.handleInput();
	},

	/*
	*
	*	Movement
	*
	*/

	moveUp : function(){
		this.sprite.body.y -= this.walkSpeed;
		this.startWalking();
	},

	moveDown : function(){
		this.sprite.body.y += this.walkSpeed;
		this.startWalking();
	},

	moveLeft : function(){
		if(this.sprite.scale.x > 0) this.sprite.scale.x = -1;
		this.sprite.body.x -= this.walkSpeed;
		this.startWalking();
	},

	moveRight : function(){
		if(this.sprite.scale.x < 0) this.sprite.scale.x = 1;
		this.sprite.body.x += this.walkSpeed;	
		this.startWalking();
	},

	startWalking : function(){
		if(!this.sprite.animations.currentAnim.isPlaying){
			this.sprite.animations.play(this.walkingAnim, this.frameRate, true);
		}
	},

	stopWalking : function(){
		if(this.sprite.animations.currentAnim.isPlaying) this.sprite.animations.stop();
		if(this.sprite.frame != 0) this.sprite.frame = 0;
	},

	/*
	*
	*	Toggle
	*
	*/

	toggleMenu : function(){
		if(_com.menu.menuGrp === null){
			_com.menu.drawMenu();
		}
		else _com.menu.destroy();
	},

	/*
	*
	*	Deeestroooooybasdgasdgsld
	*
	*/

	destroy : function(){
		this.sprite.destroy();
	}
}