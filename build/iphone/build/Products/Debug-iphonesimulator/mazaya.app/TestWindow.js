
function TestWindow(){
	var window = UX.Window({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		barColor: 'gray',
		titleAttributes:{
			color:'red'
		}
	});
	
window.open();
	
};

exports = TestWindow;