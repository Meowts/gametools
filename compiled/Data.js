Data.Common = {
	back : {
		sprite : 'button',
		x : 940,
		y : 60		
	}
}

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
/*

	Items

	item_name :
		id : "[same as item_name]",
		sprite : "[sprite key defined in /src/states/load.js]",
		description : "Description that shows on inspect" (optional),
		dialog : [dialog object defined in src//data/dialog.js] (optional),
		collectable : true/false (optional, whether use action will acquire item or not)

*/


Data.Items = {
	test1 : {
		id : 'test1',
		sprite : 'test1',
		description : "This is the first test item. Collectable",
		dialog : Data.Dialog.item.test,
		collectable : true
	},

	test2 : {
		id : 'test2',
		sprite : 'test2',
		description : "This is the second test item. Collectable",
		dialog : Data.Dialog.item.test2,
		collectable : true		
	},

	test3 : {
		id : 'test3',
		sprite : 'test3',
		dialog : Data.Dialog.item.test3,
		collectable : false	
	},	
}

//Assign type identifier to all the items
for(var item in Data.Items){
	Data.Items[item].type = 'item';
}

Data.Player = {
	//Sprite key
	spriteKey : 'walkingSprites',

	//Framerate
	frameRate : 10
}
/*

	Screen

	Screen.ScreenName : 
		keyboardEnabled : true/false,

		items : 
			item_name : 
				ref : Data.Items.item_name,
				x : [int],
				y : [int]
			item_name : 
				...
				...
				...

		*coming soon* : npc, player

*/

Data.Screen = {};

Data.Screen.MainMenu = {
	keyboardEnabled : false,
}

Data.Screen.SpriteTest = {
	keyboardEnabled : true,
	copy : {
		instructions : {
			text : 'Press W/A to adjust framerate,\nleft/right/up/down to animate',
			font : {font: '16px consolas', fill: '#FFFFFF'},
			x : 40,
			y : 40
		}	
	},
}

Data.Screen.CameraTest = {
	keyboardEnabled : true
}

Data.Screen.WalkingBounds = {
	keyboardEnabled : true
}

Data.Screen.Menu = {
	keyboardEnabled : true
}

Data.Screen.ActionTest = {
	keyboardEnabled : true,

	items : {
		test1 : {
			ref : Data.Items.test1,
			x : 400,
			y : 300
		},
		test2 : {
			ref : Data.Items.test2,
			x : 500,
			y : 300
		},
		test3 : {
			ref : Data.Items.test3,
			x : 600,
			y : 300
		}		
	}
}
/*

	Spells

	spell_name :
		id : "[same as item_name]",
		sprite : "[sprite key defined in /src/states/load.js]",

	TODO: Actually make spells lololololol

*/

Data.Spells = {}

//Assign type identifier to all the spells
for(var spell in Data.Spells){
	Data.Spells[spell].type = 'spell';
}