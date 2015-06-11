

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
		description : "This is the third test item. Non-Collectable",
		dialog : Data.Dialog.item.test3,
		collectable : false	
	},	
}

//Assign type identifier to all the items
for(var item in Data.Items){
	Data.Items[item].type = 'item';
}

Data.Items.On = {
	'test1_test2' : {
		result : 'test1_test2'
	},

	'test2_test3' : {
		result : 'test2_test3'
	},

	'player_test1' : {
		result : 'player_test1'
	},
	
	'player_test2' : {
		result : 'player_test2'
	}
}