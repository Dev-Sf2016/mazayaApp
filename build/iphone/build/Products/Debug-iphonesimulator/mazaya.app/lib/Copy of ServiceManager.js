/**
 * Manage HttpService
 * @param {method} string
 * @param {data} object
 * @param {resultNode} string
 * @param {loadingMessage} string
 * 
 * @param {context} Ti.UI.View
 * @param {callBack} function
 */
function ServiceManager(method, data, resultNode, loadingMessage, context, callBack){
	
	if(Ti.Network.getNetworkTypeName() === Ti.Network.NETWORK_NONE){
		AutoHideAlert(I18N.text('NoNetwork', 'Please connect to the internet an then try'));
		return;
	}
	
	var language = I18N.getLanguage();
	
	/**var activitiIndicator = Ti.UI.createActivityIndicator({
		color: 'black',
		message: L('PleaseWaitLoading', 'Please waite Loading...'),
		style : Ti.UI.ActivityIndicatorStyle.DARK,
		
	});
	context.add(activitiIndicator); */
	var activitiIndicator = UX.ActivityIndicatorDialog({
	    color: 'black',
        message: loadingMessage,
        style :  (Ti.Platform.name === 'iPhone OS')? Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN : Ti.UI.ActivityIndicatorStyle.BIG,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        //backgroundColor:"#4e4e4e",
    });
	context.add(activitiIndicator);
	activitiIndicator.show();
	
	var client = Ti.Network.createHTTPClient({
		onload: function(e){
			Ti.API.info("Received JSON Text: " + this.responseText);
			
			var xml = Ti.XML.parseString(this.responseText);
			
			var nods = xml.getElementsByTagName(resultNode);
			var jsonText = nods.item(0).text;
			
			Config.trace(jsonText);
			
			
			var json = JSON.parse(jsonText);
			callBack(json);
			activitiIndicator.hide();
			context.remove(activitiIndicator);
		},
		onerror: function(e){
			activitiIndicator.hide();
			alert(I18N.text("ServerError", "We are facing some "));
			//Ti.API.info('Calling Rest Service: ' + data);
		}
	});
	

	client.open("POST", "https://web.othaim.com/ConnectService/Service.asmx?wsdl");

	//client.setRequestHeader("Accept", "text/html, application/xhtml+xml, */*");
	client.setRequestHeader("Content-Type", "text/xml");
	//client.setRequestHeader("Accept-Language", "en-US");
	//client.setRequestHeader("")

	var xml = '<?xml version="1.0" encoding="utf-8"?>' + 
		'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
		  '<soap:Body>' +
		    '<' + method +' xmlns="http://tempuri.org/">' +
		      '$post-data' +
		    '</' + method + '>' +
		  '</soap:Body>' + 
		'</soap:Envelope>';




		var postXml = "";
		if(data != null && data != undefined){		
			var keys = Object.keys(data);
			var l = keys.length;
			for(var i=0; i<l; i++){
				postXml += '<' + keys[i] + '>' + data[keys[i]] + '</' + keys[i] + '>'; 
			}
		}

		xml = xml.replace('$post-data', postXml);
		
		Config.trace(xml);
	client.send(xml);
};
exports.ServiceManager = ServiceManager;


