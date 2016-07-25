
var NappDrawerModule = require('dk.napp.drawer');

function createAPIExampleWindow(){
	var win = Ti.UI.createWindow();
	
	var data = [
		{title: "Toggle shadow"},
		{title: "Toggle stretch drawer"},
		{title: "Close Drawer"},
		{title: "New Window"},
		{title: "Default Window"},
		{title: "Remove right Drawer"}	
	];
	
	var tableView = Ti.UI.createTableView({
		data:data
	});
	
	tableView.addEventListener("click", function(e){
		Ti.API.info("isLeftWindowOpen: " + drawer.isLeftWindowOpen());
		switch(e.index){
			case 0:
				drawer.setShowShadow(!drawer.showShadow);
				break;
			case 1:
				drawer.setShouldStretchDrawer(!drawer.shouldStretchDrawer);
				break;
			case 2:
				drawer.toggleLeftWindow();
				break;
			case 3:
				var newWin = openNewNavWindow();
				drawer.setCenterWindow(newWin);
				drawer.toggleLeftWindow();
				break;
			case 4:
				drawer.setCenterWindow(createCenterNavWindow());
				drawer.toggleLeftWindow();
				break;
			case 5:
				drawer.setRightWindow(false);
				drawer.toggleLeftWindow();
				break;
		}
	});
	
	win.add(tableView);
	return win;
}


function openNewNavWindow(){
	var leftBtn = Ti.UI.createButton({title:"Left"});
	leftBtn.addEventListener("click", function(){
		drawer.toggleLeftWindow();
	});
	var win = Ti.UI.createWindow({
		backgroundColor:'#222',
		translucent:true,
		extendEdges:[Ti.UI.EXTEND_EDGE_TOP],
		title:"New Nav Window",
		barColor:"#FFA",
		tintColor:"yellow",
		leftNavButton:leftBtn
	});
	
	var navController =  Ti.UI.iOS.createNavigationWindow({
		window : win
	});
	return navController;
}


function createCenterNavWindow(){	
	var leftBtn = Ti.UI.createButton({title:"Left"});
	leftBtn.addEventListener("click", function(){
		drawer.toggleLeftWindow();
	});
	
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#eee',
		translucent:false,
		title:"NappDrawer",
		barColor:"#F9A",
		tintColor:"purple",
		leftNavButton: leftBtn,
		rightNavButton: rightBtn
	});
	
	

	var navController =  Ti.UI.iOS.createNavigationWindow({
		window : win
	});
	return navController;
}

var mainWindow = createCenterNavWindow();

var drawer = NappDrawerModule.createDrawer({
	leftWindow: createAPIExampleWindow(),
	centerWindow: mainWindow,
	rightWindow: Ti.UI.createWindow({backgroundColor:"#FFF"}),
	closeDrawerGestureMode: NappDrawerModule.CLOSE_MODE_ALL,
	openDrawerGestureMode: NappDrawerModule.OPEN_MODE_ALL,
	showShadow: false, //no shadow in iOS7
	leftDrawerWidth: 200,
	rightDrawerWidth: 120,
	statusBarStyle: NappDrawerModule.STATUSBAR_WHITE,  // remember to set UIViewControllerBasedStatusBarAppearance to false in tiapp.xml
	orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT]
});


drawer.open();


 

