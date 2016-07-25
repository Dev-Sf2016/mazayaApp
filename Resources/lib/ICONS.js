
var ICONS = {};

ICONS.getIcon = function(name){
    var icons = {"zoom-in":0xe600, "zoom-out":0xe601,"save":0xe602, "trash":0xe603,"info-1":0xe604,"info-2":0xe605,
        "check-mark":0xe606,"picture":0xe607, "camera":0xe608,"comment":0xe609,"map-marker":0xe60a ,"menu-list":0xe60b,"plus":0xe60c,"minus":0xe60d, 
        "left-arrow":0xe60e,"right-arrow":0xe60f,"logout":0xe610,"back":0xe611,"forward":0xe612,"edit":0xe613,"search":0xe614, "edit-circle":0xe615, "delete-circle":0xe616,
        "document":0xe617, "lock":0xe618, "user":0xe619, "pin":0xe620, "exit":0xe621
    };
    return String.fromCharCode(icons[name]);
};

exports.ICONS = ICONS;