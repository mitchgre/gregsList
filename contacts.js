
/*
  fill the gregsList object's contacts
*/
function fillContacts(object,input)
{

    console.log("object");
    console.log(object);


    // erase previous contents
    object.contents = [];
    var contents = object.contents;
    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var fname = input.fnames[i];
	var lname = input.lnames[i];
	var email = input.emails[i];
	var phone = input.phones[i];
	var facebook = input.facebooks[i];
	var linkedin = input.linkedins[i];
	var github = input.githubs[i];

	var p = new contact(id,fname,lname,email,phone,facebook,linkedin,github);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    
}

function insertContact()
{
}
