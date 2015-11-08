//Global object that the main Phaser states are children of
var Tools = {};

//Data object for all static data
var Data = {};

//Class object to hold all of the game classes
var Class = {};

//Screen object to hold all of the screens
var Screen = {};

//State object to hold all of the states
var State = {};

//Misc helper functions (Global Functions)
var GFN = {
	
	switchScreen : function(key){
		Global.CS = key.screen;
		Global.switchScreen = true;
	},

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
	},

	showGroup : function(group){
		group.forEach(function(comp){comp.revive()}, this);
	},

	hideGroup : function(group){
		group.forEach(function(comp){comp.kill()}, this);
	},

	performAction : function(entity){
		_com.action[_com.action.currentAction](entity);
	}
}