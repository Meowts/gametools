/**
*
*	@class Player
*
*/

var Player = function(game){
	this.game = game;

	this.sprite = null;

	this.movementEnabled = null;

	this.isWalkingH = false;
	this.isWalkingV = false;

	this.walkingAnim = 'walkingAnimation';

	this.frameRate = 10;
	this.walkSpeed = 5;
}

Player.prototype = {
	init : function(x, y){
		this.sprite = this.game.add.sprite(x, y, Data[Global.CS].player.spriteKey);
		this.sprite.anchor.setTo(0.5, 0.5);

		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;

		this.sprite.body.setSize(this.sprite.width-30, 10, 0, this.sprite.height-65);

		this.sprite.animations.add(this.walkingAnim);

		this.game.camera.follow(this.sprite);

		this.movementEnabled = Data[Global.CS].player.movementEnabled;
	},

	update : function(input){
		this.move(input);
	},

	move : function(input){
			
		//Left/Right
		if(input.cursors.left.isDown || input.cursors.right.isDown){
			if(input.cursors.left.isDown){
				if(this.sprite.scale.x > 0) this.sprite.scale.x = -1;
				if(this.movementEnabled) this.sprite.body.x -= this.walkSpeed;
			}
			else{
				if(this.sprite.scale.x < 0) this.sprite.scale.x = 1;
				if(this.movementEnabled) this.sprite.body.x += this.walkSpeed;
			}
			this.isWalkingH = true;
		}
		else this.isWalkingH = false;

		//Up/Down
		if(input.cursors.up.isDown || input.cursors.down.isDown){
			if(input.cursors.up.isDown){
				if(this.movementEnabled) this.sprite.body.y -= this.walkSpeed;
			}
			else{
				if(this.movementEnabled) this.sprite.body.y += this.walkSpeed;
			}
			this.isWalkingV = true;
		}
		else this.isWalkingV = false;

		if(this.isWalkingH || this.isWalkingV){
			if(!this.sprite.animations.currentAnim.isPlaying) 
				this.sprite.animations.play(this.walkingAnim, this.frameRate, true);			
		}
		else{
			if(this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) this.sprite.body.setZeroVelocity();
			if(this.sprite.animations.currentAnim.isPlaying) this.sprite.animations.stop();
			if(this.sprite.frame != 0) this.sprite.frame = 0;
		}


	},

	destroy : function(){
		this.sprite.destroy();
	}
}