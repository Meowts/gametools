var ActionFunctions = function(game){
	this.game = game;
}

ActionFunctions.prototype = {

	test1_test2 : function(){
		_com.dialog.show("boom.");
	},

	test2_test3 : function(){
		_com.dialog.show("test object #3 starts to smell funny.");
	},

	player_test1 : function(){
		_com.player.frameRate = 60;
		_com.dialog.show("Oh snap, turns out test object #1 is crack.\nPlayer starts to get a bit jittery...");
		_com.items.consumeSelectedItem();
	},

	player_test2 : function(){
		_com.dialog.show("Player sticks test object #2 up his/her butt.");
		_com.items.consumeSelectedItem();
	}
}