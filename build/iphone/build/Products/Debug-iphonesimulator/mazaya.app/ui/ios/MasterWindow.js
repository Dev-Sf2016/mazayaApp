//Master View Component Constructor
function MasterWindow() {
   // Ti.include('lib/customTabBar.js');
    //create object instance, parasitic subclass of Observable

    var HomeWindow = require(Config.uidir +'HomeWindow');
    
    var StoresWindow = require(Config.uidir + "StoresWindow");
    
    var DiscountWindow = require(Config.uidir + "DiscountWindow");
    
    var AccountWindow = require(Config.uidir + 'AccountWindow');
    
   	var MoreWindow = require(Config.uidir + 'MoreWindow');
   
    var tabGroup = Ti.UI.createTabGroup({
    	activeTabIconTint:"#000",
    	exitOnClose: true,
    	barColor:"#f2f2f2",
    	tabHeight:"80dp",
    	tabDividerColor:"#dddddd",
    	tabDividerWidth:2,
        tabsTintColor:"black",
        
    });

    var home = new HomeWindow();
    var stores = new StoresWindow();
    var discount = new DiscountWindow();
    var account = new AccountWindow();
    var more = new MoreWindow();

    var homeTab = Ti.UI.createTab({
        title :I18N.text("Home", "Home"),
        window : home,
        font:{
            fontSize:"28sp"
        }
            
    });
    
    var storesTab = Ti.UI.createTab({
        title:I18N.text("Stores", "Stores"),
        window:stores
    });
    
    var discountTab = Ti.UI.createTab({
       title:I18N.text("Dicount", "Discount"),
       window: discount
    });
    
	var accountTab = Ti.UI.createTab({
        title :I18N.text("Account", "Account"),
        window : account
    });
    
    var moreTab = Ti.UI.createTab({
        title :I18N.text("More", "More"),
        window : more
    });
    
    home.containingTab = homeTab;
    stores.containingTabe = storesTab;
    discount.containingTab = discountTab;
    account.containingTab = accountTab;
    more.containingTab = moreTab;
	
    tabGroup.addTab(homeTab);
    tabGroup.addTab(storesTab);
    tabGroup.addTab(discountTab);
    tabGroup.addTab(accountTab);
    tabGroup.addTab(moreTab);
    
    
    
    
  /*
    var Menu = require("ui/handheld/ios/Menu");
	function menuItemClick(event){
	    var menu = new Menu();
       menu.open();
	};
	*/
	//home.addEventListener("menu:itemClick", menuItemClick);
    //categories.addEventListener("menu:itemClick", menuItemClick);
    ///promotion.addEventListener("menu:itemClick", menuItemClick);
    //store.addEventListener("menu:itemClick", menuItemClick);
    //iktissab.addEventListener("menu:itemClick", menuItemClick);
	//inqSuggestion.addEventListener("menu:itemClick", menuItemClick);
	//more.addEventListener("menu:itemClick", menuItemClick);
	/*
	var bkoptions = {
        borderColor:"#eee", borderWidth:1, backgroundColor:"#F2F2F2", 
        font:{fontSize:"20sp"}
    };
    
	overrideTabs(tabGroup, {
        color:"#000",borderColor:"#eee", borderWidth:1, backgroundColor:"#F2F2F2", font:{fontsize:"12sp"}
    }, {
        borderColor:"#eee", borderWidth:1, backgroundColor:"#F2F2F2", font:{fontsize:"20sp"}
    }, {
        borderColor:"#eee", borderWidth:1, backgroundColor:"#F2F2F2", font:{fontsize:"20sp"}
    });
	*/
	function _setActiveTab(index){
	    var children = cbar.getChildren();
	    var k=0;
        for(var i=0;i<children.length; i++){
            if(children[i].id != undefined){
                
                if(k==index){
                    children[i].setBackgroundColor("#D90000");
                    children[i].setColor("#FFF");
                }
                else{
                    children[i].setBackgroundColor("#F0F0F0");
                    children[i].setColor("#000000");
                }
                
                k++;
            }
        }
	}
	Ti.App.addEventListener("selectTab", function(e){
		switch(e.tab){
			case 'stores': tabGroup.setActiveTab(1);_setActiveTab(1);break;
			case 'discount': tabGroup.setActiveTab(2);_setActiveTab(2);break;
			case 'account': tabGroup.setActiveTab(3);_setActiveTab(3);break;
		}
	});
	Ti.App.addEventListener("uiDirty", function(e){
	    homeTab.setTitle(I18N.text("Home", "Home"));
	    storesTab.setTitle(I18N.text("Stores", "Stores"));
	    discountTab.setTitle(I18N.text("Discount", "Discount"));
	    accountTab.setTitle(I18N.text("Account", "Account"));
	    
	    moreTab.setTitle(I18N.text("More", "More"));
	    var tbar = cbar.getChildren();
	    var titles = [I18N.text("Home", "Home"),I18N.text("Stores", "Stores"),I18N.text("Discount", "Discount"),I18N.text("Account", "Account"),I18N.text("More", "More")];
	    for(var i=0, j=tbar.length; i<j; i++){
	        if(tbar[i].index == undefined) continue;
	        tbar[i].setTitle(titles[tbar[i].index]);
	    }
	    
	});
	
	tabGroup.addEventListener("focus", function(e){
	   
	});
	
	
	var cbar = Ti.UI.createView({
	   backgroundColor:"#F0F0F0",
	   //style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
       height:"48dp",
       width:Config.appWidth+"dp",
       bottom:0 ,
        layout:"horizontal",
        center:"center.y"
        
	});
	
	var barText = [I18N.text("Home", "Home"),I18N.text("Stores", "Stores"),I18N.text("Discount", "Discount"),I18N.text("Account", "Account"),I18N.text("More", "More")];
	var tabButtons = [];
	var tbuttonWidth = 0;
	var tremender = (Config.appWidth-4)%5;
	if(tremender !=0){
	    tbuttonWidth = (Config.appWidth - tremender - 4)/5;
	}
	else{
	    tbuttonWidth = (Config.appWidth-4)/5;
	}
	for(var k=0; k<barText.length; k++){
	    Ti.API.info(k);
	    var tbutton = Ti.UI.createButton({
	        backgroundColor:(k==0)?"#D90000":"#F0F0F0",
	        title:barText[k],
	        width:((k != 0)? tbuttonWidth : ( tbuttonWidth + tremender)) + "dp",
	        height:"48dp",
	        color:(k==0)?"#fff":"#000000",
	        index:k,
	        font:{
	            fontSize: Config.appWidth > 700?"14sp":"10sp"
	        },
	        id:"tabButton"
	    });
	    tbutton.addEventListener("click", function(e){
	        Ti.API.info(e.source.index);
	        tabGroup.setActiveTab(e.source.index);
	        var children = cbar.getChildren();
	        for(var i=0;i<children.length; i++){
	            if(children[i].id != undefined){
	                children[i].setBackgroundColor("#F0F0F0");
	                children[i].setColor("#000000");
	            }
	        }
	        e.source.setBackgroundColor("#D90000");
	        e.source.setColor("#FFF");
	    });
	    if(k !=0){
	       var line = Ti.UI.createView({
               backgroundColor:"#808080",
                width:"1dp",
                top:12,
                bottom:12
            });
            cbar.add(line);
	    }
	    cbar.add(tbutton);
	}
	
	tabGroup.add(cbar);
	//Handling GCM
	
	
    //self.add(tabGroup);
    //tabGroup.addEventListener("click")
    return tabGroup;
};
module.exports = MasterWindow; 