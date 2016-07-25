
var DB = require("/lib/Database").Database;
var Sync = function(updateUI, finish) {
	var startIndex = 0;
Config.trace(SoapMethods.GetOfferingTypes);
		/**
		 * database table to be sync
		 */
		var tables = [
			{
				
				soapMethod : "GetAgrementTrough",
				resultNode:"GetAgrementTroughResult",
				name:"agrement_through",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'type', t:'type', type:'text'},			
					{s:'timestamp', t:'timestamp', type:'int'}			
				]
			},
			{
				soapMethod : SoapMethods.GetOfferingTypes,
				resultNode:"GetOfferingTypesResult",
				name:"offering_types",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'type', t:'type', type:'text'},			
					{s:'timestamp', t:'timestamp', type:'int'}			
				]
			},
			{
				soapMethod : SoapMethods.GetRealEestateTypes,
				resultNode:"GetRealEestateTypesResult",
				name:"real_estate_types",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'type', t:'type', type:'text'},			
					{s:'timestamp', t:'timestamp', type:'int'}			
				]
			},
			{
				soapMethod: SoapMethods.GetRegions,
				resultNode:"GetRegionsResult",
				name : "regions",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'name', t:'name', type:'text'},
					{s:'timestamp', t:'timestamp', type:'int'}			
				],
			},
			{
				soapMethod:SoapMethods.GetCities,
				resultNode:"GetCitiesResult",
				name : "cities",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'regionid', t:"region_id", "type":"int"},
					{s:'name', t:'name', type:'text'},
					{s:'timestamp', t:'timestamp', type:'int'}			
				]
			}/*,
			{
				soapMethod: SoapMethods.GetAreas,
				resultNode:"GetAreasResult",
				name : "areas",
				id:"id",
				fields : [
					{s:'id', t:"id", "type":"int"},
					{s:'cityid', t:"city_id", "type":"int"},
					{s:'name', t:'name', type:'text'},
					{s:'timestamp', t:'timestamp', type:'int'}			
				],
			}
			*/
		];

	/**
	 *
	 * @param {Object} table
	 * @return integer
	 */
	function getTimeStamp(table) {
		var db = DB.getResource();
		var timestamp = 0;
		var rows = db.execute("SELECT MAX(timestamp) AS timestamp FROM " + table.name);
		if (rows.isValidRow()) {
			timestamp = rows.fieldByName('timestamp');
			if(timestamp == null) timestamp = 0;
		}
	
		rows.close();
		db.close();
	
		return timestamp;
	};

function SyncService(timestamp, table) {

	//TODO: server will be called here. this portion should be modified according to the server
	

	if (Ti.Network.getNetworkTypeName() === Ti.Network.NETWORK_NONE) {
		AutoHideAlert(Translate('NoNetwork', 'Please connect to the internet an then try'));
		return;
	}

	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
			
			var xml = Ti.XML.parseString(this.responseText);
			Config.trace("Resposnce of "+ table.soapMethod + " :" + this.responseText);
			var nods = xml.getElementsByTagName(table.resultNode);
			var json = JSON.parse(nods.item(0).text);
			
			/* save the data here;*/
			if (json.ResponseCode == 1 && json.ResponseDescription == "Success") {
				
				if (json.ReturnValue.length > 0) {
					
					var db = DB.getResource();
					var tableData = json.ReturnValue;
					
					for (var i = 0; i < tableData.length; i++) {
						
						var rows = db.execute("SELECT * FROM " + table.name + " WHERE id = " + tableData[i][table.id]);
						if (rows.isValidRow()) {
							
							var update = "UPDATE " + table.table + " SET ";
							var updateField = [];
							for(var index=0; index< table.fields.length; index++){
								var f = table.fields[index];
								if(f.t == 'id') continue;
								if(f.type == 'int'){
									updateField.push( f.t + "=" + tableData[i][f.s]);
								}
								else{
									updateField.push( f.t + "='" + tableData[i][f.s]+"'");
								}
							}
							
							update += updateField.join(",");
							update += "WHERE id="+ tableData[i][table.id];
							
							db.execute(update);

						}
						else{
							var insertFields = [];
							var insertValues = [];
							var param = [];
							for(var index=0; index< table.fields.length; index++){
								var f = table.fields[index];
								insertFields.push(f.t);
								if(f.type == 'int'){
									insertValues.push(tableData[i][f.s]);
								}
								else{
									insertValues.push(tableData[i][f.s]);
								}
								
								param.push("?");
							};
							
							var insert = "INSERT INTO " + table.name + "(" + insertFields.join(",") + ") VALUES(" + param.join(",") + ")";
							db.execute(insert, insertValues);
						}

						rows.close();
					}
					db.close();
				}

			}

			startIndex++;
			if(startIndex<tables.length){
				
				updateUI((Math.floor(startIndex*100/tables.length))+"%");
				nextTable();
			}
			else{
				updateUI("100%");
				Functions.setSyncTime();
				finish();
			}
		},
		onerror : function(e) {
			//try next time
		}
	});

	client.open("POST", "https://web.othaim.com/ConnectService/Service.asmx");

	client.setRequestHeader("Content-Type", "text/xml");
	

	var xml = '<?xml version="1.0" encoding="utf-8"?> \
		<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
		  <soap:Body> \
		    <' + table.soapMethod +' xmlns="http://tempuri.org/"> \
		      <timestamp>' + timestamp + '</timestamp> \
		    </' + table.soapMethod + '> \
		  </soap:Body> \
		</soap:Envelope>';
	Config.trace("Body of " + table.soapMethod + ": " + xml);
	client.send(xml);
	
};


	function nextTable(){
		var table = tables[startIndex];
		var timestamp = getTimeStamp(table);
		Config.trace(JSON.stringify(table));		
		SyncService(timestamp, table);	
	};
	
	nextTable();

};



exports.Sync = Sync;
