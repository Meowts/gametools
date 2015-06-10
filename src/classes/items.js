var Items = function(game){
	this.game = game;

	this.itemGrp = null;
}

Items.prototype = {

	placeItems : function(){
		this.itemGrp = this.game.add.group();

		//Set item sprites on screen
		for(var item in Data.Screen[Global.CS].items){
			var itemX = this.game.add.sprite(
				Data.Screen[Global.CS].items[item].x,
				Data.Screen[Global.CS].items[item].y,
				Data.Screen[Global.CS].items[item].ref.sprite
			);

			itemX.id = item;
			itemX.inputEnabled = true;
			itemX.events.onInputDown.add(this.itemAction, this);

			this.itemGrp.add(itemX);
		}


	},

	itemAction : function(item){
		_com.action[_com.action.currentAction](item);
	}
}