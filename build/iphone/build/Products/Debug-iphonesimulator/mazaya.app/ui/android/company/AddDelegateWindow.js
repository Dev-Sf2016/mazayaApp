function AddDelegateWindow(){
	
	var self = UX.Window(Functions.merge(Functions.WindowTitle, {
		title: I18N.text('Add Delegate', 'Add Delegate'),
		layout: 'vertical'
	}));
	
	
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		borderRadius:10,
		top:10,
		hintTextColor: '#ddd'
	};
	
	// Ti.UI.createTextField({
// 		
// 		
	// });
	
	var nameParam = Functions.merge(inputParam, {hintText: I18N.text('Delegate Name', 'Delegate Name')});
	var emailParam = Functions.merge(inputParam, {hintText: I18N.text('somoneatsomonedocom', 'simeone@domain.com')});
	var passwordParam = Functions.merge(inputParam, {hintText: I18N.text('Password', 'Password')});
	
	var requiredMessage = I18N.text("This field is required", "This field is required");
	var invalidEmailMessage = I18N.text('Email is not valid', 'Email is not valid');
	var passwordLengthMessage = I18N.text('Password must be between 8 and 40 Characters', 'Password must be between 8 and 40 Characters');
	var confirmMessage = I18N.text('Password and confirm password must be equal', 'Password and confirm password must be equal');
	
	var C = FM.Constraint;
	var form = new FM.TiForm();
	form.add('name', FM.Constants.INPUT, nameParam, [new C.Required(requiredMessage)]);
	form.add('email', FM.Constants.INPUT, emailParam, [new C.Required(requiredMessage), new C.Email(invalidEmailMessage)]);
	
	form.add('password', FM.Constants.INPUT, passwordParam, [new C.Required(requiredMessage), new C.EqualTo(form, 'confirmPassword', confirmMessage)]);
	form.add('confirmPassword', FM.Constants.INPUT, passwordParam, [new C.Required(requiredMessage)]);
	form.add('submit', FM.Constants.SUBMIT, {
		title:I18N.text('Add', 'Add'),
		width:'60%',
		height:35,
		onClick: handleForm
	});
	

	form.render(self);
	
	function handleForm(){
		if(form.isValid()){
			var data = form.getData();
			var user = Functions.getUserInfo();
			
			//TODO: make the company id dynamic
			var param = new SM.ServiceParam('/api/company/1/delegate.json', I18N.locale, Functions.getXWSEE(), 'POST'  );
			var postData = {
			  "name": data.name,
			  "email": data.email,
			  "password": {
			    "first": data.password,
			    "second": data.password
			  }
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Adding Delegate', 'Adding Delgate');
			
			param.callBack = function(e){
				if(e.status == HTTP_CODES.HTTP_OK){
					alert(I18N.text("Delegate is added successfully", "Delegate is added successfully"));
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
