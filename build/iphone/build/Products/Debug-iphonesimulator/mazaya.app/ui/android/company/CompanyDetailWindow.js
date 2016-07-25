
function CompanyDetailWindow(){
	var self = UX.Window({
		width: Ti.UI.FILL,
		height:Ti.UI.FILL,
		title: I18N.text('Company Detail', 'Company Detail'),
		fullscreen:true
	});
	
	
	function createGridItem(labelText, valueText){
		var row = UX.TableRow({
			width:Ti.UI.FILL,
			height:50,
		});
		var rowView = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'horizontal'
		});
				
		var label = UX.Label({
			width:"35%",
			height:35,
			text: labelText
		});
		
		var value = UX.Label({
			width:"65%",
			height:35,
			text: valueText
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
	options.wsse = Functions.getXWSEE();
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
				layout:'horizontal'
			});
			
			var lbl = UX.Label({width: '35%', text: I18N.text('Logo', 'Logo')});
			var image = UX.Image({
				width: Ti.UI.SIZE,
				height: Ti.UI.SIZE,
				left:10, right:10,
				image: data.base_url + "/files/company/logo/" + company.logo
			});
			
			rowView.add(lbl);
			rowView.add(image);
			
			row.add(rowView);
			
			gridData.push(row);
			
			grid.setData(gridData);
			
			self.add(grid);
		}
	};
	
	
	options.context = self;
	
	
	
	
	SM.ServiceManager(options);
	
	
	
	return self;
	
};

module.exports = CompanyDetailWindow;
