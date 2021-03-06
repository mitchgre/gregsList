/*
  This file will contain utility functions that are not specialized for this project. 
*/


// create a child DOM element of type childType ct and append to parent p
// return the created child 
function createAppendedChildToParent( ct ,parent)
{
    var c = document.createElement(ct);
    parent.appendChild(c);
    return c;
}


/*
  Remove all of element e's children from DOM
*/
function emptyElement(e)
{
    if (typeof e != 'undefined')
	if (e.firstChild)
	    while (e.firstChild)
		e.removeChild(e.firstChild);
}


/*
  A function to render an input type to a container div (element).
*/
function addInput(parent, inputType, inputClass, inputValue, inputId)
{
    var input = createAppendedChildToParent('input',parent);
    input.type = inputType;
    
    if (inputClass)
	input.type = inputClass;
    
    if (inputValue)
	input.value = inputValue;
    
    if (inputId)
	input.id = inputId;
    
    return input;
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function removeElement(id)
{
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
}

function month()
{
    this.names = 
	[
	    "January",
	    "February", 
	    "March", 
	    "April", 
	    "May", 
	    "June",
	    "July", 
	    "August", 
	    "September", 
	    "October", 
	    "November", 
	    "December"
	]
}

function getMonthName(date)
{
    var m = new month();
    return m.names[date.getMonth()];
}

// http://stackoverflow.com/questions/650022/how-do-i-split-a-string-with-multiple-separators-in-javascript
function splitStringSpacesCommas(string)
{
    // [\s,] => space, comma
    return string.split(/[\s,]+/);
}

/*
  Given a base string and a list of strings,
  append each string in the list to the base string. 
*/
function appendListToString(string,list)
{
    for (var i = 0; i < list.length; i++)
	string += list[i];
    return string;
}
