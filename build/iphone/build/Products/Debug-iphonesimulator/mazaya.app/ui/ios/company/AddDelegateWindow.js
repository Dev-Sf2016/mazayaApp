function AddDelegateWindow(){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Add Delegate', 'Add Delegate')));


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
		font:{
			fontSize:'12sp'
		},
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
	};
	
	// Ti.UI.createTextField({
		// passwordMask:true
// 		
	// });
	
	
	var nameParam = Functions.merge(inputParam, {hintText: I18N.text('Delegate Name', 'Delegate Name')});
	var emailParam = Functions.merge(inputParam, {hintText: I18N.text('somoneatsomonedocom', 'simeone@domain.com')});
	var passwordParam = Functions.merge(inputParam, {hintText: I18N.text('Password', 'Password'), passwordMask:true});

	var requiredMessage = I18N.text("This field is required", "This field is required");
	var invalidEmailMessage = I18N.text('Email is not valid', 'Email is not valid');
	var passwordLengthMessage = I18N.text('Password must be between 8 and 40 Characters', 'Password must be between 8 and 40 Characters');
	var confirmMessage = I18N.text('Password and confirm password must be equal', 'Password and confirm password must be equal');
	
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
	var password = UX.TextField(passwordParam);
	var password_error = UX.Label(Functions.merge(errorParam, {}));
	var confirmPassword = UX.TextField(Functions.merge(passwordParam, {hintText: I18N.text("Confirm Password", "Confirm Password")}));
	var confirmPassword_error = UX.Label(Functions.merge(errorParam, {}));
	
	var C = FM.Constraint;
	
	var $_FIELDS = [];
	$_FIELDS.push({name:name, error:name_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:email, error:email_error, constraints: [new C.Required(requiredMessage), new C.Email(invalidEmailMessage)]});
	$_FIELDS.push({name:password, error:password_error, constraints: [new C.Required(requiredMessage), new C.Min(passwordLengthMessage, 8), 
			new C.Max(passwordLengthMessage, 40),  new C.EqualTo(confirmMessage, function(){
		return confirmPassword.getValue();
	})]});
	$_FIELDS.push({name:confirmPassword, error:confirmPassword_error, constraints: [new C.Required(requiredMessage	)]});
	
	var submit = UX.Button({
		title:I18N.text('Add', 'Add'),
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
	wraperView.add(password);
	wraperView.add(password_error);
	wraperView.add(confirmPassword);
	wraperView.add(confirmPassword_error);
	wraperView.add(submit);
	
	rootView.add(wraperView);
	
	
	function handleForm(){
		
		if(Functions.isValid($_FIELDS)){
			
			
			var user = Functions.getUserInfo();
			
			//TODO: make the company id dynamic
			//TODO: Handle unique constraints
			var param = new SM.ServiceParam('/api/company/1/delegate.json', I18N.locale, Functions.getXWSEE(), 'POST'  );
			var postData = {
			  "name": name.getValue(),
			  "email": email.getValue(),
			  "password": {
			    "first": password.getValue(),
			    "second": password.getValue()
			  }
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Adding Delegate', 'Adding Delgate');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
					alert(I18N.text("Delegate is added successfully", "Delegate is added successfully"));
					name.setValue('');
					email.setValue('');
					password.setValue('');
					confirmPassword.setValue('');
					
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					//To do handle the error here
					var data = JSON.parse(e.responceText);
					
					if(data.hasOwnProperty('children')){
						var fields = data.children;
						
						if(fields.name.hasOwnProperty('errors')){
							
						}
							
					}
					
				}
			};
			
			SM.ServiceManager(param);
		}
	}
    
    
    return self;
	
};

module.exports = AddDelegateWindow;
