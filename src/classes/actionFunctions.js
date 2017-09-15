/**
*
*	@class ActionFunctions
*
*/

/*

	Each action function is named as:

	entity1_entity2

	The body of the function defines what happens when the two entities interact.

	TODO: Probably will end up seperating this class into:
		"ItemFunctions" (soley item->item, item->player, item->npc), 
		"SpellFunctions" (soley spell->item, spell->player, spell->npc),
		"LevelFunctions (mechanics of advancing the game)"

*/

Class.ActionFunctions = function(game){
	this.game = game;
}

Class.ActionFunctions.prototype = {

	test1_test2 : function(){
		_com.dialog.show("boom.");
	},

	test2_test3 : function(){
		_com.dialog.show("test object #3 starts to smell funny.");
	},

	player_test1 : function(){
		_com.player.frameRate = 60;
		_com.dialog.show("Oh snap, turns out test object #1 is crack.\n"+_com.player.name_upper+" starts to get a bit jittery...");
		_com.items.consumeSelectedItem();
	},

	player_test2 : function(){
		_com.dialog.show(_com.player.name_upper+" sticks test object #2 up his/her butt.");
		_com.items.consumeSelectedItem();
	}
}