var Spell = function(game, spells){
	this.game = game;

	this.currentSpell = null;

	this.availableSpells = spells;
}

Spell.prototype = {
	setSpells : function(spells){
		this.availableSpells = spells;
	},

	select : function(spell){
		this.currentSpell = spell;
	},

	cast : function(player, spell){

	}
};