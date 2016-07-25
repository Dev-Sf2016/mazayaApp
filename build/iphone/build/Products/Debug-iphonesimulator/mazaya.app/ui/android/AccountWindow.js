

function AccountWindow(){
	var self = UX.Window({
		title:"Account Window",
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	var currentView;
	function showCompany(){
		var user = Functions.getUserInfo();
		self.setTitle(sprintf( I18N.text('Welcome %s', 'Welcome %s'), user.username));
		
		
		var menu = [
			{title:I18N.text("Details", "Details"), windowFile: Config.uidir + 'company/' + 'CompanyDetailWindow', id:"detail"},
			{title:I18N.text("Add Delegate", "Add Delegate"), windowFile: Config.uidir + 'company/' + 'AddDelegateWindow', id:"addDelegate"},
			{title:I18N.text("Upload Discount", "Upload Discount"), windowFile: Config.uidir + 'company/' + 'UploadfDiscountWindow', id:"uploaddiscount"},
			{title:I18N.text("ListDiscount", "List discount"), windowFile: Config.uidir + 'company/' + 'ListDiscountWindow'},
		];
		
		
		var tableData = [];
		
		for (var i=0; i < menu.length; i++) {
		  var tr = UX.TableRow({
		  	width:Ti.UI.FILL,
		  	height:45,
		  	 center:"y",
			title:menu[i].title,
			windowFile:menu[i].windowFile
		  });
		  tableData.push(tr);
		};
		
		
		var table = UX.Table({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL
		});
		
		table.setData(tableData);
		
		table.addEventListener('click', function(e){
			var Window = require(e.row.windowFile);
			var w = new Window();
			w.open();
		});
		
		var mainView = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical"
		});
		
		//mainView.add(welcome);
		mainView.add(table);
		
		self.add(mainView);
		
		
		
	}
	
	function showCustomer(){
		
	}
	function loginOrSignup(){
		var view = UX.View({
			layout: 'vertical',
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE
		});
		
		var buttonParam = {
			width:'60%',
			height:35,
			top:10
		};
		
		var companyLoginButton = UX.Button(Functions.merge(buttonParam, {title: I18N.text('Login as Company', 'Login as Company')}));
		var customerLoginButton = UX.Button(Functions.merge(buttonParam, {title: I18N.text('Login as Customer', 'Login as Customer')}));
		var companySignupButton = UX.Button(Functions.merge(buttonParam, {title: I18N.text('Signup as Company', 'Signup as Company')}));
		var customerSignupButton = UX.Button(Functions.merge(buttonParam, {title: I18N.text('Signup as Customer', 'Signup as Customer')}));
		
		view.add(companyLoginButton);
		view.add(customerLoginButton);
		view.add(companySignupButton);
		view.add(customerSignupButton);
		
		companyLoginButton.addEventListener('click', function(){
			showLoginWindow('company');
		});
		
		customerLoginButton.addEventListener('click', function(){
			showLoginWindow('customer');
		});
		
		companySignupButton.addEventListener('click', function(){
			showSignupWindow('company');
		});
		customerSignupButton.addEventListener('click', function(){
			showSignupWindow('customer');
		});
		
		self.add(view);
		
		currentView = view;
		
	}
	function showLoginWindow(type){
		
		var LoginWindow = require(Config.uidir + "LoginWindow");
		var window = new LoginWindow(type);
		
		window.addEventListener('loginSuccessfull', function(e){
			window.close();
			self.remove(currentView);
			self.load();
		});
		window.open();
	}
	
	function showSignupWindow(type){
		var SignupWindow = require(Config.uidir + "SignupWindow");
		var window = new SignupWindow(type);
		
		window.addEventListener('signupSuccessfull', function(e){
			window.close();
			self.remove(currentView);
			slef.load();
		});
		window.open();
	}
	
	
	
	self.load = function() {
		if(Functions.is_user_login()){
			var user = Functions.getUserInfo();
			if(user.userType == 'company'){
				showCompany();
				return;
			}
			else if(user.userType == 'customer'){
				showCustomer();	
				return;
			}
		}
		
		loginOrSignup();
		
	};
	
	self.load();
	return self;
}

module.exports = AccountWindow;