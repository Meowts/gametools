var Inventory = function(game, items){
	this.game = game;

	this.items = items;

	this.currentlySelected = null;
}

Inventory.prototype = {
	setItems : function(items){
		this.items = items;
	},

	selectItem : function(item){
		this.currentlySelected = item;
	}
}