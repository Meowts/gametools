Tools.Main = function(game){
	this.game = game;

	this._controller = null;
	this._player = null;
	this._menu = null;
	this._items = null;
	this._inventory = null;
	this._spells = null;
	this._actionMenu = null;
	this._actionFunctions = null;
	this._dialog = null;

	this._screen = null;
}

Tools.Main.prototype = {
	create : function(){
		this.game.stage.backgroundColor = '#555555';

		//Physics lol
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		//Game objects
		this._player = new Player(this.game);
		this._controller = new Controller(this.game);
		this._items = new Items(this.game);
		this._inventory = new Inventory(this.game);
		this._spells = new Spell(this.game);
		this._menu = new Menu(this.game);
		this._action = new Action(this.game);
		this._actionMenu = new ActionMenu(this.game);
		this._actionFunctions = new ActionFunctions(this.game);
		this._dialog = new Dialog(this.game);

		//Add game objects to object pool (_com)
		this.comObjects();

		//Run necessary initialization
		_com.controller.init();
		_com.items.init();
		_com.menu.composeMenuOptions();
		_com.actionMenu.init();

		this.switchScreen();
	},

	comObjects : function(){
		//This gives global access to all of the "Global object containers"
		_com.player = this._player;
		_com.controller = this._controller;
		_com.menu = this._menu;
		_com.items = this._items;
		_com.inventory = this._inventory;
		_com.spells = this._spells;
		_com.action = this._action;
		_com.actionMenu = this._actionMenu;
		_com.actionFunctions = this._actionFunctions;
		_com.dialog = this._dialog;
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
		this._controller.keyboard.enabled = Data.Screen[Global.CS].keyboardEnabled;
		
		//Mouse Input when the time comes

		//Set screen
		this._screen = new Screen[Global.CS](this.game);
		this._screen.create();
	}
}