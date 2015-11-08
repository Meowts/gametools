/**
*
*	@class Inventory
*
*/

Class.Inventory = function(game){
	this.game = game;

	this.items = {};

	this.currentlySelected = null;
}

Class.Inventory.prototype = {
	setItems : function(items){
		this.items = items;
	},

	acquire : function(item){
		//Place in inventory
		this.items[item.id] = Data.Items[item.id];

		this.updateMenu();

		//Display feedback
		_com.dialog.show("Acquired: " + item.id);

		//Remove sprite from screen and from screen data
		_com.items.itemGrp.removeChild(item);
		delete Data.Screen[Global.CS].items[item.id];
	},

	throwAway : function(item){
		delete this.items[item.id];
	},

	selectItem : function(item){
		this.currentlySelected = item;
		_com.actionMenu.placeItem(item);
	},

	updateMenu : function(){
		//Update menu if it's open and showing inventory
		if(_com.menu.isOpen && _com.menu.selection === 'inventory'){
			_com.menu.drawMenu();
		}		
	},

	removeCurrentlySelected : function(){
		this.throwAway(this.currentlySelected);
		this.currentlySelected = null;
		this.updateMenu();
	}
}