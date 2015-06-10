

Data.Items = {
	test1 : {
		sprite : 'test1',
		description : "This is the first test item. Collectable",
		dialog : Data.Dialog.item.test,
		collectable : true
	},

	test2 : {
		sprite : 'test2',
		description : "This is the second test item. Collectable",
		dialog : Data.Dialog.item.test2,
		collectable : true		
	},

	test3 : {
		sprite : 'test3',
		description : "This is the third test item. Non-Collectable",
		dialog : Data.Dialog.item.test3,
		collectable : false	
	},	
}

Data.Items.On = {
	'test,test2' : {
		action : null
	}
}