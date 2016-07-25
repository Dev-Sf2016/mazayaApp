/**
 * Created by s.aman on 7/8/16.
 */
function getParams(param){
	var defaults = {
	    width: "80%",
	    height: 35
	};
	for(var p in param) defaults[p] = param[p];
	return defaults;
}



var form1 = FM.TiForm(
    {
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        layout: 'vertical',
    },
    {
        method: "post",
        url: "/company/register"
    }
);


form1.add('name', FM.Constants.INPUT, getParams({hintText: I18N.text('Company Name', 'Company Name')}), [
    new FM.Constraint.NotBlank(I18N.text('This field is required', 'This field is required'))
]);

form1.add('url', FM.Constants.INPUT, getParams({hintText: I18N.text('Website URL', 'Website URL')}), [
	new FM.Constants.URL(I18N.text('Invalid url', 'invalid url'))
]);
form1.add('logo', FM.Constants.File, getParams({title: I18N.text('Company Logo', 'Company Logo')}),[]);

//company delegate 
form1.add('name', FM.Constants.INPUT, getParams({hintText: I18N.text('Delegate Name', 'Delegate Name')}), []);
form1.add('email', FM.Constants.INPUT, getParams({hintText: I18N.text('Email', 'Email')}),[]);
form1.add('password', FM.Constants.INPUT, getParams({hintText: I18N.text('Password', 'Password')}), []);
form1.add('confirmPassword', FM.Constants.INPUT, getParams({hintText: I18N.text('Confirm Password', 'Confirm Password')}), []);
/*
array(
                    'type' => PasswordType::class,
                    'invalid_message'=>'Password and confirm password are not same',
                    'first_options' => array('label' => 'Password'),
                    'second_options' => array('label' => 'Confirm Password')
                )
            );
            */
form1.add('Submit', FM.Constants.SUBMIT, {
    width: 200,
    height:35,
    backgroundColor:"green",
    title: 'Submit',
    submit:true,
    onClick: onformSubmit
});

function onformSubmit(){
    if(form1.isValid()){
        var data = form1.getData();

        Ti.API.info(JSON.stringify(data));
    }
}

exports = form1;