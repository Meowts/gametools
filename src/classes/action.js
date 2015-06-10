var Action = function(game){
	this.game = game;

	this.currentAction = 'use';
}

Action.prototype = {

	use : function(item){
		//If it's collectable, place it in your inventory
		if(Data.Items[item.id].collectable){
			_com.inventory.acquire(item.id);
		}
	},

	talk : function(){

	},

	see : function(){

	},

	spell : function(){

	},

	item : function(){

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