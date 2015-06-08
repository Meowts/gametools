Data.Common = {
	back : {
		sprite : 'button',
		x : 940,
		y : 60		
	}
}

Data.SpriteTest = {
	player : {
		spriteKey : 'walkingSprites',
		frameRate : 10,
		movementEnabled : false
	},

	copy : {
		instructions : {
			text : 'Press W/A to adjust framerate,\nleft/right/up/down to animate,\nspace to toggle movement',
			font : {font: '16px consolas', fill: '#FFFFFF'},
			x : 40,
			y : 40
		}	
	},
}

Data.CameraTest = {
	player : {
		spriteKey : 'walkingSprites',
		frameRate : 10,
		movementEnabled : true
	}	
}

Data.WalkingBounds = {
	player : {
		spriteKey : 'walkingSprites',
		frameRate : 10,
		movementEnabled : true
	}		
}

Data.Player = {
	//Sprite key
	spriteKey : 'walkingSprites',

	//Framerate
	frameRate : 10,

	//Movement enabled (todo: not do it this way lol)
	movementEnabled : true,

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