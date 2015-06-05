Tools.Main = function(game){
	this.game = game;
	this._controller = null;
	this._player = null;
	this._screen = null;
}

Tools.Main.prototype = {
	create : function(){
		this.game.stage.backgroundColor = '#555555';

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this._controller = new Controller(this.game);
		this._controller.init();

		this._player = new Player(this.game);

		this._screen = new Screen[Global.CS](this.game, this._player, this._controller);
		this._screen.create();
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

		this._screen.destroy();
		delete this._screen;

		this.game.world.resize(1024, 780);

		this._screen = new Screen[Global.CS](this.game, this._player, this._controller);
		this._screen.create();
	}
}