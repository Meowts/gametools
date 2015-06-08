

/**
*
*	@class Menu
*
*/

var Menu = function(game, player){
	this.game = game;
	this._player = player;

	this.layer = 'main';

	this.topSprite = 'menu-top';
	this.midSprite = 'menu-mid';
	this.bottomSprite = 'menu-bottom';
	this.menuGrp = null;

	this.menuFont = {font: '16px Consolas'};
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

		Data.Menu.inventory = inventory;
		Data.Menu.spells = spells;
		Data.Menu.options = options;
	},

	drawMenu : function(){
		this.destroy();
		this.menuGrp = this.game.add.group();

		//Get number of menu items
		var totalItems = GFN.count(Data.Menu[this.layer]);

		var startX = this.game.width - 200;
		var startY = 50;
		
		var x = 1;
		for(var item in Data.Menu[this.layer]){
			//Menu seperated into three sprites - top, mid, bottom - take the right sprite
			//for the right item placement
			var buttonSprite = this.midSprite;
			if(x === 1) buttonSprite = this.topSprite;
			else if(x === totalItems) buttonSprite = this.bottomSprite;

			var button = this.game.add.button(startX, startY, buttonSprite, 
				this.switchLayer,
				this, 1, 0, 1, 0);

			button.anchor.setTo(0.5, 0.5);
			button.layer = Data.Menu[this.layer][item];

			var buttonText = this.game.add.text(0, 2, item, this.menuFont);
			buttonText.anchor.setTo(0.5, 0.5);
			
			button.addChild(buttonText);
			this.menuGrp.add(button);

			startY += button.height;
			x ++;
		}
	},

	switchLayer : function(item){
		this.layer = item.layer;
		this.drawMenu();
	},

	destroy : function(){
		if(this.menuGrp !== null) this.menuGrp.destroy();
	}
}

Data.Menu = {
	main : {
		inventory : 'inventory',
		spells : 'spells',
		options : 'options'
	}
}