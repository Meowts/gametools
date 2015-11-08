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