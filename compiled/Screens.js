Screen.ActionTest = function(game){
	this.game = game;

	this.backBtn = null;
}

Screen.ActionTest.prototype = {
	create : function(){
		_com.player.init(300, 300);

		_com.actionMenu.drawMenu();

		_com.items.placeItems();

		this.placeBackButton();
	},

	update : function(){
		_com.player.update();
	},

	render : function(){},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x+40, 
			Data.Common.back.y+70, 
			Data.Common.back.sprite,
			GFN.switchScreen, 
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();
		_com.actionMenu.hideMenu();
		_com.items.destroy();
		this.backBtn.destroy();
	}
}
Screen.CameraTest = function(game){
	this.game = game;

	this.bg = null;
	this.land = null;
	this.backBtn = null;
}

Screen.CameraTest.prototype = {
	create : function(){
		this.bg = this.game.add.sprite(0, 0, 'bg');
		this.land = this.game.add.sprite(0, 440, 'land');

		this.game.world.resize(this.bg.width, this.bg.height);

		_com.player.init(200, 600);

		this.placeBackButton();
	},

	update : function(){
		_com.player.update();
	},

	render : function(){},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			GFN.switchScreen,
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();
		
		this.bg.destroy();
		this.land.destroy();
		this.backBtn.destroy();
	}
}
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
Screen.SpriteTest = function(game){
	this.game = game;

	this.instructionText = null;
	this.frameRateText = null;
	this.movementEnabledText = null;

	this.timer = null;

	this.backBtn = null;
	this.backBtnTxt = null;
}

Screen.SpriteTest.prototype = {
	create : function(){
		_com.player.init(this.game.world.width/2, this.game.world.height/2);

		this.instructionText = this.game.add.text(
			Data.Screen[Global.CS].copy.instructions.x,
			Data.Screen[Global.CS].copy.instructions.y,
			Data.Screen[Global.CS].copy.instructions.text,
			Data.Screen[Global.CS].copy.instructions.font 
		);

		this.timer = this.game.time.create(false);

		this.frameRateText = this.game.add.text(40, 120, 'Framerate: ' + _com.player.frameRate, {font: '16px Consolas'});
	
		this.placeBackButton();
	},

	update : function(){
		_com.player.update();
		this.adjustFramerate();
	},

	render : function(){
		this.frameRateText.setText('Framerate: ' + _com.player.frameRate);
	},

	adjustFramerate : function(){

		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)){

			if(!this.timer.running){

				this.changeFramerate();

				this.timer.loop(100, this.changeFramerate, this);
				this.timer.start();
			}
		}
		else{
			if(this.timer.running) this.timer.stop();
		}
	},

	changeFramerate : function(){
		if(this.game.input.keyboard.isDown(Phaser.Keyboard.W)){
			_com.player.frameRate ++;
		}
		else if(this.game.input.keyboard.isDown(Phaser.Keyboard.S)){
			_com.player.frameRate --;
		}
	},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			GFN.switchScreen, 
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();
		
		this.instructionText.destroy(); 
		this.frameRateText.destroy();
		this.timer.destroy();
		this.backBtn.destroy();
	}
}
/*Screen.MainMenu = function(game){
	this.game = game;

	this.backBtn = null;
}

Screen.MainMenu.prototype = {
	create : function(){
		this.placeBackButton();
	},

	update : function(){},

	render : function(){},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			Screen.switchScreen, 
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		this.backBtn.destroy();
	}
}*/
Screen.WalkingBounds = function(game){
	this.game = game;

	this.bg = null;
	this.floor = null;

	this.backBtn = null;
	this.test = null;
}

Screen.WalkingBounds.prototype = {
	create : function(){
		this.bg = this.game.add.sprite(0, 0, 'boundsBG');
		this.game.physics.arcade.enable(this.bg);
		this.bg.body.immovable = true;	
			
		this.floor = this.game.add.sprite(0, 580, 'boundsFloor');

		this.game.world.resize(this.bg.width, 780);

		_com.player.init(115, 660);

		this.placeBackButton();
	},

	update : function(){
		_com.player.update();

		this.game.physics.arcade.collide(_com.player.sprite, this.bg,
			function(){}, null, this);
	},

	render : function(){},

	placeBackButton : function(){
		this.backBtn = this.game.add.button(
			Data.Common.back.x, 
			Data.Common.back.y, 
			Data.Common.back.sprite,
			GFN.switchScreen, 
			this, 
			0, 0, 1
		);
		this.backBtn.screen = 'MainMenu';
		this.backBtn.anchor.setTo(0.5, 0.5);
		this.backBtn.scale.setTo(0.5, 0.5);
		this.backBtn.fixedToCamera = true;

		var backBtnTxt = this.game.add.text(0, 0, 'Main Menu', {font: '22px Consolas'});
		backBtnTxt.anchor.setTo(0.5, 0.5);
		this.backBtn.addChild(backBtnTxt);
	},

	destroy : function(){
		_com.player.destroy();

		this.bg.destroy();
		this.floor.destroy();
		this.backBtn.destroy();
	}
}