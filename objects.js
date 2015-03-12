/*
  This file will contain skeleton function classes.
*/

function posting(sid,title,url,location,company)
{
    this.sid = sid || null;   // id in sql
    this.title = title || null;
    this.url = url || null;
    // this.user = null;  // not needed since back end will handle this?
    this.location = location || null; // location is ? city?  state? (arbitrary)
    this.company = company || null;
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


