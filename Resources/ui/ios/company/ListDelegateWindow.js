function ListDelegateWindow(){
	
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text('Delegate List', 'Delegate List')));
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout: 'vertical',
		top: 60
	});
	
	self.add(rootView);
	
	var grid = UX.ScrollView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		scrollType:"vertical",
		layout:'vertical'
	});
		
		
		
	function createGridItem(delegate){
		var alignment = I18N.locale == 'en'? Ti.UI.TEXT_ALIGNMENT_LEFT: Ti.UI.TEXT_ALIGNMENT_RIGHT;
		var item = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			center:'y',
			top:10,
		});
		var rowView = UX.View({
			//width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			layout:'vertical',
			borderColor: '#eee',
			//backgroundColor:'red',
			borderWidth:1,
			left:5,
			right:5,
			
		});
			
			
		var name = UX.Label({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			text: delegate.name,
			font:{
				fontSize:'12sp'
			},
			textAlign:alignment
		});
			
		//rowView.add(name);
			
		var email = UX.Label({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			text: delegate.email,
			font:{
				fontSize:'12sp'
			},
			textAlign:alignment
		});
		
		var percent25 = Math.floor((Config.appWidth-10)/4);
	
			
		var labelWraper = UX.View({
			width: percent25*3,
			height:Ti.UI.SIZE,
			layout:'vertical',
			top:5,
			bottom:5
		});
			
		labelWraper.add(name);
		labelWraper.add(email);
		
		var buttonWraper = UX.View({
			width: percent25,
			height:Ti.UI.SIZE
		});
		
		var button = UX.Button({
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			title: I18N.text('Edit', 'Edit'),
			delegate: delegate
		});
		
		buttonWraper.add(button);
		button.addEventListener('click', modifyDelgate);
		
		Layout.ApplyHorizontalLayout(rowView, [labelWraper, buttonWraper], 0, 0, I18N.direction, 'dp');
		
		item.add(rowView);
		
		return item;
		
		
	};
	
	var user = Functions.getUserInfo();
		
	var options = new SM.ServiceParam();
	
	//TODO: make the parameter dynamic
	
	options.url = '/api/company/'+ user.modal.user.company.id +'/delegate.json';
	options.locale = I18N.locale;
	options.wsse = Functions.getXWSEE(AppConstants.COMPANY);
	options.postData = {};
	options.type = 'GET';
	options.loaderMessage = I18N.text('Loadding Delegates', 'Loading Delegates');
	options.callBack = function(e){
		
		if(e.status == HTTP_CODES.HTTP_OK){
			
			var data = JSON.parse(e.responseText);
			var gridData = [];
			
			for (var i=0; i < data.delegates.length; i++) {
				grid.add(createGridItem(data.delegates[i]));
			}
		}
		if(e.status == HTTP_CODES.HTTP_NOT_FOUND){
			var obj = JSON.parse(e.responseText);
			var label = UX.Label({
				width: '90%',
				height:Ti.UI.SIZE,
				text: obj.message,
				font:{
					fontSize: '14sp'
				},
				color: 'red',
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			
			self.remove(rootView);
			self.add(label);
			
			
		}
		
	};
		
	function modifyDelgate(e){
		var Window = require(Config.uidir + "/company/EditDelegateWindow");
		var window = new Window(e.source.delegate);
		var leftButton = Functions.CloseNaveButton();
		window.setLeftNavButton(leftButton);
		
		window.addEventListener('updateCompleted', function(){
			nav.closeWindow(window);
		});
		
		var nav = Ti.UI.iOS.createNavigationWindow({
			window: window
		});
		
		leftButton.addEventListener('click', function(){
			nav.close(window);
		});
		
		nav.open();
		
		
	
	};
		options.context = self;
		
		
		
		
		SM.ServiceManager(options);
		
		rootView.add(grid);
		
		
		return self;
	
	
	
};

module.exports = ListDelegateWindow;
