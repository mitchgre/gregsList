/*
  This file will contain utility functions
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
