Tools.Load = function(game){this.game = game;}

Tools.Load.prototype = {
	preload : function(){
		/*
		*
		*	On the below line is where you define four things (in this order):
		*
		*	1. The file path/name,
		* 	2. The width of each frame,
		*	3. The height of each frame,
		*	3. How many frames there are.
		*
		*	(Don't change 'walkingSprites')
		*
		*	Spritesheets, for now, should have each frame stacked equally in a single
		*	file, all in one row, with no padding between frames
		*	(ie: spritesheet with 3 frames, each frame is 150x300, if they're all 
		*	lined up horizontally the total width of the image should be 450px).
		*
		*	The way it's set up currently, the "Standing" frame needs to be
		*	the first frame on the spreadsheet.
		*
		*	These restrictions won't be applicable to the final version, but for
		*	preliminary testing purposes it's far easier this way.
		*
		*	Note: .png and .jpg work.
		*
		*/

		//this.game.load.spritesheet('walkingSprites', '/assets/filename.png', 100, 100, 5);
		this.game.load.spritesheet('walkingSprites', './assets/sheets/walking.png', 250, 250, 8);

		this.game.load.spritesheet('button', './assets/button.png', 150, 75, 2);

		//Side menu
		this.game.load.spritesheet('menu-top', './assets/menu-top.png', 150, 30, 2);
		this.game.load.spritesheet('menu-mid', './assets/menu-mid.png', 150, 30, 2);
		this.game.load.spritesheet('menu-bottom', './assets/menu-bottom.png', 150, 30, 2);

		//Action menu
		this.game.load.image('am-base', './assets/amBase.png');
		this.game.load.image('am-overlay', './assets/amOverlay.png');
		this.game.load.spritesheet('am-use', './assets/amUse.png', 170, 100, 2);
		this.game.load.spritesheet('am-talk', './assets/amTalk.png', 170, 100, 2);
		this.game.load.spritesheet('am-see', './assets/amSee.png', 170, 100, 2);
		this.game.load.spritesheet('am-spell', './assets/amSpell.png', 210, 100, 2);
		this.game.load.spritesheet('am-item', './assets/amItem.png', 210, 100, 2);
		this.game.load.spritesheet('am-menu', './assets/amMenu.png', 94, 100, 2);

		//Test sprites
		this.game.load.image('bg', './assets/bg.png');
		this.game.load.image('land', './assets/land.png');

		this.game.load.image('boundsBG', './assets/boundsBG.png');
		this.game.load.image('boundsFloor', './assets/boundsFloor.png');

		this.game.load.image('test1', './assets/test1.png');
		this.game.load.image('test2', './assets/test2.png');
		this.game.load.image('test3', './assets/test3.png');
	},

	create : function(){
		this.game.state.start('Main');
	}
}
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
		this._player = new Class.Player(this.game);
		this._controller = new Class.Controller(this.game);
		this._items = new Class.Items(this.game);
		this._inventory = new Class.Inventory(this.game);
		this._spells = new Class.Spell(this.game);
		this._menu = new Class.Menu(this.game);
		this._action = new Class.Action(this.game);
		this._actionMenu = new Class.ActionMenu(this.game);
		this._actionFunctions = new Class.ActionFunctions(this.game);
		this._dialog = new Class.Dialog(this.game);

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