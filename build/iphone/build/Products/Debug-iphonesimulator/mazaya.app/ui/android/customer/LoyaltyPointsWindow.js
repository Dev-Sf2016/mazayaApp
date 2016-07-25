

function LoyaltyPointsWindow(){
	var self = UX.Window({
		fullscreen:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff'
	});
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical'
	});
	
	
	var buttonBar = UX.View({
		width: Ti.UI.FILL,
		height: 35,
		layout: 'horizontal'
	});
	
	var btnParams = {
		width:'30%',
		height:35,
	};
	
	var btnPoints = UX.Button(Functions.merge(btnParams, {
		title: I18N.text('Loyalty Points', 'Loyalty Points'),
		color:"gray"
	}));
	
	var btnTransactions = UX.Button(Functions.merge(btnParams, {
		title: I18N.text('Transaction List', 'Transaction List'),
		color:"gray"
	}));
	
	var btnDetail = UX.Button(Functions.merge(btnParams, {
		title: I18N.text('Customer Details', 'Customer Details'),
		color:"gray"
	}));
	
	buttonBar.add(btnPoints);
	buttonBar.add(btnTransactions);
	buttonBar.add(btnDetail);
	
	var stackView = UX.ScrollableView({
		currentPage: 0,
		showPagingControl: false,
		
	});
	
	function createPointView(data){
		var pointView = UX.View({
			width:Ti.UI.FILL,
			height: Ti.UI.FILL
		});
		
		var label = UX.Label({
			width: Ti.UI.FILL,
			height:35,
			text: I18N.text('Total Points', 'Total Points')
		});
		
		var pointLabel =  UX.Label({
			width: Ti.UI.FILL,
			height:35,
			text: data.points
		});
		
		pointView.add(label);
		pointView.add(pointLabel);
		
		return pointView;
	}
	
	
	function getTransactionItem(item){
		var row = UX.TableRow({
			height:Ti.UI.Size
		});
	}
	
	function createTransactionList(data){
		var table = UX.Table({
			width: Ti.UI.FILL,
			height:Ti.UI.FILL,
		});
		
		
		for(var item in data.transactions){
			
		}
	}
	
	return self;
}

module.exports = LoyaltyPointsWindow;