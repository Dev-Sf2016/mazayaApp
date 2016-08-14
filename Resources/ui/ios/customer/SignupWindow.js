function SignupWindow(){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Signup', 'Signup')));

	

	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
	});

	self.add(rootView);
	
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		//borderRadius:10,
		top:10,
		hintTextColor: '#ddd',
		hintText: "",
		keyboardType: Ti.UI.KEYBOARD_TYPE_DEFAULT,
		//enableReturnKey:true,
		returnKeyType:Ti.UI.RETURNKEY_NEXT,
		font:{
			fontSize:'12sp'
		},
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
	};
	
    var nameParam = Functions.merge(inputParam, {hintText: I18N.text('Name', 'Name')});
    var emailParam = Functions.merge(inputParam, {hintText: I18N.text('somoneatsomonedocom', 'someone@domain.com')});
    var loyaltyIDParam = Functions.merge(inputParam, {hintText: I18N.text('Loyalty ID', 'Loyalty ID')});
    var nationalityParam = Functions.merge(inputParam, {hintText: I18N.text('Nationality', 'Nationality')});
	var cityParam = Functions.merge(inputParam, {hintText: I18N.text('City', 'City')});
	var passwordParam = Functions.merge(inputParam, {hintText: I18N.text('Password', 'Password'), passwordMask:true});
	//var refererParam = Functions.merge(inputParam, {hintText:I18N.text('Referer Email', 'Referer Email')});
	
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
	
	var loyaltyID = UX.TextField(loyaltyIDParam);
	var loyaltyID_error = UX.Label(Functions.merge(errorParam, {}));
	var nationality = UX.TextField(nationalityParam);
	var nationality_error = UX.Label(Functions.merge(errorParam, {}));
	
	var city = UX.TextField(cityParam);
	var city_error = UX.Label(Functions.merge(errorParam, {}));
	
	var password = UX.TextField(passwordParam);
	var password_error = UX.Label(Functions.merge(errorParam, {}));
	var confirmPassword = UX.TextField(Functions.merge(passwordParam, {hintText: I18N.text("Confirm Password", "Confirm Password")}));
	var confirmPassword_error = UX.Label(Functions.merge(errorParam, {}));
	
	//var refererEmail = UX.TextField(Functions.merge(refererParam, {}));
	//var refererEmail_error = UX.Label(Functions.merge(errorParam, {}));
	
	var C = FM.Constraint;
	
	var $_FIELDS = [];
	$_FIELDS.push({name:name, error:name_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:email, error:email_error, constraints: [new C.Required(requiredMessage), new C.Email(invalidEmailMessage)]});
	$_FIELDS.push({name:loyaltyID, error:loyaltyID_error, constraints: [new C.Required(requiredMessage)]});
	//$_FIELDS.push({name:refererEmail, error:refererEmail_error, constraints: [new C.Email(invalidEmailMessage)]});
	//$_FIELDS.push({name:nationality, error:nationality_error, constraints: [new C.Required(requiredMessage)]});
	
	//$_FIELDS.push({name:city, error:city_error, constraints: [new C.Required(requiredMessage)]});
	
	$_FIELDS.push({name:password, error:password_error, constraints: [new C.Required(requiredMessage), new C.Min(passwordLengthMessage, 8), 
			new C.Max(passwordLengthMessage, 40),  new C.EqualTo(confirmMessage, function(){
		return confirmPassword.getValue();
	})]});
	$_FIELDS.push({name:confirmPassword, error:confirmPassword_error, constraints: [new C.Required(requiredMessage	)]});
	
	var submit = UX.Button({
		title:I18N.text('Signup', 'Signup'),
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
	wraperView.add(loyaltyID);
	wraperView.add(loyaltyID_error);
	wraperView.add(nationality);
	//wraperView.add(nationality_error);
	wraperView.add(city);
	//wraperView.add(city_error);
	
	wraperView.add(password);
	wraperView.add(password_error);
	wraperView.add(confirmPassword);
	wraperView.add(confirmPassword_error);
	//wraperView.add(refererEmail);
	//wraperView.add(refererEmail_error);
	
	wraperView.add(submit);
	
	rootView.add(wraperView);

	function handleForm(){
		
		if(Functions.isValid($_FIELDS)){

			var user = Functions.getUserInfo();
			var param = new SM.ServiceParam('/api/home/registercustomer.json', I18N.locale, Functions.getAnonymousXWSEE(), 'POST'  );
			var postData = {
				"name": name.getValue(),
				"email": email.getValue(),
				"loyality_id": loyaltyID.getValue(),
			 	"nationality": nationality.getValue(),
			  	"city": city.getValue(),
			  	"refferer_email": "",
			  	"password": {
			    	"first": password.getValue(),
			    	"second": password.getValue()
				 
					}
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Signing', 'Signing');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
					
					// name.setValue('');
					// email.setValue('');
					// loyaltyID.setValue('');
					// nationality.setValue('');
					// city.setValue('');
					// password.setValue('');
					// confirmPassword.setValue('');
					var obj = JSON.parse(e.responseText);
					//var Window = require(Config.uidir + 'customer/ActivationCodeWindow');
					
					//var window = new Window(obj);
					//window.addEventListener('close', function(){
						//self.fireEvent('signupSuccess', {});
					//});
					
					//window.open();
					
					rootView.removeAllChildren();
					ActivationScreen(obj);
					
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					
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
						
						if(fields.loyality_id.hasOwnProperty('errors')){
							loyaltyID_error.applyProperties({
								text: fields.loyality_id.errors[0],
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
						
						if(fields.password.children.first.hasOwnProperty('errors')){
							password_error.applyProperties({
								text: fields.password.children.first.errors[0],
								height: Ti.UI.SIZE,
								visible: true
							});
						}
						
						if(fields.password.children.second.hasOwnProperty('errors')){
							confirmPassword_error.applyProperties({
								text: fields.password.children.second.errors[0],
								height: Ti.UI.SIZE,
								visible: true
							});
						}
							
					}
					
				}
			};
			
			SM.ServiceManager(param);
		}
	}
    
    
    function ActivationScreen(obj){
	
		var lbl = UX.Label({
			top: 80,
			width: '90%',
			height:35,
			text:  obj.message,
			multiLine:true,
			font:{
				fontSize:'12sp'
			},
			textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
		});
	
		var error_lable = UX.Label(Functions.merge(errorParam,{text:I18N.text('Activation Code is not valid', 'Activation Code is not Valid')}));
	
		var submit = UX.Button({
			title: I18N.text('Submit', 'Submit'),
			width:'60%',
			height:35,
			backgroundColor:'#6895B2',
			color: '#fff',
			top:15
		});
	
		submit.addEventListener('click', postForm);
		
		var txtcode = UX.TextField(Functions.merge(inputParam, {top:25, hintText: I18N.text('Activation Code', 'Activation Code')}));
		rootView.add(lbl);
		
		rootView.add(txtcode);
	    rootView.add(error_lable);
	    rootView.add(submit);
			
	
		function postForm(){
			
			if(txtcode.getValue() == ''){
				error_lable.applyProperties({
					visible: true,
					height:Ti.UI.SIZE,
				});
				
				return;
			}
			
			error_lable.applyProperties({
				visible: false,
				height: 0
			});
			
			var param = new SM.ServiceParam('/api/home/activatecustomer.json', I18N.locale, '', 'POST'  );
			var postData = {
				"email": obj.email,
				"id": obj.id,
				"code": txtcode.getValue(),
				"hash": obj.hash
			};
			
			param.postData = JSON.stringify(postData);
			
			param.wsse = Functions.getAnonymousXWSEE();
			param.context = self;
			param.loaderMessage = I18N.text('Signing', 'Signing');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
				
					var obj = JSON.parse(e.responseText);
					rootView.removeAllChildren();
					
					var lbl = UX.Label({
						top:100,
						width: '90%',
						height:35,
						multiLine:true,
						font:{
							fontSize:'12sp'
						},
						textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
						text: obj.message
					});
					rootView.add(lbl);
					
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					var obj = JSON.parse(e.responseText);
					error_lable.applyProperties({
						visible: true,
						height: Ti.UI.SIZE,
						text: obj.message
					});
				}
			};
			
			SM.ServiceManager(param);	
		
		}
	
    }
    
    
    return self;
	
};

module.exports = SignupWindow;
