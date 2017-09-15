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