function UploadfDiscountWindow(discount, base_url){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Update Discount', 'Update Discount')));
	
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
		keyboardType: Ti.UI.KEYBOARD_TYPE_DEFAULT,
		//enableReturnKey:true,
		returnKeyType:Ti.UI.RETURNKEY_NEXT,
		textAlign: (I18N.direction == 'ltr')?Ti.UI.TEXT_ALIGNMENT_LEFT:Ti.UI.TEXT_ALIGNMENT_RIGHT,
		font:{
			fontSize:'12sp'
		}
		
	};
	
	var maxDate = new Date();
	maxDate.setYear(maxDate.getYear()+50);
	
	var titleParam = Functions.merge(inputParam, {hintText: I18N.text('Enter title', 'Enter title'), value: discount.title});
	var startDateParam = Functions.merge(inputParam, {hintText: I18N.text('Start Date', 'Start Date'), maxDate: maxDate,value: discount.start_date, date:Functions.getDateForPicker(discount.start_date)});
	var endDateParam = Functions.merge(inputParam, {hintText: I18N.text('End Date', 'End Date'), maxDate: maxDate, value: discount.end_date, date: Functions.getDateForPicker(discount.end_date)});
	var promotionParam = {top:10,width:'90%',height:Ti.UI.SIZE, title:I18N.text('Browse', 'Browse'), imageUrl: base_url + "/" + discount.company.id + "/" + discount.promotion};
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
		
			var user = Functions.getUserInfo();
			var param = new SM.ServiceParam('/api/company/' + user.modal.user.company.id +'/discount.json', I18N.locale, Functions.getXWSEE(AppConstants.COMPANY), 'PATCH'  );
			var postData = {
				title: discountTitle.getValue(),
				startDate: startDate.getValue(),
				endDate: endDate.getValue(),
				id:discount.id
			};
			if(promotion.getValue() !== ''){
				postData.promotion =  Ti.Utils.base64encode(promotion.getValue()).toString();
				postData.mimeType = promotion.getValue().mimeType;
			}
			param.postData = JSON.stringify(postData);
			param.callBack = addingDiscount;
			param.context = self;
			param.loaderMessage = I18N.text('Adding Discount', 'Adding Discount');
			SM.ServiceManager(param);
		}
	}
	
	function addingDiscount(e){
		if(e.status == HTTP_CODES.HTTP_OK){
			var obj = JSON.parse(e.responseText);
			alert(obj.message);
			discountTitle.setValue('');
			startDate.setValue('');
			//logo.setValue('');
			endDate.setValue('');
			
			
		}
		else if(e.status == HTTP_CODES.HTTP_BADE_REQUEST){
					//To do handle the error here
			var data = JSON.parse(e.responseText);
			
			if(data.hasOwnProperty('children')){
				var fields = data.children;
				if(fields.title.hasOwnProperty('errors')){
					discountTitle_error.applyProperties({
						text: fields.title.errors[0],
						height: Ti.UI.SIZE,
						visible: true
					});
				}
				
				if(fields.startDate.hasOwnProperty('errors')){
					startDate_error.applyProperties({
						text: fields.startDate.errors[0],
						height: Ti.UI.SIZE,
						visible: true
					});
				}	
						
				if(fields.endDate.hasOwnProperty('errors')){
					endDate_error.applyProperties({
						text: fields.endDate.errors[0],
						height: Ti.UI.SIZE,
						visible: true
					});
				}
						
				if(fields.promotion.hasOwnProperty('errors')){
					promotion_error.applyProperties({
						text: fields.promotion.errors[0],
						height: Ti.UI.SIZE,
						visible: true
					});
				}
							
			}
			
		}
			
	}
	
	return self;
	
};

module.exports = UploadfDiscountWindow;
