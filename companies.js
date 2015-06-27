



/*
  Self explanatory right?
*/
function insertCompany()
{
    var object = this;
    var toAdd = $("#CompanyToAdd")[0].value;
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
		func: "insertCompany",
		company: toAdd,
	    },
	    success: function(resp)
	    {
		console.log(resp);
		// 
		// clear text fields
		$("#CompanyToAdd")[0].value = '';
		
		if (JSON.parse(resp) === true)
		{
		    console.log("input worked");
		    // displayTable(object,[]);
		    getStuff(object.companies);
		    // object.parent.refresh();
		}
		else
		{
		    console.log("input failed");
		}
		
	    }	
	}
    )
   
}



/*
  fill the gregsList object's companies
*/
function fillCompanies(object,input)
{


    // erase previous contents
    object.contents = [];
    var contents = object.contents;
    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var name = input.names[i];

	var p = new company(id,name,null);

	contents.push(p);
    }
    

    displayTable(object);
    displayCompaniesPortlet(object);
}

function displayCompaniesPortlet(object)
{
    $("#companiesPortlet").empty();

    var main = $("#companiesPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var value = object.contents[i].name;
	
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}
