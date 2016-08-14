
/**
 * @projectDescription A description of the file ahead
 *
 * @author	Salem Khan
 * @version	0.1
 */

//start of constraints
/**
 * Base class for all constraint types
 * @class Constraint
 */

function Constraint(){
	
	throw Error('This is an abstract class, it can not be initilized');
	
	this.validate = function(value){
		throw Error('This method shoud be override in the child class');
	};
};

function Required(message){
	this.message = message || 'This field is required';
	this.validate = function(value){
		if("" == value || null == value){
			return false;
		}
	
		return true;
	};
};


function NotBlank(msg){
	this.message =  msg || 'This field is required';
	this.validate = function(value){
		if("" == value || null == value){
			Ti.API.info("NotBlank");
			return false;
		}
		
		return true;
	};
};

function IsInt(message){
	this.message = message || 'The value is not valid';
};
IsInt.prototype = Object.create(Constraint.prototype);

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
	if(value == '') return true;
	return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
	
};

function URL(message){
	this.message = message || 'URL is not valid';
};

URL.prototype = Object.create(Constraint.prototype);

URL.prototype.validate = function(value){
	
	return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
	
};

/**
 * @param form {TiForm}
 * @param controll {FieldType}
 * @param message {string}
 */
function EqualTo(message, compareValue){
	this.message = message || '';
	this.compareValue = compareValue;
};

EqualTo.prototype = Object.create(Constraint.prototype);

EqualTo.prototype.validate = function(value){
	
	var cvalue = (typeof this.compareValue == 'function')? this.compareValue(): this.compareValue;
	
	Config.trace('value='+cvalue + "   type=" +  typeof this.compareValue);
	if(value != cvalue){
		return false;
	}
	
	return true;
};
function Min(message, value){
	this.message = message || 'Length is not acived';
	this.compareValue = value;
};

Min.prototype = Object.create(Constraint.prototype);

Min.prototype.validate = function(value){

	if(value.length < this.compareValue){
		return false;
	}
	
	return true;
};

function Max(message, value){
	this.message = message || 'Length is not acived';
	this.compareValue = value;
};

Max.prototype = Object.create(Constraint.prototype);

Max.prototype.validate = function(value){
	
	if(value.length > this.compareValue){
		return false;
	}
	
	return true;
};
exports.Constraint = {};
exports.Constraint.Required = Required;
exports.Constraint.NotBlank = NotBlank;
exports.Constraint.Email = Email;
exports.Constraint.URL = URL;
exports.Constraint.IsInt = IsInt;
exports.Constraint.EqualTo = EqualTo;
exports.Constraint.Min = Min;
exports.Constraint.Max = Max;
//end of constraints




/**
 * @classDescription This class creates a new Collection.
 * @class Collection
 * @constructor
 */
function Collection(){
	/**
	 * @private
	 * @property {integer}
	 */
	var count = 0;
	/**
	 * @private
	 * @property {Object}
	 */
	var collection = {};
	
	/**
	 *
	 * @method
	 * @param {String} key 
	 * @param {Object} item
	 * @return {void}
	 */
	this.add = function(key, item){
		if(key == undefined || item == undefined){
			throw 'Invalid Argumnet supplied';	
		}
		collection[key] = item;
		count++;
	};
	
	/**
	 * @method
	 * @param {String} key
	 * @return {undefined|integer}
	 */
	this.remove = function(key){
		if(collection[key] == undefined) return undefined;
		
		delete collection[key];
		return --count;	
		
	};
	/**
	 * @method
	 * @return {Object}
	 */
	this.getItem = function(key){
		if(collection[key] == undefined) return undefined;
		
		return collection[key];
	};
	
	this.getAll = function(){
		return collection;
	};
	/**
	 * @method
	 * @return {integer}
	 */
	this.itemCount = function(){return count;};
	
};

/**
 * @param {Object} options
 * @param {Object} defaults
 * @return {Object}
 */
function merge(options, defaults){
	for(prop in options){
		defaults[prop] = options[prop];
	}
	
	return defaults;
}

function LAYOUT(){
	/*
	 * Define Layout Constant for TiForm
	 */
	this.VERTICAL= 'vertical';
	this.HORIZONTAL= 'horizontal';	
};

/************* start of the field types ***************/

/**
 * Define Field Type class
 * @class FieldType
 * @param params Object
 * @param constraints Array<Constraint>
 * @constructor
 */
function FieldType(params, constraints){

	
	/**
	 * @private
	 * @property
	 * @type Titanium.UI.View
	 */
	this._parent;
	this._view = Titanium.UI.createView({
		layout:'vertical',
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE
	});
	
	this._field;
	/**
	 * @private
	 * @property 
	 * @type {Titanium.UI.TextField}
	 */
	var defaults = {
		height: 36,
		width: Ti.UI.FILL
	};
	
	//var field = Ti.UI.createTextField(defaults);
	var fieldError = Ti.UI.createLabel({
		visible:false,
		color: 'red',
		width:params.width,
		height: 0,
		font:{
			fontSize: '10sp'
		}
	});
	/**
	 * @method
	 * @return {Titanium.UI.Label}
	 */
	this.getErrorControll = function(){
		return fieldError;
	};
	/**
	 * Render the give field and add to the container
	 * @method
	 * @param {Titanium.UI.View}
	 * @return {void}
	 */
	this.render = function(container){};
	
	/**
	 * Remove the given field from the TiForm
	 * @method
	 * @return {void}
	 */
	this.remove = function(){
		parent.remove(_view);
	};
	
	/**
	 * get value of the field
	 * @method
	 * @return {String}
	 */
	this.getValue = function(){};

	this.isValid = function(){
		var _valid = true;
		
		if(constraints.length>0){
			for(var i=0, j = constraints.length; i<j; i++){
				Ti.API.info("validate --" + this.getValue());
				if(!constraints[i].validate(this.getValue())){
					Ti.API.info(constraints[i].message);
					fieldError.applyProperties({
						visible: true,
						height:30,
						text: constraints[i].message
					});
					_valid = false;
					
					break;
				}
			}
		}
		
		if(_valid){
			fieldError.applyProperties({
				visible:false,
				height:0,
				text:""
			});
		}
		
		return _valid;
	};	
};

/**
 * @param {Titanium.UI.TextField} params
 * @param {Array<Constraint>} constraint
 */
function Input(params, constraints, type){
	Ti.API.info('------' + constraints.length  );
	FieldType.call(this, params, constraints);
	Config.trace("INPUTPARAM==" + JSON.stringify(params));
	if('type' == Constants.INPUT) this._field = UX.TextField(params);
	else this._field = Ti.UI.createTextArea(params);
	
	this.render = function(container){
		Ti.API.info(JSON.stringify(this));
		this._parent = container;
		
		this._view.add(this._field);
		this._view.add(this.getErrorControll());
		
		this._parent.add(this._view);
		
		Ti.API.info('hi');
		
	};
	
	this.getValue = function(){
		return this._field.getValue();
	};
};

Input.prototype = Object.create(FieldType.prototype);
Input.prototype.constructor = Input;


/**
 * @param {Titanium.UI.TextField} params
 * @param {Array<Constraint>} constraint
 */
function Picker(params, constraint){
	
	FieldType.call(this, params, constraint);
};

Picker.prototype = Object.create(FieldType.prototype);
Picker.prototype.constructor = Picker;

/**
 * @param {Titanium.UI.TextField} params
 * @param {Array<Constraint>} constraint
 */
function DatePicker(parameters, constraint){
	FieldType.call(this, parameters, constraint);
	
	var textField = Titanium.UI.createTextField(parameters);
    
    var picker = Titanium.UI.createPicker({
       type:Titanium.UI.PICKER_TYPE_DATE,
       minDate:new Date(1960,0,1),
       maxDate:new Date(),
       value:parameters.date,
    });
    var isWindowOpen = false;
    function clickOrFocus(e){
         textField.blur();
       if(Titanium.Platform.osname == 'android'){
            picker.showDatePickerDialog({
                value: new Date(),
                callback: function(e) {
                if (e.cancel) {
                    Titanium.API.info('User canceled dialog');
                  } else {
                    Titanium.API.info('User selected date: ' + e.value.getDay() + ' ' + e.value.getMonth() + ' ' + e.value.getFullYear());
                    textField.value = e.value.getFullYear() + '-' + (e.value.getMonth() +1) + '-' + e.value.getDate();
                  }
                 }
            });
        }
        else{
        	if(isWindowOpen) return;
        	var win = Ti.UI.createWindow({fullscreen:true});
        	var pview = Ti.UI.createView({
        		left:10,
        		right:10,
        		height:Ti.UI.SIZE,
        		backgroundColor:'#ffffff',
        		borderColor:'#eeeeee',
        		borderWidth:1,
        		layout:"vertical"
        	});
        	
        	pview.add(picker);
        	var bar = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:"40dp",
				backgroundColor:"#eeeeee",
				top:"10dp"
			});
        	var done = Ti.UI.createButton({
				height:"35dp",
				width:"70dp",
				title:I18N.text("Done", "Done"),
				left:"5dp",
				borderWidth:1,
				borderRadius:5,
				backgroundColor:"#007639",
				color:"white"
			});
			var cancel = Ti.UI.createButton({
				height:"35dp",
				width:"70dp",
				title:I18N.text("Cancel", "Cancel"),
				right:"5dp",
				borderWidth:1,
				borderRadius:5,
				backgroundColor:"#007639",
				color:"white"
			});
			done.addEventListener("click", function(e){
				textField.value = picker.value.getFullYear() + '-' + (picker.value.getMonth()+1) + '-' + picker.value.getDate();
				win.close();
				isWindowOpen = false;
			});
			cancel.addEventListener("click", function(e){
				win.close();
				isWindowOpen = false;
			});
			bar.add(done);
			bar.add(cancel);
			pview.add(bar); 
        	win.add(pview);
        	isWindowOpen = true;
        	win.open();
        	
        }
        
    }
    textField.addEventListener('focus', clickOrFocus);
    textField.addEventListener('click', clickOrFocus);
    

	this._field = textField;
	
	
	this.render = function(container){
		Ti.API.info(JSON.stringify(this));
		this._parent = container;
		
		this._view.add(this._field);
		this._view.add(this.getErrorControll());
		
		this._parent.add(this._view);
		
		Ti.API.info('hi');
		
	};
	
	this.getValue = function(){
		return this._field.getValue();
	};
	
	
	
	
	
	
	
	
	
};

DatePicker.prototype = Object.create(FieldType.prototype);
DatePicker.prototype.constructor = DatePicker;


/**
 * @param {Titanium.UI.TextField} params
 * @param {Array<Constraint>} constraint
 */
function File(params, constraints, type){
	Ti.API.info('------' + constraints.length  );
	FieldType.call(this, params, constraints);
	params.layout = 'horizontal';
	
	var button = Ti.UI.createButton({width: 150, height: 30, title: params.title});
	var thumb = Ti.UI.createImageView({width:150, height:150, backgroundColor:'red'});
	this._thumb = thumb;
	this._field = Ti.UI.createView(params);
	
	this._field.add(thumb);
	this._field.add(button);
	var _this = this;
	button.addEventListener('click', browseFile);
	
	function browseFile(e) {
		
		Ti.Media.openPhotoGallery({
			success : function(event) {
				_this._field.FileContents = event.media;
				_this._thumb.image = event.media;
			},
			cancel : function(event) {
				//imageToSend = "null";
				Ti.API.info("Photo gallery canceled");
			},
			error : function(event) {
				//imageToSend = "undefined";
				Ti.API.info("Photo gallery error");
			},
			allowEditing : true
		});
	};
	
	this.render = function(container){
		Ti.API.info(JSON.stringify(this));
		this._parent = container;
		
		this._view.add(this._field);
		this._view.add(this.getErrorControll());
		
		this._parent.add(this._view);
		
		Ti.API.info('hi');
		
	};
	
	this.getValue = function(){
		return this._field.FileContents();
	};
	
	
};

File.prototype = Object.create(FieldType.prototype);
File.prototype.constructor = File;
/**
 * @param {Titanium.UI.TextField} params
 * @param {Array<Constraint>} constraint
 */
function Submit(params){
	FieldType.call(this, params);
	
	this._field = Ti.UI.createButton(params);
	if(params.onClick !== undefined){
		this._field.addEventListener('click', params.onClick);
	}

	this.render = function(container){
		Ti.API.info(JSON.stringify(this));
		this._parent = container;
		this._field.container = container;
		this._view.add(this._field);
		this._view.add(this.getErrorControll);
		
		this._parent.add(this._view);
		
		Ti.API.info('Button');
		
	};

};

Submit.prototype = Object.create(FieldType.prototype);
Submit.prototype.constructor = Submit;
//TODO: Add override the neccessory method of the parent class

/************* end of the field types ***************/




function FieldOptions(){
	this.fieldAttribute = {};
	this.validator = {};
}


/**
 * @class
 * @constructor
 * @param {Titanium.UI.View}
 * @param {TiFormOptions}
 */
function TiForm(wraperOptions, options){

	/**
	 * @private
	 * @property
	 * @type {Collection}
	 */
	var fields = new Collection();
	
	this.submit;
	
	/**
	 * @private
	 * @property
	 * @type Titanium.UI.View
	 */
	wraperOptions = merge(wraperOptions, {
		layout:'vertical',
		width:Ti.UI.SIZE,
		padding:10
	});
	var formView = Titanium.UI.createView(wraperOptions);
	formView.addEventListener('onSubmit', function(){alert('hi');});
	this.Layout = new LAYOUT();
	/**
	 * @method
	 * @param {String} name
	 * @param {String} type,
	 * @param {Ti.UI.TextField} options
	 * @param {Array<Constraint>} constraints
	 */
	this.add = function(name, type, options, constraints){
		if(name == undefined || type == undefined) throw "Invalid argument";
		if(fields[name] != undefined) throw 'Field ' + name + ' allready exists';
		
		if(constraints == null) constraints = [];
		
		var allowedTypes = [Constants.DATEPICKER, Constants.INPUT, Constants.PICKER, Constants.SUBMIT, Constants.TEXTAREA, Constants.FILE];
		Ti.API.info(allowedTypes.indexOf(type));
		if(allowedTypes.indexOf(type) < 0) throw "Field Type " + type + " Not found";
		
		fields.add(name, createField(type, options, constraints));
		
		return this;
	};
	
	function createField(type, options, constraints){

		if(type == Constants.DATEPICKER){
			return new DatePicker(options, constraints);
		}
		else if(type == Constants.INPUT){
			return new Input(options, constraints, Constants.INPUT);
		}
		else if(type == Constants.PICKER){
			return new Picker(options, constraints);
		}
		else if(type == Constants.SUBMIT){
			return new Submit(options);
		}
		else if(type == Constants.TEXTAREA){
			return new Input(options, constraints);
		}
		else if(type == Constants.FILE){
			return new File(options, constraints);
		}
		return null;
	}
	/**
	 * render the TiForm
	 * @method
	 * @return void
	 * @param {Titanium.UI.View}
	 */
	this.render = function(container){
		Ti.API.info('In Form Render');
		var collection = fields.getAll();
		for(field in collection){
			Ti.API.info(typeof formView);
			collection[field].render(formView);
		}
		Ti.API.info(formView.children.length + " goo");
		container.add(formView);
		
	};
	
	this.isValid = function(){
		var valid = true;
		var collection = fields.getAll();
		for(var field in collection){
			if(collection[field]  instanceof Submit) continue;
			if(!collection[field].isValid()){
				valid = false;	
			}
		}
		
		return valid;
	};
	
	this.getData = function(){
		var data = {};
		var collection = fields.getAll();
		for(var field in collection){
			data[field] = collection[field].getValue();
		}
		return data;
	};
	
	this.getView = function(){
		return formView;
	};
	
	this.getField = function(name){
		return fields.getItem(name);
	};
	
	
};

var Constants = {};

Constants.INPUT = 'input';
Constants.TEXTAREA = 'textarea';
Constants.DATEPICKER = 'datepicker';
Constants.PICKER = 'picker';
Constants.FILE = 'file';
Constants.SUBMIT = 'submit';


exports.Constants = Constants;

var TiFormException = function(code, message){
	this.code = 0;
	this.message = "";
	if(code != undefined && code != null)
		this.code = code;
		
	if(message != undefined && message != null)
		this.message = message;
};

var ErrorCode = {};
ErrorCode.INVALID_ITEM = 100;
ErrorCode.I18N_RQUIRED = 101;

exports.TiForm = TiForm;

exports.TiFormException = TiFormException;
