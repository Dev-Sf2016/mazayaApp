
function LoginWindow(type){
	
	
	var self = UX.Window({
		translucent:true,
		fullscreen:true,
		extendEdges:[Ti.UI.EXTEND_EDGE_TOP],
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff',
		barColor:'#6895B2',
		tintColor:"#6895B2",
		titleAttributes:{
			color:'#fff'
		},
		leftNavButton: leftNavigationButton
	});
	
	var titleText = '';
	if(type == 'company')
		titleText = I18N.text('Company Login', 'Company Login');
	if(type == 'customer')
		titleText = I18N.text('Customer Login', 'Customer Login');
	
	//var title = Functions.IOSWindowTitle({}, {text:titleText}, true, self);
	
	self.setTitle(titleText);
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
	});
	
	var wraperView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:"vertical",
		top:60
	});

	rootView.add(wraperView);
	
	self.add(rootView);
	   
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		borderRadius:10,
		top:10,
		hintTextColor: '#ddd',
		keyboardType: Ti.UI.KEYBOARD_TYPE_DEFAULT,
		//enableReturnKey:true,
		returnKeyType:Ti.UI.RETURNKEY_NEXT,
	};
	
	
	var nameParam = Functions.merge(inputParam, {
		hintText: I18N.text('Email', "Email"),
		//value:"salemkhan2001@gmail.com"
	});
	
	var passParam = Functions.merge(inputParam, {
		hintText: I18N.text('Password', 'Password'),
		passwordMask:true,
		//value:"12345678"
	});
	
	var errorParam = {
		width:"90%",
		height:1,
		color: 'red',
		visible:false,
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:{
			fontSize:'10sp'
		}
	};
	
	var name = UX.TextField(nameParam);
	var name_error = UX.Label(errorParam);
	var password = UX.TextField(passParam);
	var password_error = UX.Label(errorParam);
	
	var C = FM.Constraint;
	
	var $_FIELDS = [];
	$_FIELDS.push({name:name, error:name_error, constraints: [new C.Required(I18N.text("This field is required", "This field is required"))]});
	$_FIELDS.push({name:password, error:password_error, constraints: [new C.Required(I18N.text("This field is required", "This field is required"))]});
	
	var submit = UX.Button({
		title:I18N.text('Login', 'Login'),
		width:'60%',
		height:35,
		backgroundColor:'#6895B2',
		color: '#fff',
		top:15
		
	});
	
	submit.addEventListener('click', handleForm);
	
	wraperView.add(name);
	wraperView.add(name_error);
	wraperView.add(password);
	wraperView.add(password_error);
	
	wraperView.add(submit);
	
	
	/**
	 * 
 	 * @param {Ti.Network.HTTPClient} e
	 */
	function loginServiceResponse(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			//Login is successfull
			var user = Functions.getUserInfo();
			var modal = JSON.parse( e.responseText);
			
			user.login = true;
			Functions.setUserInfo(user.userName, user.secret, modal, type, true);
			
			self.fireEvent('loginSuccess', {});
		}
		else if(e.status == HTTP_CODES.HTTP_UN_AUTHORIZED || e.status == HTTP_CODES.HTTP_NON_AUTHORITATIVE || e.status == HTTP_CODES.HTTP_INTERNAL_SERVER_ERROR){
			
			alert(I18N.text('Username or Passowrod is not valid', 'Username or Passowrod is not valid'));
		}
		else if(e.status == HTTP_CODES.HTTP_NO_CONTENT){
			
			Config.trace(e.responseText);
		}
		//alert(e);
	};
	
	
	function handleForm(e){
		//Config.trace(Functions.getXWSEE(type));
		if(Functions.isValid($_FIELDS)){
			
			Functions.setUserInfo(name.getValue(), Ti.Utils.md5HexDigest(password.getValue()), {}, type, false);
			var param = new SM.ServiceParam('/api/'+type+"/login.json", I18N.locale, Functions.getXWSEE(type), 'GET'  );
			param.postData = "";
			param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Trying to login', 'Trying to login');
			SM.ServiceManager(param);	
		}
	}
	
	return self;
	
};

module.exports = LoginWindow;



