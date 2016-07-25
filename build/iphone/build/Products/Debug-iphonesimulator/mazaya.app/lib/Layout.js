/**
 * @method ApplyHorizontalLayout
 * @param {Titanium.UI.View} parent
 * @param {Arry} controls
 * @param {number} gap
 * @param {number} padding
 * @param {string} direction
 * @param {string} unit
 */
exports.ApplyHorizontalLayout = function(parent, controls, gap, padding, direction, unit){
    parent.setLayout('horizontal');
    
    if(direction == undefined) direction='ltr';
    if(unit == undefined) unit = "dp";
    if(gap == undefined) gap = 0;
    if(padding == undefined) padding = 0;
    if(direction == 'ltr'){
        for(var i=0, j=controls.length; i<j; i++){
            Ti.API.info(typeof controls[i]);
            var ui_control = controls[i];
            ui_control.textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
            if(i==0){
                ui_control.setLeft(padding+unit);
            }
            else{
                ui_control.setLeft(gap+unit);
            }            
            parent.add(ui_control);       
        }
    }
    else{
        for(var i=controls.length-1; i>=0; i--){
            Ti.API.info(typeof controls[i]);
            var ui_control = controls[i];
            ui_control.textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
            if(i==controls.length-1){
                ui_control.setRight(padding+unit);
            }
            else{
                ui_control.setRight(gap+unit);
            }
            parent.add(ui_control);
        }
    }
        
    return parent;
};

/**
 * @method ApplyVerticalLayout
 * @param {View} parent
 * @param {Array} controls
 * @param {number} gap
 * @param {number} padding
 * @param {number} direction
 * @param {number} unit
 */
exports.ApplyVerticalLayout = function(parent, controls, gap, padding, direction, unit){
    parent.setLayout('vertical');
    
    if(direction == undefined) direction='ltr';
    if(unit == undefined) uint = "dp";
    if(gap == undefined) gap = 0;
    if(padding == undefined) padding = 0;
    var textAlignment = "";
    if(direction == 'ltr'){
        textAlignment = Ti.UI.TEXT_ALIGNMENT_LEFT;
    }
    else{
        textAlignment = Ti.UI.TEXT_ALIGNMENT_RIGHT;   
    }
    for(var i=0, j=controls.length; i<j; i++){
        Ti.API.info(typeof controls[i]);
        var ui_control = controls[i];
        ui_control.textAlign = textAlignment;
        if(ui_control.top != undefined){
            parent.add(ui_control);
            continue;
        }
        if(i==0){
            ui_control.setTop(padding+unit);
        }
        else{
            ui_control.setTop(gap+unit);
        }            
        parent.add(ui_control);       
    }
          
    return parent;
};
