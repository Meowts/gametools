var Spell = function(game){
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

Spell.prototype = {
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