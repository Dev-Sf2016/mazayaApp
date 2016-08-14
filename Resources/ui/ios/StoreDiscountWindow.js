

function StoreDiscountWindow(cid){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Discount List', 'Discount List')));
		
		
		
		var rootView = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout: 'vertical',
			top: 60,
			//backgroundColor:"#fff000"
		});
	
		self.add(rootView);
		
		//var title = Functions.IOSWindowTitle({}, {text:I18N.text('Discount List', 'Discount List')}, true, self);
	
		//rootView.add(title);
		
		var grid = UX.ScrollView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			scrollType:"vertical",
			layout:'vertical'
		});
		
		
		var dateLabeParam = {
				left: 5,
				right: 5,
				font:{
					size: '12sp'
				},
				color:'#336692'
			};
			
			var dateValueParam = {
				left: 5,
				right: 5,
				font:{
					size: '12sp'
				},
				
			};
			
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
					size:'17sp'
				},
				color:"#336692",
				backgroundColor:'#B7B7B7',
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
			rowView.add(title);
			
			var datePromotionWraper = UX.View({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				layout:'horizontal'
			});
			
			var half = (Config.appWidth-10)/2;
			var image = UX.Image({
				width:half,
				height:150,
				image: base_url + "/company/discounts/" + discount.company.id + "/" + discount.promotion
			});
			
			var dateWraper = UX.View({
				width:half,
				height:Ti.UI.SIZE,
				layout:'vertical'
			});
			
			dateWraper.add(UX.Label(Functions.merge(dateLabeParam, {text: I18N.text('Start Date', 'Start Date')})));
			dateWraper.add(UX.Label(Functions.merge(dateValueParam, {text: discount.start_date})));
			dateWraper.add(UX.Label(Functions.merge(dateLabeParam, {text: I18N.text('End Date', 'End Date')})));
			dateWraper.add(UX.Label(Functions.merge(dateValueParam, {text: discount.end_date})));
			
			
			datePromotionWraper.add(dateWraper);
			datePromotionWraper.add(image);
			
			rowView.add(datePromotionWraper);
			item.add(rowView);
			
			return item;
			
			
		};
		
		var options = new SM.ServiceParam();
		
		//TODO: make the parameter dynamic
		
		options.url = '/api/home/' + cid + '/company/discount.json';
		options.locale = I18N.locale;
		options.wsse = Functions.getAnonymousXWSEE();
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
				var obj = JSON.parse(e.responseText);
				var label = UX.Label({
					width: '90%',
					height: Ti.UI.SIZE,
					//top: 100,
					//backgroundColor:"red",
					text: obj.message,
					font:{
						fontSize: '18sp'
					},
					color:'red',
					textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
				});
				
				self.remove(rootView);
				self.add(label);
				
			}
		};
		
		
		options.context = self;
		
		
		
		
		SM.ServiceManager(options);
		
		rootView.add(grid);
		
		
		return self;

}

module.exports = StoreDiscountWindow;