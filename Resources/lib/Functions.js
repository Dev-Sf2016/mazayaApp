

/**
 * 
 * @param {string} userName
 * @param {string} secret
 * @param {object} modal
 * @param {string} userType
 * @param {boolean} login
 */
exports.setUserInfo = function(userName, secret, modal, userType, login){

	var user = {};
	user.userName = userName || '';
	user.secret = secret || '';
	user.modal = modal || {};
	user.userType = userType|| 'customer';
	user.login = login || false;


	Ti.App.Properties.setObject("SETTING_USER_LOGIN_INFO", user);

};
/**
 * @return boolean
 */
exports.is_user_login = function(){
	var user =  Ti.App.Properties.getObject("SETTING_USER_LOGIN_INFO", {userName:'', secret:'', modal:{}, userType:'', login:false});
	return user.login;
};
//Ti.App.Properties.setObject("SETTING_USER_LOGIN_INFO", {id:-1, password:""});

exports.logout = function(){
	Ti.App.Properties.setObject("SETTING_USER_LOGIN_INFO", {userName:'', secret:'', modal:{},userType:'',login: false});

	
	Ti.UI.fireEvent("logout", {});
};


exports.getUserInfo = function(){
	
	return Ti.App.Properties.getObject("SETTING_USER_LOGIN_INFO", {userName: "", secret:"", modal:{}, userType:'', login: false});
};
exports.generate = function(){
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
         return v.toString(16);
    });     
    return guid;
};
exports.getXWSEE = function(area){
	area = area || 'anonymous';
	var user = exports.getUserInfo();
	var d = new Date();
	var currentDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " +
		 d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds();
	
	var nonce = Ti.Utils.md5HexDigest( exports.generate());
	
	var passwordDigest = Ti.Utils.base64encode(Ti.Utils.sha1(Ti.Utils.base64encode(nonce) + currentDate +  user.secret));

	Config.trace(currentDate);
	Config.trace(passwordDigest);
	
	var digest = 'UsernameToken Username="' + user.userName + '", area="' + area + '", PasswordDigest="'+ passwordDigest +'", Nonce="'+nonce +'", Created="'+ currentDate + '"';
	
	
	return digest;

};
exports.getAnonymousXWSEE = function(){
	
	var d = new Date();
	var currentDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " " +
		 d.getHours() +":" + d.getMinutes() + ":" + d.getSeconds();
	
	var nonce = Ti.Utils.md5HexDigest( exports.generate());
	
	var passwordDigest = Ti.Utils.base64encode(Ti.Utils.sha1(Ti.Utils.base64encode(nonce) + currentDate ));

	Config.trace(currentDate);
	Config.trace(passwordDigest);
	
	var digest = 'UsernameToken Username="anonumous@anonymous.com", area="anonymous", PasswordDigest="'+ passwordDigest +'", Nonce="'+nonce +'", Created="'+ currentDate + '"';
	
	
	return digest;

};
	

exports.setSyncTime = function(){
	Ti.App.Properties.setDouble("SETTING_SYNC_TIME", exports.time());
};

exports.getSyncTime = function(){
	return Ti.App.Properties.getDouble("SETTING_SYNC_TIME", 0);
};

exports.time = function() {
   return Math.floor(new Date()
    .getTime() / 1000);
};

exports.merge = function(param1, param2){
	var obj = {};
	for(var p in param1){ 
		obj[p] = param1[p];
	}
	
	for(var p in param2){ 
		obj[p] = param2[p];
	}
	
	//Config.trace("MERGE:===" + JSON.stringify(param1));
	return obj; 
};

// UX.Window({
	// width:Ti.UI.FILL,
	// backgroundColor: '#428bca',
	// color:'#fff',
	// barColor:'red',
	// fullscreen:true,
	// ba
// });

/**
 * 
 * @param {string} title
 */
exports.IOSWindowTitle = function(title){
	
	return {
		translucent:true,
		fullscreen:true,
		extendEdges:[Ti.UI.EXTEND_EDGE_TOP],
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff',
		title: title || '',
		barColor:'#6895B2',
		tintColor:"#6895B2",
		titleAttributes:{
			color:'#fff'
		}
	};
};
exports.CloseNaveButton = function(){
	return UX.Label({
		text: ICONS.getIcon('back'),
		color:'#fff',
		font:{
			fontFamily: 'realestate',
			fontSize: '24sp'
		}
	});
};
exports.isValid = function(fields){
		var _valid = true;
		for(var i=0; i< fields.length; i++){
			
			var constraints = fields[i].constraints;
		
			
			for (var j=0; j < constraints.length; j++) {
				
				if(!constraints[j].validate(fields[i].name.getValue())){
					Config.trace( 'i = '+ i +', j = ' + j);
					fields[i].error.setText(constraints[j].message);
					fields[i].error.setVisible(true);
					fields[i].error.setHeight(Ti.UI.SIZE);
					_valid = false;
					break;
				}
				else{
					fields[i].error.setVisible(false);
					fields[i].error.setHeight(1);
				}
			};
			
		}
		
		return _valid;
		
};
exports.getDateForPicker = function(dateString){
	var tmp = dateString.split('-');
    var date = new Date();
    date.setFullYear(tmp[0]);
    date.setMonth(tmp[1]-1);
    date.setDate(tmp[2]);
    
    return;
};
