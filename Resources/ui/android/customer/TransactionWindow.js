

function TransactionWindow(){
	var self = UX.Window({
		fullscreen:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff'
	});
	
	
	
	return self;
}

module.exports = TransactionWindow;