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

	drawMenu : function(){
		this.destroy();
		this.amGrp = this.game.add.group();

		var xsBtnWidth = 94;
		var smBtnWidth = 170;
		var lgBtnWidth = 210;

		this.sp_base = this.game.add.sprite(0, 0, this.sp_base);

		this.btn_use = this.game.add.button(0, 0, Data.Common.actionMenu.use.sprite,this.switchAction, this, 1, 0, 1);

		this.btn_talk = this.game.add.button(this.btn_use.x+smBtnWidth, 0, Data.Common.actionMenu.talk.sprite,this.switchAction, this, 1, 0, 1);

		this.btn_see = this.game.add.button(this.btn_talk.x+smBtnWidth, 0, Data.Common.actionMenu.see.sprite,this.switchAction, this, 1, 0, 1);

		this.btn_spell = this.game.add.button(this.btn_see.x+smBtnWidth, 0, Data.Common.actionMenu.spell.sprite,this.switchAction, this, 0, 0, 0);

		this.btn_item = this.game.add.button(this.btn_spell.x+lgBtnWidth, 0, Data.Common.actionMenu.item.sprite,this.switchAction, this, 0, 0, 0);

		this.btn_menu = this.game.add.button(this.btn_item.x+lgBtnWidth, 0, Data.Common.actionMenu.menu.sprite,this.switchAction, this, 0, 0, 0);
	},

	switchAction : function(){

	},

	destroy : function(){
		if(this.amGrp !== null){
			this.amGrp.destroy();
			this.amGrp = null;
		}
	}
}