

function InviteFriendWindow(){
	var self = UX.Window(Functions.IOSWindowTitle( I18N.text("Invite Friend", "Invite Friend")));
	
	//var title = Functions.IOSWindowTitle({top:0}, {text: I18N.text("Loyalty Point", "Loyalty Points")}, true, self);
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var wraperView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:'vertical',
		top:60
	});
	//rootView.add(title);
	
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		//borderRadius:10,
		top:10,
		hintTextColor: '#ddd',
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:{
			fontSize:'12sp'
		}
		
	};
	
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
	
	var email = UX.TextField(Functions.merge( inputParam, {hintText: I18N.text('Email', 'Email')}));
	var email_error = UX.Label(Functions.merge( errorParam, {height:0, text: I18N.text('Email', 'Email')}));
	
	var submit = UX.Button({
		title:I18N.text('Send', 'Send'),
		width:'60%',
		height:35,
		backgroundColor:'#6895B2',
		color: '#fff',
		top:15
	});
	
	wraperView.add(email);
	wraperView.add(email_error);
	wraperView.add(submit);
	
	submit.addEventListener('click', handleForm);
	var C = FM.Constraint;
	
	$_FIELDS = [];
	
	$_FIELDS.push({name:email, error:email_error, constraints: [new C.Required('This Field is Required', 'This Field is Required'), 
		new C.Email('Not A valid email address', 'Not A valid email address')]});
	
	
	function handleForm(){
		
		if(Functions.isValid($_FIELDS)){
			
			var user = Functions.getUserInfo();
			
			//TODO: make the customer id dynamic
			var param = new SM.ServiceParam('/api/customer/1/invitefriend.json', I18N.locale, Functions.getXWSEE(), 'POST'  );
			var postData = {
			  "email": email.getValue()
			};
			
			param.postData = JSON.stringify(postData);
			//param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Sending Invitation', 'Sending Invitation');
			
			param.callBack = function(e){
				
				if(e.status == HTTP_CODES.HTTP_OK){
					alert(I18N.text("Invitaion is sended successfully", "Invitaion is sended successfully"));
					email.setValue('');
				}
				else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					//To do handle the error here
					var data = JSON.parse(e.responseText);
					
					if(data.hasOwnProperty('children')){
						var fields = data.children;
						
						if(fields.email.hasOwnProperty('errors')){
							
							email_error.setText(fields.email.errors[0]);
							email_error.setVisible(true);
							email_error.setHeight(Ti.UI.SIZE);
						}
					}
					
				}
			};
			
			SM.ServiceManager(param);
		}
	};
  
  rootView.add(wraperView);

	self.add(rootView);

	return self;
}

module.exports = InviteFriendWindow;