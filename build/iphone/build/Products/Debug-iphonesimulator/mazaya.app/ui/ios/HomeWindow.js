

function HomeWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Discount List', 'Discount List')));
	
	
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
		top: 60
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
		
	function createGridItem(company, base_url){
		var item = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			center:'y',
			top:10
		});
		var rowView = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'vertical',
			borderColor: '#eee',
			borderWidth:1,
			left:5,
			right:5
		});
		
		var _width = Math.floor((Config.appWidth-20)/2); 
		
		var col1 = UX.View({
			width:_width,
			height:Ti.UI.SIZE,
			layout:'vertical',
		});
		
		var _labelParam = {
			left:2,
			right:2,
			font:{
				fontSize: '12sp'
			},
			cid: company.id
		};
		
		var col1Data = [];
		col1Data.push(UX.Label(Functions.merge(_labelParam, {text: company.name})));
		col1Data.push(UX.Label(Functions.merge(_labelParam, {text: company.url, font:{fontSize:'10sp'}})));
		col1Data.push(UX.Button(Functions.merge(_labelParam, {title: I18N.text('View Discounts', 'View Discounts'), backgroundColor:'#6399D3', color:'#ffffff'})));

	
		Layout.ApplyVerticalLayout(col1, col1Data, 10, 15, I18N.direction, 'dp');
		col1Data[1].setTextAlign(Ti.UI.TEXT_ALIGNMENT_LEFT);
		col1Data[2].setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
		col1Data[2].addEventListener('click', viewClickHandler);
		var col2 = UX.Image({
			width:_width,
			height: _width,
			image: base_url + "/files/company/logo/" + company.logo
		});
		
	 	Layout.ApplyHorizontalLayout(rowView, [col1, col2], 5, 5, I18N.direction);
	 	
	 	item.add(rowView);
	 	
		return item;
		
		
	};
	
	function viewClickHandler(e){
		var Window = require(Config.uidir + 'DiscountWindow');
		var win = new Window(e.source.cid);
		
		 var leftButton = UX.Label({
			color:'#ffffff',
			text:'Close',
			
		});
		
		win.setLeftNavButton(leftButton);
		var nav = Ti.UI.iOS.createNavigationWindow({
			window: win
		});
		
		leftButton.addEventListener('click', function(){
			nav.close(win);
		});
		nav.open();
	}
	
	var options = new SM.ServiceParam();
	
	//TODO: make the parameter dynamic
	
	options.url = '/api/home/companies.json';
	options.locale = I18N.locale;
	options.wsse = Functions.getXWSEE();
	options.postData = {};
	options.type = 'GET';
	options.loaderMessage = I18N.text('Loadding Discount', 'Loading Discounts');
	options.callBack = function(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			
			var data = JSON.parse(e.responseText);
			var gridData = [];
			
			for (var i=0; i < data.companies.length; i++) {
				grid.add(createGridItem(data.companies[i], data.base_url));
			}
			
			
		}
	};
	
	
	options.context = self;
	
	
	
	
	SM.ServiceManager(options);
	
	rootView.add(grid);
	
	
	return self;

}

module.exports = HomeWindow;