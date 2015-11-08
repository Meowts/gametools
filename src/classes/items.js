/**
*
*	@class Items
*
*/

Class.Items = function(game){
	this.game = game;

	this.itemGrp = null;
}

Class.Items.prototype = {

	init : function(){
		this.itemGrp = this.game.add.group();
	},

	placeItems : function(){
		this.itemGrp.removeChildren();

		//Set item sprites on screen
		for(var item in Data.Screen[Global.CS].items){
			var itemX = this.game.add.sprite(
				Data.Screen[Global.CS].items[item].x,
				Data.Screen[Global.CS].items[item].y,
				Data.Screen[Global.CS].items[item].ref.sprite
			);

			itemX.anchor.setTo(0.5, 0.5);			

			itemX.id = item;
			itemX.type = 'item';
			
			itemX.inputEnabled = true;
			itemX.input.priorityID = 2;

			itemX.events.onInputDown.add(GFN.performAction, this);

			this.itemGrp.add(itemX);
		}
	},

	checkPairing : function(entity){
		var entity_id = entity.id;
		var currentItem_id = _com.inventory.currentlySelected.id;

		if(_com.actionFunctions.__proto__.hasOwnProperty(entity_id + '_' + currentItem_id))
			return entity_id + '_' + currentItem_id;
		else if(_com.actionFunctions.__proto__.hasOwnProperty(currentItem_id + '_' + entity_id))
			return currentItem_id + '_' + entity_id;
		else
			return null;
	},

	consumeSelectedItem : function(){
		_com.actionMenu.removeDisplayedItem();
		_com.inventory.removeCurrentlySelected();
		_com.menu.updateInventory();
	},

	getByProperty : function(prop, value){
		for(var x = 0; x < this.itemGrp.countLiving(); x++){
			if(this.itemGrp.getAt(x)[prop] === value) return this.itemGrp.getAt(x);
		}
	},

	destroy : function(){
		GFN.hideGroup(this.itemGrp);
	}
}