

/**
 * @param {Titanium.UI.Window}
 * @param {bolean}
 * 
 */
function AppMenu(context, close){
	if(context == undefined) throw new Error("Context is undefine");
	
	this.context = context;
	this.close = close;
	this.is_menu_open = false;
	var ux = require("lib/UX");
	this.percent_60 = (Config.width * 75)/100;
	this.overlay = ux.View({
		width:"100%",
		height:"100%",
		visible:false,
		name:"overlay"
	});
	
	this.background = ux.View({
		width:"100%",
		height:"100%",
		opacity:0,
		backgroundColor:"#4d4d4d",
		name:"background"
	});
	
	var shadow = ux.View({
		width: this.percent_60,
		height: Ti.UI.FILL,
		backgroundColor: ""
	});
	//
	this.container =  ux.View({
		width:this.percent_60,
		height:Ti.UI.FILL,
		layout:"vertical",
		backgroundColor:"#f7f7f7",
		right:-this.percent_60
	});
	this.container.add(
		ux.Image({
			width:this.percent_60,
			height:Ti.UI.SIZE,
			image:"/images/menu-header.png"
		})
	);
	
	//
	
	
	var listOptions = [
		{title:I18N.text("NewLocation", "New Location"),id:"newLocation", icon:"pin", size:"18sp"},
		{title:I18N.text("ListLocation", "List Location"),id:"listLocation", icon:"map-marker",size:"18sp"},
		//{title:I18N.text("LocationMap", "Location Map"),id:"locationMap",icon:"map-marker"},
		{title:"",id:"separator"},
		//{title:I18N.text("Exit", "Exit"),id:"exit", icon:"exit", size:"16sp"},
		{title:I18N.text("Logout", "Logout"),id:"logout", icon:"exit", size:"16sp"}
	];
	
	var listDataArray = [];
	for(var i=0; i<listOptions.length; i++){
		
		var row = ux.TableRow({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			id: listOptions[i].id,
			
		});
		var rowBackground = UX.View({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
			backgroundColor:"#f7f7f7"
		});
		row.add(rowBackground);
		if(listOptions[i].id == 'separator'){
			rowBackground.add(
				ux.View({
					top:30,
					bottom:10,
					height:1,
					width:"95%",
					backgroundColor:"#999999"
				})
			);
			row.add(rowBackground);
			listDataArray.push(row);
			continue;
		}
		var wraper = ux.View({
			top:10,
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			layout:"horizontal",
			right:0,
			//backgroundColor:"#ffffff"
		});
		var iconLabel = ux.Label({
			width:48,
			height:Ti.UI.SIZE,
			right:16,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
			text:ICONS.getIcon(listOptions[i].icon),
			color:"#999999",
			font:{
				fontFamily:"realestate",
				fontSize:listOptions[i].size
			},
			
		});
		
		var titleLabel = ux.Label({
			right:16,
			width:Ti.UI.SIZE,
			height:Ti.UI.SIZE,
			text:listOptions[i].title,
			color:"#737373",
			font:AppFonts.getFont(I18N.locale, {"en":[AppFonts.GE_FLOW_BOLD, 16],"ar":[AppFonts.GE_FLOW_BOLD, 14]}, "bold")
		});
		
		wraper.add(titleLabel);
		wraper.add(iconLabel);
		
		rowBackground.add(wraper);
		listDataArray.push(row);
	}
	
	var list = ux.Table({
		data:listDataArray,
		heigt:Ti.UI.SIZE,
		width:this.percent_60,
		right:0,
		separatorStyle: Titanium.UI.iPhone.TableViewSeparatorStyle.NONE,
		//backgroundColor:"#fff000",
		//color:"#000",
		top:25
	});
	this.container.add(list);
	list.addEventListener("click", function(e){
		if(e.rowData.id == "separator") return;
		
		var Window;
		switch(e.rowData.id){
			
			case "newLocation":
				Window = require(Config.uidir + "GetLocationWindow");
				break;
			case "listLocation":
				Window = require(Config.uidir + "ListLocationWindow");
				break;
			case "locationMap":
				Window = require(Config.uidir + "AddLocationWindow");
				break;
			case "exit":
				Functions.logout();
				//context.close();
				return;
				break;
			case 'logout':
				Functions.logout();
				var LoginWindow = require(Config.uidir + "LoginWindow");
				var login = new LoginWindow();
				login.open();
				context.close();
				return;
				break;
		}
		var win = new Window();
		win.open();
		closeMenu();
		if(close){
			this.context.close();
		}
		
	});
	this.overlay.add(this.background);
	this.overlay.add(this.container);
	var _self = this;
	function closeMenu(e){
		//Config.trace(e.source.name);
		if(_self.is_menu_open){
			
			_self.background.animate({
				opacity:0,
				duration:300
			}, function(){
				_self.overlay.visible = false;
			});
			
			_self.container.animate({
				right:0,
				duration:300
			});
			
			_self.is_menu_open = false;
		}
	}
	this.background.addEventListener("click", closeMenu);
};
AppMenu.prototype.bind = function(){
	this.context.add(this.overlay);
};

AppMenu.prototype.overlyClickHandler = function(e){
	var overlay = this.overlay;
	var list = this.container;
	if(this.is_menu_open){
		overlay.animate({
			opacity:0,
			duration:200
		}, function(){
			overlay.visible = false;
		});
		
		list.animate({
			right:0,
			duration:200
		});
		
		this.is_menu_open = false;
	}
	/*
	else{
		overlay.visible = true;
		overlay.animate({
			opacity:0.7,
			duration:200
		});
		
		list.animate({
			right:this.percent_60,
			duration:200
		});
		
		this.is_menu_open = false;
	}
	*/
};
AppMenu.prototype.menuClick = function(){
	Config.trace("menuclick");
	var overlay = this.overlay;
	var background = this.background;
	var list = this.container;
	overlay.visible = true;
		background.animate({
			opacity:0.5,
			duration:200
		});
		
		list.animate({
			right:0,
			duration:200
		});
		//list.left=0;
		this.is_menu_open = true;
		Config.trace(list.visible);
		
};
exports.AppMenu = AppMenu;