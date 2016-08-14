
function LeftWindow(){
	
	var self = UX.Window({
		backgroundColor:'#fff',
		fullscreen:true,
		
	});
	
	var rootView = UX.View({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		top:150
	});
	
	var user = Functions.getUserInfo();
	var currentState = '';
	function getCompanyMenu(){
		var user = Functions.getUserInfo();
		var menu = [
			{title: sprintf(I18N.text('Welcome %s', 'Welcome %s'), user.modal.user.name), name:'welcome'},
			{title:I18N.text("Details", "Details"), name: Config.uidir + 'company/' + 'CompanyDetailWindow', id:"detail"},
		];

		if(user.modal.user.is_default == 1){
			menu.push({title:I18N.text("Add Delegate", "Add Delegate"), name: Config.uidir + 'company/' + 'AddDelegateWindow', id:"addDelegate"});
			menu.push({title:I18N.text("List Delegate", "List Delegate"), name: Config.uidir + 'company/' + 'ListDelegateWindow', id:"listDelegate"});
		}
		menu.push({title:I18N.text("Upload Discount", "Upload Discount"), name: Config.uidir + 'company/' + 'AddDiscountWindow', id:"uploaddiscount"});
		menu.push({title:I18N.text("ListDiscount", "List discount"), name: Config.uidir + 'company/' + 'ListDiscountWindow'});
		menu.push({title:I18N.text("Logout", "Logout"), name: 'logout'});
		menu.push({title: (I18N.locale == 'ar') ? I18N.text('English', 'English'):I18N.text('Arabic', 'Arabic'), name:'CHANGE_LANGUAGE' });
		
		var tableData = [];
		
		for (var i=0; i < menu.length; i++) {
		  var tr = UX.TableRow({
		  	width:Ti.UI.FILL,
		  	height:45,
		  	 center:"y",
			title:menu[i].title,
			name: menu[i].name
		  });
		  
		  tableData.push(tr);
		};
		
		
		var table = UX.Table({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			data: tableData
		});
		
		table.setData(tableData);
		
		table.addEventListener('click', function(e){
			self.fireEvent('Menu:Company:Click', e);
		});
			
		return table;
		
	};
	
	function getCustomerMenu(){
		var user = Functions.getUserInfo();
		var menu = [
			{title: sprintf( I18N.text('Welcome %s', 'Welcome %s'), user.modal.user.name), name:'welcome'},
			{title:I18N.text("Loyalty Points", "Loyalty Points"), name: Config.uidir + 'customer/' + 'LoyaltyPointsWindow', id:"loyaltyPoints"},
			{title:I18N.text("Transaction List", "Transaction List"), name: Config.uidir + 'customer/' + 'TransactionWindow', id:"transactions"},
			{title:I18N.text("Deails", "Details"), name: Config.uidir + 'customer/' + 'CustomerDetailWindow', id:"detail"},
			{title:I18N.text("Invite Friend", "Invite Friend"), name: Config.uidir + 'customer/' + 'InviteFriendWindow', id:"detail"},
			{title:I18N.text("Logout", "Logout"), name: 'logout'},
			{title: (I18N.locale == 'ar') ? I18N.text('English', 'English'):I18N.text('Arabic', 'Arabic'), name:'CHANGE_LANGUAGE' }
		];
		
		var tableData = [];
		
		for (var i=0; i < menu.length; i++) {
		  var tr = UX.TableRow({
		  	width:Ti.UI.FILL,
		  	height:45,
		  	 center:"y",
			title:menu[i].title,
			name:menu[i].name
		  });
		  
		  tableData.push(tr);
		};
		
		
		var table = UX.Table({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			data: tableData
		});
		
		table.addEventListener('click', function(e){
			self.fireEvent('Menu:Customer:Click', e);
		});
		
		return table;
	};
	

	function getMenu(){
		
		var data = [
			{title: I18N.text('Login as Company', 'Login as Company'), name:'LOGIN_AS_COMPANY'},
			{title: I18N.text('Login as Customer', 'Login as Customer'), name:'LOGIN_AS_CUSTOMER'},
			{title: I18N.text('Signup as Company', 'Signup as Company'), name:'SIGNUP_AS_COMPANY'},
			{title: I18N.text('Signup as Customer', 'Signup as Customer'), name:'SIGNUP_AS_CUSTOMER'},
			{title: (I18N.locale == 'ar') ? I18N.text('English', 'English'):I18N.text('Arabic', 'Arabic'), name:'CHANGE_LANGUAGE' }
		];
		
		var tableView = UX.Table({
			data: data
		});
		
		tableView.addEventListener('click', function(e){
			self.fireEvent('Menu:Click', e);
		});
		
		return tableView;
	};

	var currentView;
	if(user.login==false){
		currentView = getMenu();
		currentState = 'Menu';
	}
	else if(user.userType == 'company' && user.login){
		currentView = getCompanyMenu();
		currentState = 'company';
	}
	else if(user.userType == 'customer' && user.login){
		currentView = getCustomerMenu();
		currentState = 'customer';
	}
	var Menu = getMenu();
	
	rootView.add(currentView);
	
	self.switchMenu = function(state){
		user = Functions.getUserInfo();
		rootView.remove(currentView);
		currentState = state;
		if(state == 'Menu'){
			currentView = getMenu();
		}
		else if(state == 'company' && user.login){
			currentView = getCompanyMenu();
		}
		else if(state == 'customer' && user.login){
			currentView = getCustomerMenu();
		}
		
		rootView.add(currentView);
	};
	
	self.reload = function(){
		self.switchMenu(currentState);
	};
	self.add(rootView);
	
	return self;
	
};

module.exports = LeftWindow;
