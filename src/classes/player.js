/**
*
*	@class Player
*
*/

var Player = function(game){
	this.game = game;

	this.sprite = null;

	this.movementEnabled = null;

	this.walkingAnim = 'walkingAnimation';

	this.frameRate = 10;
}

Player.prototype = {
	init : function(x, y){
		this.sprite = this.game.add.sprite(x, y, Data[Global.CS].player.spriteKey);
		this.sprite.anchor.setTo(0.5, 0.5);

		this.game.physics.p2.enable(this.sprite);
		this.sprite.body.setZeroDamping();
		this.sprite.body.fixedRotation = true;

		this.sprite.animations.add(this.walkingAnim);

		this.movementEnabled = Data[Global.CS].player.movementEnabled;
	},

	update : function(input){
		this.move(input);
	},

	move : function(input){

		if(input.cursors.left.isDown || input.cursors.right.isDown){
			
			if(!this.sprite.animations.currentAnim.isPlaying) 
				this.sprite.animations.play(this.walkingAnim, this.frameRate, true);

			if(input.cursors.left.isDown){
				if(this.sprite.scale.x > 0) this.sprite.scale.x = -1;
				if(this.movementEnabled) this.sprite.body.moveLeft(200);
			} 
			else{
				if(this.sprite.scale.x < 0) this.sprite.scale.x = 1;
				if(this.movementEnabled) this.sprite.body.moveRight(200);
			}
		} 
		else{
			//No more walking.
			if(this.sprite.body.velocity.x != 0) this.sprite.body.setZeroVelocity();
			if(this.sprite.animations.currentAnim.isPlaying) this.sprite.animations.stop();
			if(this.sprite.frame != 0) this.sprite.frame = 0;
		}
	},

	destroy : function(){
		this.sprite.destroy();
	}
}