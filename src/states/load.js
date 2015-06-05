Tools.Load = function(game){this.game = game;}

Tools.Load.prototype = {
	preload : function(){
		/*
		*
		*	On the below line is where you define four things (in this order):
		*
		*	1. The file path/name,
		* 	2. The width of each frame,
		*	3. The height of each frame,
		*	3. How many frames there are.
		*
		*	(Don't change 'walkingSprites')
		*
		*	Spritesheets, for now, should have each frame stacked equally in a single
		*	file, all in one row, with no padding between frames
		*	(ie: spritesheet with 3 frames, each frame is 150x300, if they're all 
		*	lined up horizontally the total width of the image should be 450px).
		*
		*	The way it's set up currently, the "Standing" frame needs to be
		*	the first frame on the spreadsheet.
		*
		*	These restrictions won't be applicable to the final version, but for
		*	preliminary testing purposes it's far easier this way.
		*
		*	Note: .png and .jpg work.
		*
		*/

		this.game.load.spritesheet('walkingSprites', '/assets/filename.png', 100, 100, 5);

		this.game.load.spritesheet('button', '/assets/button.png', 150, 75, 2);

		this.game.load.image('bg', '/assets/bg.png');
		this.game.load.image('land', '/assets/land.png');

		this.game.load.image('boundsBG', '/assets/boundsBG.png');
		this.game.load.image('boundsFloor', '/assets/boundsFloor.png');

		this.game.load.image('test', '/assets/test.png');
	},

	create : function(){
		this.game.state.start('Main');
	}
}