//check the for component

//GLOBAL Variable
//if(Ti.Platform.osname === 'android')		
	//var UTILITY = require('salem.khan.utility');
	
var Config = require("config");
var DB = require("lib/Database").Database;
var ICONS = require("lib/ICONS").ICONS;
var AppFonts = require("lib/FONTS").Fonts;
var I18N = require("lib/i18n");
var UX = require("lib/UX");
var SM = require("lib/ServiceManager");
var FM = require('lib/form/FormModule');
var Functions = require('lib/Functions');
var HTTP_CODES = require('lib/Codes'); 
var sprintf = require('lib/Sprintf').sprintf;

/**
 * Abstarct Window Aimlementation, used for automatic reloding of window when language change
 */
function AbstractWindow(TiWindow, arg) {

    if (arg !== undefined) {
        this.parameters = arg;
    }

    if (!(this instanceof AbstractWindow)) {
        if (arg !== undefined)
            return new AbstractWindow(TiWindow, arg);
        else
            return new AbstractWindow(TiWindow);
    }

    this.name = TiWindow.replace(/\//g, "_");
    if (AbstractWindow.instances.hasOwnProperty(this.name)) {
        return AbstractWindow.instances[this.name];
    }
    this.isUiDirty = true;
    AbstractWindow.count++;

    this.WindowClass = require(TiWindow);

    AbstractWindow.instances[this.name] = this;
    AbstractWindow.count++;
    this.loadWindow();
};
AbstractWindow.prototype.loadWindow = function() {
    if (this.parameters !== undefined) {
        this.window = new this.WindowClass(this.parameters);
    } else {
        this.window = new this.WindowClass();
    }

    this.window.AbstractWindow = this;
    this.window.addEventListener("focus", this.focus);
    //this.window.addEventListener("select", this.focus);
    this.window.addEventListener("close", this.close);

};

AbstractWindow.prototype.open = function() {
    this.window.open();
};

AbstractWindow.prototype.close = function() {
	var abwindow = this.AbstractWindow;
    //var temp = abwindow.name;
    abwindow.deleteInstance(abwindow.name);
};
AbstractWindow.prototype.focus = function() {
    //var abwindow = this.AbstractWindow;
    Ti.API.info("--------Pakistan ------");
    var w = AbstractWindow.instances[this.AbstractWindow.name];
    if (w.isUiDirty) {
        w.isUiDirty = false;
        Ti.API.info(w.isUiDirty.toString());
        w.window.load();
    }

    AbstractWindow.currentWindow = w;
};

AbstractWindow.prototype.focus1 = function() {
    //var abwindow = this.AbstractWindow;
    //Ti.API.info("salem " + abwindow.isUiDirty);
    if (this.AbstractWindow.isUiDirty) {
        this.AbstractWindow.isUiDirty = false;
        Ti.API.info(this.AbstractWindow.isUiDirty.toString());
        this.AbstractWindow.window.load();
    }

    AbstractWindow.currentWindow = this.AbstractWindow;
};
AbstractWindow.prototype.deleteInstance = function(name) {
    delete AbstractWindow.instances[name];
    AbstractWindow.count--;
};

AbstractWindow.fireEvent = function(event) {
	Ti.API.info("----UI dirty call");
    if (event === "uiDirty") {
        AbstractWindow.Language = Translator.getLanguage();
        AbstractWindow.TextAlignment = (AbstractWindow.Language == "en") ? Ti.UI.TEXT_ALIGNMENT_LEFT : Ti.UI.TEXT_ALIGNMENT_RIGHT;
        for (var abwindow in AbstractWindow.instances) {
            AbstractWindow.instances[abwindow].isUiDirty = true;
        }
        if (AbstractWindow.currentWindow != null && AbstractWindow.currentWindow.hasOwnProperty("window")) {
            AbstractWindow.currentWindow.window.isUidirty = false;
            AbstractWindow.currentWindow.window.load();
        }
    }
};

//comment this line
//AbstractWindow.Language = "ar";

AbstractWindow.instances = {};
AbstractWindow.count = 0;
AbstractWindow.currentWindow = null;
/********end of abstract window***********/


/*
var zform = new FM.TiForm();
zform.add('text1', FM.Constants.INPUT, { width:420, height:60, border:1, backgroundColor: 'red'},[new FM.Constraint.NotBlank('Should not be blanked')]);
zform.add('text2', FM.Constants.TEXTAREA, {}, [new FM.Constraint.Required('this field is required')]);
zform.add('Submit', FM.Constants.SUBMIT, {
	width: 200,
	height:35,
	backgroundColor:"green",
	title: 'Submit',
	submit:true,
	onClick: onformSubmit
});

function onformSubmit(){
	Ti.API.info('Validation start');
	if(zform.isValid()){
		
	}
	
	Ti.API.info('Validation end');
};

var window  = UX.Window({
	backgroundColor: "#fff000",
	
});
zform.render(window);
window.open();
*/



I18N.setLanguage("en", Ti.UI.TEXT_ALIGNMENT_RIGHT);


Ti.API.info("////////////////Master Window ////////////////// is  loading ////////////"); 
var Window;
Window = require(Config.uidir + '/MasterWindow');
var masterWindow = new Window();
masterWindow.open();


/*
//Config.trace("Time:" + Functions.time());
//Config.trace("Time:" + (Functions.time() + (60*5)));

if(Functions.time() > (Functions.getSyncTime() + 300)){

	var SyncWindow = require(Config.uidir + "SyncWindow");
	var synWin = new SyncWindow();
	synWin.open();
	synWin.startSync();
}
else{
	if(!Functions.is_user_login()){
		var LoginWindow = require(Config.uidir + "LoginWindow");
		var login = new LoginWindow();
		login.open();
	}
	else{
						
		var credential = Functions.getUserInfo();
		
		if(credential.id == -1 || credential.password == ""){
			var LoginWindow = require(Config.uidir + "LoginWindow");
			var login = new LoginWindow();
			login.open();
		}
		else{
			
			var HomeWindow = require(Config.uidir+"HomeWindow");
			var win = new HomeWindow(true);
			win.open();
	
		}
		
		
	}
}

*/
