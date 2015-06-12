/*

	Spells

	spell_name :
		id : "[same as item_name]",
		sprite : "[sprite key defined in /src/states/load.js]",

	TODO: Actually make spells lololololol

*/

var Data.Spells = {}

//Assign type identifier to all the spells
for(var spell in Data.Spells){
	Data.Spells[spell].type = 'spell';
}