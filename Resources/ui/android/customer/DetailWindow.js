

function DetailWindow(){
	var self = UX.Window({
		fullscreen:true,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor: '#ffffff'
	});
	
	self.load = function() {
	
	};
	
	
	return self;
}

module.exports = DetailWindow;