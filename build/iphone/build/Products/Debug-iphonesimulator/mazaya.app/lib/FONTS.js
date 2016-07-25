

var Fonts = function(){};

/**
 * 
 * @param {String} key
 * @param {Object} f
 * @param {Object} s
 * 
 * @return {Object}
 */

Fonts.prototype.getFont = function(key, f, s ){
    
    var font = {};
   
    font.fontFamily = f[key][0];
    font.fontSize = f[key][1] + "sp";

    font.fontWeight = (s == undefined)? "Normal":s;
    return font;
};


Fonts.prototype.GE_FLOW_REGULAR = "GEFlow-Bold";
Fonts.prototype.GE_FLOW_BOLD = "GEFlow-Bold";
Fonts.prototype.Arial = "Arial";
Fonts.prototype.Time_New_Roman = "Times New Roman";
Fonts.prototype.Verdana = "verdana";

exports.Fonts = new Fonts();
