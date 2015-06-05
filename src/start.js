//Initialize Phaser game object
var game = new Phaser.Game(1024, 780, Phaser.AUTO, 'main');

var Global = {
	CS : 'MainMenu',
	switchScreen : false,
	Screens : {
		MainMenu : Screen.MainMenu,
		SpriteTest : Screen.SpriteTest,
		CameraTest : Screen.CameraTest,
		WalkingBounds : Screen.WalkingBounds
	}
};

//Add available states to game
game.state.add('Load', Tools.Load);
game.state.add('Main', Tools.Main);

//Share the loooooad
game.state.start('Load');