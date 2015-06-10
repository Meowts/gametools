var Inventory = function(game){
	this.game = game;

	//Default player inventory
	// this.items = {
	// 	item1 : 'item1',
	// 	item2 : 'item2',
	// 	item3 : 'item3',
	// 	item4 : 'item4',
	// 	item5 : 'item5',
	// 	item6 : 'item6'
	// };
	this.items = {};

	this.currentlySelected = null;
}

Inventory.prototype = {
	setItems : function(items){
		this.items = items;
	},

	acquire : function(item){
		this.items[item] = Data.Items[item];
		console.log(this.items[item]);
	},

	throwAway : function(item){
		delete this.items[item];
	},

	selectItem : function(item){
		this.currentlySelected = item;
	}
}