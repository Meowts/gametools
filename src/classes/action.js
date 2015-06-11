var Action = function(game){
	this.game = game;

	this.currentAction = 'use';
}

Action.prototype = {

	use : function(entity){
		if(entity.type === 'item'){
			//If it's collectable, place it in your inventory
			if(Data.Items[entity.id].collectable){
				_com.inventory.acquire(entity);
			}else{
				this.see(entity);
			}
		}
	},

	talk : function(entity){
		if(entity.type === 'item'){
			if(Data.Items[entity.id].dialog !== null && Data.Items[entity.id].dialog !== undefined){
				var x = entity.x;
				var y = entity.y - 100;
				_com.dialog.show(Data.Items[entity.id].dialog, x, y);
			}
		}
	},

	see : function(entity){
		if(entity.type === 'item'){
			if(Data.Items[entity.id].description !== null && Data.Items[entity.id].description !== undefined){
				_com.dialog.show(Data.Items[entity.id].description);
			}
		}
	},

	spell : function(entity){

	},

	item : function(entity){
		var returnFun = _com.items.checkPairing(entity);

		if(returnFun !== null){
			GFN.exec(returnFun, _com.actionFunctions);
		}else{
			_com.dialog.show("This does nothing.");
		}
	},

	toggleUse : function(){
		this.currentAction = 'use';
	},

	toggleTalk : function(){
		this.currentAction = 'talk';
	},

	toggleSee : function(){
		this.currentAction = 'see';
	},

	toggleSpell : function(){
		this.currentAction = 'spell';
	},

	toggleItem : function(){
		this.currentAction = 'item';
	}
}