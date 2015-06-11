var Inventory = function(game){
	this.game = game;

	this.items = {};

	this.currentlySelected = null;
}

Inventory.prototype = {
	setItems : function(items){
		this.items = items;
	},

	acquire : function(item){
		//Place in inventory
		this.items[item.id] = Data.Items[item.id];

		//Display feedback
		_com.dialog.show("Acquired: " + item.id);

		//Remove sprite from screen and from screen data
		_com.items.itemGrp.removeChild(item);
		delete Data.Screen[Global.CS].items[item.id];
	},

	throwAway : function(item){
		delete this.items[item];
	},

	selectItem : function(item){
		this.currentlySelected = item;
		_com.actionMenu.placeItem(item);
	}
}