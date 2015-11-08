/**
*
*	@class Menu
*
*/

Class.Menu = function(game){
	this.game = game;

	this.selection = 'main';

	this.isOpen = false;

	this.topSprite = 'menu-top';
	this.midSprite = 'menu-mid';
	this.bottomSprite = 'menu-bottom';
	this.menuGrp = null;

	this.menuFont = {font: '16px Consolas'};

	this.MenuList = {};
}

Class.Menu.prototype = {

	exec : function(){
		this.drawMenu();
	},

	composeMenuOptions : function(){
		var inventory = _com.inventory.items;
		var spells = _com.spells.availableSpells;
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

	updateInventory : function(){
		this.MenuList.inventory = _com.inventory.items;
	},

	updateSpells : function(){
		this.MenuList.spells = _com.spells.availableSpells;
	},

	drawMenu : function(){
		this.refresh();
		this.menuGrp = this.game.add.group();

		//Get number of menu items
		var totalItems = GFN.count(this.MenuList[this.selection]);

		//Button positioning
		var startX = this.game.width - 200;
		var startY = 120;
		var incrementY = 30;

		//If it's not the main menu, add a back button
		if(this.selection !== 'main'){
			this.addButton(startX, startY, 'back', 'top', 'main');
			startY += incrementY;
		}

		var x = 1;
		for(var item in this.MenuList[this.selection]){
			var section = 'mid';
			if(x === 1 && this.selection === 'main') section = 'top';
			else if(x === totalItems) section = 'bottom';

			this.addButton(startX, startY, item, section, this.MenuList[this.selection][item])

			startY += incrementY;
			x ++;
		}

		//So that it always apppears on screen
		this.menuGrp.fixedToCamera = true;

		this.isOpen = true;
	},

	addButton : function(x, y, title, section, selection){
		var buttonSprite;
		//Menu seperated into three sprites - top, mid, bottom - take the right sprite
		//for the right item placement
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

		button.selection = selection;

		var buttonText = this.game.add.text(0, 2, title, this.menuFont);
		buttonText.anchor.setTo(0.5, 0.5);

		button.addChild(buttonText);
		this.menuGrp.add(button);
	},

	switchLayer : function(cont){
		//If it's an item or a spell
		if(cont.selection.type){
			if(cont.selection.type === 'item'){
				_com.inventory.selectItem(cont.selection);
				_com.actionMenu.switchAction(_com.actionMenu.item);
				this.destroy();
			}
		}
		//If the button performs function
		else if(GFN.isFunction(cont.selection)){
			if(cont.selection === this.exitMenu){
				cont.selection(this);
			}else{
				GFN.exec(cont.selection, this);
			}
		}
		//Otherwise it's entering another menu layer
		else{
			this.selection = cont.selection;
			this.drawMenu();
		}
	},

	//This one is needed for the exit button to work
	exitMenu : function(context){
		if(context.menuGrp !== null){
			context.menuGrp.destroy();
			context.menuGrp = null;
		}
		this.isOpen = false;
		this.selection = 'main';
	},

	refresh : function(){
		if(this.menuGrp !== null){
			this.menuGrp.destroy();
			this.menuGrp = null;
		}
		this.isOpen = false;
	},

	destroy : function(){
		if(this.menuGrp !== null){
			this.menuGrp.destroy();
			this.menuGrp = null;
		}
		this.isOpen = false;
		this.selection = 'main';
	}
}