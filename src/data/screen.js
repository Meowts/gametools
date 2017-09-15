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
	},

	player : {
		initX : 300,
		initY : 300
	}
}