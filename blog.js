function fillBlog(object,input)
{
    // erase object's contents and refill them from input
    object.contents = [];
    var contents = object.contents;

    
    for (var i = 0; i < input.ids.length; i++)
    {
	var id = input.ids[i];
	var title = input.titles[i];
	var text = input.texts[i];

	var p = new blog(id,title,text);
	contents.push(p);
    }
    

    displayTable(object);
    displayGoalsPortlet(object);

}


function insertBlog()
{
}
