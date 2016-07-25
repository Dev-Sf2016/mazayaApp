

function TransactionWindow(){
	var self = UX.Window(Functions.IOSWindowTitle(I18N.text("Transactions", "Transactions")));
	
	//var title = Functions.IOSWindowTitle({}, {text: I18N.text("Transactions", "Transactions")}, true, self);
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:"vertical"
	});
	
	//rootView.add(title);
	
	var scrollView = UX.ScrollView({
		top:10,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:"vertical",
		//backgroundColor:'#fff000',
		scrollType:'vertical',
		showVerticalScrollIndicator:true,
		showHorizontalScrollIndicator:false
		
		
	});
	var headerView = UX.View({
		width:Ti.UI.FILL,
		height:50,
		backgroundColor:'blue',
		layout: 'horizontal'
	});
	
	
	headerLabelParam = {
		width: Math.floor((Config.appWidth-3)/4),
		height: 50,
		color:"#fff",
		font:{
			fontSize:'12sp'
		},
		textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign:Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER
		
	};
	
	var lineParam ={
		width:1,
		height:50,
		backgroundColor: '#000'
	};
	
	var HEADERS = [];
	HEADERS.push(UX.Label(Functions.merge(headerLabelParam,{text:I18N.text('Store', 'Store')})));
	HEADERS.push(UX.View(lineParam));
	HEADERS.push(UX.Label(Functions.merge(headerLabelParam,{text:I18N.text('Date', 'Date')})));
	HEADERS.push(UX.View(lineParam));
	HEADERS.push(UX.Label(Functions.merge(headerLabelParam,{text:I18N.text('Invoice Amount', 'Invoice Amount')})));
	HEADERS.push(UX.View(lineParam));
	HEADERS.push(UX.Label(Functions.merge(headerLabelParam,{text:I18N.text('Points Gained', 'Points Gained')})));
	
	for(var i=0, j=HEADERS.length; i<j; i++){
		headerView.add(HEADERS[i]);
	}
	
	rootView.add(headerView);
	
	var param = new SM.ServiceParam('/api/customer/1/transactions.json', I18N.locale, Functions.getXWSEE(), 'GET'  );
	
	param.postData = {};
	param.callBack = transactionServiceResponse;
	param.context = self;
	param.loaderMessage = I18N.text('Loading Transactions', 'Loading Transactions');

	SM.ServiceManager(param);


	function getTtansactionItem(transaction, color){
		
		var width = Math.floor((Config.appWidth-3)/4);
		var labelParam = {
			width: width,
			height:40,
			backgroundColor: color,
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			color:'#222222',
			font:{
				fontSize:'10sp',
				fontWeight:100
			}
			
		};
		
		var view = UX.View({
			top:0,
			left:0,
			right:0,
			layout:'horizontal',
			height:Ti.UI.SIZE
		});
		
		var store = UX.Label(Functions.merge(labelParam ,{text: transaction.Store}));
		var invoiceAmount = UX.Label(Functions.merge(labelParam , {text: transaction.InvoiceAmount}));
		var pointsGained = UX.Label(Functions.merge(labelParam , {text: transaction.PointsGained}));
		var transactionDate = UX.Label(Functions.merge(labelParam , {text: transaction.Date.replace('-', '/')}));
		
		var line = {
			width:1,
			height:40,
			backgroundColor: '#000'
		};
		view.add(store);
		view.add(UX.View(line));
		view.add(transactionDate);
		view.add(UX.View(line));
		view.add(invoiceAmount);
		view.add(UX.View(line));
		view.add(pointsGained);
		
		
		return view;
			
	}
	function transactionServiceResponse(e){
		if(e.status == HTTP_CODES.HTTP_OK){
			var data = JSON.parse(e.responseText);
			var color = '#ffffff';
			scrollView.setLayout('vertical');
			
			for (var i=0; i < data.transaction.length; i++) {
				if((i+1)%2 == 0) color = '#dddddd';
				else color = '#ffffff';
			  scrollView.add(getTtansactionItem(data.transaction[i], color));
			};
			rootView.add(scrollView);
		}
		else if(e.status == HTTP_CODES.HTTP_UN_AUTHORIZED){
			//TODO: do another attempt to login other wise logout the user and show him to the login screen

		}


	}


self.add(rootView);



	return self;
}

module.exports = TransactionWindow;