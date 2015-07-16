
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
    displayContactsPortlet(object);
    embelishTable(object,null);
}

function displayContactsPortlet(object)
{
    $("#contactsPortlet").empty();

    var main = $("#contactsPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var fname = object.contents[i].fname;
	var lname = object.contents[i].lname;
	var value = fname + ' ' + lname;
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}

function editContact()
{
    var object = this.data; 
    console.log(object);

    console.log("this.sid:");  // user_contact id
    console.log(this.sid);
    var link = this.sid;
    
    console.log("object.destroyer:");
    console.log(object.destroyer);

    var index;
    // find hash index 
    for (var i=0; i < object.contents.length; i++)
    {
	if (object.contents[i].sid === link)
	    index = i;
    }
    console.log("index:"+index);

    var current = object.contents[index];

    // build form 
    var string  = '<div id="contactUpdater" title="Update '+object.type+'">';
    string += '<table>';
    string += '<tr>';
    string += '<td>fname</td>'; 

    string += '<td>';
    string += '<input id="embedFname" value="'+current.fname+'">';
    string += '</td>';
    string += '</tr>';


    string += '<tr><td>lname</td>';
    string += '<td><input id="embedLname" value="'+current.lname+'"></td></tr>';

    string += '<tr><td>email</td>';
    string += '<td><input id="embedEmail" value="'+current.email+'"></td></tr>';

    string += '<tr><td>phone</td>';
    string += '<td><input id="embedPhone" value="'+current.phone+'"></td></tr>';

    string += '<tr><td>facebook</td>';
    string += '<td><input id="embedFacebook" value="'+current.facebook+'"></td></tr>';

    string += '<tr><td>linkedin</td>';
    string += '<td><input id="embedLinkedin" value="'+current.linkedin+'"></td></tr>';

    string += '<tr><td>github</td>';
    string += '<td><input id="embedGithub" value="'+current.github+'"></td></tr>';


    string += '</table></div>';

    $(string).dialog
    (
	{
	    modal:true, 
	    buttons:
	    {
		Cancel: function() 
		{
		    $(this).dialog("close")
		},
		"Update":function()
		{
		    // get values from form
		    var fname = $("#embedFname")[0].value;
		    var lname = $("#embedLname")[0].value;
		    var email = $("#embedEmail")[0].value;
		    var phone = $("#embedPhone")[0].value;
		    var facebook = $("#embedFacebook")[0].value;
		    var linkedin = $("#embedLinkedin")[0].value;
		    var github = $("#embedGithub")[0].value;



		    // give values to butler
		    
		    $(this).dialog("close");
		    // emptyElement($("#contactUpdater")[0]);
		    var toDestroy = 
			[
			    "embedFname","embedLname",
			    "embedEmail","embedPhone",
			    "embedFacebook","embedLinkedin", 
			    "embedGithub","contactUpdater"
			];

		    for (var i=0; i < toDestroy.length; i++)
			removeElement(toDestroy[i]);



		    $.ajax
		    (
			{
			    url: "butler.php",
			    type: "post",
			    dataType: "text",
			    data:
			    {
				user: object.parent.user.name,
				pass: object.parent.user.password,
				func: object.updater,
				sid: link, // user_contact id
				fname: fname,
				lname: lname,
				email: email,
				phone: phone,
				facebook: facebook,
				linkedin: linkedin,
				github: github
			    },
			    success: function(resp)
			    {
				console.log(resp);
				//console.log(JSON.parse(resp));
				// 
				if (JSON.parse(resp) === true)
				{
				    console.log("update worked");
				    // displayTable(object,[]);
				    // getStuff(object);
				    object.parent.refresh();
				}
				else
				{
				    console.log("update failed");
				}
			    }	
			}
		    );
		    
		}
	    }
	}
    );

}


function insertContact()
{
    var object = this;
    console.log("insert posting object");
    console.log(object);
    
    var fname = $("#fnameToAdd")[0].value;
    var lname = $("#lnameToAdd")[0].value;
    var email = $("#emailToAdd")[0].value;
    var phone = $("#phoneToAdd")[0].value;
    var facebook = $("#facebookToAdd")[0].value;
    var linkedin = $("#linkedinToAdd")[0].value;
    var github = $("#githubToAdd")[0].value;
    
    
    $.ajax
    (
	{
	    url: "butler.php",
	    type: "post",
	    dataType: "text",
	    data:
	    {
		user: object.user.name,
		pass: object.user.password,
		func: "insertContact",
		fname: fname,
		lname: lname,
		email: email,
		phone: phone,
		facebook: facebook,
		linkedin: linkedin,
		github: github
	    },
	    success: function(resp)
	    {
		console.log(resp);
		// 
		// clear text fields
		
		$("#fnameToAdd")[0].value = '';
		$("#lnameToAdd")[0].value = '';
		$("#emailToAdd")[0].value = '';
		$("#phoneToAdd")[0].value = '';
		$("#facebookToAdd")[0].value = '';
		$("#linkedinToAdd")[0].value = '';
		$("#githubToAdd")[0].value = '';

		if (JSON.parse(resp) === true)
		{
		    console.log("input worked");
		    // displayTable(object,[]);
		    getStuff(object.contacts);
		}
		else
		{
		    console.log("input failed");
		}
	    }	
	}
    )
    
    
    
}
