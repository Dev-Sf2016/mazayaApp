function UploadfDiscountWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Upload Discount', 'Upload Discount')));
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical'
	});

	self.add(rootView);
	
	//var title = Functions.IOSWindowTitle({}, {text:I18N.text('Upload Discount', 'Upload Discount')}, true, self);

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
	
	
	var titleParam = Functions.merge(inputParam, {hintText: I18N.text('Enter title', 'Enter title')});
	var startDateParam = Functions.merge(inputParam, {hintText: I18N.text('Start Date', 'Start Date')});
	var endDateParam = Functions.merge(inputParam, {hintText: I18N.text('End Date', 'End Date')});
	var promotionParam = {top:10,width:'90%',height:Ti.UI.SIZE, title:I18N.text('Browse', 'Browse')};
	var requiredMessage = I18N.text("This field is required", "This field is required");
	
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
	
	var C = FM.Constraint;
	
	$_FIELDS = [];
	
	
	var discountTitle = UX.TextField(titleParam);
	var discountTitle_error = UX.Label(errorParam);
	var startDate = UX.DatePicker(startDateParam);
	var startDate_error = UX.Label(errorParam);
	var endDate = UX.DatePicker(endDateParam);
	var endDate_error = UX.Label(errorParam);
	var promotion = UX.File(promotionParam);
	var promotion_error = UX.Label(errorParam);
	
	var submit = UX.Button({
		top:20,
		title:I18N.text('Upload', 'Upload'),
		width:'60%',
		height:35,
		backgroundColor:'#6895B2',
		color: '#fff'
	});
	
	submit.addEventListener('click', handleForm);
	
	$_FIELDS.push({name:discountTitle, error:discountTitle_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:startDate, error:startDate_error, constraints: [new C.Required(requiredMessage)]});
	$_FIELDS.push({name:endDate, error:endDate_error, constraints: [new C.Required(requiredMessage)]});
	
	var wraperView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
		top: 60
	});
	
	wraperView.add(discountTitle);
	wraperView.add(discountTitle_error);
	wraperView.add(startDate);
	wraperView.add(startDate_error);
	wraperView.add(endDate);
	wraperView.add(endDate_error);
	wraperView.add(promotion);
	wraperView.add(submit);
	
	rootView.add(wraperView);
	
	
	function handleForm(){
		if(Functions.isValid($_FIELDS)){
			//TODO: Save and upload the data
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
