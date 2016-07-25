
var DB = require("/lib/Database").Database;


/**
 * database table to be sync
 */
var tables = [
	{
		/** table name **/
		name : "regions",
		id:"id",
		fields : [
			{s:'id', t:"id", "type":"int"},
			{s:'name_en', t:'name_en', type:'text'},
			{s:'name_ar', t:'name_ar', type:'text'},
			{s:'timestamp', t:'timestamp', type:'int'}			
		]
	},
	{
		/** table name **/
		name : "cities",
		id:"id",
		fields : [
			{s:'id', t:"id", "type":"int"},
			{s:'city_id', t:"city_id", "type":"int"},
			{s:'name_en', t:'name_en', type:'text'},
			{s:'name_ar', t:'name_ar', type:'text'},
			{s:'timestamp', t:'timestamp', type:'int'}			
		]
	},
	{
		/** table name **/
		name : "areas",
		id:"id",
		fields : [
			{s:'id', t:"id", "type":"int"},
			{s:'area_id', t:"area_id", "type":"int"},
			{s:'name_en', t:'name_en', type:'text'},
			{s:'name_ar', t:'name_ar', type:'text'},
			{s:'timestamp', t:'timestamp', type:'int'}			
		],
	}
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
	var data = '{"Class":"Branchinfo","method":"synctable","table":"' + table.name + '","timestamp":' + timestamp + '}';

	if (Ti.Network.getNetworkTypeName() === Ti.Network.NETWORK_NONE) {
		AutoHideAlert(Translate('NoNetwork', 'Please connect to the internet an then try'));
		return;
	}

	var client = Ti.Network.createHTTPClient({

		onload : function(e) {
			Ti.API.info("Received JSON Text: " + this.responseText);
			var json = JSON.parse(this.responseText);
			/* save the data here;*/
			if (json.success) {
				if (json.data.length > 0) {
					var db = DB.getResource();
					var tableData = json.data;
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
									insertValues.push("'" + tableData[i][f.s] + "'");
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

		},
		onerror : function(e) {
			//try next time
		}
	});

	//TODO: be fixed according to the sync server
	var url = "http://www.othaimmarkets.com/webservices/api";
	console.log(url);
	client.open("POST", url);
	client.setRequestHeader("input-content-type", "text/json");
	client.setRequestHeader("output-content-type", "text/json");
	client.setRequestHeader("language", AbstractWindow.Laguage);
	Ti.API.info('Calling Rest Service: ' + data);
	client.send(data);

};

var Sync = function() {
	for (var i = 0; i < tables.length; i++) {
		var table = tables[i];

		var timestamp = getTimeStamp(table);
		// call the service to

		SyncService(timestamp, table);

	}

};

exports.Sync = Sync;
