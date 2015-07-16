/*
  This file will contain skeleton function classes specialized for this project.
*/

function posting(sid,title,url,location,company,source)
{
    this.sid = sid || null;   // id in sql
    this.title = title || null;
    this.url = url || null;
    // this.user = null;  // not needed since back end will handle this?
    this.location = location || null; // location is ? city?  state? (arbitrary)
    this.company = company || null;
    this.source = source || null;
}


function industry(sid,name)
{
    this.sid = sid || null;
    this.name = name || null;
}


function goal(sid,value)
{
    this.sid = sid || null;
    this.value = value || null;
}


function loc(sid,name)
{
    this.sid = sid || null;
    this.name = name || null;
}

function contact(sid,fname,lname,email,phone,facebook,linkedin,github)
{
    this.sid = sid || null;
    this.fname = fname || null;
    this.lname = lname || null;
    this.email = email || null;
    this.phone = phone || null;
    this.facebook = facebook || null;
    this.linkedin = linkedin || null;
    this.github = github || null;
}



function company(sid,name,url)
{
    this.sid = sid || null;
    this.name = name || null;
    this.url = url || null;
}

function schedule(sid,name,description,location,contact,url,start,end)
{
    this.sid = sid || null;
    this.name = name || null;
    this.description = description || null;
    this.location = location || null;
    this.contact = contact || null;
    this.url = url || null;
    this.start = start || null;
    this.end = end || null;
}


function blog(sid,title,text)
{
    this.sid = sid || null;
    this.title = title || null;
    this.text = text || null;
}


