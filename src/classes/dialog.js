/**
*
*	@class Dialog
*
*/

Class.Dialog = function(game){
	this.game = game;

	this.speechArea = null;
	this.fillColour = 0x0094FF;
	this.borderColour = 0x7F0000;
	this.borderWidth = 3;

	this.text = null;

	this.dialogQueue = [];
	this.queueLength = 0;
	this.queueIndex = 0;

	this.width = null;
	this.charWidth = 5;
	this.widthPadding = 20;
	this.charsPerLine = 50;

	this.lineHeight = 30;
	this.numLines = null;
	this.yOffset = 3;
	this.defaultStartY = 130;
	this.yAboveChar = 100;

	this.showDuration = null;
	this.minimumDuration = 2000;
	this.durationMultiplier = 80;
	this.fadeDuration = 100;

	this.timer = null;
	this.style = {font: '16px Consolas', align: 'center'};
}

Class.Dialog.prototype = {

	drawSpeechArea : function(dialog, xDef, yDef){
		this.clearSpeech();

		var length = dialog.length;
		var arr = dialog.split('\n');
		this.numLines = arr.length;

		//Get a good showing duration based on the length
		this.showDuration = length * this.durationMultiplier;

		if(this.showDuration < this.minimumDuration) this.showDuration = this.minimumDuration;

		//Get the line with the longest length to determine width
		if(this.numLines > 1){
			var line = '';
			for(var x = 0; x < arr.length; x++){
				if(arr[x].length > line.length) line = arr[x];
			}
			length = line.length;
		}

		//Get width of dialog box based on the length of the text
		this.width = this.charWidth * (length) + this.widthPadding;

		//Default starting position
		var startX = this.game.world.centerX;
		var startY = this.defaultStartY;
		
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
		this.speechArea.beginFill(this.fillColour);
		this.speechArea.lineStyle(this.borderWidth, this.borderColour);

		//Draw the damn box
		this.speechArea.lineTo(topRight[0], topRight[1]);
		this.speechArea.lineTo(bottomRight[0], bottomRight[1]);
		this.speechArea.lineTo(bottomLeft[0], bottomLeft[1]);
		this.speechArea.lineTo(topLeft[0], topLeft[1]);
		this.speechArea.lineTo(start[0], start[1]);

		this.speechArea.endFill();
	},

	show : function(dialog, x, y){
		
		//If there are multiple dialog lines it'll come as an object
		if(typeof dialog !== "string"){
			//Place overlay over action menu and disable input
			_com.actionMenu.disable();
			_com.controller.disable();
			
			this.queueDialog(dialog);
			return;
		}

		this.drawSpeechArea(dialog, x, y);

		this.text = this.game.add.text(0, ((this.lineHeight * this.numLines) / 2) + this.yOffset, dialog, this.style);
		this.text.anchor.setTo(0.5, 0.5);

		this.speechArea.addChild(this.text);

		//If there is a dialog queue, step through it, otherwise just go with the fade
		if(this.dialogQueue !== []){
			this.queueLength--;
			this.queueIndex++;

			if(this.queueLength > 0){
				this.setupNext();
			}else{
				//Blast the dialog queue
				this.dialogQueue = [];
				this.startFade();
			}
		}
		else{
			this.startFade();
		}
	},

	queueDialog : function(dialog){
		for(var line in dialog){
			this.dialogQueue.push(dialog[line]);
		}
		this.queueLength = this.dialogQueue.length;
		this.queueIndex = 0;

		this.converse();
	},

	converse : function(){
		//Find the appropriete entity to display the dialog over
		if(this.dialogQueue[this.queueIndex].type === 'player'){
			var x = _com.player.sprite.x;
			var y = _com.player.sprite.y - this.yAboveChar;
			this.show(this.dialogQueue[this.queueIndex].text, x, y)
		}else if(this.dialogQueue[this.queueIndex].type === 'item'){
			var x = _com.items.getByProperty('id', this.dialogQueue[this.queueIndex].character).x;
			var y = _com.items.getByProperty('id', this.dialogQueue[this.queueIndex].character).y - this.yAboveChar;
			this.show(this.dialogQueue[this.queueIndex].text, x, y)
		}
	},

	//Used when there is a queue of dialog
	setupNext : function(){
		if(this.timer !== null){
			this.timer.stop();
			this.timer.destroy();
		}

		this.timer = this.game.time.create();
		this.timer.add(this.showDuration, this.converse, this);
		this.timer.start();	
	},

	//Used for the last in the dialog queue
	startFade : function(){
		this.fadeOut = this.game.add.tween(this.speechArea);
		this.fadeOut.to({alpha : 0}, this.fadeDuration, Phaser.Easing.linear);

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
		_com.actionMenu.enable();
		_com.controller.enable();
	},

	clearSpeech : function(){
		if(this.speechArea !== null) this.speechArea.kill();
	}
}