function ListDiscountWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Discount List', 'Discount List')));

	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
		top: 60
	});

	self.add(rootView);
	var grid = UX.ScrollView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		scrollType:"vertical",
		layout:'vertical'
	});
	
		
	var dateLabeParam = {
			width:Ti.UI.SIZE,
			font:{
				fontSize: '12sp'
			},
			color:'#336692'
		};
		
		var dateValueParam = {
			width:Ti.UI.SIZE,
			font:{
				fontSize: '10sp'
			},
			
		};
		
	function wrapeLabelValue(title, value){
		var wraper = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		
		Layout.ApplyHorizontalLayout(wraper, [UX.Label(Functions.merge(dateLabeParam, {text: title})), UX.Label(Functions.merge(dateValueParam, {text: value}))],10, 5,I18N.direction);
		
		return wraper;
		
	}
	function createGridItem(discount, base_url){
		var item = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			center:'y',
			top:10
		});
		var rowView = UX.View({
			//width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'vertical',
			borderColor: '#eee',
			borderWidth:1,
			left:5,
			right:5
		});
		
		
		var title = UX.Label({
			width:Ti.UI.FILL,
			height:35,
			text: discount.title,
			font:{
				fontSize:'12sp'
			},
			color:"#336692",
			borderColor:'#B7B7B7',
			borderWidth:1,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
		});
		
		rowView.add(title);
		
		var datePromotionWraper = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		
		var percent20 = Math.floor((Config.appWidth-10)/5);
		var image = UX.Image({
			width:percent20,
			height:percent20,
			image: base_url + "/" + discount.company.id + "/" + discount.promotion
		});
		
		var dateWraper = UX.View({
			width:percent20*4,
			height:Ti.UI.SIZE,
			layout:'vertical'
		});
		
		dateWraper.add(wrapeLabelValue( I18N.text('Start Date', 'Start Date'), discount.start_date));
		dateWraper.add(wrapeLabelValue(I18N.text('End Date', 'End Date'), discount.end_date));
		
		var editButton = UX.Button({
			title: I18N.text('Edit', 'Edit'),
			width:percent20*2 - 15,
			height:Ti.UI.SIZE,
			discount: discount,
			base_url: base_url,
			font:{
				fontSize:'12sp'
			}
		});
		editButton.addEventListener('click', modifyDiscount);
		dateWraper.add(editButton);
		
		datePromotionWraper.add(dateWraper);
		datePromotionWraper.add(image);
		
		rowView.add(datePromotionWraper);
		item.add(rowView);
		
		return item;
		
		
	};
	
	function modifyDiscount(e){
		var Window = require(Config.uidir + "/company/EditDiscountWindow");
		var window = new Window(e.source.discount, e.source.base_url);
		var leftButton = Functions.CloseNaveButton();
		window.setLeftNavButton(leftButton);
		
		window.addEventListener('updateCompleted', function(){
			nav.closeWindow(window);
		});
		
		var nav = Ti.UI.iOS.createNavigationWindow({
			window: window
		});
		
		leftButton.addEventListener('click', function(){
			nav.close(window);
		});
		
		nav.open();
	}	
		var options = new SM.ServiceParam();
		var user = Functions.getUserInfo();
		//TODO: make the parameter dynamic
		
		options.url = '/api/company/'+ user.modal.user.company.id +'/discount.json';
		options.locale = I18N.locale;
		options.wsse = Functions.getXWSEE(AppConstants.COMPANY);
		options.postData = {};
		options.type = 'GET';
		options.loaderMessage = I18N.text('Loadding Discount', 'Loading Discounts');
		options.callBack = function(e){
			
			if(e.status == HTTP_CODES.HTTP_OK){
				
				var data = JSON.parse(e.responseText);
				var gridData = [];
				
				for (var i=0; i < data.discounts.length; i++) {
					grid.add(createGridItem(data.discounts[i], data.base_url));
				}
			}
			else if(e.status == HTTP_CODES.HTTP_NOT_FOUND){
				self.remove(rootView);
				var obj = JSON.parse(e.responseText);
				self.add(UX.Label({
					width:'90%',
					height: Ti.UI.SIZE,
					text: obj.message,
					color:'red',
					font:{
						fontSize: '14sp'
					}
				}));
				
				
			}
		};
		
		
		options.context = self;
		
		
		
		
		SM.ServiceManager(options);
		
		rootView.add(grid);
		
		
		return self;
	
	
	
};

module.exports = ListDiscountWindow;
