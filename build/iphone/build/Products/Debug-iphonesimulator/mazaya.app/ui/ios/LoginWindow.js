
function LoginWindow(type){
	
	
	var self = UX.Window({
		translucent:true,
		fullscreen:true,
		extendEdges:[Ti.UI.EXTEND_EDGE_TOP],
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff',
		layout: 'vertical',
		title:"khan",
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
		hintTextColor: '#ddd'
	};
	
	
	var nameParam = Functions.merge(inputParam, {
		hintText: I18N.text('User name', "User name"),
		value:"salemkhan2001@gmail.com"
	});
	
	var passParam = Functions.merge(inputParam, {
		hintText: I18N.text('Password', 'Password'),
		passwordMask:true,
		value:"12345678"
	});
	
	var form1 = new FM.TiForm();
	form1.add('name', FM.Constants.INPUT, nameParam, [new FM.Constraint.Required(I18N.text("This field is required", "This field is required"))]);
	form1.add('password', FM.Constants.INPUT, passParam, [new FM.Constraint.Required(I18N.text("This field is required","This field is required"))]);
	form1.add(
		'submit', 
		FM.Constants.SUBMIT, {
			width:'60%', 
			height:35,
			title:I18N.text('Login', 'Login'),
			onClick: handleForm
		}
	);
	
	form1.render(wraperView);
	
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
			Functions.setUserInfo(user.userName, user.secret, modal[type], type, true);
			
			self.fireEvent('loginSuccess', {});
		}
		
		if(e.status == HTTP_CODES.HTTP_NO_CONTENT)
			Config.trace(e.responseText);
		//alert(e);
	};
	
	
	function handleForm(e){
		Config.trace(Functions.getXWSEE());
		if(form1.isValid()){
			var data = form1.getData();
			Functions.setUserInfo(data.name, Ti.Utils.md5HexDigest(data.password), {}, type, false);
			var param = new SM.ServiceParam('/api/'+type+"/1.json", I18N.locale, Functions.getXWSEE(), 'GET'  );
			param.postData = {};
			param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Trying to login', 'Trying to login');
			SM.ServiceManager(param);	
		}
	}
	
	return self;
	
};

module.exports = LoginWindow;



