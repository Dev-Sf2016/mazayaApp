function ListDiscountWindow(){
	var self = UX.Window({
		title: I18N.text('Discount List', 'Discount List'),
		layout: 'vertical',
		backgroundColor: '#fff'
	});
	
	var grid = UX.Table({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	function createGridItem(discount, base_url){
		var row = UX.TableRow({
			width:Ti.UI.FILL,
			height:150,
		});
		var rowView = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'vertical'
		});
		
		
		var title = UX.Label({
			width:Ti.UI.FILL,
			height:35,
			text: discount.title
		});
		
		rowView.add(title);
		
		var datePromotionWraper = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
		
		var half = Config.appWidth/2;
		var image = UX.Image({
			width:half,
			height:150,
			image: base_url + "/" + discount.company.id + "/" + discount.promotion
		});
		
		var dateWraper = UX.View({
			width:half,
			height:Ti.UI.SIZE,
			layout:'vertical'
		});
		
		var startDate = UX.Label({
			text: discount.star_date,
			width:Ti.UI.SIZE
		});
		
		var endDate = UX.Label({
			text: discount.end_date,
			width:Ti.UI.SIZE,
			bottom:5
		});
		
		dateWraper.add(startDate);
		dateWraper.add(endDate);
		
		
		datePromotionWraper.add(dateWraper);
		datePromotionWraper.add(image);
		
		rowView.add(datePromotionWraper);
		row.add(rowView);
		
		return row;
		
		
	};
	
	var options = new SM.ServiceParam();
	
	//TODO: make the parameter dynamic
	
	options.url = '/api/company/1/discount.json';
	options.locale = I18N.locale;
	options.wsse = Functions.getXWSEE();
	options.postData = {};
	options.type = 'GET';
	options.loaderMessage = I18N.text('Loadding Discount', 'Loading Discounts');
	options.callBack = function(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			
			var data = JSON.parse(e.responseText);
			var gridData = [];
			
			for (var i=0; i < data.discounts.length; i++) {
				gridData.push(createGridItem(data.discounts[i], data.base_url));
			}
			
			grid.setData(gridData);
		}
	};
	
	
	options.context = self;
	
	
	
	
	SM.ServiceManager(options);
	
	self.add(grid);
	
	
	return self;
	
	
	
};

module.exports = ListDiscountWindow;
