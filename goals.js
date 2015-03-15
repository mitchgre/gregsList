
function insertGoal()
{
}

function editGoal()
{
}

function fillGoals(object,input)
{
    
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var value = input.values[i];

	var p = new goal(id,value);
	contents.push(p);
    }
    

    displayTable(object);
    displayGoalsPortlet(object);
}


function displayGoalsPortlet(object)
{
    $("#goalsPortlet").empty();

    var main = $("#goalsPortlet")[0];
    var table = createAppendedChildToParent('table',main);
    table.className += "io";
    
    for (var i = 0; i < object.contents.length; i++)
    {
	var tr = createAppendedChildToParent('tr',table);
	var td = createAppendedChildToParent('td',tr);
	var value = object.contents[i].value;
	console.log(value);
	var content = document.createTextNode(value);
	td.appendChild(content);
    }

}
