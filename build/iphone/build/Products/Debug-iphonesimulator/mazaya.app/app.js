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
var Layout = require('lib/Layout');
var SM = require("lib/ServiceManager");
var FM = require('lib/form/FormModule');
var Functions = require('lib/Functions');
var HTTP_CODES = require('lib/Codes'); 
var sprintf = require('lib/Sprintf').sprintf;
/**Nap Drawer Module */
var NappDrawerModule = require('dk.napp.drawer');

var HomeWindow = require(Config.uidir+"HomeWindow");
var LoginWindow = require(Config.uidir + "LoginWindow");
var SignupWindow = require(Config.uidir + "SignupWindow");
var LeftWindow = require(Config.uidir + "LeftWindow");
var StoresWindow = require(Config.uidir + "StoresWindow");
var DiscountWindow = require(Config.uidir + "DiscountWindow");
var AccountWindow = require(Config.uidir + 'AccountWindow');


I18N.setLanguage("en", Ti.UI.TEXT_ALIGNMENT_RIGHT);

var leftNavigationButton = UX.Label({
	text: "Menu",
	width:Ti.UI.SIZE,
	height:Ti.UI.SIZE,
	color:'#fff',
	
});

var leftWindow = new LeftWindow();
var hWindow = new HomeWindow();
hWindow.setLeftNavButton(leftNavigationButton);
homeWindow = createNaveWindow(hWindow);
var drawer = NappDrawerModule.createDrawer({
	leftWindow: leftWindow,
	centerWindow: homeWindow,
	//rightWindow: Ti.UI.createWindow({backgroundColor:"#FFF"}),
	closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
	openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
	showShadow: true, //no shadow in iOS7
	leftDrawerWidth: Config.appWidth - Config.appWidth/4,
	//rightDrawerWidth: 120,
	statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
	orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
});



leftNavigationButton.addEventListener('click', function(e){
	drawer.toggleLeftWindow();
});

leftWindow.addEventListener('Menu:Click', function(e){
	switch(e.rowData.name){
			
		case 'LOGIN_AS_COMPANY': 
			var loginWindow = new LoginWindow('company');
			loginWindow.setLeftNavButton(leftNavigationButton);
			loginWindow.addEventListener('loginSuccess', loginSuccess);
			drawer.setCenterWindow(createNaveWindow(loginWindow) );
			
			break;
		case 'LOGIN_AS_CUSTOMER': 
			var loginWindow = new LoginWindow('customer');
			loginWindow.setLeftNavButton(leftNavigationButton);
			loginWindow.addEventListener('loginSuccess', loginSuccess);
			drawer.setCenterWindow(createNaveWindow(loginWindow) );
			break;
		case 'SIGNUP_AS_COMPANY':
			var SignupWindow = require(Config.uidir + 'company/SignupWindow');
			var signupWindow = new SignupWindow();
			signupWindow.setLeftNavButton(leftNavigationButton);
			signupWindow.addEventListener('signupSuccess', function(e){
				
			});
			drawer.setCenterWindow(createNaveWindow(signupWindow) );
			break;
		case 'SIGNUP_AS_CUSTOMER':
			var SignupWindow = require(Config.uidir + 'customer/SignupWindow');
			var signupWindow = new SignupWindow();
			signupWindow.setLeftNavButton(leftNavigationButton);
			signupWindow.addEventListener('signupSuccess', function(e){
				
			});
			drawer.setCenterWindow(createNaveWindow(signupWindow) );
			break;

	}
	
	drawer.toggleLeftWindow();
});

leftWindow.addEventListener('Menu:Company:Click', function(e){
	var _name = e.rowData.name;
	if(_name == 'welcome') return;
	if(_name == 'logout'){
		Functions.logout();
		leftWindow.switchMenu('Menu');
		drawer.setCenterWindow(homeWindow);
		drawer.toggleLeftWindow();
		return;
	};
	
	var Window = require(_name);
	var win = new Window();
	win.setLeftNavButton(leftNavigationButton);
	drawer.setCenterWindow(createNaveWindow(win));
	drawer.toggleLeftWindow(); 
});

leftWindow.addEventListener('Menu:Customer:Click', function(e){
	var _name = e.rowData.name;
	if(_name == 'welcome') return;
	if(_name == 'logout'){
		Functions.logout();
		leftWindow.switchMenu('Menu');
		drawer.setCenterWindow(homeWindow);
		drawer.toggleLeftWindow();
		return;
	};
	
	var Window = require(_name);
	var win = new Window();
	win.setLeftNavButton(leftNavigationButton);
	drawer.setCenterWindow(createNaveWindow(win));
	drawer.toggleLeftWindow(); 
	
});


function createNaveWindow(window){
	var navWin = Ti.UI.iOS.createNavigationWindow({
		window: window
	});
	
	return navWin;
}

function loginSuccess(){
	var user = Functions.getUserInfo();
	
	if(user.userType == 'company'){
		leftWindow.switchMenu('company');
		
	}
	if(user.userType == 'customer'){
		leftWindow.switchMenu('customer');
	}
	
	drawer.setCenterWindow(homeWindow);
	//drawer.toggleLeftWindow();	
}

drawer.open();
