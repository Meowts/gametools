Data.Common = {
	back : {
		sprite : 'button',
		x : 940,
		y : 60		
	}
}

Data.MainMenu = {
	keyboardEnabled : false,
}

Data.SpriteTest = {
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

Data.CameraTest = {
	keyboardEnabled : true
}

Data.WalkingBounds = {
	keyboardEnabled : true
}

Data.Menu = {
	keyboardEnabled : true
}

Data.Player = {
	//Sprite key
	spriteKey : 'walkingSprites',

	//Framerate
	frameRate : 10,

	//Default player inventory
	items : {
		item1 : 'item1',
		item2 : 'item2',
		item3 : 'item3',
		item4 : 'item4',
		item5 : 'item5',
		item6 : 'item6'
	},

	//Default player spells
	spells : {
		spell1 : 'spell1',
		spell2 : 'spell2',
		spell3 : 'spell3',
		spell4 : 'spell4',
		spell5 : 'spell5'
	}
}