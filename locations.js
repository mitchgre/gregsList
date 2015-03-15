
function insertLocation()
{
}

function editLocation()
{
}

function fillLocations(object,input)
{
    console.log("fill industries");
    console.log(object);

    //console.log("input keys");
    // console.log(input);
    //console.log(JSON.parse(Object.keys(input)));

    

    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var name = input.names[i];

	var p = new loc(id,name);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    displayLocationsPortlet(object);

}

function displayLocationsPortlet(object)
{
    $("#locationsPortlet").empty();

    var main = $("#locationsPortlet")[0];
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
