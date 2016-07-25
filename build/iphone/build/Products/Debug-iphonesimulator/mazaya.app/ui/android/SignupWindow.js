

function AccountWindow(){
	var self = UX.Window({
		
	});
	
	var LoginView;
	
	var SignupView;
	
	var currentView;
	function showCompany(){
		
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
			showLoginWindow('comapny');
		});
		
		customerLoginButton.addEventListener('click', function(){
			showLoginWindow('customer');
		});
		
		companySignupButton.addEventListener('click', function(){
			showSignupWindow('comapny');
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
			slef.load();
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
		var user = Functions.getUserInfo();
		if(user.id != -1 && user.type == 'Company'){
			showCompany();
		}
		else if(user.id != -1 && user.type == 'Customer'){
			showCustomer();	
		}
		else{
			showLogin();
		}
	};
	
	
	return self;
}

module.exports = AccountWindow;