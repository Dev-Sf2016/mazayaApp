/***
 * @author : Salem Khan
 * @date : 8/12/2014
 * @Description : UI lib providing functions for creating different UI elements.
 * A global object UI is available throughout the application.
 *
 */


/**
 * @param {Titanium.UI.View} 
 * 
 * @return Titanium.UI.View
 */
exports.View = function(parameters) {
    return Titanium.UI.createView(parameters);
};

/**
 * @param {Titanium.UI.ScrollView}
 * @return Titanium.UI.ScrollView
 */
exports.ScrollView = function(parameters){
    return Titanium.UI.createScrollView(parameters);    
};

/**
 * @param {Titanium.UI.ScrollableView}
 * @return Titanium.UI.ScrollableView
 */
exports.ScrollableView =function(parameters){
    return Titanium.UI.createScrollableView(parameters);
};

/**
 * @param {Titanium.UI.Label} 
 * @return Titanium.UI.Label
 */
exports.Label = function(parameters) {
    return Titanium.UI.createLabel(parameters);
};

/**
 * @param {Titanium.UI.ImageView} 
 * @return Titanium.UI.ImageView
 */
exports.Image = function(parameters) {
    return Titanium.UI.createImageView(parameters);
};

/**
 * @param {Titanium.UI.Window} 
 * @return Titanium.UI.Window
 */
exports.Window = function(parameters) {
    return Titanium.UI.createWindow(parameters);
};

/**
 * @param {Titanium.UI.TextField} 
 * @return Titanium.UI.TextField
 */
exports.TextField = function(parameters) {
  return Titanium.UI.createTextField(parameters);  
};

/**
 * @param {Titanium.UI.TextArea}
 * @return Titanium.UI.TextArea
 */
exports.TextArea = function(parameters){
    return Titanium.UI.createTextArea(parameters);
};

/**
 * @param {Titanium.UI.Button} 
 * @return Titanium.UI.Button
 */
exports.Button = function(parameters) {
    return Titanium.UI.createButton(parameters);
};

/**
 * @param {Titanium.UI.View}
 * @param {Titanium.UI.Label} 
 * @param {Titanium.UI.Label}
 * 
 * @return Titanium.UI.View
 */
exports.IconButton = function(v, l, ficon){
    v.layout = 'horizontal';
    v.center = "center.y";
    var view = Titanium.UI.createView(v);
    l.touchEnabled = ficon.touchEnabled = false;
    var label = Titanium.UI.createLabel(l);
    var icon = Titanium.UI.createLabel(ficon);
    if(LAYOUT == undefined){
       var LAYOUT = require ("lib/layout");
    }
    
    LAYOUT.ApplyHorizontalLayout(view, [icon, label], 4, 5, v.direction);
    
    return view;
};

/**
 * @param {Titanium.UI.Picker} 
 * @param {Array}
 * 
 * @return Titanium.UI.Picker
 */
exports.Picker = function(parameters, options) {
    
    var picker = Titanium.UI.createPicker(parameters);
    pickerOptions = [];
    for(var i=0, j=options.length; i<j; i++){
        pickerOptions[i] = Titanium.UI.createPickerRow({
            title: options[i].title,
            id: options[i].id
        });             
    }
    picker.add(pickerOptions);
    picker.setSelectedRow(0, 0, false); 
    
    return picker; 
};
/**
 * @param {Titanium.UI.Picker}
 * @param {Titanium.UI.PickerColumn}
 * @param {Titanium.UI.PickerRow}
 * @param {Titanium.UI.Label}  
 * @param {Array}
 * 
 * @return Titanium.UI.Picker
 */
exports.IosPicker = function(pickerParam, columParam, rowParam,labelParam, options) {
    
    var picker = Titanium.UI.createPicker(pickerParam);
    pickerOptions = [];
    var column = Ti.UI.createPickerColumn(columParam);
    for(var i=0, j=options.length; i<j; i++){
    	
        var row = Titanium.UI.createPickerRow(rowParam);
        row.id = options[i].id;
        var label = Ti.UI.createLabel(labelParam);
        label.applyProperties({
        	text: options[i].title,
        	id: options[i].id
        });
        row.add(label);
        column.addRow(row);
       //pickerOptions[i] = column;           
    }
    picker.add([column]);
    picker.setSelectedRow(0, 0, false); 
    
    return picker; 
};
/**
 * @param Titanium.UI.TextField parameters
 * @param Titanium.UI.View dropDownDialog
 * @param Array
 * @return Titanium.UI.TextField
 */
exports.CustomPicker = function(parameters, options) {
    var textField = Titanium.UI.createTextField(parameters);
    
    var window =  Ti.UI.createWindow({
    	ullscreen: true,
        //backgroundColor : "transparent",
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        backgroundColor:"#ffffff"
    });
    
    var background = Titanium.UI.createView({
    	width:Ti.UI.FILL,
    	height:Ti.UI.FILL,
    	backgroundColor:'#ffffff',
    	opacity:0.1
    });
    var list = Ti.UI.createScrollView({
    	width:"100%",
    	height:"100%",
    	borderColor:'#575756',
        borderWidth: 0.5,
        borderRadius:1,
        backgroundColor:"#ffffff",
        layout:"vertical",
        scrollType:"vertical"
    });
    
    pickerOptions = [];
    for(var i=0, j=options.length; i<j; i++){
    	if(i=0){
    		textField.value = options[i].text;
    		textField.id = options[i].value;
    	}
        var label = Titanium.UI.createLabel({
            text: options[i].text,
            value: options[i].value,
            color: '#575756',
            height:"48dp",
            left:"5dp",
            right:"5dp",
            textAlign:parameters.textAlign
            
        });
        
        var line = Titanium.UI.createView({
        	width:Ti.UI.FILL,
	    	height:1,
	    	borderColor:'#575756',
	        borderWidth: 0.5,
        });
        list.add(label);
        list.add(line);
        
        label.addEventListener('click', labelClickHandler);     
    };
    
    
   	//window.add(background);
   	window.add(list);
    function clickOrFocus(e){
         textField.blur();
       if(Titanium.Platform.osname == 'android'){
            window.open();
        }
        
    };
    
    function labelClickHandler(e){
    	textField.value = e.source.text;
    	textField.id = e.source.value;
    	window.close();
    };
    
    //textField.addEventListener('focus', clickOrFocus);
    textField.addEventListener('click', clickOrFocus);
    
    return textField; 
};


/**
 * @param Titanium.UI.TextField parameters
 * 
 * @return Titanium.UI.TextField
 */
exports.DatePicker = function(parameters) {
	
    var textField = Titanium.UI.createTextField(parameters);
    
    var picker = Titanium.UI.createPicker({
       type:Titanium.UI.PICKER_TYPE_DATE,
       minDate: parameters.minDate || new Date(1960,0,1),
       maxDate: parameters.maxDate || new Date(),
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
    return  textField;
};

/**
 * @param Titanium.UI.TextField parameters
 * 
 * @return Titanium.UI.TextField
 */
exports.TextFieldAsPicker = function(parameters) {
	var SelectBox = require('lib/SelectDialog');
    var textField = Titanium.UI.createLabel(parameters);
    
    //var isWindowOpen = false;
    
    function clickOrFocus(e){
         //textField.blur();
         //if(isWindowOpen) return;
         
         var select = new SelectBox(parameters.title, parameters.options);
         select.addEventListener('selectionChanged', function(event){
               select.close();
               textField.text =  event.title;
               textField.id = event.id;
              
         });
            	
       
    };
    //textField.addEventListener('focus', clickOrFocus);
    textField.addEventListener('click', clickOrFocus);
    return  textField;
};

/**
 * @param {Titanium.UI.OptionDialog}
 * @return {Titanium.UI.OptionDialog}
 */
exports.OptionDialog = function(parameters){
    return Titanium.UI.createOptionDialog(parameters);
};

/**Option Menu*/
exports.OptionsMenu = function(args, onClick) {
    var optionMenu = Titanium.UI.createOptionDialog(args);
    optionMenu.addEventListener('click', onClick);
    return optionMenu;
};

/**
 * @param {Titanium.UI.AlertDialog}
 * @param {Function}
 * 
 * @return {Titanium.UI.AlertDialog}
 */
exports.AlertDialog = function(args, onClick) {
    var alertDialog = Titanium.UI.createAlertDialog(args);
    alertDialog.addEventListener('click', onClick);
    return alertDialog;
};
/**
 * @param {Titanium.UI.ActivityIndicator}
 * 
 * @return {Titanium.UI.ActivityIndicator}
 */
exports.ActivityIndicatorDialog = function(args)
{
     var alertDialog = Titanium.UI.createAlertDialog({
         title:args.message,
     });
     activitiIndicator = Titanium.UI.createActivityIndicator(args);
     if(Titanium.Platform.name === 'android'){
     	alertDialog.add(activitiIndicator);
     	return alertDialog;
     }
     return activitiIndicator;
};

/**
 * 
 * @param {Titanium.UI.Switch} parameters
 * @return {Titanium.UI.Switch}
 */
exports.Switch = function(parameters){
    return Titanium.UI.createSwitch(parameters);
};

/**
 * 
 * @param {Titanium.UI.Label} label
 * @param {Titanium.UI.View} parameters
 */
exports.WrapeLabel = function(label, parameters){
	Ti.API.info(typeof label);
	var paddingLeft = parameters.paddingLeft || 0;
	var paddingRight = parameters.paddingRight || 0;
	var paddingTop = parameters.paddingTop || 0;
	var paddingBottom = parameters.paddingBottom || 0;
	
	label.applyProperties({
		top: paddingTop,
		right:paddingRight,
		bottom: paddingBottom,
		left:paddingLeft		
	});
	
	var view = Ti.UI.createView(parameters);
	view.add(label);
	
	return view;
};
/**
 * @param {Titanium.UI.View} params
 */
exports.File = function(params){
	
	params.layout = 'horizontal';
	
	var button = Ti.UI.createButton({width: 120, height: 30, title: params.title,backgroundColor:'#6895B2',color:'#fff'});
	var thumb = Ti.UI.createImageView({width:150, height:150, backgroundColor:'#eee'});
	if(params.imageUrl !== undefined){
		thumb.image = params.imageUrl;
	}
	this._thumb = thumb;
	
	this._field = Ti.UI.createView(params);
	
	Layout.ApplyHorizontalLayout(this._field,[thumb, button], 5, 5, I18N.direction);
	button.setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
	//this._field.add(thumb);
	//this._field.add(button);
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
	
	
	
	this._field.getValue = function(){
		//console.log(this.FileContents.toString());
		if(this.FileContents != undefined)
			return this.FileContents;
			
		return '';
	};
	
	return this._field;
};
/**
 * 
 * @param {Titanium.UI.TableView} parameters
 * @return {Titanium.UI.TableView}
 */
exports.Table = function(parameters){
	return Titanium.UI.createTableView(parameters);
};

/**
 * 
 * @param {Titanium.UI.TableViewRow} parameters
 * @return {Titanium.UI.TableViewRow}
 */
exports.TableRow = function(parameters){
	return Titanium.UI.createTableViewRow(parameters);
};
/**
 * 
 * @param {Titanium.UI.Label} parameters
 */
exports.CheckBox = function(parameters){
	var label = Titanium.UI.createLabel({
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		width:35,
		height:35,
		borderColor:"#dddddd",
		color:"#000000",
		font:{
			fontFamily:"icomoon",
			fontSize:"32sp"
		},
		text:"",
		checked: false
	});
	if(parameters != null){
		label.applyProperties(parameters);
	}
	label.addEventListener("click", changCheckBox);
	
	return label;
};

function changCheckBox(e){
	if(e.source.checked){
		e.source.checked = false;
		e.source.text = "";
	}
	else{
		e.source.checked = true;
		e.source.text = String.fromCharCode(0xe977);
	}
};

/**
 * @param {string}
 * @param {string}
 * @param {string}
 * @param {object}
 * @return {Function}
 */
exports.ConfirmDialog = function(icon, title, message, options, confirm) {
	var closeWin = function(e){
		confirm({index:e.source.index});
		Win.close();
	};
	var Win = UX.Window({
		witdth:Ti.UI.FILL,
		height:Ti.UI.FILL,
		theme:"Theme.AppCompat.Translucent.NoTitleBar.Fullscreen",
		layout:"composite",
		backgroundColor:"transparent"
	});
	
	var background = UX.View({
		witdth:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:"#888",
		opacity:"0.8"
	});
	Win.add(background);
	var content = UX.View({
		left:20,
		right:20,
		height:Ti.UI.SIZE,
		backgroundColor:"#000000",
		layout:"vertical"
	});
	
	var titleBar = UX.View({
		height:40,
		width:Ti.UI.FILL,
		backgroundColor: "#ed2a2e"
	});
	
	var titleBarInnerWraper = UX.View({
		layout:"horizontal",
		right:16,
		left:5,
		height:Ti.UI.SIZE			
	});
	
	var titleIcon = UX.Label({
		//backgroundColor:"green",
		width:40, 
		height:40,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		text:icon,
		color:"#ffffff",
		font:{
			fontFamily:"realestate",
			fontSize:"24sp"
		}		
	});
	
	var titleText = UX.Label({
		//backgroundColor:"blue",
		width:Config.width - 101,
		height:Ti.UI.SIZE,
		color:"#ffffff",
		text:title,
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:AppFonts.getFont('ar', {ar:[AppFonts.GE_FLOW_REGULAR, 12]}, 'normal')
	});
	
	titleBarInnerWraper.add(titleIcon);
	titleBarInnerWraper.add(titleText);
	
	titleBar.add(titleBarInnerWraper);
	content.add(titleBar);
	
	var messageText = UX.Label({
		text:message,
		left:10,
		right:10,
		top:15,
		height:Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:AppFonts.getFont('ar', {ar:[AppFonts.GE_FLOW_REGULAR, 14]}, 'normal'),
		color: "#ffffff"
	});
	content.add(messageText);
	
	var optionWraper = UX.View({
		left:10,
		right:10,
		top:20,
		height:Ti.UI.SIZE,
		layout:"horizontal"
	});
	
	for(var i=0; i<options.length; i++){
		Config.trace(JSON.stringify(options[i]));
		var button = UX.Button(options[i]);
		button.applyProperties({
			borderRadius:5
		});
		/*
		Ti.UI.createButton({
			
			
		});
		*/
		button.addEventListener("click", closeWin);
		optionWraper.add(button);
	}
	
	content.add(optionWraper);
	content.add(UX.View({
		height:20,
		withd:Ti.UI.FILL,
		
	}));
	
	Win.add(content);
	
    return Win;
};


/**
 * @param {string}
 * @param {string}
 * @param {string}
 * @param {string}
 */
exports.UXAlertDialog = function(icon, title, message, oklabel) {
	
	var Win = UX.Window({
		witdth:Ti.UI.FILL,
		height:Ti.UI.FILL,
		theme:"Theme.AppCompat.Translucent.NoTitleBar.Fullscreen",
		layout:"composite",
		backgroundColor:"transparent"
	});
	
	var background = UX.View({
		witdth:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:"#888",
		opacity:"0.8"
	});
	Win.add(background);
	var content = UX.View({
		left:20,
		right:20,
		height:Ti.UI.SIZE,
		backgroundColor:"#000000",
		layout:"vertical"
	});
	
	var titleBar = UX.View({
		height:40,
		width:Ti.UI.FILL,
		backgroundColor: "#ed2a2e"
	});
	
	var titleBarInnerWraper = UX.View({
		layout:"horizontal",
		right:16,
		left:5,
		height:Ti.UI.SIZE			
	});
	
	var titleIcon = UX.Label({
		//backgroundColor:"green",
		width:40, 
		height:40,
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		text:icon,
		color:"#ffffff",
		font:{
			fontFamily:"realestate",
			fontSize:"24sp"
		}		
	});
	
	var titleText = UX.Label({
		//backgroundColor:"blue",
		width:Config.width - 101,
		height:Ti.UI.SIZE,
		color:"#ffffff",
		text:title,
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:AppFonts.getFont('ar', {ar:[AppFonts.GE_FLOW_REGULAR, 12]}, 'normal')
	});
	
	titleBarInnerWraper.add(titleIcon);
	titleBarInnerWraper.add(titleText);
	
	titleBar.add(titleBarInnerWraper);
	content.add(titleBar);
	
	var messageText = UX.Label({
		text:message,
		left:10,
		right:10,
		top:15,
		height:Ti.UI.SIZE,
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:AppFonts.getFont('ar', {ar:[AppFonts.GE_FLOW_REGULAR, 14]}, 'normal'),
		color: "#ffffff"
	});
	content.add(messageText);
	
	var optionWraper = UX.View({
		left:10,
		right:10,
		top:20,
		height:Ti.UI.SIZE,
		layout:"horizontal"
	});
	
	
	var button = UX.Button({
		width:80,
		height:40,
		title:(oklabel == undefined)?I18N.text("OK", "OK"):oklabel,
		color:"#ffffff",
		textAlign:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:AppFonts.getFont('ar', {ar:[AppFonts.GE_FLOW_REGULAR, 12]}, 'normal'),
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundColor: "#ed2a2e",
		borderRadius:5
		
	});
	
	button.addEventListener("click", function(e){Win.close();});
	optionWraper.add(button);
	
	
	content.add(optionWraper);
	content.add(UX.View({
		height:20,
		withd:Ti.UI.FILL,
		
	}));
	
	Win.add(content);
	Win.open();
    return Win;
};