/**
 * Base class for all constraint types
 * @class Constraint
 */

function Constarint(){
	
	throw Error('This is an abstract class, it can not be initilized');
	
	this.validate = function(value){
		throw Error('This method shoud be override in the child class');
	};
};

function Required(message){
	this.message = message | 'This field is required';
};

Required.prototype = Object.create(Constarint.prototype);

Required.prototype.validate = function(value){
	if("" == value || null == value){
		return false;
	}
	
	return true;
};


function NotBlank(message){
	this.message = message | 'This field is required';
};

NotBlank.prototype = Object.create(Constarint.prototype);

NotBlank.prototype.validate = function(value){
	if("" == value || null == value){
		return false;
	}
	
	return true;
};

function IsInt(message){
	this.message = message | 'The value is not valid';
};
IsInt.prototype = Object.create(Constarint.prototype);

IsInt.prototype.validate = function(value){
	if("" == value || null == value || isNaN(value) || /^\d*$/.test(value) == false){
		return false;
	}
	
	return true;
};

function Email(message){
	this.message = message || 'Email is not valid';
};

Email.prototype = Object.create(Constraint.prototype);

Email.prototype.validate = function(value){
	
	return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
	
};

function URL(message){
	this.message = message || 'URL is not valid';
};

URL.prototype = Object.create(Constraint.prototype);

URL.prototype.validate = function(value){
	
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
	
};

exports.Required = Required;
exports.NotBlank = NotBlank;
exports.Email = Email;
exports.URL = URL;
exports.IsInt = IsInt;
