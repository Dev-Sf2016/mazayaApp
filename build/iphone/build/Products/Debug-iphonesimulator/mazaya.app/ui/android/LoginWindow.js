
function LoginWindow(type){
	
	var self = UX.Window({
		fullscreen:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff'
	});


// Ti.UI.createTextField({
	// borderColor:"#eee",
	// borderWidth:1,
	// borderRadius:10,
// 	
// });

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
	
	form1.render(self);
	
	/**
	 * 
 	 * @param {Ti.Network.HTTPClient} e
	 */
	function loginServiceResponse(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			//Login is successfull
			var user = Functions.getUserInfo();
			Functions.setUserInfo(user.username, user.password, type, true);
			
			self.fireEvent('loginSuccessfull', {});
		}
		Config.trace(e.responseText);
		//alert(e);
	};
	
	
	function handleForm(e){
		if(form1.isValid()){
			var data = form1.getData();
			Functions.setUserInfo(data.name, Ti.Utils.md5HexDigest(data.password), type, false);
			var param = new SM.ServiceParam('/api/'+type+".json", I18N.locale, Functions.getXWSEE(), 'GET'  );
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



