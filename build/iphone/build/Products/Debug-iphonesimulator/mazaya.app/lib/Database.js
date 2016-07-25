
/**
 * Database wraper 
 */
var DB_NAME = 'othaimrealstate';
var Database = function(){
	var db = Ti.Database.install("/db/" + DB_NAME + ".sqlite", DB_NAME);
	db.close();
	//db.file.remoteBackup = false;
	if(!Ti.App.Properties.getBool('TEMP_DATE', false)){
		Ti.App.Properties.setBool('TEMP_DATE', true);
		//add region row
		
		var mydb = Ti.Database.open(DB_NAME);
		
		//add tables
		
		//mydb.execute('CREATE TABLE regions (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (255) NOT NULL, timestamp INTEGER NOT NULL);');
		//mydb.execute('CREATE TABLE cities (id INTEGER PRIMARY KEY AUTOINCREMENT, region_id INTEGER, name VARCHAR (255) NOT NULL, timestamp INTEGER NOT NULL);');
		//mydb.execute('CREATE TABLE areas (id INTEGER PRIMARY KEY AUTOINCREMENT, city_id INTEGER, name VARCHAR (255) NOT NULL, timestamp INTEGER NOT NULL);');
		//mydb.execute('CREATE TABLE agrement_through (id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR (257), timestamp INTEGER);');
		//mydb.execute('CREATE TABLE offering_types (id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR (255), timestamp INTEGER);');
		//mydb.execute('CREATE TABLE real_estate_types (id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR (255), timestamp INTEGER);');
		
		//mydb.execute('CREATE TABLE real_estate (id INTEGER PRIMARY KEY AUTOINCREMENT, location_name VARCHAR (255) NOT NULL, location VARCHAR (255) NOT NULL, real_estate_type_id INTEGER, offering_type_id INTEGER, agrement_through_id INTEGER, name VARCHAR (255), tel VARCHAR (15), mobile VARCHAR (15), area_m2 DOUBLE, price DOUBLE, length DOUBLE, width DOUBLE, region_id INTEGER, city_id INTEGER, area_id INTEGER, street VARCHAR (255), block INTEGER, lot INTEGER, property INTEGER, description TEXT, pros TEXT, cons TEXT, employee_id INTEGER NOT NULL, process BOOLEAN, created INTEGER, timestamp INTEGER);');
		/*
		var queries = [];
		queries.push("insert into regions(id, name, timestamp) values(1, 'Riyadh', 0)");
		queries.push("insert into regions(id, name, timestamp) values(2, 'Al-Qaseem', 0)");
		
		queries.push("insert into cities(id,region_id, name, timestamp) values(1,1, 'Riyadh', 0)");
		queries.push("insert into cities(id,region_id, name, timestamp) values(2,1, 'Al-Haraj', 0)");
		
		queries.push("insert into areas(id,city_id, name, timestamp) values(1,1, 'Rabwa', 0)");
		queries.push("insert into areas(id,city_id, name, timestamp) values(2,1, 'Malaz', 0)");
		
		queries.push("insert into real_estate_types(id, type, timestamp) values(1, 'Land', 0)");
		queries.push("insert into real_estate_types(id, type, timestamp) values(2, 'Building(Complex)', 0)");
		queries.push("insert into real_estate_types(id, type, timestamp) values(3, 'Building(Floor)', 0)");
		
		queries.push("insert into offering_types(id, type, timestamp) values(1, 'Buy', 0)");
		queries.push("insert into offering_types(id, type, timestamp) values(2, 'Rent', 0)");
		queries.push("insert into offering_types(id, type, timestamp) values(3, 'Investment', 0)");
				
		queries.push("insert into agrement_through(id, type, timestamp) values(1, 'Owner', 0)");
		queries.push("insert into agrement_through(id, type, timestamp) values(2, 'Broker', 0)");
		
		for(var i=0; i<queries.length; i++){
			mydb.execute(queries[i]);
		}
		*/
		mydb.close();
		
	}
	
	//temporary code add data
	

	//end of temporary code
	
	
};

Database.prototype.getName = function(){return DB_NAME;};
Database.prototype.getResource = function(){
	return Ti.Database.open(this.getName());
};

exports.Database = new Database();
