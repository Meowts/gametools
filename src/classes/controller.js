/**
*
*	@class Controller
*
*/

var Controller = function(game){
	this.game = game;

	this.cursors = null;
	this.toggleKey = null;
}

Controller.prototype = {
	init : function(){
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.toggleKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}
}