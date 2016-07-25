function SignupWindow(){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Signup', 'Signup')));

	

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
		hintText: "",
		font:{
			fontSize:'12sp'
		},
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
	};
	
	// Ti.UI.createTextField({
		// passwordMask:true
// 		
	// });
	
	
            
    var nameParam = Functions.merge(inputParam, {hintText: I18N.text('Company Name', 'Company Name')});
    var urlParam = Functions.merge(inputParam, {hintText: I18N.text('Website URL', 'Website URL')});
    var logoParam = {top:10,width:'90%',height:Ti.UI.SIZE, title:I18N.text('Browse', 'Browse')};;
    
	var delegateNameParam = Functions.merge(inputParam, {hintText: I18N.text('Delegate Name', 'Delegate Name')});
	var emailParam = Functions.merge(inputParam, {hintText: I18N.text('somoneatsomonedocom', 'someone@domain.com')});
	var passwordParam = Functions.merge(inputParam, {hintText: I18N.text('Password', 'Password'), passwordMask:true});

	var requiredMessage = I18N.text("This field is required", "This field is required");
	var invalidEmailMessage = I18N.text('Email is not valid', 'Email is not valid');
	var passwordLengthMessage = I18N.text('Password must be between 8 and 40 Characters', 'Password must be between 8 and 40 Characters');
	var confirmMessage = I18N.text('Password and confirm password must be equal', 'Password and confirm password must be equal');
	var invalidUrlMessage = I18N.text('Enter a valid URL', 'Enter a valid URL');
	
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
	var url = UX.TextField(urlParam);
	var url_error = UX.Label(Functions.merge(errorParam, {}));
	var logo = new UX.File(logoParam);
	var logo_error = UX.Label(Functions.merge(errorParam, {}));
	
	var delegateName = UX.TextField(delegateNameParam);
	var delegateName_error = UX.Label(Functions.merge(errorParam, {}));
	var email = UX.TextField(emailParam);
	var email_error = UX.Label(Functions.merge(errorParam, {}));
	var password = UX.TextField(passwordParam);
	var password_error = UX.Label(Functions.merge(errorParam, {}));
	var confirmPassword = UX.TextField(Functions.merge(passwordParam, {hintText: I18N.text("Confirm Password", "Confirm Password")}));
	var confirmPassword_error = UX.Label(Functions.merge(errorParam, {}));
	
	var C = FM.Constraint;
	
	var $_FIELDS = [];
	$_FIELDS.push({name:name, error:name_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:url, error:url_error, constraints: [new C.Required(requiredMessage), new C.URL(invalidUrlMessage)]});
	$_FIELDS.push({name:logo, error:logo_error, constraints: [new C.Required(requiredMessage)]});
	
	$_FIELDS.push({name:delegateName, error:delegateName_error, constraints: [new C.Required(requiredMessage)]});
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
	
	var wraperView = UX.ScrollView({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE,
		layout: 'vertical',
		top:60,
		showVerticalScrollIndicator:true
	});
	
	wraperView.add(name);
	wraperView.add(name_error);
	wraperView.add(url);
	wraperView.add(url_error);
	wraperView.add(logo);
	wraperView.add(logo_error);
	wraperView.add(delegateName);
	wraperView.add(delegateName_error);
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
			var param = new SM.ServiceParam('/api/home/registercompany.json', I18N.locale, '', 'POST'  );
			var postData = {
				"name": name.getValue(),
				"logo": Ti.Utils.base64encode(logo.getValue()).toString(),
				"url": url.getValue(),
				"companyDelegate": [{
				 	"name": delegateName.getValue(),
				  	"email": email.getValue(),
				  	"password": {
				    	"first": password.getValue(),
				    	"second": password.getValue()
				  }
				}],
				
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Signing', 'Signing');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
					alert(I18N.text("Company Registering successfully", "Company Registering successfully"));
					name.setValue('');
					url.setValue('');
					//logo.setValue('');
					delegateName.setValue('');
					email.setValue('');
					password.setValue('');
					confirmPassword.setValue('');
					
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					//To do handle the error here
					var data = JSON.parse(e.responseText);
					
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

module.exports = SignupWindow;
