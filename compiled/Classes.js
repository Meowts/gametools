/**
*
*	@class Action
*
*/

Class.Action = function(game){
	this.game = game;

	this.currentAction = 'use';
}

Class.Action.prototype = {

	use : function(entity){
		if(entity.type === 'item'){
			//If it's collectable, place it in your inventory
			if(Data.Items[entity.id].collectable){
				_com.inventory.acquire(entity);
			}else{
				this.see(entity);
			}
		}
	},

	talk : function(entity){
		if(entity.type === 'item'){
			var x = entity.x;
			var y = entity.y - 100;

			if(Data.Items[entity.id].dialog !== null && Data.Items[entity.id].dialog !== undefined){
				_com.dialog.show(Data.Items[entity.id].dialog, x, y);
			}else{
				_com.dialog.show(entity.id + " has nothing to say.", x, y);
			}
		}
	},

	see : function(entity){
		if(entity.type === 'item'){
			if(Data.Items[entity.id].description !== null && Data.Items[entity.id].description !== undefined){
				_com.dialog.show(Data.Items[entity.id].description);
			}
			else{
				_com.dialog.show("Nothing to see here.");
			}
		}
	},

	spell : function(entity){

	},

	item : function(entity){
		//If there's a currently selected item
		if(_com.inventory.currentlySelected !== null){
			var returnFun = _com.items.checkPairing(entity);

			if(returnFun !== null){
				GFN.exec(returnFun, _com.actionFunctions);
			}else{
				_com.dialog.show("This does nothing.");
			}
		}
	},

	toggleUse : function(){
		this.currentAction = 'use';
	},

	toggleTalk : function(){
		this.currentAction = 'talk';
	},

	toggleSee : function(){
		this.currentAction = 'see';
	},

	toggleSpell : function(){
		this.currentAction = 'spell';
	},

	toggleItem : function(){
		this.currentAction = 'item';
	}
}
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
/**
*
*	@class ActionMenu
*
*/

Class.ActionMenu = function(game){
	this.game = game;

	this.baseSprite = 'am-base';
	this.overlaySprite = 'am-overlay';

	this.base = null;
	this.overlay = null;

	this.use = null;
	this.talk = null;
	this.see = null;
	this.spell = null;
	this.item = null;
	this.menu = null;

	this.displayedSpell = null;
	this.displayedItem = null;

	this.offsetX = {
		sm : 170,
		lg : 210
	}

	this.buttons = {
		use : {
			sprite : 'am-use',
			offsetX : 0,
			obj : 'action',
			fn : 'toggleUse'
		},
		talk : {
			sprite : 'am-talk',
			offsetX : 'sm',
			obj : 'action',
			fn : 'toggleTalk'
		},
		see : {
			sprite : 'am-see',
			offsetX : 'sm',
			obj : 'action',
			fn : 'toggleSee'
		},
		spell : {
			sprite : 'am-spell',
			offsetX : 'sm',
			obj : 'action',
			fn : 'toggleSpell'
		},
		item : {
			sprite : 'am-item',
			offsetX : 'lg',
			obj : 'action',
			fn : 'toggleItem'
		},
		menu : {
			sprite : 'am-menu',
			offsetX : 'lg',
			obj : 'player',
			fn : 'toggleMenu'
		},
	}

	this.amGrp = null;
}

Class.ActionMenu.prototype = {

	init : function(){
		this.amGrp = this.game.add.group();

		//Menu BG
		this.base = this.game.add.sprite(0, 0, this.baseSprite);
		this.amGrp.add(this.base);

		//Create buttons
		var x = 0;
		for(var butt in this.buttons){
			this[butt] = this.game.add.button(
				this.amGrp.getChildAt(x).x + this.offsetX[this.buttons[butt].offsetX], 0,
				this.buttons[butt].sprite,
				this.switchAction, this
			);
			
			//objRef and fnRef are used when switching the action
			this[butt].objRef = this.buttons[butt].obj;
			this[butt].fnRef = this.buttons[butt].fn;
			
			//Currently selected butt frame
			if(_com.action.currentAction === butt) this[butt].frame = 1;
			
			//Add to group
			this.amGrp.add(this[butt]);

			x++
		}

		//Disable overlay
		this.overlay = this.game.add.sprite(0, 0, this.overlaySprite);
		this.overlay.kill();
		this.amGrp.add(this.overlay);

		//Keep it all up there
		this.amGrp.setAll('fixedToCamera', true);

		//Hide after initializing
		this.hideMenu();
	},

	drawMenu : function(){
		GFN.showGroup(this.amGrp);
		this.enable();
	},

	hideMenu : function(){
		GFN.hideGroup(this.amGrp);
	},

	disable : function(){
		if(!this.overlay.alive) this.overlay.revive();
	},

	enable : function(){
		if(this.overlay.alive) this.overlay.kill();
	},

	switchAction : function(item){
		//Display selected button
		if(item.fnRef !== 'toggleMenu'){
			this.amGrp.setAll('frame', 0);
			item.frame = 1;
		}

		//Execute the function associated to the button
		var obj = item.objRef;
		var fn = item.fnRef;
		GFN.exec(fn, _com[obj]);
	},

	placeItem : function(item){
		this.removeDisplayedItem();

		//Get the center of the item box
		var x = this.item.width/2;
		var y = this.item.height/2;

		this.displayedItem = this.game.add.sprite(x, y, item.sprite);
		this.displayedItem.anchor.setTo(0.5, 0.5);

		this.item.addChild(this.displayedItem);
	},

	removeDisplayedItem : function(){
		if(this.displayedItem !== null){
			if(this.displayedItem.alive){
				this.displayedItem.kill();
			}
		} 
	}
}
/**
*
*	@class Controller
*
*/

Class.Controller = function(game){
	this.game = game;

	//Keyboard
	this.keyboard = null;

	this.controls = {
		moveUp : Phaser.Keyboard.UP,
		moveDown : Phaser.Keyboard.DOWN,
		moveLeft : Phaser.Keyboard.LEFT,
		moveRight : Phaser.Keyboard.RIGHT,
		
		toggleUse : Phaser.Keyboard.U,
		toggleTalk : Phaser.Keyboard.T,
		toggleSee : Phaser.Keyboard.I,
		toggleSpell : Phaser.Keyboard.C,
		toggleItem : Phaser.Keyboard.F,
		toggleMenu : Phaser.Keyboard.E,

		miscToggle : Phaser.Keyboard.SPACE
	}

	this.keys = {};

	//Mouse
	this.mouse = null;

	this.cursor = null;
}

Class.Controller.prototype = {

	/*
	*
	*	Keyboard
	*
	*/
	init : function(){
		this.keyboard = this.game.input.keyboard;
		this.mouse = this.game.input.mouse;

		//Movement keys
		this.keys.upKey = this.keyboard.addKey(this.controls.moveUp);
		this.keys.downKey = this.keyboard.addKey(this.controls.moveDown);
		this.keys.leftKey = this.keyboard.addKey(this.controls.moveLeft);
		this.keys.rightKey = this.keyboard.addKey(this.controls.moveRight);

		//Toggle keys
		this.useKey = this.keyboard.addKey(this.controls.toggleUse);
		this.talkKey = this.keyboard.addKey(this.controls.toggleTalk);
		this.seeKey = this.keyboard.addKey(this.controls.toggleSee);
		this.spellKey = this.keyboard.addKey(this.controls.toggleSpell);
		this.itemKey = this.keyboard.addKey(this.controls.toggleItem);
		this.menuKey = this.keyboard.addKey(this.controls.toggleMenu);

		this.miscToggle = this.keyboard.addKey(this.controls.miscToggle);
		
		this.setToggleHandlers();
	},

	setToggleHandlers : function(){
		this.useKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.use);}, _com.actionMenu);
		this.talkKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.talk);}, _com.actionMenu);
		this.seeKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.see);}, _com.actionMenu);
		this.spellKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.spell);}, _com.actionMenu);
		this.itemKey.onDown.add(function(){_com.actionMenu.switchAction(_com.actionMenu.item);}, _com.actionMenu);
		this.menuKey.onDown.add(_com.player.toggleMenu, _com.player);
	},

	handleInput : function(){
		//Walking
		if(this.keys.upKey.isDown || this.keys.downKey.isDown || this.keys.leftKey.isDown || this.keys.rightKey.isDown){
			if(this.keys.upKey.isDown) 			_com.player.moveUp();
			if(this.keys.downKey.isDown)		_com.player.moveDown();
			if(this.keys.leftKey.isDown) 		_com.player.moveLeft();
			if(this.keys.rightKey.isDown) 		_com.player.moveRight();
		}
		else{
			_com.player.stopWalking();
		}
	},

	listenForKey : function(){
		this.keyboard.addCallbacks(this, function(){
			this.getKey();
		});
	},

	getKey : function(){
		return this.keyboard.lastKey;
	},

	setKey : function(control){
		this.controls[control] = this.getKey();
		this.keyboard.onDownCallback = null;
	},

	disableKeyboard : function(){
		this.keyboard.enabled = false;
	},

	enableKeyboard : function(){
		this.keyboard.enabled = true;
	},

	/*
	*
	*	Mouse
	*
	*/

	disableMouse : function(){
		this.mouse.enabled = false;
	},

	enableMouse : function(){
		this.mouse.enabled = true;
	},

	/*
	*
	*	Both
	*
	*/

	disable : function(){
		this.disableKeyboard();
		this.disableMouse();
	},

	enable : function(){
		this.enableKeyboard();
		this.enableMouse();
	}
}
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
/**
*
*	@class Inventory
*
*/

Class.Inventory = function(game){
	this.game = game;

	this.items = {};

	this.currentlySelected = null;
}

Class.Inventory.prototype = {
	setItems : function(items){
		this.items = items;
	},

	acquire : function(item){
		//Place in inventory
		this.items[item.id] = Data.Items[item.id];

		this.updateMenu();

		//Display feedback
		_com.dialog.show("Acquired: " + item.id);

		//Remove sprite from screen and from screen data
		_com.items.itemGrp.removeChild(item);
		delete Data.Screen[Global.CS].items[item.id];
	},

	throwAway : function(item){
		delete this.items[item.id];
	},

	selectItem : function(item){
		this.currentlySelected = item;
		_com.actionMenu.placeItem(item);
	},

	updateMenu : function(){
		//Update menu if it's open and showing inventory
		if(_com.menu.isOpen && _com.menu.selection === 'inventory'){
			_com.menu.drawMenu();
		}		
	},

	removeCurrentlySelected : function(){
		this.throwAway(this.currentlySelected);
		this.currentlySelected = null;
		this.updateMenu();
	}
}
/**
*
*	@class Items
*
*/

Class.Items = function(game){
	this.game = game;

	this.itemGrp = null;
}

Class.Items.prototype = {

	init : function(){
		this.itemGrp = this.game.add.group();
	},

	placeItems : function(){
		this.itemGrp.removeChildren();

		//Set item sprites on screen
		for(var item in Data.Screen[Global.CS].items){
			var itemX = this.game.add.sprite(
				Data.Screen[Global.CS].items[item].x,
				Data.Screen[Global.CS].items[item].y,
				Data.Screen[Global.CS].items[item].ref.sprite
			);

			itemX.anchor.setTo(0.5, 0.5);			

			itemX.id = item;
			itemX.type = 'item';
			
			itemX.inputEnabled = true;
			itemX.input.priorityID = 2;

			itemX.events.onInputDown.add(GFN.performAction, this);

			this.itemGrp.add(itemX);
		}
	},

	checkPairing : function(entity){
		var entity_id = entity.id;
		var currentItem_id = _com.inventory.currentlySelected.id;

		if(_com.actionFunctions.__proto__.hasOwnProperty(entity_id + '_' + currentItem_id))
			return entity_id + '_' + currentItem_id;
		else if(_com.actionFunctions.__proto__.hasOwnProperty(currentItem_id + '_' + entity_id))
			return currentItem_id + '_' + entity_id;
		else
			return null;
	},

	consumeSelectedItem : function(){
		_com.actionMenu.removeDisplayedItem();
		_com.inventory.removeCurrentlySelected();
		_com.menu.updateInventory();
	},

	getByProperty : function(prop, value){
		for(var x = 0; x < this.itemGrp.countLiving(); x++){
			if(this.itemGrp.getAt(x)[prop] === value) return this.itemGrp.getAt(x);
		}
	},

	destroy : function(){
		GFN.hideGroup(this.itemGrp);
	}
}
/**
*
*	@class Menu
*
*/

Class.Menu = function(game){
	this.game = game;

	this.selection = 'main';

	this.isOpen = false;

	this.topSprite = 'menu-top';
	this.midSprite = 'menu-mid';
	this.bottomSprite = 'menu-bottom';
	this.menuGrp = null;

	this.menuFont = {font: '16px Consolas'};

	this.MenuList = {};
}

Class.Menu.prototype = {

	exec : function(){
		this.drawMenu();
	},

	composeMenuOptions : function(){
		var inventory = _com.inventory.items;
		var spells = _com.spells.availableSpells;
		var options = {
			option1 : 'option1',
			option2 : 'option2',
			option3 : 'option3',
			option4 : 'option4'
		}
		var main = {
			inventory : 'inventory',
			spells : 'spells',
			options : 'options',
			exit : this.exitMenu
		}

		this.MenuList.main = main;
		this.MenuList.inventory = inventory;
		this.MenuList.spells = spells;
		this.MenuList.options = options;
	},

	updateInventory : function(){
		this.MenuList.inventory = _com.inventory.items;
	},

	updateSpells : function(){
		this.MenuList.spells = _com.spells.availableSpells;
	},

	drawMenu : function(){
		this.refresh();
		this.menuGrp = this.game.add.group();

		//Get number of menu items
		var totalItems = GFN.count(this.MenuList[this.selection]);

		//Button positioning
		var startX = this.game.width - 200;
		var startY = 120;
		var incrementY = 30;

		//If it's not the main menu, add a back button
		if(this.selection !== 'main'){
			this.addButton(startX, startY, 'back', 'top', 'main');
			startY += incrementY;
		}

		var x = 1;
		for(var item in this.MenuList[this.selection]){
			var section = 'mid';
			if(x === 1 && this.selection === 'main') section = 'top';
			else if(x === totalItems) section = 'bottom';

			this.addButton(startX, startY, item, section, this.MenuList[this.selection][item])

			startY += incrementY;
			x ++;
		}

		//So that it always apppears on screen
		this.menuGrp.fixedToCamera = true;

		this.isOpen = true;
	},

	addButton : function(x, y, title, section, selection){
		var buttonSprite;
		//Menu seperated into three sprites - top, mid, bottom - take the right sprite
		//for the right item placement
		switch(section){
			case 'top' : 
				buttonSprite = this.topSprite;
				break;
			case 'mid' : 
				buttonSprite = this.midSprite;
				break;
			case 'bottom' : 
				buttonSprite = this.bottomSprite;
				break;
			default :
				break;
		}

		var button = this.game.add.button(x, y, buttonSprite, 
			this.switchLayer,
			this, 1, 0, 1, 0);
		button.anchor.setTo(0.5, 0.5);

		button.selection = selection;

		var buttonText = this.game.add.text(0, 2, title, this.menuFont);
		buttonText.anchor.setTo(0.5, 0.5);

		button.addChild(buttonText);
		this.menuGrp.add(button);
	},

	switchLayer : function(cont){
		//If it's an item or a spell
		if(cont.selection.type){
			if(cont.selection.type === 'item'){
				_com.inventory.selectItem(cont.selection);
				_com.actionMenu.switchAction(_com.actionMenu.item);
				this.destroy();
			}
		}
		//If the button performs function
		else if(GFN.isFunction(cont.selection)){
			if(cont.selection === this.exitMenu){
				cont.selection(this);
			}else{
				GFN.exec(cont.selection, this);
			}
		}
		//Otherwise it's entering another menu layer
		else{
			this.selection = cont.selection;
			this.drawMenu();
		}
	},

	//This one is needed for the exit button to work
	exitMenu : function(context){
		if(context.menuGrp !== null){
			context.menuGrp.destroy();
			context.menuGrp = null;
		}
		this.isOpen = false;
		this.selection = 'main';
	},

	refresh : function(){
		if(this.menuGrp !== null){
			this.menuGrp.destroy();
			this.menuGrp = null;
		}
		this.isOpen = false;
	},

	destroy : function(){
		if(this.menuGrp !== null){
			this.menuGrp.destroy();
			this.menuGrp = null;
		}
		this.isOpen = false;
		this.selection = 'main';
	}
}
/**
*
*	@class Player
*
*/

Class.Player = function(game){
	this.game = game;

	this.sprite = null;

	this.name_upper = "Player";
	this.name_lower = "player";

	this.inputEnabled = true;

	this.walkingAnim = 'walkingAnimation';
	this.frameRate = 10;
	this.walkSpeed = 5;
}

Class.Player.prototype = {
	init : function(x, y){
		//Place sprite
		this.sprite = this.game.add.sprite(x, y, Data.Player.spriteKey);
		this.sprite.anchor.setTo(0.5, 0.5);

		//Enable physics body, set bounding box
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.setSize(this.sprite.width-30, 10, 0, this.sprite.height-140);

		//Give it some identifiers
		this.sprite.type = 'player';
		this.sprite.id = 'player';

		//Allow stuff to happen on the player (mouse input)
		this.sprite.inputEnabled = true;
		this.sprite.events.onInputDown.add(GFN.performAction, this);

		//Add animations
		this.sprite.animations.add(this.walkingAnim);

		//Set camera follow
		this.game.camera.follow(this.sprite);
	},

	update : function(){
		if(this.inputEnabled) _com.controller.handleInput();
	},

	/*
	*
	*	Movement
	*
	*/

	moveUp : function(){
		this.sprite.body.y -= this.walkSpeed;
		this.startWalking();
	},

	moveDown : function(){
		this.sprite.body.y += this.walkSpeed;
		this.startWalking();
	},

	moveLeft : function(){
		if(this.sprite.scale.x > 0) this.sprite.scale.x = -1;
		this.sprite.body.x -= this.walkSpeed;
		this.startWalking();
	},

	moveRight : function(){
		if(this.sprite.scale.x < 0) this.sprite.scale.x = 1;
		this.sprite.body.x += this.walkSpeed;	
		this.startWalking();
	},

	startWalking : function(){
		if(!this.sprite.animations.currentAnim.isPlaying){
			this.sprite.animations.play(this.walkingAnim, this.frameRate, true);
		}
	},

	stopWalking : function(){
		if(this.sprite.animations.currentAnim.isPlaying) this.sprite.animations.stop();
		if(this.sprite.frame != 0) this.sprite.frame = 0;
	},

	/*
	*
	*	Toggle
	*
	*/

	toggleMenu : function(){
		if(_com.menu.menuGrp === null){
			_com.menu.drawMenu();
		}
		else _com.menu.destroy();
	},

	/*
	*
	*	Deeestroooooybasdgasdgsld
	*
	*/

	destroy : function(){
		this.sprite.destroy();
	}
}
/**
*
*	@class Spell
*
*/

Class.Spell = function(game){
	this.game = game;

	this.currentSpell = null;

	//Default player spells
	this.availableSpells = {
		spell1 : 'spell1',
		spell2 : 'spell2',
		spell3 : 'spell3',
		spell4 : 'spell4',
		spell5 : 'spell5'
	};
}

Class.Spell.prototype = {
	setSpells : function(spells){
		this.availableSpells = spells;
	},

	acquire : function(spell){
		this.availableSpells[spell] = spell;
	},

	select : function(spell){
		this.currentSpell = spell;
	},

	cast : function(player, spell){

	}
};