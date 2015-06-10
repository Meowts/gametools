var ActionMenu = function(game){
	this.game = game;

	this.sp_base = 'am-base';
	this.sp_use = 'am-use';
	this.sp_talk = 'am-talk';
	this.sp_see = 'am-see';
	this.sp_spell = 'am-spell';
	this.sp_item = 'am-item';
	this.sp_menu = 'am-menu';

	this.btn_base = null;
	this.btn_use = null;
	this.btn_talk = null;
	this.btn_see = null;
	this.amGrp = null;
}

ActionMenu.prototype = {

	init : function(){
		this.amGrp = this.game.add.group();

		var smBtnWidth = 170;
		var lgBtnWidth = 210;

		//Menu BG
		this.sp_base = this.game.add.sprite(0, 0, this.sp_base);

		//Use button
		this.btn_use = this.game.add.button(0, 0, 
			Data.Common.actionMenu.use.sprite,
			this.switchAction, 
			this);
		this.btn_use.objRef = 'action';
		this.btn_use.fnRef = 'toggleUse'
		if(_com.action.currentAction === 'use') this.btn_use.frame = 1;

		//Talk button
		this.btn_talk = this.game.add.button(this.btn_use.x+smBtnWidth, 0, 
			Data.Common.actionMenu.talk.sprite,
			this.switchAction, 
			this);
		this.btn_talk.objRef = 'action';
		this.btn_talk.fnRef = 'toggleTalk'
		if(_com.action.currentAction === 'talk') this.btn_talk.frame = 1;

		//See button
		this.btn_see = this.game.add.button(this.btn_talk.x+smBtnWidth, 0, 
			Data.Common.actionMenu.see.sprite,
			this.switchAction, 
			this);
		this.btn_see.objRef = 'action';
		this.btn_see.fnRef = 'toggleSee'
		if(_com.action.currentAction === 'see') this.btn_see.frame = 1;

		//Spell button
		this.btn_spell = this.game.add.button(this.btn_see.x+smBtnWidth, 0, 
			Data.Common.actionMenu.spell.sprite,
			this.switchAction, 
			this);
		this.btn_spell.objRef = 'action';
		this.btn_spell.fnRef = 'toggleSpell'
		if(_com.action.currentAction === 'spell') this.btn_spell.frame = 1;

		//Item button
		this.btn_item = this.game.add.button(this.btn_spell.x+lgBtnWidth, 0,
			Data.Common.actionMenu.item.sprite,
			this.switchAction, 
			this);
		this.btn_item.objRef = 'action';
		this.btn_item.fnRef = 'toggleItem'
		if(_com.action.currentAction === 'item') this.btn_spell.frame = 1;

		//Menu button
		this.btn_menu = this.game.add.button(this.btn_item.x+lgBtnWidth, 0, 
			Data.Common.actionMenu.menu.sprite,
			this.switchAction, 
			this, 0, 0, 1);
		this.btn_menu.objRef = 'player';
		this.btn_menu.fnRef = 'toggleMenu'

		//Compile action menu group
		this.amGrp.add(this.sp_base);
		this.amGrp.add(this.btn_use);
		this.amGrp.add(this.btn_talk);
		this.amGrp.add(this.btn_see);
		this.amGrp.add(this.btn_spell);
		this.amGrp.add(this.btn_item);
		this.amGrp.add(this.btn_menu);

		//Hide after initializing
		this.hideMenu();
	},

	drawMenu : function(){
		this.amGrp.forEach(function(comp){comp.revive()}, this);
	},

	hideMenu : function(){
		this.amGrp.forEach(function(comp){comp.kill()}, this);
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
	}
}