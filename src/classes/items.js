var Items = function(game){
	this.game = game;

	this.itemGrp = null;
}

Items.prototype = {

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

			itemX.id = item;
			itemX.type = 'item';
			itemX.inputEnabled = true;
			itemX.events.onInputDown.add(GFN.performAction, this);

			this.itemGrp.add(itemX);
		}
	},

	checkPairing : function(entity){
		if(Data.Items.On.hasOwnProperty(entity.id+'_'+_com.inventory.currentlySelected.id)){
			return Data.Items.On[entity.id + '_' + _com.inventory.currentlySelected.id].result;
		}else if(Data.Items.On.hasOwnProperty(_com.inventory.currentlySelected.id+'_'+entity.id)){
			return Data.Items.On[_com.inventory.currentlySelected.id + '_' + entity.id].result;
		}else{
			return null;
		}
	},

	destroy : function(){
		GFN.hideGroup(this.itemGrp);
	}
}