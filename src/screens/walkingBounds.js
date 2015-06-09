Screen.WalkingBounds = function(game, player, controller){
	this.game = game;
	this._player = player;
	this._controller = controller;

	this.bg = null;
	this.floor = null;

	this.backBtn = null;
	this.test = null;
}

Screen.WalkingBounds.prototype = {
	create : function(){
		this.bg = this.game.add.sprite(0, 0, 'boundsBG');
		this.game.physics.arcade.enable(this.bg);
		this.bg.body.immovable = true;	
			
		this.floor = this.game.add.sprite(0, 580, 'boundsFloor');

		this.game.world.resize(this.bg.width, 780);

		this._player.init(115, 660);

		this.placeBackButton();
	},

	update : function(){
		this._player.update();

		this.game.physics.arcade.collide(this._player.sprite, this.bg,
			function(){}, null, this);
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
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		this._player.destroy();
		this.bg.destroy();
		this.backBtn.destroy();
	}
}