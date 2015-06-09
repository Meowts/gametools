Tools.Main = function(game){
	this.game = game;
	this._controller = null;
	this._player = null;
	this._menu = null;
	this._screen = null;
}

Tools.Main.prototype = {
	create : function(){
		this.game.stage.backgroundColor = '#555555';

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this._player = new Player(this.game);

		this._controller = new Controller(this.game, this._player);
		this._controller.init();

		this._player._menu.composeMenuOptions();

		this.switchScreen();
	},

	update : function(){
		this._screen.update();

		if(Global.switchScreen) this.switchScreen();
	},

	render : function(){
		this._screen.render();
	},

	switchScreen : function(){
		Global.switchScreen = false;

		if(this._screen !== null){
			this._screen.destroy();
			delete this._screen;
		}

		//Set the screen back to default size
		this.game.world.resize(Global.initWidth, Global.initHeight);

		//Enable/Disable input for the screen
		this._controller.keyboard.enabled = Data[Global.CS].keyboardEnabled;
		//Mouse Input when the time comes

		//Set screen
		this._screen = new Screen[Global.CS](this.game, this._player, this._controller);
		this._screen.create();
	}
}