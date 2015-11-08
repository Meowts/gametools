Screen.SpriteTest = function(game){
	this.game = game;

	this.instructionText = null;
	this.frameRateText = null;
	this.movementEnabledText = null;

	this.timer = null;

	this.backBtn = null;
	this.backBtnTxt = null;
}

Screen.SpriteTest.prototype = {
	create : function(){
		_com.player.init(this.game.world.width/2, this.game.world.height/2);

		this.instructionText = this.game.add.text(
			Data.Screen[Global.CS].copy.instructions.x,
			Data.Screen[Global.CS].copy.instructions.y,
			Data.Screen[Global.CS].copy.instructions.text,
			Data.Screen[Global.CS].copy.instructions.font 
		);

		this.timer = this.game.time.create(false);

		this.frameRateText = this.game.add.text(40, 120, 'Framerate: ' + _com.player.frameRate, {font: '16px Consolas'});
	
		this.placeBackButton();
	},

	update : function(){
		_com.player.update();
		this.adjustFramerate();
	},

	render : function(){
		this.frameRateText.setText('Framerate: ' + _com.player.frameRate);
	},

	adjustFramerate : function(){

		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)){

			if(!this.timer.running){

				this.changeFramerate();

				this.timer.loop(100, this.changeFramerate, this);
				this.timer.start();
			}
		}
		else{
			if(this.timer.running) this.timer.stop();
		}
	},

	changeFramerate : function(){
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
			_com.player.frameRate ++;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
			_com.player.frameRate --;
		}
	},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			GFN.switchScreen, 
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();
		
		this.instructionText.destroy(); 
		this.frameRateText.destroy();
		this.timer.destroy();
		this.backBtn.destroy();
	}
}