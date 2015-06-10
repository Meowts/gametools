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

		//Side menu
		this.game.load.spritesheet('menu-top', '/assets/menu-top.png', 150, 30, 2);
		this.game.load.spritesheet('menu-mid', '/assets/menu-mid.png', 150, 30, 2);
		this.game.load.spritesheet('menu-bottom', '/assets/menu-bottom.png', 150, 30, 2);

		//Action menu
		this.game.load.image('am-base', '/assets/amBase.png');
		this.game.load.spritesheet('am-use', '/assets/amUse.png', 170, 100, 2);
		this.game.load.spritesheet('am-talk', '/assets/amTalk.png', 170, 100, 2);
		this.game.load.spritesheet('am-see', '/assets/amSee.png', 170, 100, 2);
		this.game.load.spritesheet('am-spell', '/assets/amSpell.png', 210, 100, 2);
		this.game.load.spritesheet('am-item', '/assets/amItem.png', 210, 100, 2);
		this.game.load.spritesheet('am-menu', '/assets/amMenu.png', 94, 100, 2);

		//Action icons
		this.game.load.image('hamFist', '/assets/hamFist.png');
		this.game.load.image('bubs', '/assets/bubs.png');
		this.game.load.image('peeper', '/assets/peeper.png');

		//Test sprites
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