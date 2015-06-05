Screen.CameraTest = function(game, player, controller){
	this.game = game;
	this._player = player;
	this._controller = controller;

	this.bg = null;
	this.land = null;
	this.backBtn = null;
}

Screen.CameraTest.prototype = {
	create : function(){
		this.bg = this.game.add.sprite(0, 0, 'bg');
		this.land = this.game.add.sprite(0, 0, 'land');

		this.game.world.resize(this.bg.width, 780);

		this._player.init(200, 500);
		this.game.camera.follow(this._player.sprite);

		this.placeBackButton();
		this.backBtn.fixedToCamera = true;
	},

	update : function(){
		this._player.update(this._controller);
	},

	render : function(){},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			Screen.switchScreen,
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
		this._player.destroy();
		this.backBtn.destroy();
	}
}