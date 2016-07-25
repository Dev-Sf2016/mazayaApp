/**
 * Manage HttpService
 * @param {ServiceParam}
 */
function ServiceManager(serviceParam){
	
	if(Ti.Network.getNetworkTypeName() === Ti.Network.NETWORK_NONE){
		AutoHideAlert(I18N.text('NoNetwork', 'Please connect to the internet an then try'));
		return;
	}
	
	
	var activitiIndicator = UX.ActivityIndicatorDialog({
	    color: 'black',
        message: serviceParam.loaderMessage,
        style :  (Ti.Platform.name === 'iPhone OS')? Ti.UI.ActivityIndicatorStyle.PLAIN : Ti.UI.ActivityIndicatorStyle.BIG,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        //backgroundColor:"#4e4e4e",
    });
    
	serviceParam.context.add(activitiIndicator);
	activitiIndicator.show();
	
	var client = Ti.Network.createHTTPClient({
		onload: function(e){
				Ti.API.info("Received JSON Text: " + this.responseText);
			
			var result = {
				status: client.status, statusText:client.statusText, responseText: this.responseText
			};
			
			serviceParam.callBack(result);
			
			activitiIndicator.hide();
			serviceParam.context.remove(activitiIndicator);
		},
		onerror: function(e){
			activitiIndicator.hide();
			Ti.API.info("Received JSON Text: " + this.responseText);
			serviceParam.context.remove(activitiIndicator);
			var result = {
				status: client.status, statusText:client.statusText, responseText: this.responseText
			};
			serviceParam.callBack(result);
			//alert(I18N.text("ServerError", "We are facing some " + e.toString()));
		}
	});
	

	//client.open("POST", "https://150.150.101.83/ConnectService/Service.asmx/"+soapMethod);
	client.open(serviceParam.type, "http://mozyda.dev/app_dev.php/"+ serviceParam.locale + serviceParam.url );

	
	
	client.setRequestHeader("Accept", "*/*");
	client.setRequestHeader("Content-Type", "application/json");
	//client.setRequestHeader('enctype', 'multipart/form-data');
	
	Config.trace("WSSE:" + serviceParam.wsse);
	if(serviceParam.wsse != undefined && serviceParam.wsse != ''){
		client.setRequestHeader("x-wsse", serviceParam.wsse);
	}
	client.setEnableKeepAlive(false);
	
	Config.trace(serviceParam.postData);
	
	client.send(serviceParam.postData);
};

exports.ServiceManager = ServiceManager;

/**
 *
 * @class
 * @cunstructor 
 * @param {string} url
 * @param {string} locale
 * @param {string} wsse
 * @param {string} type
 * @param {Function} callback
 * @param {string} loaderMessage
 * @param {Object} context
 */
function ServiceParam(url, locale, wsse, type, postData, callback, loaderMessage, context){
	this.url = url,
	this.locale = locale;
	this.wsse = wsse;
	this.postData = postData;
	this.type = type;
	this.loaderMessage = loaderMessage;
	this.callBack = callback;
	this.context = context;
};

exports.ServiceParam = ServiceParam;
