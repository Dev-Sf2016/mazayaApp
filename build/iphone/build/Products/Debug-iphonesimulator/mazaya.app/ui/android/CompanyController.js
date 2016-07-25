
var window = UX.Window({
	width:Ti.UI.FILL,
	height:Ti.UI.FILL,
	backgroundColor: '#ffffff'
});

function register(){
	var form = require('ui/form/company/register');
	form.render(window);
	
	window.open();
}

exports.register = register;