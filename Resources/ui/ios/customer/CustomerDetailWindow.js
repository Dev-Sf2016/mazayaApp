

function DetailWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Detail', 'Detail')));
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical'
	});

	self.add(rootView);
	
	//var title = Functions.IOSWindowTitle({}, {text:I18N.text('Detail', 'Detail')}, true, self);

	//rootView.add(title);
	
	var user = Functions.getUserInfo();
	var width = Config.appWidth - 20;
	function getRow(label, value, backColor){
		
		var lbl = UX.Label({
			width:Math.floor(width/2),
			height: 40,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:label,
			font: {
				fontSize:'14sp'
			}
		});
		
		var val = UX.Label({
			width:Math.floor(width/2),
			height: 40,
			verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
			text:value,
			font:{
				fontSize:'10sp',
				fontWeight: 100
			}
		});
		
		var view = UX.View({
			top:0,
			left:5,
			right:5,
			height:Ti.UI.SIZE,
			layout: 'horizontal',
			backgroundColor: backColor
		});
		
		Layout.ApplyHorizontalLayout(view, [lbl, val], 0, I18N.direction);
		
		return view;
		
	};
	
	
	var table = UX.ScrollView({
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		layout:'vertical',
		top:20
	});
	
	
	table.add(getRow(I18N.text('Name', 'Name'), user.modal.user.name, '#dddddd'));
	table.add(getRow(I18N.text('Email', 'Email'), user.modal.user.email, '#fffffff'));
	table.add(getRow(I18N.text('Nationality', 'Nationality'), user.modal.user.nationality, '#dddddd'));
	table.add(getRow(I18N.text('City', 'City'), user.modal.city, '#fffffff'));
	table.add(getRow(I18N.text('Card Number', 'Card Number'), user.modal.user.loyality_id, 'dddddd'));
	table.add(getRow(I18N.text('Card Status', 'Card Status'), (user.modal.user.is_active == 1)? I18N.text('Active', 'Active'):I18N.text('Inactive', 'Inactive'), '#fffffff'));
	
	
	
	
	rootView.add(table);
	
	self.add(rootView);
	
	
	return self;
}

module.exports = DetailWindow;