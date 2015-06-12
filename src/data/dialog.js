
/*
	The game's dialog

	Dialog is seperated by which type of entity you're conversing with.
	
	"One-Off" dialog
	----------------
	entity_id : "what they say" 


	"Continued" dialog
	------------------
	entity_id : 
		index : 
			character : "entity_id",
			type : "type",
			text : 'what they say'
		index : 
			...
			...
			...
*/


Data.Dialog = {
	npc : {

	},

	item : {
		test : "The test object blinks and stares",

		test3 : {
			1 : {
				character : 'test3',
				type : "item",
				text : "*The test object remains stoically silent*"
			},
			2 : {
				character : 'player',
				type : "player",
				text : "Bewwwwwllllshit mate, y'aint got no, no, -"
			},
			3 : {
				character : 'test3',
				type : "item",
				text : "*The test object continues to remain silent*"
			},
			4 : {
				character : 'player',
				type : "player",
				text : "Don't even, y'aint got no, y--"
			},
			5 : {
				character : 'test3',
				type : "item",
				text : "SHADDAP!"
			},
			6 : {
				character : 'test3',
				type : "item",
				text : "Insolent whelp."
			}
		}
	}
}