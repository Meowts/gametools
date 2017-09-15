Screen.MainMenu = function(game){
	this.game = game;

	this.btnFont = {font : '20px Consolas'};
	this.buttonGrp = null;
}

Screen.MainMenu.prototype = {
	create : function(){
		this.buttonGrp = this.game.add.group();

		var y = 100;

		for(var _screen in Screen){
			if(_screen != 'MainMenu'){
				var button = this.game.add.button(this.game.world.centerX, y, 'button', 
					GFN.switchScreen, 
					this, 0, 0, 1, 0);

				button.anchor.setTo(0.5, 0.5);
				button.screen = _screen;

				var buttonText = this.game.add.text(0, 0, _screen, this.btnFont);
				buttonText.anchor.setTo(0.5, 0.5);
				
				button.addChild(buttonText);
				this.buttonGrp.add(button);

				y += 80;
			}
		}
	},

	update : function(){},

	render : function(){},

	destroy : function(){
		this.buttonGrp.destroy();
	}
}