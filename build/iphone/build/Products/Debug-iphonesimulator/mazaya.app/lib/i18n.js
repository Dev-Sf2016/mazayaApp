/**
 * Language switcher and translater 
 */
var lookup = null;
exports.locale = Ti.App.Properties.getString('SETTING_LANGUAGE', "");
 
 
/**
 * Private function
 * Loads the language xml file.
 * It has fallback for english if file does not exist.
 */
function loadFile() {
    lookup = {};
     
    // LOAD FILE
    Ti.API.info(Ti.Filesystem.resourcesDirectory + 'i18n/' + exports.locale + '/strings.json');
    var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/' + exports.locale + '/strings.json');
    if (!file.exists()) {
        file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'i18n/en/strings.json');
        if (!file.exists()) {
            Ti.API.warn("Language file for both '" + exports.locale + "' and 'en' fallback do not exist");
            return;
        }
    }
     
    // PARSE XML
    var tstring = file.read().text;
    lookup = JSON.parse(tstring);
        
}
 
/**
 * Set the current language of the app.
 * @param {String} language
 */
exports.setLanguage = function(language, direction){
    if(language === null){
        return;
    }
    // clean old lookup
    exports.clear();
    
    // save language
    //Ti.App.Properties.setString('SETTING_LANGUAGE', language);
    //language='ar';
    Ti.App.Properties.setString('SETTING_LANGUAGE', language);
    
    exports.locale = language;
    
    // parse new lookup
    loadFile();
    exports.direction = direction;
         
    //return lookup;
};

exports.getLanguage = function(){
	return Ti.App.Properties.getString('SETTING_LANGUAGE');
};
/**
 * Clear the parsed xml translations
 */
exports.clear = function() {
    lookup = null;
};
 
/**
 * Lookup function. require this at each controller
 * Example usage:
 * @param {String} string
 * @param {String} hint
 */
exports.text = function(string, hint) {
    if (lookup === null) {
        loadFile();
    }
    var sd = lookup[string] !== undefined ? lookup[string] : (hint || string);
    return sd;
};

exports.direction = Ti.UI.TEXT_ALIGNMENT_LEFT;

