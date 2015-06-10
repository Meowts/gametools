//Global object that the main Phaser states are children of
var Tools = {};

//Data object for all static data
var Data = {};

//Screen object to hold all of the screens
var Screen = {
	switchScreen : function(key){
		Global.CS = key.screen;
		Global.switchScreen = true;
	}
}

//Misc helper functions
var GFN = {
	//Return the count of items in an object
	count : function(obj){
		var total = 0;
		for (var k in obj) {
		    if (obj.hasOwnProperty(k)) {
		       ++total;
		    }
		}
		return total;
	},

	//Return true or false if a variable is a function or not
	isFunction : function(functionToCheck) {
		var getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	},

	exec : function(fn, context){
		context[fn]();
	}
}