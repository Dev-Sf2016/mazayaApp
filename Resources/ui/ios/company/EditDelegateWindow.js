function EditDelegateWindow(delegate){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Edit Delegate', 'Edit Delegate')));
	
	//self.leftNavButton = leftNavigationButton;

	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
	});

	self.add(rootView);


	//var title = Functions.IOSWindowTitle({}, {text:I18N.text('Add Delegate', 'Add Delegate')}, true, self);

	//rootView.add(title);
	
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		//borderRadius:10,
		top:10,
		hintTextColor: '#ddd',
		hintText: "salem Khan",
		keyboardType: Ti.UI.KEYBOARD_TYPE_DEFAULT,
		//enableReturnKey:true,
		returnKeyType:Ti.UI.RETURNKEY_NEXT,
		font:{
			fontSize:'12sp'
		},
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
	};
	
	// Ti.UI.createTextField({
		// passwordMask:true
// 		
	// });
	
	
	var nameParam = Functions.merge(inputParam, {hintText: I18N.text('Delegate Name', 'Delegate Name'), value:delegate.name});
	var emailParam = Functions.merge(inputParam, {hintText: I18N.text('somoneatsomonedocom', 'simeone@domain.com'), value:delegate.email});
	var passwordParam = Functions.merge(inputParam, {hintText: I18N.text('Password', 'Password'), passwordMask:true});

	var requiredMessage = I18N.text("This field is required", "This field is required");
	var invalidEmailMessage = I18N.text('Email is not valid', 'Email is not valid');
	//var passwordLengthMessage = I18N.text('Password must be between 8 and 40 Characters', 'Password must be between 8 and 40 Characters');
	//ar confirmMessage = I18N.text('Password and confirm password must be equal', 'Password and confirm password must be equal');
	
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
	var name_error = UX.Label(Functions.merge(errorParam, {}));
	var email = UX.TextField(emailParam);
	var email_error = UX.Label(Functions.merge(errorParam, {}));
	//var password = UX.TextField(passwordParam);
	//var password_error = UX.Label(Functions.merge(errorParam, {}));
	//var confirmPassword = UX.TextField(Functions.merge(passwordParam, {hintText: I18N.text("Confirm Password", "Confirm Password")}));
	//var confirmPassword_error = UX.Label(Functions.merge(errorParam, {}));
	
	var C = FM.Constraint;
	
	var $_FIELDS = [];
	$_FIELDS.push({name:name, error:name_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:email, error:email_error, constraints: [new C.Required(requiredMessage), new C.Email(invalidEmailMessage)]});
	// $_FIELDS.push({name:password, error:password_error, constraints: [new C.Required(requiredMessage), new C.Min(passwordLengthMessage, 8), 
			// new C.Max(passwordLengthMessage, 40),  new C.EqualTo(confirmMessage, function(){
		// return confirmPassword.getValue();
	// })]});
	// $_FIELDS.push({name:confirmPassword, error:confirmPassword_error, constraints: [new C.Required(requiredMessage	)]});
	
	var submit = UX.Button({
		title:I18N.text('Edit', 'Edit'),
		width:'60%',
		height:35,
		backgroundColor:'#6895B2',
		color: '#fff',
		top:15
		
	});
	
	submit.addEventListener('click', handleForm);
	
	var wraperView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout: 'vertical',
		top:60
	});
	
	wraperView.add(name);
	wraperView.add(name_error);
	wraperView.add(email);
	wraperView.add(email_error);
	// wraperView.add(password);
	// wraperView.add(password_error);
	// wraperView.add(confirmPassword);
	// wraperView.add(confirmPassword_error);
	wraperView.add(submit);
	
	rootView.add(wraperView);
	
	
	function handleForm(){
		
		if(Functions.isValid($_FIELDS)){
				
			var user = Functions.getUserInfo();
		
			var m = user.modal;
			var param = new SM.ServiceParam('/api/company/' + user.modal.user.company.id + '/delegate.json', I18N.locale, Functions.getXWSEE(AppConstants.COMPANY), 'PATCH'  );
			var postData = {
			  "name": name.getValue(),
			  "email": email.getValue(),
			  "id": delegate.id
			  // "password": {
			    // "first": password.getValue(),
			    // "second": password.getValue()
			  // }
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Updating Delegate', 'Updating Delegate');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
					var obj = JSON.parse(e.responseText);
					alert(obj.message);
					name.setValue('');
					email.setValue('');
					self.fireEvent('updateCompleted', {});
					//password.setValue('');
					//confirmPassword.setValue('');
					
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					//To do handle the error here
					var data = JSON.parse(e.responseText);
					
					if(data.hasOwnProperty('children')){
						var fields = data.children;
						if(fields.name.hasOwnProperty('errors')){
							name_error.applyProperties({
								text: fields.name.errors[0],
								height: Ti.UI.SIZE,
								visible: true
							});
						}
						
						if(fields.email.hasOwnProperty('errors')){
							email_error.applyProperties({
								text: fields.email.errors[0],
								height: Ti.UI.SIZE,
								visible: true
							});
						}
						
						// if(fields.password.children.first.hasOwnProperty('errors')){
							// password_error.applyProperties({
								// text: fields.password.children.first.errors[0],
								// height: Ti.UI.SIZE,
								// visible: true
							// });
						// }
// 						
						// if(fields.password.children.second.hasOwnProperty('errors')){
							// confirmPassword_error.applyProperties({
								// text: fields.password.children.second.errors[0],
								// height: Ti.UI.SIZE,
								// visible: true
							// });
						// }
							
					}
					
				}
			
			};
			
			SM.ServiceManager(param);
		}
	}
    
    
    return self;
	
};

module.exports = EditDelegateWindow;
