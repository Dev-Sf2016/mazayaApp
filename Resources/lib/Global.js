var App = {listeners:[]};

App.prototype.addEventListener = function(name, listener){

	this.listeners.push({name:name, func:listener});
	
};

App.prototype.removeEventListener = function(name, funcName){
	var l = this.listeners.length;
	for(var i=0; i<l; i++){
		var obj = this.listeners[i];
		if(obj.name == name && obj.func === funcName){
			
		}
	}
};
exports.App = {};

