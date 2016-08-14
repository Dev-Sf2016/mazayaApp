
function CompanyDetailWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Company Detail', 'Company Detail')));
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
		top:60
	});

	self.add(rootView);
	
	//var title = Functions.IOSWindowTitle({}, {text:I18N.text('Company Detail', 'Company Detail')}, true, self);

	//rootView.add(title);
	
	var _35percent = Math.floor((Config.appWidth - 10)*35/100);
	var _65percent = Math.floor((Config.appWidth - 10)*65/100);
	
	
	Config.trace(typeof Config.appWidth + "=App Widthe");
	Config.trace(_35percent + "=35perce");
	Config.trace(_65percent + "=65percent");
	var font = {
		size:"13sp"
	};
	function createGridItem(labelText, valueText){
		var row = UX.TableRow({
			width:Ti.UI.FILL,
			height:50,
		});
		var rowView = UX.View({
			width:Config.AppWidth - 10,
			height:Ti.UI.SIZE,
			layout:'horizontal',
			left:5,
			right:5
		});
				
		var label = UX.Label({
			width:_35percent,
			height:35,
			text: labelText,
			font:font
		});
		
		var value = UX.Label({
			width:_65percent,
			height:35,
			text: valueText,
			font:font
		});
		
		rowView.add(label);
		rowView.add(value);
		row.add(rowView);
		
		return row;
		
		
	};
	
	var grid = UX.Table({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var options = new SM.ServiceParam();
	
	//TODO: make the parameter dynamic
	
	options.url = '/api/company/6.json';
	options.locale = I18N.locale;
	options.wsse = Functions.getXWSEE(AppConstants.COMPANY);
	options.postData = {};
	options.type = 'GET';
	options.loaderMessage = I18N.text('Loadding', 'Loading...');
	options.callBack = function(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			
			var gridData = [];
			
			var data = JSON.parse(e.responseText);
			var delegate = data.delegate;
			var company = delegate.company;
			gridData.push(createGridItem(I18N.text('Name', 'Name'), company.name));
			gridData.push(createGridItem(I18N.text('Website', 'Website'), company.url));
			gridData.push(createGridItem(I18N.text('Email', 'Email'), delegate.email));
			
			var row = UX.TableRow();
			var rowView = UX.View({
				layout:'horizontal',
				left:5,
				right:5
			});
			
			var lbl = UX.Label({width: '35%', text: I18N.text('Logo', 'Logo'), font:font});
			var image = UX.Image({
				width: Ti.UI.SIZE,
				height: Ti.UI.SIZE,
				left:5, right:5,
				image: data.base_url + "/files/company/logo/" + company.logo
			});
			
			rowView.add(lbl);
			rowView.add(image);
			
			row.add(rowView);
			
			gridData.push(row);
			
			grid.setData(gridData);
			
			rootView.add(grid);
		}
	};
	
	
	options.context = self;
	
	
	
	
	SM.ServiceManager(options);
	
	
	
	return self;
	
};

module.exports = CompanyDetailWindow;
