var Dialog = function(game){
	this.game = game;

	this.speechArea = null;
	this.text = null;

	this.width = null;
	this.charWidth = 5;
	this.charsPerLine = 50;
	this.lineHeight = 30;
	this.numLines = null;
	this.yOffset = 3;
	this.showDuration = null;

	this.timer = null;
	this.style = {font: '16px Consolas', align: 'center'};
}

Dialog.prototype = {

	drawSpeechArea : function(dialog, xDef, yDef){
		this.clearSpeech();

		var length = dialog.length;
		var arr = dialog.split('\n');
		this.numLines = arr.length;

		//Get a good showing duration based on the length
		this.showDuration = length * 80;

		//Get the line with the longest length to determine width
		if(this.numLines > 1){
			var line = '';
			for(var x = 0; x < arr.length; x++){
				if(arr[x].length > line.length) line = arr[x];
			}
			length = line.length;
		}

		//Get width of dialog box based on the length of the text
		this.width = this.charWidth * (length) + 20;

		//Default starting position
		var startX = this.game.world.centerX;
		var startY = 130;
		
		//If x and y starting points are passed in
		if((xDef !== null && xDef !== undefined) && (yDef !== null && yDef !== undefined)){
			startX = xDef;
			startY = yDef;
		}

		//Box coordinates
		var start = [0, 0];
		var topRight = [this.width, 0];
		var bottomRight = [this.width, this.lineHeight * this.numLines];
		var bottomLeft = [-this.width, this.lineHeight * this.numLines];
		var topLeft = [-this.width, 0];

		//Box graphics obj/colours
		this.speechArea = this.game.add.graphics(startX, startY);
		this.speechArea.beginFill(0x0094FF);
		this.speechArea.lineStyle(3, 0x7F0000);

		//Draw the damn box
		this.speechArea.lineTo(topRight[0], topRight[1]);
		this.speechArea.lineTo(bottomRight[0], bottomRight[1]);
		this.speechArea.lineTo(bottomLeft[0], bottomLeft[1]);
		this.speechArea.lineTo(topLeft[0], topLeft[1]);
		this.speechArea.lineTo(start[0], start[1]);

		this.speechArea.endFill();
	},

	show : function(dialog, x, y){
		this.drawSpeechArea(dialog, x, y);

		this.text = this.game.add.text(0, ((this.lineHeight * this.numLines) / 2) + this.yOffset, dialog, this.style);
		this.text.anchor.setTo(0.5, 0.5);

		this.speechArea.addChild(this.text);

		this.fadeOut = this.game.add.tween(this.speechArea);
		this.fadeOut.to({alpha : 0}, 1200, Phaser.Easing.linear);

		if(this.timer !== null){
			this.timer.stop();
			this.timer.destroy();
		}

		this.timer = this.game.time.create();
		this.timer.add(this.showDuration, this.fade, this);
		this.timer.start();
	},

	fade : function(){
		this.fadeOut.start();
	},

	clearSpeech : function(){
		if(this.speechArea !== null) this.speechArea.destroy();
	}
}