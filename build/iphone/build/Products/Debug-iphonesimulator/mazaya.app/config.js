
/**
 * @author: salem Khan 
 */

if(!Ti.App.Properties.getString('SETTING_DATABASE')){
	
}

if (Ti.App.Properties.getString('SETTING_LANGUAGE', '') === '') {
       Ti.App.Properties.setString('SETTING_LANGUAGE','ar');
}


function calculateAppWidth(){
	if(Ti.Platform.osname == 'android'){
		return Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
	}
	else{
		return Ti.Platform.displayCaps.platformWidth;
	}
};
function calculateAppHeight(){
	if(Ti.Platform.osname == "android"){
		return Ti.Platform.displayCaps.platformHeight / Ti.Platform.displayCaps.logicalDensityFactor;
	}
	else{
		return Ti.Platform.displayCaps.platformHeight;
	}
};
function getStatusBarHeight (){
	//Ti.API.log("debug", UTILITY);
	if(exports.osname === 'android'){
		return UTILITY.statusBarHeight / Ti.Platform.displayCaps.logicalDensityFactor;
	}
	
	return 0;
}
exports.appWidth = calculateAppWidth(); // Ti.Platform.displayCaps.platformWidth / Ti.Platform.displayCaps.logicalDensityFactor;
exports.appHeight = calculateAppHeight(); // Ti.Platform.displayCaps.platformHeigh / Ti.Platform.displayCaps.logicalDensityFactor;

exports.trace = function(message){Ti.API.info(message);};

exports.env ="development";
exports.osname = Ti.Platform.osname;
exports.version = Ti.Platform.version;
exports.height = calculateAppHeight();
exports.width =  calculateAppWidth();
//exports.statusBarHeight = getStatusBarHeight();
exports.isTablet =  (exports.osname === 'ipad' ) || (exports.osname === 'android' && (exports.width > 899 || exports.height > 899));
	
exports.uidir = "ui/" + ((exports.osname == 'ipad' || exports.osname == 'iphone' )?'ios':exports.osname) + "/";

exports.loadHomeWindowMap = false;
