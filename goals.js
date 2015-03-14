
function insertGoal()
{
}

function editGoal()
{
}

function fillGoals(object,input)
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
	var value = input.values[i];

	var p = new goal(id,value);
	// console.log("p");
	// console.log(p);
	contents.push(p);
    }
    

    displayTable(object);
    

}

