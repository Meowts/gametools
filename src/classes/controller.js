/**
*
*	@class Controller
*
*/

Class.Controller = function(game){
	this.game = game;

	//Keyboard
	this.keyboard = null;

	this.controls = {
		moveUp : Phaser.Keyboard.UP,
		moveDown : Phaser.Keyboard.DOWN,
		moveLeft : Phaser.Keyboard.LEFT,
		moveRight : Phaser.Keyboard.RIGHT,
		
		toggleUse : Phaser.Keyboard.U,
		toggleTalk : Phaser.Keyboard.T,
		toggleSee : Phaser.Keyboard.I,
		toggleSpell : Phaser.Keyboard.C,
		toggleItem : Phaser.Keyboard.F,
		toggleMenu : Phaser.Keyboard.E,

		miscToggle : Phaser.Keyboard.SPACE
	};

	this.directions = {
		UP : 'UP',
		DOWN : 'DOWN',
		LEFT : 'LEFT',
		RIGHT : 'RIGHT',
		STILL : 'STILL'
	};

	this.keys = {};

	//Mouse
	this.mouse = null;

	this.cursor = null;
}

Class.Controller.prototype = {

	/*
	*
	*	Keyboard
	*
	*/
	init : function(){
		this.keyboard = this.game.input.keyboard;
		this.mouse = this.game.input.mouse;

		//Movement keys
		this.keys.upKey = this.keyboard.addKey(this.controls.moveUp);
		this.keys.downKey = this.keyboard.addKey(this.controls.moveDown);
		this.keys.leftKey = this.keyboard.addKey(this.controls.moveLeft);
		this.keys.rightKey = this.keyboard.addKey(this.controls.moveRight);

		//Toggle keys
		this.useKey = this.keyboard.addKey(this.controls.toggleUse);
		this.talkKey = this.keyboard.addKey(this.controls.toggleTalk);
		this.seeKey = this.keyboard.addKey(this.controls.toggleSee);
		this.spellKey = this.keyboard.addKey(this.controls.toggleSpell);
		this.itemKey = this.keyboard.addKey(this.controls.toggleItem);
		this.menuKey = this.keyboard.addKey(this.controls.toggleMenu);

		this.miscToggle = this.keyboard.addKey(this.controls.miscToggle);
		
		this.setToggleHandlers();
	},

	setToggleHandlers : function(){
		this.useKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.use);}, _com.actionMenu);
		this.talkKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.talk);}, _com.actionMenu);
		this.seeKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.see);}, _com.actionMenu);
		this.spellKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.spell);}, _com.actionMenu);
		this.itemKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.item);}, _com.actionMenu);
		this.menuKey.onDown.add(_com.player.toggleMenu, _com.player);
	},

	move : function(object, direction){

		//Walking
		if(this.keys.upKey.isDown || this.keys.downKey.isDown || this.keys.leftKey.isDown || this.keys.rightKey.isDown){
			if(this.keys.upKey.isDown) 			object.move(this.directions.UP);
			if(this.keys.downKey.isDown)		object.move(this.directions.DOWN);
			if(this.keys.leftKey.isDown) 		object.move(this.directions.LEFT);
			if(this.keys.rightKey.isDown) 		object.move(this.directions.RIGHT);
		}
		else{
			object.move(this.directions.STILL);
		}		
	},

	listenForKey : function(){
		this.keyboard.addCallbacks(this, function(){
			this.getKey();
		});
	},

	getKey : function(){
		return this.keyboard.lastKey;
	},

	setKey : function(control){
		this.controls[control] = this.getKey();
		this.keyboard.onDownCallback = null;
	},

	disableKeyboard : function(){
		this.keyboard.enabled = false;
	},

	enableKeyboard : function(){
		this.keyboard.enabled = true;
	},

	/*
	*
	*	Mouse
	*
	*/

	disableMouse : function(){
		this.mouse.enabled = false;
	},

	enableMouse : function(){
		this.mouse.enabled = true;
	},

	/*
	*
	*	Both
	*
	*/

	disable : function(){
		this.disableKeyboard();
		this.disableMouse();
	},

	enable : function(){
		this.enableKeyboard();
		this.enableMouse();
	}
}