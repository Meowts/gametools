

/**
*
*	@class Menu
*
*/

var Menu = function(game, player){
	this.game = game;
	this._player = player;

	this.action = 'main';

	this.topSprite = 'menu-top';
	this.midSprite = 'menu-mid';
	this.bottomSprite = 'menu-bottom';
	this.menuGrp = null;

	this.menuFont = {font: '16px Consolas'};

	this.MenuList = {};
}

Menu.prototype = {

	composeMenuOptions : function(){
		var inventory = this._player.inventory.items;
		var spells = this._player.spells.availableSpells;
		var options = {
			option1 : 'option1',
			option2 : 'option2',
			option3 : 'option3',
			option4 : 'option4'
		}
		var main = {
			inventory : 'inventory',
			spells : 'spells',
			options : 'options',
			exit : this.exitMenu
		}

		this.MenuList.main = main;
		this.MenuList.inventory = inventory;
		this.MenuList.spells = spells;
		this.MenuList.options = options;
	},

	drawMenu : function(){
		this.destroy(this);
		this.menuGrp = this.game.add.group();

		//Get number of menu items
		var totalItems = GFN.count(this.MenuList[this.action]);

		//Button positioning
		var startX = this.game.width - 200;
		var startY = 50;
		var incrementY = 30;

		//If it's not the main menu, add a back button
		if(this.action !== 'main'){
			this.addButton(startX, startY, 'back', 'top', 'main');
			startY += incrementY;
		}

		var x = 1;
		for(var item in this.MenuList[this.action]){
			//Menu seperated into three sprites - top, mid, bottom - take the right sprite
			//for the right item placement
			var section = 'mid';
			if(x === 1 && this.action === 'main') section = 'top';
			else if(x === totalItems) section = 'bottom';

			this.addButton(startX, startY, item, section, this.MenuList[this.action][item])

			startY += incrementY;
			x ++;
		}
	},

	addButton : function(x, y, title, section, action){
		var buttonSprite;

		switch(section){
			case 'top' : 
				buttonSprite = this.topSprite;
				break;
			case 'mid' : 
				buttonSprite = this.midSprite;
				break;
			case 'bottom' : 
				buttonSprite = this.bottomSprite;
				break;
			default :
				break;
		}

		var button = this.game.add.button(x, y, buttonSprite, 
			this.switchLayer,
			this, 1, 0, 1, 0);
		button.anchor.setTo(0.5, 0.5);

		button.action = action;

		var buttonText = this.game.add.text(0, 2, title, this.menuFont);
		buttonText.anchor.setTo(0.5, 0.5);

		button.addChild(buttonText);
		this.menuGrp.add(button);
	},

	switchLayer : function(item){
		if(GFN.isFunction(item.action)){
			item.action(this);
		}
		else{
			this.action = item.action;
			this.drawMenu();
		}
	},

	exitMenu : function(context){
		if(context.menuGrp !== null) context.menuGrp.destroy();
	},

	destroy : function(){
		if(this.menuGrp !== null) this.menuGrp.destroy();
	}
}