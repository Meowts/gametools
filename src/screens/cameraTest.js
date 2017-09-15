Screen.CameraTest = function(game){
	this.game = game;

	this.bg = null;
	this.land = null;
	this.backBtn = null;
}

Screen.CameraTest.prototype = {
	create : function(){
		this.bg = this.game.add.sprite(0, 0, 'bg');
		this.land = this.game.add.sprite(0, 440, 'land');

		this.game.world.resize(this.bg.width, this.bg.height);

		_com.player.init(200, 600);

		this.placeBackButton();
	},

	update : function(){
		_com.player.update();
	},

	render : function(){},

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
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();
		
		this.bg.destroy();
		this.land.destroy();
		this.backBtn.destroy();
	}
}