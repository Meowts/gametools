var Action = function(game){
	this.game = game;

	this.currentAction = 'use';
}

Action.prototype = {

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