function ActivationCodeWindow(obj){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Activation Code', 'Code')));

	

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
	
	var lbl = UX.Label({
		width: '90%',
		height:35,
		text:  obj.message,
		multiLine:true,
		font:{
			fontSize:'12sp'
		},
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT
	});
	
	var error_lable = UX.Label({
			width:"90%",
			height:1,
			color: 'red',
			visible:false,
			textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
			font:{
				fontSize:'10sp'
			},
			text:I18N.text('Activation Code is not valid', 'Activation Code is not Valid'),
			height: 0,
			visible:false
		});
	
	var submit = UX.Button({
		width: 150,
		height:35,
		title: I18N.text('Submit', 'Submit')
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
						width: '90%',
						height:35,
						text:  obj.message,
						multiLine:true,
						font:{
							fontSize:'12sp'
						},
						textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
						text: obj.message
					});
					
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
	
	
	
	
	
    
    
    return self;
	
};

module.exports = ActivationCodeWindow;
