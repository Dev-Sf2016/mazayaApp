

function LoyaltyPointsWindow(){
	var self = UX.Window(Functions.IOSWindowTitle( I18N.text("Loyalty Point", "Loyalty Points")));
	
	//var title = Functions.IOSWindowTitle({top:0}, {text: I18N.text("Loyalty Point", "Loyalty Points")}, true, self);
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	//rootView.add(title);
	

	
	//TODO: Important make the service call dynamic
	var param = new SM.ServiceParam('/api/customer/1/points.json', I18N.locale, Functions.getXWSEE(), 'GET'  );
	
	param.postData = {};
	param.callBack = transactionServiceResponse;
	param.context = self;
	param.loaderMessage = I18N.text('Loading Transactions', 'Loading Transactions');

	SM.ServiceManager(param);


	function transactionServiceResponse(e){
		if(e.status == HTTP_CODES.HTTP_OK){
			var data = JSON.parse(e.responseText);
			
			var view = UX.Label({
				width:Ti.UI.FILL,
				height:150,
				left:10,
				right:10,
				backgroundColor:"#79A8C9"
				
			});
			
			var label = UX.Label({
				text:I18N.text('Total Points', 'Total Points'),
				width:'70%',
				font:{
					fontSize:'35sp'
				},
				color: '#fff',
								//backgroundColor:'red'
			});
			
			var points = 0;
			if(typeof data.points == 'object' && data.points.hasOwnProperty('points')){
				points = data.points.points;
			}
			
			var value = UX.Label({
				width:'25%',
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
				font:{
					fontSize:'30sp'
				},
				
				text: points,
				color:'#fff',
				textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			});
			var hview = UX.View({width:Ti.UI.FILL, height:Ti.UI.SIZE});
			Layout.ApplyHorizontalLayout(hview, [label, value],0 , 10, I18N.direction );
			label.setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
			value.setTextAlign(Ti.UI.TEXT_ALIGNMENT_CENTER);
			view.add(hview);
			
			rootView.add(view);
		}
		else if(e.status == HTTP_CODES.HTTP_UN_AUTHORIZED){
			//TODO: do another attempt to login other wise logout the user and show him to the login screen

		}


	}


self.add(rootView);



	return self;
}

module.exports = LoyaltyPointsWindow;