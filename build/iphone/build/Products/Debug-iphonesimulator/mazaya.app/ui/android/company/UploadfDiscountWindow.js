function UploadfDiscountWindow(){
	var self = UX.Window({
		title: I18N.text('Upload Discount', 'Upload Discount'),
		layout: 'vertical',
		backgroundColor:"#fff"
		
	});
	
	
	var inputParam = {
		width:"90%",
		height:35,
		borderColor:"#eee",
		borderWidth:1,
		borderRadius:10,
		top:10,
		hintTextColor: '#ddd'
		
	};
	
	
	var titleParam = Functions.merge(inputParam, {hintText: I18N.text('Enter title', 'Enter title')});
	var startDateParam = Functions.merge(inputParam, {hintText: I18N.text('Start Date', 'Start Date')});
	var endDateParam = Functions.merge(inputParam, {hintText: I18N.text('End Date', 'End Date')});
	var promotions = {backgroundColor:'#eee', layout:"horizontal", top:10, title:I18N.text('Browse', 'Browse')};
	var requiredMessage = I18N.text("This field is required", "This field is required");
	
	var C = FM.Constraint;
	var form = new FM.TiForm();
	form.add('title', FM.Constants.INPUT, titleParam, [new C.Required(requiredMessage)]);
	form.add('startDate', FM.Constants.DATEPICKER, startDateParam, [new C.Required(requiredMessage)]);
	form.add('endDate', FM.Constants.DATEPICKER, endDateParam, [new C.Required(requiredMessage)]);
	form.add('promotion', FM.Constants.FILE, promotions, [new C.Required(requiredMessage)]);
	
	form.add('submit', FM.Constants.SUBMIT, {
		title:I18N.text('Upload', 'Upload'),
		width:'60%',
		height:35,
		onClick: handleForm
	});
	

	form.render(self);
	
	function handleForm(){
		if(form.isValid()){
			var data = form.getData();
			var user = Functions.getUserInfo();
			var param = new SM.ServiceParam('/api/delegate.json', I18N.locale, Functions.getXWSEE(), 'POST'  );
			param.postData = {};
			param.callBack = loginServiceResponse;
			param.context = self;
			param.loaderMessage = I18N.text('Trying to login', 'Trying to login');
			SM.ServiceManager(param);
		}
	}
	
	
	
	return self;
	
};

module.exports = UploadfDiscountWindow;
