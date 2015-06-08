

/**
*
*	@class Menu
*
*/

var Menu = function(game){
	this.game = game;

	this.layer = 'main';
	this.gfx = null;
	this.menuGrp = null;

	this.menuFont = {font: '16px Consolas'};
}

Menu.prototype = {
	create : function(){
		this.textGrp = this.game.add.group();
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
			var buttonSprite = 'menu-mid';
			if(x === 1) buttonSprite = 'menu-top';
			else if(x === totalItems) buttonSprite = 'menu-bottom';

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
	},

	inventory : {
		item1 : 'item1',
		item2 : 'item2',
		item3 : 'item3',
		item4 : 'item4',
		item5 : 'item5',
		item6 : 'item6',
		back : 'main'
	},

	spells : {
		spell1 : 'spell1',
		spell2 : 'spell2',
		spell3 : 'spell3',
		spell4 : 'spell4',
		spell5 : 'spell5',
		back : 'main'
	},

	options : {
		option1 : 'option1',
		option2 : 'option2',
		option3 : 'option3',
		option4 : 'option4',
		back : 'main'
	}
}